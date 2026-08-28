from typing import List, Dict, Any


def generate_compliance_tasks(profile: Any, approvals: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    approval_names = {a["name"] for a in approvals}
    tasks = []

    # 1. Factory License Tasks
    if "Factory License" in approval_names:
        tasks.append({
            "title": "Annual Factory Compliance Report",
            "description": "Consolidated submission of annual production hours, worker safety logs, and machine maintenance records.",
            "category": "Statutory Filing",
            "priority": "High",
            "status": "Upcoming",
            "due_date": "Due in 7 days",
            "estimated_days": 7,
            "assignee": "Arjun Mehta (Compliance Officer)"
        })
        tasks.append({
            "title": "Machinery Guarding & Safety Audit",
            "description": "Onsite inspection of mechanical interlocks, emergency stop switches, and worker PPE compliance.",
            "category": "Safety",
            "priority": "Medium",
            "status": "Upcoming",
            "due_date": "Due in 18 days",
            "estimated_days": 18,
            "assignee": "Capt. R. Sharma (Safety Officer)"
        })

    # 2. Pollution NOC Tasks
    if "Pollution Control NOC (CTO)" in approval_names:
        tasks.append({
            "title": "Hazardous Waste Management Compliance",
            "description": "Hazardous solid waste manifest verification and electronic transfer log to authorized recycler.",
            "category": "Environmental",
            "priority": "High",
            "status": "Upcoming",
            "due_date": "Due in 12 days",
            "estimated_days": 12,
            "assignee": "Dr. Sunita Rao (EHS Manager)"
        })
        tasks.append({
            "title": "Quarterly Stack Emission & Flue Gas Analysis",
            "description": "Ambient air quality index sampling and chimney emissions laboratory testing report.",
            "category": "Environmental",
            "priority": "High",
            "status": "Upcoming",
            "due_date": "Due in 30 days",
            "estimated_days": 30,
            "assignee": "Dr. Sunita Rao (EHS Manager)"
        })

    # 3. Fire Safety Tasks
    if "Fire Safety Certificate" in approval_names:
        tasks.append({
            "title": "Fire Safety Inspection & Hydrant Pressure Test",
            "description": "Pressure testing of automatic water sprinklers in Shop Floor 2 and extinguisher replenishment.",
            "category": "Safety",
            "priority": "High",
            "status": "In Progress",
            "due_date": "Scheduled in 4 days",
            "estimated_days": 4,
            "assignee": "Capt. R. Sharma (Safety Officer)"
        })

    # 4. Electricity Tasks
    if "Electricity Connection Approval (HT)" in approval_names:
        tasks.append({
            "title": "Transformer Inspection Checklist",
            "description": "Earthing resistance measurement and dielectric oil strength testing for 500 kVA substation transformer.",
            "category": "Utilities",
            "priority": "Medium",
            "status": "Upcoming",
            "due_date": "Due in 22 days",
            "estimated_days": 22,
            "assignee": "K. S. Verma (Chief Engineer)"
        })

    # 5. Labour / ESI Tasks
    if "Employees ESI Registration" in approval_names:
        tasks.append({
            "title": "Employees ESI Pehchan Card Distribution",
            "description": "Generation and biometric distribution of insurance smart cards for newly onboarded staff.",
            "category": "HR & Benefits",
            "priority": "Medium",
            "status": "Completed",
            "due_date": "Completed on schedule",
            "estimated_days": 0,
            "assignee": "Rahul Varma (HR Lead)"
        })

    # 6. PF Tasks
    if "Employees PF Registration" in approval_names:
        tasks.append({
            "title": "Monthly PF Electronic Challan Return (ECR)",
            "description": "Monthly electronic challan upload and payment for employee provident fund contribution.",
            "category": "Statutory Filing",
            "priority": "Medium",
            "status": "Upcoming",
            "due_date": "Due in 25 days",
            "estimated_days": 25,
            "assignee": "Kavita Nair (Finance Officer)"
        })

    # 7. GST Tasks
    if "GST Registration & Compliance" in approval_names:
        tasks.append({
            "title": "Monthly GSTR-3B Return Filing",
            "description": "Summary return of outward supplies, input tax credit claimed, and tax liability settlement.",
            "category": "Taxation",
            "priority": "High",
            "status": "Upcoming",
            "due_date": "Due in 15 days",
            "estimated_days": 15,
            "assignee": "Kavita Nair (Finance Officer)"
        })

    return tasks
