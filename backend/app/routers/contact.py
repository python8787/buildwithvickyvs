import logging
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.db import get_db
from app.models.models import ContactMessage
from app.schemas.schemas import ContactForm, ContactResponse

router = APIRouter()
log = logging.getLogger(__name__)


async def _notify(name: str, email: str, message: str) -> None:
    # TODO: plug in Resend (resend.com free tier — 3000 emails/month)
    # from resend import Resend
    # client = Resend(api_key=settings.RESEND_API_KEY)
    # client.emails.send({...})
    log.info("📧 New contact from %s <%s>: %s", name, email, message[:80])


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(
    form: ContactForm,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    msg = ContactMessage(**form.model_dump())
    db.add(msg)
    background_tasks.add_task(_notify, form.name, form.email, form.message)
    return ContactResponse(success=True, message="Message received! I'll reply soon.")
