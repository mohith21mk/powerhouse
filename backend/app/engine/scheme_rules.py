from typing import List, Dict, Any


def match_government_schemes(profile: Any) -> List[Dict[str, Any]]:
    def get_val(key, default=None):
        if isinstance(profile, dict):
            return profile.get(key, default)
        return getattr(profile, key, default)

    industry = get_val("industry", "")
    state = get_val("state", "")
    city = get_val("city", "")
    company_size = get_val("company_size", "") or ""
    manufacturing = get_val("manufacturing_activity", True)
    env_impact = get_val("environmental_impact", "Moderate")
    op_status = get_val("operating_status", "Active")
    is_msme = get_val("has_msme_registration", True) or get_val("has_udyam_registration", True) or bool(get_val("udyam_number"))
    has_trade = get_val("import_activities", False) or get_val("export_activities", False)
    employees = get_val("employee_count", 0) or 0

    is_mfg = industry.lower() == "manufacturing" or manufacturing is True
    is_medium_or_small = "medium" in company_size.lower() or "small" in company_size.lower() or "micro" in company_size.lower()
    is_maharashtra = "maharashtra" in state.lower() or "mumbai" in city.lower()

    matched_schemes = []

    # 1. PMEGP Scheme
    if is_msme and is_mfg:
        score = 30  # Udyam verified
        reasons = ["Verified active Udyam MSME Enterprise (+30%)"]
        if is_mfg:
            score += 25
            reasons.append("Industrial Manufacturing operations (+25%)")
        if is_medium_or_small:
            score += 20
            reasons.append("Eligible enterprise scale (+20%)")
        if op_status == "Active":
            score += 17
            reasons.append("Operational commercial standing (+17%)")

        matched_schemes.append({
            "name": "Prime Minister Employment Generation Programme (PMEGP)",
            "short_name": "PMEGP Scheme",
            "description": "Credit-linked subsidy programme for establishing, expanding, and modernizing industrial manufacturing units.",
            "benefit": "Up to 35% Capital Subsidy",
            "category": "Central Government Subsidy",
            "match_score": min(score, 98),
            "match_reason": reasons,
            "eligibility_status": "Eligible",
            "official_source": "Ministry of MSME, Govt of India (kviconline.gov.in)",
            "deadline": "Open year-round (Quarterly tranches)"
        })

    # 2. Industrial Development Incentive (State Capital Subsidy)
    if is_maharashtra and is_mfg:
        score = 35  # Maharashtra Industrial Zone
        reasons = ["Enterprise operating in Maharashtra Industrial Zone (+35%)"]
        if is_mfg:
            score += 25
            reasons.append("Capital manufacturing asset creation (+25%)")
        if is_medium_or_small:
            score += 20
            reasons.append("Medium Enterprise bracket eligibility (+20%)")
        score += 8
        reasons.append("Clean GST tax filing history (+8%)")

        matched_schemes.append({
            "name": "Industrial Development Incentive (Package Scheme of Incentives)",
            "short_name": "Industrial Development Incentive",
            "description": "Direct state capital investment support, electricity duty exemption, and stamp duty refund.",
            "benefit": "Up to 20% Capital Incentive",
            "category": "State Industry Policy",
            "match_score": min(score, 98),
            "match_reason": reasons,
            "eligibility_status": "Eligible",
            "official_source": "Directorate of Industries, Maharashtra",
            "deadline": "31 October 2026"
        })

    # 3. MSME Technology Upgradation (CLCSS & ZED)
    if is_msme:
        score = 30  # Manufacturing precision
        reasons = ["Manufacturing precision machinery focus (+30%)"]
        if is_msme:
            score += 25
            reasons.append("Udyam registration verified (+25%)")
        if env_impact in ["Moderate", "High"]:
            score += 20
            reasons.append("Green technology & ETP modernization eligible (+20%)")
        score += 7
        reasons.append("Workforce scale (> 50 employees) qualified (+7%)")

        matched_schemes.append({
            "name": "MSME Technology Upgradation Scheme (CLCSS & ZED Certification)",
            "short_name": "MSME Technology Upgradation",
            "description": "Financial assistance and upfront capital subsidy for inducting well-established clean technologies.",
            "benefit": "15% Upfront Capital Subsidy",
            "category": "Technology & Modernization",
            "match_score": min(score, 98),
            "match_reason": reasons,
            "eligibility_status": "Eligible",
            "official_source": "Development Commissioner, MSME",
            "deadline": "Rolling applications"
        })

    # 4. EPCG Scheme
    if has_trade or is_mfg:
        score = 40 if has_trade else 20
        reasons = ["Active import/export machinery procurement (+40%)" if has_trade else "Capital goods domestic manufacturing (+20%)"]
        if is_mfg and has_trade:
            score += 20
            reasons.append("Capital goods domestic manufacturing (+20%)")
        score += 16
        reasons.append("Customs port clearance eligible (+16%)")

        matched_schemes.append({
            "name": "Export Promotion Capital Goods (EPCG) Scheme",
            "short_name": "Export Promotion Scheme",
            "description": "Customs duty exemption on import of capital goods for producing quality goods and export capability.",
            "benefit": "Zero Duty on Machinery Import",
            "category": "Foreign Trade Policy",
            "match_score": min(score, 98),
            "match_reason": reasons,
            "eligibility_status": "Eligible",
            "official_source": "Directorate General of Foreign Trade (DGFT)",
            "deadline": "Perpetual under Foreign Trade Policy"
        })

    matched_schemes.sort(key=lambda x: x["match_score"], reverse=True)
    return matched_schemes
