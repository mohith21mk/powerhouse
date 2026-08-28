from typing import List, Dict, Any


def generate_document_requirements(profile: Any, approvals: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    approval_names = {a["name"] for a in approvals}
    docs = []

    # 1. Factory License Documents
    if "Factory License" in approval_names:
        docs.append({
            "name": "Factory Licence Certificate",
            "category": "Statutory License",
            "file_type": "PDF",
            "file_size": "2.4 MB",
            "status": "Verified",
            "required": True,
            "upload_date": "14 Apr 2024",
            "expiry_date": "31 Dec 2026",
            "renewal_cycle": "Annual"
        })
        docs.append({
            "name": "Approved Factory Machinery Layout Plan",
            "category": "Statutory License",
            "file_type": "PDF",
            "file_size": "5.1 MB",
            "status": "Verified",
            "required": True,
            "upload_date": "10 Feb 2024",
            "expiry_date": "Perpetual",
            "renewal_cycle": "Perpetual"
        })

    # 2. GST Documents
    if "GST Registration & Compliance" in approval_names:
        docs.append({
            "name": "GST Registration Certificate (REG-06)",
            "category": "Taxation",
            "file_type": "PDF",
            "file_size": "1.1 MB",
            "status": "Verified",
            "required": True,
            "upload_date": "10 Jan 2024",
            "expiry_date": "Perpetual",
            "renewal_cycle": "Perpetual"
        })

    # 3. Pollution Documents
    if "Pollution Control NOC (CTO)" in approval_names:
        docs.append({
            "name": "Consent to Operate (CTO) Renewal Application",
            "category": "Environmental",
            "file_type": "PDF",
            "file_size": "4.8 MB",
            "status": "Pending",
            "required": True,
            "upload_date": "02 May 2024",
            "expiry_date": "Under Review",
            "renewal_cycle": "5 Years"
        })
        docs.append({
            "name": "Environmental Impact Assessment & Hazard Plan",
            "category": "Environmental",
            "file_type": "PDF",
            "file_size": "—",
            "status": "Required",
            "required": True,
            "upload_date": None,
            "expiry_date": "Required for Audit",
            "renewal_cycle": "Annual"
        })

    # 4. Fire Safety Documents
    if "Fire Safety Certificate" in approval_names:
        docs.append({
            "name": "Fire Safety Hydrant & Sprinkler Audit Report",
            "category": "Safety",
            "file_type": "PDF",
            "file_size": "3.2 MB",
            "status": "Pending",
            "required": True,
            "upload_date": "15 May 2024",
            "expiry_date": "15 May 2025",
            "renewal_cycle": "Annual"
        })

    # 5. Labour Documents
    if "Employees ESI Registration" in approval_names or "Labour Establishment Registration" in approval_names:
        docs.append({
            "name": "Employee Master Roster & Form 1 Register",
            "category": "Labor & HR",
            "file_type": "XLSX",
            "file_size": "850 KB",
            "status": "Verified",
            "required": True,
            "upload_date": "12 May 2024",
            "expiry_date": "31 Mar 2025",
            "renewal_cycle": "Annual"
        })

    # 6. MSME Documents
    if "MSME Udyam Registration" in approval_names:
        docs.append({
            "name": "Udyam MSME Registration Certificate",
            "category": "Business Registration",
            "file_type": "PDF",
            "file_size": "720 KB",
            "status": "Verified",
            "required": True,
            "upload_date": "15 Mar 2024",
            "expiry_date": "Perpetual",
            "renewal_cycle": "Perpetual"
        })

    return docs
