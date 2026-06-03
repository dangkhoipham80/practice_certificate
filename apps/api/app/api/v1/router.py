from fastapi import APIRouter

from app.api.v1.endpoints import certs, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(certs.router)
