from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from typing import List, Optional

from app.database.db import get_db
from app.models.models import Project
from app.schemas.schemas import ProjectCreate, ProjectOut

router = APIRouter()


@router.get("/projects", response_model=List[ProjectOut])
async def list_projects(
    category: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    conditions = [Project.published == True]  # noqa: E712
    if category:
        conditions.append(Project.category == category)
    if featured is not None:
        conditions.append(Project.featured == featured)

    result = await db.execute(
        select(Project).where(and_(*conditions)).order_by(Project.created_at.desc())
    )
    return result.scalars().all()


@router.get("/projects/{slug}", response_model=ProjectOut)
async def get_project(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).where(Project.slug == slug))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/projects", response_model=ProjectOut, status_code=201)
async def create_project(data: ProjectCreate, db: AsyncSession = Depends(get_db)):
    project = Project(**data.model_dump())
    db.add(project)
    await db.flush()
    await db.refresh(project)
    return project
