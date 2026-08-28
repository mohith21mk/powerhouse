from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.schemas.business import (
    BusinessProfileCreate,
    BusinessProfileUpdate,
    BusinessProfileResponse,
)
from app.services.business_service import BusinessProfileService

router = APIRouter(prefix="/business-profile", tags=["Business Profile"])


@router.post("", response_model=BusinessProfileResponse, status_code=status.HTTP_201_CREATED)
def create_business_profile(
    schema: BusinessProfileCreate,
    db: Session = Depends(get_db),
):
    return BusinessProfileService.create_profile(db, schema)


@router.get("", response_model=List[BusinessProfileResponse])
def list_business_profiles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return BusinessProfileService.list_profiles(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=BusinessProfileResponse)
def get_business_profile(
    id: str,
    db: Session = Depends(get_db),
):
    profile = BusinessProfileService.get_profile(db, id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Business profile with id '{id}' not found",
        )
    return profile


@router.put("/{id}", response_model=BusinessProfileResponse)
def update_business_profile(
    id: str,
    schema: BusinessProfileUpdate,
    db: Session = Depends(get_db),
):
    profile = BusinessProfileService.update_profile(db, id, schema)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Business profile with id '{id}' not found",
        )
    return profile
