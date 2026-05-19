from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, update
from typing import List, Optional
from datetime import datetime

from app.database.db import get_db
from app.models.models import BlogPost
from app.schemas.schemas import BlogPostCreate, BlogPostOut, BlogPostSummary

router = APIRouter()


@router.get("/blog", response_model=List[BlogPostSummary])
async def list_posts(
    category: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
    limit: int = Query(10, le=50),
    offset: int = Query(0),
    db: AsyncSession = Depends(get_db),
):
    conditions = [BlogPost.published == True]  # noqa: E712
    if category:
        conditions.append(BlogPost.category == category)

    result = await db.execute(
        select(BlogPost)
        .where(and_(*conditions))
        .order_by(BlogPost.published_at.desc())
        .limit(limit)
        .offset(offset)
    )
    posts = result.scalars().all()

    if tag:
        posts = [p for p in posts if tag in (p.tags or [])]

    return posts


@router.get("/blog/{slug}", response_model=BlogPostOut)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(BlogPost).where(BlogPost.slug == slug, BlogPost.published == True)  # noqa: E712
    )
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    await db.execute(
        update(BlogPost).where(BlogPost.id == post.id).values(views=BlogPost.views + 1)
    )
    return post


@router.post("/blog", response_model=BlogPostOut, status_code=201)
async def create_post(data: BlogPostCreate, db: AsyncSession = Depends(get_db)):
    post = BlogPost(**data.model_dump())
    if post.published:
        post.published_at = datetime.utcnow()
    db.add(post)
    await db.flush()
    await db.refresh(post)
    return post
