from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentUpdate


class DocumentService:
    @staticmethod
    def list_documents(
        db: Session,
        business_profile_id: Optional[str] = None,
        category: Optional[str] = None,
        status: Optional[str] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> List[Document]:
        query = db.query(Document)
        if business_profile_id:
            query = query.filter(Document.business_profile_id == business_profile_id)
        if category:
            query = query.filter(Document.category == category)
        if status:
            query = query.filter(Document.status == status)
        return query.offset(skip).limit(limit).all()

    @staticmethod
    def get_document(db: Session, doc_id: str) -> Optional[Document]:
        return db.query(Document).filter(Document.id == doc_id).first()

    @staticmethod
    def create_document(db: Session, schema: DocumentCreate) -> Document:
        doc = Document(**schema.model_dump())
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc

    @staticmethod
    def update_document(db: Session, doc_id: str, schema: DocumentUpdate) -> Optional[Document]:
        doc = db.query(Document).filter(Document.id == doc_id).first()
        if not doc:
            return None
        for key, value in schema.model_dump(exclude_unset=True).items():
            setattr(doc, key, value)
        db.commit()
        db.refresh(doc)
        return doc
