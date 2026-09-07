from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status as http_status, Query
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.dependencies.auth import get_optional_user
from app.models.user import User
from app.models.business import BusinessProfile
from app.schemas.document import (
    DocumentCreate,
    DocumentUpdate,
    DocumentResponse,
)
from app.services.document_service import DocumentService

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.get("", response_model=List[DocumentResponse])
def list_documents(
    business_profile_id: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    if business_profile_id and current_user:
        profile = db.query(BusinessProfile).filter(BusinessProfile.id == business_profile_id).first()
        if profile and profile.user_id and profile.user_id != current_user.id:
            raise HTTPException(
                status_code=http_status.HTTP_403_FORBIDDEN,
                detail="Access forbidden: you do not have permission to view documents for this profile.",
            )

    return DocumentService.list_documents(
        db,
        business_profile_id=business_profile_id,
        category=category,
        status=status,
        skip=skip,
        limit=limit,
    )


@router.post("", response_model=DocumentResponse, status_code=http_status.HTTP_201_CREATED)
def create_document(
    schema: DocumentCreate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    if current_user and schema.business_profile_id:
        profile = db.query(BusinessProfile).filter(BusinessProfile.id == schema.business_profile_id).first()
        if profile and profile.user_id and profile.user_id != current_user.id:
            raise HTTPException(
                status_code=http_status.HTTP_403_FORBIDDEN,
                detail="Access forbidden: you do not have permission to upload documents for this profile.",
            )
    return DocumentService.create_document(db, schema)


@router.get("/{id}", response_model=DocumentResponse)
def get_document(
    id: str,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    doc = DocumentService.get_document(db, id)
    if not doc:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail=f"Document with id '{id}' not found",
        )
    if current_user and doc.business_profile and doc.business_profile.user_id:
        if doc.business_profile.user_id != current_user.id:
            raise HTTPException(
                status_code=http_status.HTTP_403_FORBIDDEN,
                detail="Access forbidden: you do not have permission to view this document.",
            )
    return doc


@router.patch("/{id}", response_model=DocumentResponse)
def update_document(
    id: str,
    schema: DocumentUpdate,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    doc = DocumentService.get_document(db, id)
    if not doc:
        raise HTTPException(
            status_code=http_status.HTTP_404_NOT_FOUND,
            detail=f"Document with id '{id}' not found",
        )
    if current_user and doc.business_profile and doc.business_profile.user_id:
        if doc.business_profile.user_id != current_user.id:
            raise HTTPException(
                status_code=http_status.HTTP_403_FORBIDDEN,
                detail="Access forbidden: you do not have permission to modify this document.",
            )
    return DocumentService.update_document(db, id, schema)
