from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime


# ── Projects ──────────────────────────────────────────────────────────────────
class ProjectCreate(BaseModel):
    title: str
    slug: str
    description: str
    long_desc: Optional[str] = None
    category: str
    tags: List[str] = []
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    published: bool = True


class ProjectOut(ProjectCreate):
    id: str
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ── Blog ──────────────────────────────────────────────────────────────────────
class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    cover_image: Optional[str] = None
    category: str = "General"
    tags: List[str] = []
    published: bool = False
    read_time: int = 5


class BlogPostOut(BlogPostCreate):
    id: str
    views: int = 0
    created_at: datetime
    published_at: Optional[datetime] = None
    model_config = {"from_attributes": True}


class BlogPostSummary(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: Optional[str]
    cover_image: Optional[str]
    category: str
    tags: List[str]
    views: int
    read_time: int
    created_at: datetime
    published_at: Optional[datetime]
    model_config = {"from_attributes": True}


# ── Contact ───────────────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Message from buildwithvickyvs.ai"
    message: str

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        if len(v.strip()) < 10:
            raise ValueError("Message must be at least 10 characters.")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    message: str


# ── AI Tools ──────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    conversation_id: str


class AnalyzeRequest(BaseModel):
    text: str
    task: str = "summarize"  # summarize | classify | explain


class AnalyzeResponse(BaseModel):
    result: str
    task: str
    tokens_used: Optional[int] = None


# ── Health ────────────────────────────────────────────────────────────────────
class HealthOut(BaseModel):
    status: str
    version: str
    environment: str
