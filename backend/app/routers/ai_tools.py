import uuid
from fastapi import APIRouter, HTTPException
from app.schemas.schemas import ChatRequest, ChatResponse, AnalyzeRequest, AnalyzeResponse
from app.core.config import settings

router = APIRouter()


def _has_openai() -> bool:
    return bool(settings.OPENAI_API_KEY)


@router.post("/ai/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    Chat endpoint. Works in demo mode with no API key.
    Set OPENAI_API_KEY in .env for real responses.
    """
    if _has_openai():
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        resp = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are the AI assistant on buildwithvickyvs.ai, Vicky's personal dev lab."},
                {"role": "user", "content": req.message},
            ],
        )
        reply = resp.choices[0].message.content or ""
    else:
        reply = (
            f"👋 Hi! I'm Vicky's AI assistant (demo mode). "
            f"You said: \"{req.message}\". "
            f"Add OPENAI_API_KEY to backend/.env to enable real AI."
        )

    return ChatResponse(
        reply=reply,
        conversation_id=req.conversation_id or str(uuid.uuid4()),
    )


@router.post("/ai/analyze", response_model=AnalyzeResponse)
async def analyze(req: AnalyzeRequest):
    """Summarize, classify, or explain a piece of text."""
    prompts = {
        "summarize": f"Summarize concisely:\n\n{req.text}",
        "classify":  f"Classify the topic and sentiment in one line:\n\n{req.text}",
        "explain":   f"Explain this to a beginner:\n\n{req.text}",
    }
    prompt = prompts.get(req.task)
    if not prompt:
        raise HTTPException(status_code=400, detail="task must be: summarize | classify | explain")

    if _has_openai():
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        resp = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )
        result = resp.choices[0].message.content or ""
        tokens = resp.usage.total_tokens if resp.usage else 0
    else:
        result = f"[Demo] Would {req.task} your {len(req.text.split())} word text. Add OPENAI_API_KEY to activate."
        tokens = 0

    return AnalyzeResponse(result=result, task=req.task, tokens_used=tokens)


@router.post("/ai/sql-helper")
async def sql_helper(query: str):
    return {"status": "coming_soon"}


@router.post("/ai/code-explain")
async def code_explain(code: str, language: str = "python"):
    return {"status": "coming_soon"}
