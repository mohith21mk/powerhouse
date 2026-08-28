from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
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
):
    return DocumentService.list_documents(
        db,
        business_profile_id=business_profile_id,
        category=category,
        status=status,
        skip=skip,
        limit=limit,
    )


@router.post("", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
def create_document(
    schema: DocumentCreate,
    db: Session = Depends(get_db),
):
    return DocumentService.create_document(db, schema)


@router.get("/{id}", response_model=DocumentResponse)
def get_document(
    id: str,
    db: Session = Depends(get_db),
):
    doc = DocumentService.get_document(db, id)
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with id '{id}' not found",
        )
    return doc


@router.patch("/{id}", response_model=DocumentResponse)
def update_document(
    id: str,
    schema: DocumentUpdate,
    db: Session = Depends(get_db),
):
    doc = DocumentService.update_document(db, id, schema)
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with id '{id}' not found",
        )
    return doc
