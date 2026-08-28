from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.schemas.approval import ApprovalResponse, ApprovalUpdate
from app.services.approval_service import ApprovalService

router = APIRouter(prefix="/approvals", tags=["Approvals & Licences"])


@router.get("", response_model=List[ApprovalResponse])
def list_approvals(
    business_profile_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return ApprovalService.list_approvals(
        db,
        business_profile_id=business_profile_id,
        status=status,
        priority=priority,
        category=category,
        skip=skip,
        limit=limit,
    )


@router.get("/{id}", response_model=ApprovalResponse)
def get_approval(
    id: str,
    db: Session = Depends(get_db),
):
    approval = ApprovalService.get_approval(db, id)
    if not approval:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Approval with id '{id}' not found",
        )
    return approval


@router.patch("/{id}", response_model=ApprovalResponse)
def update_approval(
    id: str,
    schema: ApprovalUpdate,
    db: Session = Depends(get_db),
):
    approval = ApprovalService.update_approval(db, id, schema)
    if not approval:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Approval with id '{id}' not found",
        )
    return approval
