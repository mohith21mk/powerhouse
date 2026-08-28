from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.dependencies.database import get_db
from app.schemas.compliance_task import (
    ComplianceTaskCreate,
    ComplianceTaskUpdate,
    ComplianceTaskResponse,
)
from app.services.task_service import ComplianceTaskService

router = APIRouter(prefix="/tasks", tags=["Compliance Tasks"])


@router.get("", response_model=List[ComplianceTaskResponse])
def list_tasks(
    business_profile_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    return ComplianceTaskService.list_tasks(
        db,
        business_profile_id=business_profile_id,
        status=status,
        priority=priority,
        skip=skip,
        limit=limit,
    )


@router.post("", response_model=ComplianceTaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    schema: ComplianceTaskCreate,
    db: Session = Depends(get_db),
):
    return ComplianceTaskService.create_task(db, schema)


@router.get("/{id}", response_model=ComplianceTaskResponse)
def get_task(
    id: str,
    db: Session = Depends(get_db),
):
    task = ComplianceTaskService.get_task(db, id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id '{id}' not found",
        )
    return task


@router.patch("/{id}", response_model=ComplianceTaskResponse)
def update_task(
    id: str,
    schema: ComplianceTaskUpdate,
    db: Session = Depends(get_db),
):
    task = ComplianceTaskService.update_task(db, id, schema)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id '{id}' not found",
        )
    return task


@router.patch("/{id}/complete", response_model=ComplianceTaskResponse)
def complete_task(
    id: str,
    db: Session = Depends(get_db),
):
    task = ComplianceTaskService.complete_task(db, id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id '{id}' not found",
        )
    return task
