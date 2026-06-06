from fastapi import APIRouter

from app.api.v1.endpoints import auth, certs, health, progress, question_types, taxonomy, users

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(progress.router)
api_router.include_router(certs.router)
api_router.include_router(taxonomy.router)
api_router.include_router(question_types.router)
