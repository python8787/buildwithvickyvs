import uuid
from datetime import datetime
from sqlalchemy import String, Text, Boolean, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.database.db import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str]           = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    title: Mapped[str]        = mapped_column(String(200), nullable=False)
    slug: Mapped[str]         = mapped_column(String(200), unique=True, nullable=False)
    description: Mapped[str]  = mapped_column(Text, nullable=False)
    long_desc: Mapped[str | None]  = mapped_column(Text)
    category: Mapped[str]     = mapped_column(String(100), nullable=False)
    tags: Mapped[list]        = mapped_column(JSONB, default=list)
    github_url: Mapped[str | None]  = mapped_column(String(500))
    demo_url: Mapped[str | None]    = mapped_column(String(500))
    image_url: Mapped[str | None]   = mapped_column(String(500))
    featured: Mapped[bool]    = mapped_column(Boolean, default=False)
    published: Mapped[bool]   = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id: Mapped[str]              = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    title: Mapped[str]           = mapped_column(String(300), nullable=False)
    slug: Mapped[str]            = mapped_column(String(300), unique=True, nullable=False)
    excerpt: Mapped[str | None]  = mapped_column(Text)
    content: Mapped[str]         = mapped_column(Text, nullable=False)
    cover_image: Mapped[str | None] = mapped_column(String(500))
    category: Mapped[str]        = mapped_column(String(100), default="General")
    tags: Mapped[list]           = mapped_column(JSONB, default=list)
    published: Mapped[bool]      = mapped_column(Boolean, default=False)
    views: Mapped[int]           = mapped_column(Integer, default=0)
    read_time: Mapped[int]       = mapped_column(Integer, default=5)
    created_at: Mapped[datetime]       = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime]       = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at: Mapped[datetime | None] = mapped_column(DateTime)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[str]         = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    name: Mapped[str]       = mapped_column(String(200), nullable=False)
    email: Mapped[str]      = mapped_column(String(300), nullable=False)
    subject: Mapped[str | None] = mapped_column(String(300))
    message: Mapped[str]    = mapped_column(Text, nullable=False)
    read: Mapped[bool]      = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class AIToolLog(Base):
    __tablename__ = "ai_tool_logs"

    id: Mapped[str]           = mapped_column(UUID(as_uuid=False), primary_key=True, default=_uuid)
    tool_name: Mapped[str]    = mapped_column(String(100))
    tokens_used: Mapped[int]  = mapped_column(Integer, default=0)
    success: Mapped[bool]     = mapped_column(Boolean, default=True)
    latency_ms: Mapped[int]   = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
