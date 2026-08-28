from typing import List, Dict, Any


def evaluate_approval_rules(profile: Any) -> List[Dict[str, Any]]:
    matched_approvals = []

    # Helper getters supporting dict or ORM/Pydantic models
    def get_val(key, default=None):
        if isinstance(profile, dict):
            return profile.get(key, default)
        return getattr(profile, key, default)

    industry = get_val("industry", "")
    sector = get_val("sector", "") or ""
    manufacturing = get_val("manufacturing_activity", True)
    env_impact = get_val("environmental_impact", "Moderate")
    company_size = get_val("company_size", "")
    employees = get_val("employee_count", 0) or 0
    has_gst = get_val("has_gst", True)
    gstin = get_val("gstin", "")
    msme_registered = get_val("has_msme_registration", True) or get_val("has_udyam_registration", True) or bool(get_val("udyam_number"))
    import_acts = get_val("import_activities", False)
    export_acts = get_val("export_activities", False)

    is_manufacturing = (
        industry.lower() == "manufacturing"
        or manufacturing is True
        or "equipment" in sector.lower()
        or "machinery" in sector.lower()
    )

    # 1. Factory License
    if is_manufacturing:
        matched_approvals.append({
            "name": "Factory License",
            "authority": "Directorate of Industries",
            "category": "Business Registration",
            "priority": "High",
            "status": "Completed",
            "progress_percentage": 100,
            "description": "Mandatory license under Factories Act 1948 for industrial production premises and worker safety compliance.",
            "trigger_reason": "Triggered because primary business operation involves Manufacturing activity.",
            "due_date": "Active • Annual Renewal 31 Dec",
            "required_documents_count": 5,
            "steps": [
                {"name": "Site Blueprint Approval", "status": "Completed"},
                {"name": "Safety Equipment Audit", "status": "Completed"},
                {"name": "License Grant & Endorsement", "status": "Completed"}
            ]
        })

    # 2. Pollution Control NOC (CTO)
    is_mod_high_env = env_impact in ["Moderate", "High", "Critical (Red Category)"]
    if is_manufacturing and is_mod_high_env:
        matched_approvals.append({
            "name": "Pollution Control NOC (CTO)",
            "authority": "State Pollution Control Board",
            "category": "Environmental",
            "priority": "High",
            "status": "In Progress",
            "progress_percentage": 65,
            "description": "Consent to Operate (CTO) under Air & Water (Prevention & Control of Pollution) Acts for industrial emissions.",
            "trigger_reason": f"Triggered due to {env_impact} environmental impact classification in Manufacturing sector.",
            "due_date": "Action Required (Renewal in 5 days)",
            "required_documents_count": 6,
            "steps": [
                {"name": "Effluent Treatment Design Submission", "status": "Completed"},
                {"name": "Stack Emission Sampling", "status": "In Progress"},
                {"name": "Pollution Board Committee Review", "status": "Pending"}
            ]
        })

    # 3. Fire Safety Certificate
    if is_manufacturing or "Micro" not in company_size:
        matched_approvals.append({
            "name": "Fire Safety Certificate",
            "authority": "State Fire & Emergency Services",
            "category": "Safety",
            "priority": "High",
            "status": "In Progress",
            "progress_percentage": 50,
            "description": "Fire hazard prevention inspection and hydrant readiness clearance for factory & industrial warehouses.",
            "trigger_reason": "Triggered for active industrial manufacturing premises with heavy machinery.",
            "due_date": "Audit Scheduled in 4 days",
            "required_documents_count": 4,
            "steps": [
                {"name": "Sprinkler & Extinguisher Testing", "status": "Completed"},
                {"name": "Emergency Evacuation Route Audit", "status": "In Progress"},
                {"name": "Final Fire NOC Issue", "status": "Pending"}
            ]
        })

    # 4. Electricity Connection Approval (HT/LT)
    if is_manufacturing:
        matched_approvals.append({
            "name": "Electricity Connection Approval (HT)",
            "authority": "State Electricity Distribution Board",
            "category": "Utilities",
            "priority": "Medium",
            "status": "Pending",
            "progress_percentage": 20,
            "description": "High-tension industrial power feeder sanction (500 kVA load) with dedicated transformer verification.",
            "trigger_reason": "Triggered by industrial power sanction requirement for manufacturing machinery.",
            "due_date": "Target: 15 Jun 2026",
            "required_documents_count": 4,
            "steps": [
                {"name": "Load Feasibility Survey", "status": "Completed"},
                {"name": "Substation Transformer Approval", "status": "Pending"},
                {"name": "Meter Commissioning", "status": "Pending"}
            ]
        })

    # 5. Labour Establishment Registration
    if employees >= 10:
        matched_approvals.append({
            "name": "Labour Establishment Registration",
            "authority": "Labour Commissionerate",
            "category": "Labour",
            "priority": "High",
            "status": "Pending",
            "progress_percentage": 15,
            "description": "Statutory registration under State Shops & Commercial Establishments / Contract Labour Acts.",
            "trigger_reason": f"Triggered because employee headcount ({employees} staff) meets statutory labour threshold (>= 10).",
            "due_date": "Due in 20 days",
            "required_documents_count": 4,
            "steps": [
                {"name": "Muster Roll & Wage Register Submission", "status": "In Progress"},
                {"name": "Labour Inspector Verification", "status": "Pending"},
                {"name": "Registration Certificate Grant", "status": "Pending"}
            ]
        })

    # 6. Employees ESI Registration
    if employees >= 10:
        matched_approvals.append({
            "name": "Employees ESI Registration",
            "authority": "Employees State Insurance Corporation (ESIC)",
            "category": "Labour Compliance",
            "priority": "High",
            "status": "Completed",
            "progress_percentage": 100,
            "description": "Social security and medical benefit coverage under Employee State Insurance Act 1948.",
            "trigger_reason": f"Triggered by statutory threshold for workforce of {employees} employees (>= 10).",
            "due_date": "Active / Compliant",
            "required_documents_count": 3,
            "steps": [
                {"name": "Employer Registration", "status": "Completed"},
                {"name": "Employee Pehchan Cards Issue", "status": "Completed"}
            ]
        })

    # 7. PF Registration
    if employees >= 20:
        matched_approvals.append({
            "name": "Employees PF Registration",
            "authority": "Employees Provident Fund Organisation (EPFO)",
            "category": "Labour Compliance",
            "priority": "High",
            "status": "Completed",
            "progress_percentage": 100,
            "description": "Retirement benefit and pension statutory fund management under EPF & MP Act 1952.",
            "trigger_reason": f"Triggered because workforce count of {employees} exceeds mandatory EPF threshold (>= 20).",
            "due_date": "Active / Monthly ECR Filing",
            "required_documents_count": 3,
            "steps": [
                {"name": "EPFO Portal LIN Allotment", "status": "Completed"},
                {"name": "Monthly DSC Setup", "status": "Completed"}
            ]
        })

    # 8. GST Compliance
    if has_gst or gstin:
        matched_approvals.append({
            "name": "GST Registration & Compliance",
            "authority": "State & Central GST Department",
            "category": "Taxation",
            "priority": "High",
            "status": "Completed",
            "progress_percentage": 100,
            "description": "Goods and Services Tax interstate and domestic business tax registration & return gateway.",
            "trigger_reason": f"Triggered by active GSTIN ({gstin or 'Registered'}) and annual turnover.",
            "due_date": "Active / Monthly GSTR-3B Compliant",
            "required_documents_count": 3,
            "steps": [
                {"name": "PAN & Jurisdiction Validation", "status": "Completed"},
                {"name": "Premises Verification", "status": "Completed"},
                {"name": "REG-06 Certificate Issue", "status": "Completed"}
            ]
        })

    # 9. MSME Udyam Registration
    if msme_registered:
        matched_approvals.append({
            "name": "MSME Udyam Registration",
            "authority": "Ministry of Micro, Small & Medium Enterprises",
            "category": "Business Compliance",
            "priority": "Medium",
            "status": "Completed",
            "progress_percentage": 100,
            "description": "Official Ministry of MSME registration certificate enabling priority sector lending and subsidies.",
            "trigger_reason": "Triggered by active Udyam registration.",
            "due_date": "Active / Perpetual",
            "required_documents_count": 2,
            "steps": [
                {"name": "Aadhaar & PAN Verification", "status": "Completed"},
                {"name": "Udyam Certificate Grant", "status": "Completed"}
            ]
        })

    # 10. Import Export Code (IEC)
    if import_acts or export_acts:
        matched_approvals.append({
            "name": "Import Export Code (IEC)",
            "authority": "Directorate General of Foreign Trade (DGFT)",
            "category": "Trade",
            "priority": "Medium",
            "status": "Completed",
            "progress_percentage": 100,
            "description": "Directorate General of Foreign Trade authorization for international cross-border cargo clearance.",
            "trigger_reason": "Triggered by active import/export industrial machinery procurement operations.",
            "due_date": "Active / Perpetual",
            "required_documents_count": 2,
            "steps": [
                {"name": "DGFT Portal Electronic Submission", "status": "Completed"},
                {"name": "IEC Allotment Letter Grant", "status": "Completed"}
            ]
        })

    return matched_approvals
