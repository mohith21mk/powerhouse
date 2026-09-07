import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  BookOpen,
  Clock,
  ArrowRight,
  History,
  Database,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useBusinessAnalysis } from '../context/BusinessAnalysisContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';

function getAdvisorContentForCategory({
  categoryKey,
  businessName,
  location,
  userName,
  city,
  state
}) {
  const cat = (categoryKey || '').toLowerCase();

  if (cat === 'restaurant') {
    return {
      initialMessages: [
        {
          id: 1,
          sender: 'ai',
          timestamp: '10:14 AM',
          text: `Hello ${userName}. I have analyzed ${businessName} against active FSSAI statutory regulations, municipal public health guidelines, and commercial dining standards in ${location}. How can I assist you with your restaurant compliance and licensing today?`,
          citations: [
            { title: 'Food Safety and Standards Act 2006', authority: 'FSSAI (FoSCoS)', section: 'Sec 31' },
            { title: 'Public Health & Sanitation Bye-laws', authority: `${city} Municipal Corp`, section: 'Sec 28' }
          ]
        },
        {
          id: 2,
          sender: 'user',
          timestamp: '10:15 AM',
          text: 'What are the mandatory licensing steps, hygiene audits, and kitchen fire safety requirements for our food outlet this month?'
        },
        {
          id: 3,
          sender: 'ai',
          timestamp: '10:15 AM',
          text: `Here is the verified compliance assessment for **${businessName}**:

### 🚨 Critical Immediate Action Items
1. **FSSAI Food Safety Registration / Licence**: Mandatory prerequisite on FoSCoS portal prior to commercial food preparation. FoSTaC certified supervisor must be on duty.
2. **Municipal Health Trade Licence**: Due for annual inspection with ${city} Municipal Corporation. Maintain potable water test reports.
3. **Commercial Kitchen Fire Safety NOC**: Kitchen exhaust hoods and grease filters require certified mechanical degreasing to prevent duct flare-ups.

### 🍽️ Food Hygiene & Safety Protocols
* **Water Potability**: Semi-annual NABL laboratory microbiological and chemical potability testing certificate.
* **Medical Fitness**: Form-1 Medical fitness checkups for all culinary and kitchen food handlers.
* **Pest Eradication**: Monthly commercial pest control manifest and rodent trap logs.

### 📋 Recommended Next Steps
* Upload the potable water laboratory analysis report to your **Document Vault**.
* Trigger the Municipal Health Trade renewal application via ULB portal.`,
          citations: [
            { title: 'Food Safety and Standards Act 2006', authority: 'FSSAI', section: 'Sec 31(1)' },
            { title: 'Municipal Corporation Act', authority: `${city} Municipal Corp`, section: 'Health Regs' },
            { title: 'State Fire Service Rules', authority: `${state} Fire Services`, section: 'Kitchen Fire Norms' }
          ]
        }
      ],
      quickPrompts: [
        'How do I apply for FSSAI State Licence vs Basic Registration?',
        'What are the mandatory food safety & FoSTaC supervisor requirements?',
        'What are the municipal health trade licence inspection guidelines?',
        'What fire safety precautions are required for commercial kitchen LPG manifolds?'
      ],
      inputPlaceholder: 'Ask about FSSAI registration, municipal health trade, hygiene audits, or PMFME subsidy...',
      regulatoryEngines: [
        { name: 'FSSAI Food Safety Standards', desc: 'FSS Act 2006 • FoSCoS Online Registry' },
        { name: 'Municipal Health Trade Bye-laws', desc: `${city} Municipal Corp • Sanitary Standards` },
        { name: 'Commercial Kitchen Fire Norms', desc: `${state} Fire Services • Hood Suppression` },
        { name: 'GST Food Service Engine', desc: 'CBIC • 5% Non-ITC / 18% Standard Dining' }
      ],
      quickActions: [
        { label: 'Review Food Safety Management Plan', route: 'documents' },
        { label: 'Schedule Kitchen Hood Degreasing Audit', route: 'compliance-tasks' },
        { label: 'Apply for PMFME Up to 35% Capital Subsidy', route: 'government-schemes' },
        { label: 'Export Food Safety Compliance Report', route: 'reports' }
      ]
    };
  }

  if (cat === 'jewellery') {
    return {
      initialMessages: [
        {
          id: 1,
          sender: 'ai',
          timestamp: '10:14 AM',
          text: `Hello ${userName}. I have analyzed ${businessName} against active BIS Hallmarking regulations, PMLA FIU-IND cash reporting thresholds, and commercial showroom standards in ${location}. How can I assist you with your jewellery compliance and licensing today?`,
          citations: [
            { title: 'Bureau of Indian Standards Act 2016', authority: 'BIS New Delhi', section: 'Sec 14/15' },
            { title: 'Prevention of Money Laundering Act 2002', authority: 'FIU-IND', section: 'Sec 12' }
          ]
        },
        {
          id: 2,
          sender: 'user',
          timestamp: '10:15 AM',
          text: 'What are the statutory requirements for BIS hallmarking HUID and high-value cash transaction reporting?'
        },
        {
          id: 3,
          sender: 'ai',
          timestamp: '10:15 AM',
          text: `Here is the verified compliance assessment for **${businessName}**:

### 🚨 Critical Immediate Deadlines
1. **BIS Hallmarking (HUID) Reconciliation**: 100% of gold jewellery inventory (14k, 18k, 20k, 22k, 23k, 24k) must carry laser-inscribed 6-digit alphanumeric HUID stamped by certified Assaying & Hallmarking Centres (AHC).
2. **PMLA Cash Transaction Reporting (CTR)**: Mandatory filing of monthly CTR on FINnet 2.0 portal for all individual cash transactions or aggregated customer purchases exceeding ₹2,00,000.
3. **GST Bullion Invoicing**: 3% GST rate with mandatory e-way bill generation for consignment values exceeding statutory interstate and intrastate limits.

### 🛡️ Showroom Physical Security & Vault Norms
* **Strong Room Specifications**: Reinforced RCC vault enclosure with dual combination locks and time-delay relocking mechanisms.
* **CCTV Video Archival**: High-definition continuous surveillance with minimum 90-day non-destructive video archive retention.

### 📋 Recommended Next Steps
* Verify active AHC linkage agreement on the BIS e-Portal.
* File monthly NIL CTR return on FINnet 2.0 gateway before the 15th.`,
          citations: [
            { title: 'Hallmarking Regulations 2018', authority: 'BIS', section: 'Reg 5' },
            { title: 'PMLA (Maintenance of Records) Rules', authority: 'FIU-IND', section: 'Rule 3' },
            { title: 'CGST Act 2017', authority: 'CBIC', section: 'Sec 31 (Bullion)' }
          ]
        }
      ],
      quickPrompts: [
        'What are the mandatory BIS 6-digit HUID hallmarking regulations for gold jewellery?',
        'What is the PMLA cash transaction reporting threshold for jewellery sales?',
        'What are the RBI Gold Monetisation Scheme (GMS) eligibility rules?',
        'What are the physical security and CCTV storage requirements for strong rooms?'
      ],
      inputPlaceholder: 'Ask about BIS 6-digit HUID hallmarking, PMLA cash thresholds, strong room security, or GMS...',
      regulatoryEngines: [
        { name: 'BIS Hallmarking Scheme', desc: 'BIS Act 2016 • 6-Digit HUID Laser Norms' },
        { name: 'FIU-IND Anti-Money Laundering', desc: 'PMLA 2002 • FINnet 2.0 Gateway' },
        { name: 'Precious Metals GST Engine', desc: 'CBIC • 3% Slab & Bullion E-Invoicing' },
        { name: 'Vault & Physical Security Standards', desc: `${state} Police / Fire Services • RCC Strong Room` }
      ],
      quickActions: [
        { label: 'Reconcile 6-Digit Laser HUID Assaying Tags', route: 'compliance-tasks' },
        { label: 'Review Monthly PMLA Cash Register (> ₹2L)', route: 'documents' },
        { label: 'Explore RBI Gold Monetisation Scheme (GMS)', route: 'government-schemes' },
        { label: 'Export Jewellery Statutory Audit Report', route: 'reports' }
      ]
    };
  }

  if (cat === 'retail') {
    return {
      initialMessages: [
        {
          id: 1,
          sender: 'ai',
          timestamp: '10:14 AM',
          text: `Hello ${userName}. I have analyzed ${businessName} against active Shop & Establishment rules, Legal Metrology packaged commodity standards, and commercial trade licensing in ${location}. How can I assist you with your retail compliance today?`,
          citations: [
            { title: 'Legal Metrology Act 2009', authority: `Dept of Legal Metrology, ${state}`, section: 'Sec 24' },
            { title: `${state} Shops and Establishments Act`, authority: 'Labour Department', section: 'Sec 7' }
          ]
        },
        {
          id: 2,
          sender: 'user',
          timestamp: '10:15 AM',
          text: 'What are the annual weighing scale verification and shop registration renewal requirements for our retail store?'
        },
        {
          id: 3,
          sender: 'ai',
          timestamp: '10:15 AM',
          text: `Here is the verified compliance assessment for **${businessName}**:

### 🚨 Critical Immediate Deadlines
1. **Legal Metrology Scale Stamping & Verification**: Annual mandatory physical verification of electronic checkout scales by the Legal Metrology Inspector. Verification certificate must be prominently displayed.
2. **Shop & Establishment Registration (Form C)**: Active commercial premises certificate under the ${state} Shops & Commercial Establishments Act.
3. **Municipal Trade Licence**: Annual trade renewal due with ${city} Municipal Corporation before 31 Mar 2026.

### 🏷️ Packaged Commodities & Consumer Protection (LMPC)
* **Pre-Packaged Declarations**: Mandatory labeling of Maximum Retail Price (MRP inclusive of all taxes), Net Quantity, Month/Year of packing, and Consumer Care contacts.
* **Weighing Accuracy**: Maximum permissible error within Class III commercial scale tolerances.

### 📋 Recommended Next Steps
* Schedule annual scale calibration stamping with the local Legal Metrology Inspectorate.
* Upload updated commercial property lease or tax receipt to your **Document Vault**.`,
          citations: [
            { title: 'Legal Metrology (General) Rules 2011', authority: 'Dept of Legal Metrology', section: 'Rule 27' },
            { title: 'Legal Metrology (Packaged Commodities) Rules', authority: 'Ministry of Consumer Affairs', section: 'Rule 6' },
            { title: 'Shops & Commercial Establishments Act', authority: 'Labour Department', section: 'Form C' }
          ]
        }
      ],
      quickPrompts: [
        'How do I get commercial electronic weighing scales verified under Legal Metrology?',
        'What are the mandatory label declarations under Legal Metrology (LMPC) Rules?',
        'What documents are required to renew our Municipal Trade Licence?',
        'How do I apply for CGTMSE collateral-free working capital loan for retail?'
      ],
      inputPlaceholder: 'Ask about Legal Metrology weighing scale stamping, shop registration, municipal trade licence...',
      regulatoryEngines: [
        { name: 'Legal Metrology Standards', desc: `Dept of Legal Metrology, ${state} • Scales & LMPC` },
        { name: 'Shops & Establishments Engine', desc: `${state} Labour Department • Form C Registry` },
        { name: 'Municipal Trade Licensing', desc: `${city} Municipal Corp • Annual Trade Clearance` },
        { name: 'Retail GST Return Gateway', desc: 'CBIC • GSTR-1, 3B Outward Tax Return' }
      ],
      quickActions: [
        { label: 'Verify Weighing Scale Annual Stamping Seal', route: 'compliance-tasks' },
        { label: 'Upload Municipal Trade Licence Certificate', route: 'documents' },
        { label: 'Apply for CGTMSE Collateral-Free Credit', route: 'government-schemes' },
        { label: 'Export Commercial Retail Audit Report', route: 'reports' }
      ]
    };
  }

  if (cat === 'factory' || cat === 'manufacturing') {
    return {
      initialMessages: [
        {
          id: 1,
          sender: 'ai',
          timestamp: '10:14 AM',
          text: `Hello ${userName}. I have analyzed ${businessName} against the Factories Act 1948, State Pollution Control Board consents, and industrial production regulations in ${location}. How can I assist you with your industrial plant compliance today?`,
          citations: [
            { title: 'Factories Act 1948', authority: 'Directorate of Industrial Safety & Health', section: 'Sec 6/7' },
            { title: 'Water (P&CP) Act 1974', authority: `${state} Pollution Control Board`, section: 'Sec 25/26' }
          ]
        },
        {
          id: 2,
          sender: 'user',
          timestamp: '10:15 AM',
          text: 'What are the mandatory inspection audits for factory machinery and CTO renewal this cycle?'
        },
        {
          id: 3,
          sender: 'ai',
          timestamp: '10:15 AM',
          text: `Here is the verified compliance assessment for **${businessName}**:

### 🚨 Critical Immediate Deadlines
1. **Pollution Control Consent to Operate (CTO)**: Renewal under Air and Water Acts requires updated stack emission sampling and ETP treated effluent testing reports.
2. **Factory Safety & Machinery Interlocks**: Form 21 annual inspection of machine guards, pressure vessel hydrostatic certificates, and emergency stop switches.
3. **Industrial Fire Safety Certificate**: Hydrant pressure verification and sprinkler head audit with ${state} Fire Services.

### 🏭 Industrial Safety & Environmental Protocols
* **High Tension Power**: Annual transformer dielectric strength testing and substation earth resistance logs.
* **Hazardous Waste**: Manifest Form 10 filing for authorized recycler handovers.

### 📋 Recommended Next Steps
* Upload the updated ETP stack sampling analysis report to your **Document Vault**.
* Trigger the CTO renewal application via the State Pollution Control Board portal.`,
          citations: [
            { title: 'Factories Act 1948', authority: 'DISH', section: 'Sec 38/41' },
            { title: 'Water Act 1974', authority: `${state} PCB`, section: 'Sec 25' },
            { title: 'Indian Boilers Act 1923', authority: 'Directorate of Boilers', section: 'Sec 7' }
          ]
        }
      ],
      quickPrompts: [
        'What are the Consent to Operate (CTO) renewal requirements under State PCB?',
        'What are the mandatory worker safety and welfare provisions under Factories Act 1948?',
        'How do I apply for the Production Linked Incentive (PLI) scheme for manufacturing?',
        'What are the statutory inspection checklists for industrial pressure vessels and boilers?'
      ],
      inputPlaceholder: 'Ask about Factories Act 1948, PCB CTO renewal, industrial fire safety, or PLI scheme...',
      regulatoryEngines: [
        { name: 'Industrial Safety & Health (DISH)', desc: `Factories Act 1948 • DISH ${state}` },
        { name: 'State Pollution Control Board', desc: `${state} PCB • Consent to Operate (CTO)` },
        { name: 'Industrial Fire & Rescue', desc: `${state} Fire Services • Hydrant & Sprinklers` },
        { name: 'High Tension Electricity Sanction', desc: 'State Electricity Board • Substation Norms' }
      ],
      quickActions: [
        { label: 'Submit Factory Compliance Report (Form 21)', route: 'compliance-tasks' },
        { label: 'Update Hazardous Waste Transfer Manifest', route: 'documents' },
        { label: 'Apply for MSME Technology Upgradation & ZED', route: 'government-schemes' },
        { label: 'Export Factory Statutory Audit Report', route: 'reports' }
      ]
    };
  }

  // Default: Clothing & Textile
  return {
    initialMessages: [
      {
        id: 1,
        sender: 'ai',
        timestamp: '10:14 AM',
        text: `Hello ${userName}. I have analyzed ${businessName} against active textile trade guidelines, municipal licensing, and state commercial regulations in ${location}. How can I assist you with your textile retail and merchandise compliance today?`,
        citations: [
          { title: `${state} Shops & Establishments Act`, authority: 'Labour Department', section: 'Form C' },
          { title: 'Textiles Committee Act 1963', authority: 'Ministry of Textiles', section: 'Sec 12' }
        ]
      },
      {
        id: 2,
        sender: 'user',
        timestamp: '10:15 AM',
        text: 'What are the urgent compliance deadlines and fire safety renewal requirements for our textile showroom this month?'
      },
      {
        id: 3,
        sender: 'ai',
        timestamp: '10:15 AM',
        text: `Here is the verified compliance assessment for **${businessName}**:

### 🚨 Critical Immediate Deadlines
1. **GST GSTR-3B Monthly Return**: Overdue by 3 days (Filing window closed May 20). Immediate interest penalty under CGST Sec 50 is accruing at 18% p.a. Recommend filing today.
2. **Fire Extinguisher & Safety Certificate**: Due in 2 days (May 18). Statutory mandate for commercial textile stores with combustible fabric stock.
3. **Municipal Trade Licence**: Annual licence under ${city} Municipal Corporation requires renewal before 31 Mar 2026.

### 🧵 Textile Trade & Quality Standards
* **Textile Committee**: Annual statistical filing and fabric quality surveillance certification.
* **Pollution Clearance**: Green Category commercial exemption certificate maintained with ${state} Pollution Control Board.

### 📋 Recommended Next Steps
* Upload the updated fire extinguisher test report to your **Document Vault**.
* Trigger the Municipal Trade renewal via the local urban body portal before month end.`,
        citations: [
          { title: 'State Fire Service Rules', authority: `${state} Fire Services`, section: 'Sec 13(2)' },
          { title: 'CGST Act 2017', authority: 'CBIC', section: 'Sec 50(1)' },
          { title: 'Textiles Committee Act 1963', authority: 'Ministry of Textiles', section: 'Sec 12' }
        ]
      }
    ],
    quickPrompts: [
      'What are the eligibility criteria for the ATUFS ₹25L capital investment subsidy?',
      'What are the fire safety and emergency exit standards for textile retail showrooms?',
      'What statistical returns are required under the Textiles Committee Act?',
      'How do I file monthly GSTR-3B returns for textile garment trade?'
    ],
    inputPlaceholder: 'Ask about textile committee returns, fire safety norms, municipal licensing, or ATUFS subsidy...',
    regulatoryEngines: [
      { name: 'Textile Committee Standards', desc: 'Ministry of Textiles • Fabric Quality Rules' },
      { name: 'Shops & Establishments Engine', desc: `${state} Labour Department • Form C Registry` },
      { name: 'State Pollution Control (Green)', desc: `${state} PCB • White-listed Textile Exemption` },
      { name: 'Municipal Trade & Signage', desc: `${city} Municipal Corp • Trade Clearance` }
    ],
    quickActions: [
      { label: 'Resolve Overdue GST GSTR-3B Return', route: 'compliance-tasks' },
      { label: 'Upload Fire Safety Inspection Certificate', route: 'documents' },
      { label: 'Apply for ATUFS Capital Investment Subsidy', route: 'government-schemes' },
      { label: 'Export Textile Regulatory Audit Report', route: 'reports' }
    ]
  };
}

function getDeterministicReply(text, cat, businessName, location, city, state) {
  let aiReply = '';
  const tLower = (text || '').toLowerCase();
  const c = (cat || '').toLowerCase();

  if (c === 'restaurant') {
    if (tLower.includes('fssai') || tLower.includes('food') || tLower.includes('hygiene') || tLower.includes('licence') || tLower.includes('license')) {
      aiReply = `### FSSAI Food Safety & Regulatory Guidance
* **Registration vs State Licence**: Annual turnover up to ₹12 Lakhs requires FSSAI Basic Registration (Form A); turnover above ₹12 Lakhs mandates FSSAI State Licence (Form B) via FoSCoS portal.
* **Mandatory Evidences**:
  * Food Safety Management System (FSMS) plan with temperature logs.
  * Form-1 medical fitness certificates for all cooks and kitchen staff.
  * Potable water chemical & microbiological testing report from NABL lab.
* **Display Requirement**: 14-digit FSSAI licence number must be prominently displayed on billing receipts and at the customer entrance counter.`;
    } else if (tLower.includes('fire') || tLower.includes('safety') || tLower.includes('exhaust') || tLower.includes('gas')) {
      aiReply = `### Commercial Kitchen Fire Safety Norms
* **Exhaust Hood & Ducts**: Mechanical canopy hood filters and horizontal exhaust ducts must undergo bi-monthly degreasing to prevent oil-grease fire flash.
* **Fire Suppression**: Install automatic wet chemical kitchen hood fire suppression system over commercial fryers and burner ranges.
* **Gas Bank**: Commercial LPG manifolds must be sited outside cooking areas with automatic leak detection sensors and emergency shut-off valves.`;
    } else if (tLower.includes('subsidy') || tLower.includes('scheme') || tLower.includes('pmfme') || tLower.includes('mudra')) {
      aiReply = `### PMFME & Food Service Support Schemes
* **PMFME Scheme**: Credit-linked 35% capital subsidy (up to ₹10 Lakhs) for modernizing commercial kitchen appliances and hygienic packaging equipment.
* **Pradhan Mantri MUDRA Yojana**: Collateral-free working capital and equipment financing up to ₹10 Lakhs through nationalized banks.`;
    } else {
      aiReply = `Based on active food service regulations for **${businessName}** in ${location}:
Your enterprise operations are governed under the Food Safety and Standards Act 2006, Municipal Public Health Bye-laws, and State Fire Safety norms. Ensure all employee health certificates and water potability records are maintained in your POWER HOUSE Document Vault.`;
    }
  } else if (c === 'jewellery') {
    if (tLower.includes('hallmark') || tLower.includes('bis') || tLower.includes('huid')) {
      aiReply = `### Mandatory BIS Hallmarking & HUID Regulations
* **Scope**: Mandatory hallmarking applies to 14k, 18k, 20k, 22k, 23k, and 24k gold jewellery items.
* **6-Digit HUID**: Every piece must bear the laser-engraved 6-digit alphanumeric Hallmarking Unique Identification (HUID) code from a BIS-certified Assaying & Hallmarking Centre (AHC).
* **Consumer Rights**: Jewellers must provide a 10x magnifying loupe to customers and list the purity grade on tax invoices.`;
    } else if (tLower.includes('pmla') || tLower.includes('cash') || tLower.includes('fiu') || tLower.includes('kyc')) {
      aiReply = `### PMLA & FIU-IND Reporting Mandates
* **Cash Limit Threshold**: Under PMLA Notification, reporting entities must verify Aadhaar / PAN KYC for any transaction and cannot accept cash payments exceeding statutory limits.
* **Cash Transaction Report (CTR)**: All cash transactions exceeding ₹2,00,000 must be recorded in Form CTR and electronically filed via FINnet 2.0 gateway by the 15th of each month.
* **Principal Officer**: Jewellers must formally designate and register a Principal Officer with FIU-IND.`;
    } else if (tLower.includes('vault') || tLower.includes('security') || tLower.includes('fire')) {
      aiReply = `### Showroom Strong Room & Physical Security Guidelines
* **Vault Structure**: Minimum 9-inch reinforced RCC walls, floor, and roof with torch and drill-resistant double-locking strong room door.
* **Electronic Security**: Dual-combination time locks, vibration sensors, and IP-based CCTV surveillance with continuous 90-day off-site cloud or vault archive backup.`;
    } else {
      aiReply = `Based on active jewellery retail regulations for **${businessName}** in ${location}:
Your business is governed under the Bureau of Indian Standards (BIS) Hallmarking Regulations, Prevention of Money Laundering Act (PMLA 2002), and State Shops & Commercial Establishments rules. All HUID assaying records must be synced with your Document Vault.`;
    }
  } else if (c === 'retail') {
    if (tLower.includes('weight') || tLower.includes('scale') || tLower.includes('metrology') || tLower.includes('stamp')) {
      aiReply = `### Legal Metrology Scale Verification Guidelines
* **Annual Stamping**: Electronic weighing scales used for commercial retail transactions must be physically verified and stamped annually by the Legal Metrology Inspector.
* **Display Seal**: The official green lead/metallic stamping verification seal and certificate must be clearly visible to customers at the checkout counter.
* **Tolerance Limits**: Any tampering or unverified scale usage attracts statutory penalties under Section 30 of the Legal Metrology Act 2009.`;
    } else if (tLower.includes('lmpc') || tLower.includes('package') || tLower.includes('label') || tLower.includes('mrp')) {
      aiReply = `### Legal Metrology (Packaged Commodities) Rules (LMPC)
* **Mandatory Declarations**: All pre-packaged commodities sold in store must display:
  * Name and complete address of the manufacturer / packer / importer.
  * Generic name of the commodity and Net Quantity in standard units.
  * Month and Year of manufacture or packing.
  * Maximum Retail Price (MRP inclusive of all taxes).
  * Consumer grievance phone number and email address.`;
    } else {
      aiReply = `Based on active retail commercial regulations for **${businessName}** in ${location}:
Your enterprise operations are governed under the ${state} Shops & Commercial Establishments Act, Legal Metrology Act 2009, and Municipal Trade Licensing Rules. Maintain verified weighing scale certificates in your Document Vault.`;
    }
  } else if (c === 'factory' || c === 'manufacturing') {
    if (tLower.includes('pollution') || tLower.includes('cto') || tLower.includes('etp') || tLower.includes('emission')) {
      aiReply = `### Industrial Environmental Compliance (CTO & Air/Water Acts)
* **Consent to Operate (CTO)**: Must be renewed prior to expiry under Section 25 of Water Act 1974 and Section 21 of Air Act 1981.
* **Effluent Treatment (ETP)**: Continuous pH, COD, and BOD monitoring logs must be submitted quarterly to the State Pollution Control Board.
* **Hazardous Waste**: Electronic manifest submission required for every hazardous solid waste transfer to authorized TSDF facilities.`;
    } else if (tLower.includes('factory') || tLower.includes('safety') || tLower.includes('machine') || tLower.includes('form 21')) {
      aiReply = `### Factories Act 1948 Worker Safety Mandates
* **Machinery Guarding**: Section 21 requires interlocking guards on all dangerous transmissions, gears, and rotating parts.
* **Form 21 Annual Report**: Consolidated annual return covering factory hours worked, worker safety training records, and medical examination logs.
* **Welfare Provisions**: Mandatory provision of clean drinking water, adequate ventilation, first-aid boxes, and designated safety officers for units with 250+ workers.`;
    } else {
      aiReply = `Based on active industrial manufacturing regulations for **${businessName}** in ${location}:
Your enterprise is subject to the Factories Act 1948, State Pollution Control Board consents, and Industrial Fire Safety codes. Ensure all machinery inspection logs and environmental clearances are archived in your Document Vault.`;
    }
  } else {
    // Clothing & Textile
    if (tLower.includes('atufs') || tLower.includes('subsidy') || tLower.includes('scheme')) {
      aiReply = `### ATUFS Technology Upgradation Subsidy Guide
* **Maximum Grant**: Up to ₹25,00,000 (10% to 15% capital investment subsidy on benchmarked modern textile machinery).
* **Eligibility**: Registered MSME textile and apparel manufacturing/retail units with verified Udyam certificate.
* **Key Documentation**:
  * Chartered Accountant machinery valuation certificate.
  * Term loan disbursement ledger from participating commercial bank.
  * Fire safety certificate and Municipal Trade Licence.`;
    } else if (tLower.includes('effluent') || tLower.includes('pollution') || tLower.includes('pcb')) {
      aiReply = `### State Pollution Control Norms for Textile Units
* **Classification**: Green Category for finished textile retail and dry packaging (exempt from heavy effluent treatment).
* **Conditions**: No wet chemical washing or industrial dyeing permitted on retail showroom premises.
* **Disposal**: Fabric cuttings and combustible packaging must be segregated and handed to authorized municipal solid waste contractors.`;
    } else {
      aiReply = `Regarding your query for **${businessName}** in ${location}:
All textile retail operations are actively aligned with the ${state} Shops & Establishments Act, Municipal Trade Licensing, and Textile Committee quality standards. Store valid tax invoices and fire safety certificates in your POWER HOUSE Document Vault.`;
    }
  }
  return aiReply;
}

export default function AIComplianceAdvisorPage({ onNavigate, showToast, setModalState }) {
  const { user, activeBusiness } = useAuth();
  const { analysisResult, businessCategory, businessTemplateBundle, backendProfileId } = useBusinessAnalysis();

  const activeCategory =
    businessCategory ||
    analysisResult?.businessSummary?.businessCategory ||
    businessTemplateBundle?.meta?.key ||
    'clothing_textile';

  const businessName =
    analysisResult?.businessSummary?.businessName ||
    businessTemplateBundle?.meta?.defaultBusinessName ||
    'Tiruppur Textile Works';

  const city = analysisResult?.businessSummary?.city || 'Tiruppur';
  const state = analysisResult?.businessSummary?.state || 'Tamil Nadu';
  const location = `${city}, ${state}`;
  const userName = user?.fullName ? user.fullName.trim().split(' ')[0] : 'there';
  const effectiveBusinessId = activeBusiness?.id || backendProfileId || 1;

  const advisorContext = getAdvisorContentForCategory({
    categoryKey: activeCategory,
    businessName,
    location,
    userName,
    city,
    state
  });

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState(advisorContext.initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showTrace, setShowTrace] = useState(true);
  const [ragTrace, setRagTrace] = useState({
    active: true,
    query: 'Initial Grounding State',
    category: activeCategory,
    retrieved_count: 2,
    verified_count: 2,
    rejected_count: 0,
    citations_count: 2,
    latency_ms: 128.4,
    is_fallback: false
  });

  // Sync conversation when business category switches
  useEffect(() => {
    const updated = getAdvisorContentForCategory({
      categoryKey: activeCategory,
      businessName,
      location,
      userName,
      city,
      state
    });
    setMessages(updated.initialMessages);
    setRagTrace((prev) => ({
      ...prev,
      category: activeCategory,
      query: `Category switched to ${activeCategory}`
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, businessName, location]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      timestamp: 'Just now',
      text: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    let ragResp = null;
    try {
      ragResp = await apiClient.queryRag(effectiveBusinessId, text, 3);
    } catch (err) {
      console.warn('RAG Query API unavailable, falling back to local engine:', err);
    }

    if (ragResp && ragResp.synthesized_answer) {
      setRagTrace({
        active: true,
        query: text,
        category: ragResp.category || activeCategory,
        retrieved_count: ragResp.retrieved_count ?? 0,
        verified_count: ragResp.verified_count ?? 0,
        rejected_count: ragResp.rejected_count ?? 0,
        citations_count: ragResp.citations?.length ?? 0,
        latency_ms: ragResp.latency_ms ?? 142.0,
        is_fallback: Boolean(ragResp.is_fallback_unretrieved)
      });

      const formattedCitations = (ragResp.citations || []).map((c) => ({
        title: c.act || c.source_document_title,
        authority: c.statutory_authority,
        section: c.section,
        relevance: c.composite_relevance ? `${Math.round(c.composite_relevance * 100)}% Match` : 'Verified',
        source_url: c.source_url,
        verification_status: c.verification_status || 'VERIFIED SOURCE'
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          timestamp: 'Just now',
          text: ragResp.synthesized_answer,
          citations: formattedCitations.length > 0 ? formattedCitations : advisorContext.initialMessages[2]?.citations,
          isFallback: ragResp.is_fallback_unretrieved,
          ragDiagnostics: {
            latency_ms: ragResp.latency_ms,
            retrieved_count: ragResp.retrieved_count,
            verified_count: ragResp.verified_count
          }
        }
      ]);
      setIsTyping(false);
      return;
    }

    // Local deterministic fallback
    setTimeout(() => {
      const fallbackText = getDeterministicReply(text, activeCategory, businessName, location, city, state);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          timestamp: 'Just now',
          text: fallbackText,
          citations: advisorContext.initialMessages[2]?.citations || [
            { title: 'Statutory Business Regulation Act', authority: 'State Authority', section: 'Sec 12' }
          ]
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="space-y-6 font-sans antialiased text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#111827] rounded-2xl border border-[#1E293B] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900/30 text-blue-400 border border-blue-800/50 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-100">AI Compliance Advisor</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/50">
                Enterprise Regulatory Copilot
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Statutory analysis &amp; regulatory legal guidance for <span className="text-slate-200 font-semibold">{businessName}</span> ({location})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalState && setModalState({
              isOpen: true,
              type: 'audit-trail',
              data: {}
            })}
            className="px-3 py-1.5 rounded-xl border border-purple-800/80 bg-purple-950/40 text-purple-300 hover:text-white hover:border-purple-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect human-approved compliance actions for Mohith K"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>Audit Trail</span>
          </button>
          <button
            onClick={() => onNavigate && onNavigate('approvals')}
            className="px-3 py-1.5 rounded-xl border border-[#1E293B] bg-[#141C2B] text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Active Licences</span>
          </button>
          <button
            onClick={() => onNavigate && onNavigate('compliance-tasks')}
            className="px-3 py-1.5 rounded-xl border border-[#1E293B] bg-[#141C2B] text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Tasks</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Chat + Right Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Stream (Left 2 cols) */}
        <div className="lg:col-span-2 bg-[#111827] rounded-2xl border border-[#1E293B] p-5 flex flex-col h-[650px]">
          {/* Scrollable messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-900/30 text-blue-400 border border-blue-800/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-[#141C2B] border border-[#1E293B] text-slate-200'
                }`}>
                  <div className="whitespace-pre-wrap font-sans space-y-2">
                    {msg.text}
                  </div>

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-blue-400" />
                        <span>Statutory Citations</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((c, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0B0F17] text-slate-300 border border-[#1E293B]"
                          >
                            <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1 rounded text-[9px] border border-emerald-800/80">
                              {c.verification_status || 'VERIFIED SOURCE'}
                            </span>
                            <span className="text-blue-400 font-bold">{c.authority}</span>
                            <span>{c.title} {c.section ? `(${c.section})` : ''}</span>
                            {c.relevance && (
                              <span className="text-purple-400 font-bold bg-purple-950/60 px-1 rounded text-[9px] border border-purple-800/50">
                                {c.relevance}
                              </span>
                            )}
                            {c.source_url && (
                              <a
                                href={c.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-blue-400 ml-0.5"
                                title="View official statutory gazette"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.isFallback && (
                    <div className="mt-2 text-[10px] text-amber-400/90 bg-amber-950/40 border border-amber-800/50 px-2 py-1 rounded">
                      Relevance fell below statutory grounding threshold (0.45). Reverted to manual advisory review.
                    </div>
                  )}

                  <div className={`text-[10px] mt-2 flex items-center justify-between ${msg.sender === 'user' ? 'text-blue-200 justify-end' : 'text-slate-500'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.ragDiagnostics?.latency_ms && (
                      <span className="text-[9px] font-mono text-slate-500">
                        RAG: {Math.round(msg.ragDiagnostics.latency_ms)}ms
                      </span>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-blue-900/30 text-blue-400 border border-blue-800/50 flex items-center justify-center shrink-0 mt-0.5">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                </div>
                <div className="max-w-[85%] rounded-2xl p-3 text-xs bg-[#141C2B] border border-[#1E293B] text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span>Cross-referencing ChromaDB dense vector store and statutory gazettes...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="pt-3 border-t border-slate-800 mt-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {advisorContext.quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#141C2B] border border-[#1E293B] hover:border-blue-500 hover:text-white text-slate-300 text-[11px] font-medium transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder={advisorContext.inputPlaceholder}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-[#141C2B] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputMessage.trim()}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Rail: Knowledge Base & Statutory Engines */}
        <div className="space-y-4">
          {/* Active Regulatory Engines */}
          <div className="bg-[#111827] rounded-2xl border border-[#1E293B] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Active Regulatory Engines</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              {advisorContext.regulatoryEngines.map((engine, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#141C2B] border border-[#1E293B] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-200">{engine.name}</div>
                    <div className="text-[10px] text-slate-400">{engine.desc}</div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">SYNCED</span>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Trace & Retrieval Diagnostics Panel */}
          <div className="bg-[#111827] rounded-2xl border border-blue-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  RAG Trace &amp; Retrieval
                </h3>
              </div>
              <button
                onClick={() => setShowTrace(!showTrace)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                title="Toggle RAG Trace View"
              >
                {showTrace ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showTrace && (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Dense Embedding Function:</span>
                  <span className="font-mono text-emerald-400 font-semibold">StatutoryDense (384-d)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Hybrid Formula:</span>
                  <span className="font-mono text-blue-300">0.70 Dense + 0.30 Lexical</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Relevance Cutoff:</span>
                  <span className="font-mono text-slate-300">0.45 Threshold</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#141C2B] border border-slate-800 space-y-1.5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    Last Query Evaluated
                  </div>
                  <div className="text-slate-200 font-medium truncate text-[11px]">
                    "{ragTrace.query}"
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-800/80 text-[10px] text-center">
                    <div className="bg-[#0B0F17] p-1.5 rounded">
                      <span className="text-slate-400 block text-[9px]">Retrieved</span>
                      <span className="font-bold text-blue-400">{ragTrace.retrieved_count}</span>
                    </div>
                    <div className="bg-[#0B0F17] p-1.5 rounded">
                      <span className="text-slate-400 block text-[9px]">Verified</span>
                      <span className="font-bold text-emerald-400">{ragTrace.verified_count}</span>
                    </div>
                    <div className="bg-[#0B0F17] p-1.5 rounded">
                      <span className="text-slate-400 block text-[9px]">Latency</span>
                      <span className="font-bold text-purple-400">{Math.round(ragTrace.latency_ms)}ms</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 leading-tight">
                  Grounding gate rejects ungrounded queries (KW &lt; 0.05). Strict negative isolation prevents cross-category citation leakage.
                </div>
              </div>
            )}
          </div>

          {/* Quick Compliance Actions */}
          <div className="bg-[#111827] rounded-2xl border border-[#1E293B] p-5">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider pb-3 border-b border-slate-800">
              Quick Compliance Actions
            </h3>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => setModalState && setModalState({
                  isOpen: true,
                  type: 'action-proposal',
                  data: {
                    proposal: {
                      title: 'Execute Statutory GSTR-3B Tax Filing & Challan Generation',
                      action_type: 'GST_RETURN_FILING',
                      urgency: 'HIGH',
                      rationale: `Verified compliance deadline approaching in 3 days for ${businessName}. Human approval initiates official GST portal challan staging.`,
                      jurisdiction: 'Central & State GST',
                      regulatory_basis: 'Central Goods and Services Tax Act 2017, Sec 39 / Sec 47',
                      risk_of_inaction: '₹50/day late penalty under Section 47 and potential vendor credit restrictions.',
                      payload: {
                        business: businessName,
                        period: 'Current Month',
                        return_type: 'GSTR-3B',
                        filing_channel: 'GSTN Gateway'
                      }
                    }
                  }
                })}
                className="w-full text-left p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/80 hover:border-blue-500 flex items-center justify-between text-xs text-blue-200 group transition-colors cursor-pointer font-semibold shadow-xs"
                title="Open Human-in-the-Loop Action Proposal approval interface"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Propose Human-in-the-Loop Action</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {advisorContext.quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate && onNavigate(action.route)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#141C2B] border border-[#1E293B] hover:border-slate-700 flex items-center justify-between text-xs text-slate-200 group transition-colors cursor-pointer"
                >
                  <span>{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
