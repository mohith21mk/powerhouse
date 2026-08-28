from datetime import datetime, timezone
from typing import Dict, Any
from app.engine.approval_rules import evaluate_approval_rules
from app.engine.compliance_rules import generate_compliance_tasks
from app.engine.document_rules import generate_document_requirements
from app.engine.scheme_rules import match_government_schemes


def calculate_risk_level(profile: Any) -> str:
    def get_val(key, default=None):
        if isinstance(profile, dict):
            return profile.get(key, default)
        return getattr(profile, key, default)

    points = 0
    env_impact = get_val("environmental_impact", "Moderate")
    employees = get_val("employee_count", 0) or 0
    manufacturing = get_val("manufacturing_activity", True)
    import_acts = get_val("import_activities", False)
    export_acts = get_val("export_activities", False)

    if env_impact == "Critical (Red Category)":
        points += 4
    elif env_impact == "High":
        points += 3
    elif env_impact == "Moderate":
        points += 2
    else:
        points += 1

    if employees >= 100:
        points += 3
    elif employees >= 20:
        points += 2
    elif employees >= 10:
        points += 1

    if manufacturing:
        points += 2
    if import_acts or export_acts:
        points += 1

    if points >= 8:
        return "High"
    elif points >= 5:
        return "Medium"
    return "Low"


def analyze_business_profile(profile: Any) -> Dict[str, Any]:
    def get_val(key, default=None):
        if isinstance(profile, dict):
            return profile.get(key, default)
        return getattr(profile, key, default)

    approvals = evaluate_approval_rules(profile)
    compliance_tasks = generate_compliance_tasks(profile, approvals)
    required_documents = generate_document_requirements(profile, approvals)
    recommended_schemes = match_government_schemes(profile)
    risk_level = calculate_risk_level(profile)

    high_priority_approvals = sum(1 for a in approvals if a.get("priority") == "High")
    completed_approvals = sum(1 for a in approvals if a.get("status") == "Completed")
    in_progress_approvals = sum(1 for a in approvals if a.get("status") == "In Progress")
    pending_approvals = sum(1 for a in approvals if a.get("status") == "Pending")

    upcoming_tasks = sum(1 for t in compliance_tasks if t.get("status") == "Upcoming")

    # Generate Dynamic Insights
    insights = []
    insights.append({
        "id": "insight-approvals",
        "type": "approvals",
        "title": "Statutory Approval Requirements",
        "message": f"Identified {len(approvals)} applicable regulatory approvals, with {high_priority_approvals} classified as High Priority for factory operations.",
        "severity": "info"
    })

    env_impact = get_val("environmental_impact", "Moderate")
    if env_impact in ["Moderate", "High", "Critical (Red Category)"]:
        insights.append({
            "id": "insight-env",
            "type": "environmental",
            "title": "Environmental & Pollution Standing",
            "message": f"Your enterprise is subject to {env_impact} environmental oversight. Maintain stack emission logs and ETP renewal filings on schedule.",
            "severity": "warning"
        })

    employees = get_val("employee_count", 0) or 0
    if employees >= 10:
        insights.append({
            "id": "insight-labour",
            "type": "labour",
            "title": "Workforce & Labour Compliance",
            "message": f"With {employees} employees, statutory ESI medical coverage and mandatory monthly EPFO electronic returns are actively enforced.",
            "severity": "info"
        })

    if recommended_schemes:
        top_scheme = recommended_schemes[0]
        insights.append({
            "id": "insight-schemes",
            "type": "scheme",
            "title": "Government Scheme Opportunity",
            "message": f"{len(recommended_schemes)} schemes match your business profile. Top recommendation: \"{top_scheme.get('short_name')}\" ({top_scheme.get('match_score')}% match) offering {top_scheme.get('benefit')}.",
            "severity": "success"
        })

    insights.append({
        "id": "insight-action",
        "type": "action",
        "title": "Upcoming Critical Deadlines",
        "message": f"You have {upcoming_tasks} compliance tasks due in the upcoming cycle. Review environmental documentation to avoid statutory penalties.",
        "severity": "warning"
    })

    summary = {
        "total_approvals": len(approvals),
        "completed_approvals": completed_approvals,
        "in_progress_approvals": in_progress_approvals,
        "pending_approvals": pending_approvals,
        "high_priority_approvals": high_priority_approvals,
        "total_compliance_tasks": len(compliance_tasks),
        "upcoming_tasks": upcoming_tasks,
        "total_required_documents": len(required_documents),
        "total_recommended_schemes": len(recommended_schemes),
        "compliance_score": 78
    }

    business_summary = {
        "business_name": get_val("business_name"),
        "business_type": get_val("business_type"),
        "industry": get_val("industry"),
        "sector": get_val("sector"),
        "city": get_val("city"),
        "state": get_val("state"),
        "company_size": get_val("company_size"),
        "employee_count": employees,
        "annual_turnover": get_val("annual_turnover"),
        "gstin": get_val("gstin"),
        "udyam_number": get_val("udyam_number"),
        "operating_status": get_val("operating_status")
    }

    return {
        "is_valid": True,
        "analysis_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "business_summary": business_summary,
        "risk_level": risk_level,
        "summary": summary,
        "approvals": approvals,
        "compliance_tasks": compliance_tasks,
        "required_documents": required_documents,
        "recommended_schemes": recommended_schemes,
        "insights": insights,
        "disclaimer": "Recommendations are generated for prototype and planning purposes and should be verified with relevant authorities."
    }
