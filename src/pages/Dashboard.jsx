import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  FolderLock,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  MapPin,
  Tag,
  Building,
  Landmark,
  Handshake,
  Award,
  FileSpreadsheet,
  Receipt,
  Shield,
  Sparkles,
  History,
  GitCompare,
  FileQuestion
} from 'lucide-react';
import { useBusinessAnalysis } from '../context/BusinessAnalysisContext';
import { getBusinessImage } from '../utils/businessVisualResolver';

export default function Dashboard({ modalState, setModalState, onNavigate }) {
  const { businessTemplateBundle, analysisResult, businessCategory } = useBusinessAnalysis();

  const businessName =
    analysisResult?.businessSummary?.businessName ||
    businessTemplateBundle?.meta?.defaultBusinessName ||
    'Tiruppur Textile Works';

  const categoryLabel =
    analysisResult?.businessSummary?.industry ||
    businessTemplateBundle?.meta?.categoryLabel ||
    'Clothing & Textile Manufacturing';

  const city = analysisResult?.businessSummary?.city || 'Tiruppur';
  const state = analysisResult?.businessSummary?.state || 'Tamil Nadu';
  const locationString = `${city}, ${state}`;

  const annualTurnover =
    analysisResult?.businessSummary?.annualTurnover ||
    businessTemplateBundle?.meta?.annualTurnover ||
    '₹4.80 Cr';

  const gstin =
    analysisResult?.businessSummary?.gstin ||
    businessTemplateBundle?.meta?.gstinPlaceholder ||
    'Pending Registration';

  const udyamNumber =
    analysisResult?.businessSummary?.udyamNumber ||
    businessTemplateBundle?.meta?.udyamPlaceholder ||
    'Pending Registration';

  const employees =
    analysisResult?.businessSummary?.employees ||
    businessTemplateBundle?.meta?.employees ||
    25;

  const constitution =
    businessTemplateBundle?.meta?.constitution ||
    analysisResult?.businessSummary?.businessType ||
    'Proprietorship';

  const imageSrc =
    getBusinessImage(businessCategory || businessTemplateBundle?.meta?.key || analysisResult?.businessSummary?.businessCategory) ||
    businessTemplateBundle?.meta?.image ||
    '/business-images/default-business.jpg';

  // AI interactive prompt state
  const [aiInput, setAiInput] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAi = (question) => {
    const q = question || aiInput;
    if (!q || !q.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);

    setTimeout(() => {
      let reply = '';
      const qLower = q.toLowerCase();
      const cat = (businessCategory || businessTemplateBundle?.meta?.key || '').toLowerCase();

      if (qLower.includes('licence') || qLower.includes('license') || qLower.includes('required')) {
        if (cat === 'restaurant') {
          reply = `For ${businessName} in ${locationString}, the mandatory statutory requirements are: (1) FSSAI Registration / Licence (FoSCoS), (2) Health Trade Licence from ${city} Municipal Corp., (3) Eating House Licence, (4) Fire Safety NOC (Kitchen / Dining), and (5) Shops & Establishments Registration.`;
        } else if (cat === 'jewellery') {
          reply = `For ${businessName} in ${locationString}, the mandatory statutory requirements are: (1) BIS Hallmarking Registration (Mandatory 6-digit HUID), (2) PMLA FIU-IND Reporting Registration, (3) Shop & Establishment Registration, (4) GST Registration (3% precious metal slab), and (5) Fire Safety NOC.`;
        } else if (cat === 'retail') {
          reply = `For ${businessName} in ${locationString}, the mandatory statutory requirements are: (1) Shop & Establishment Registration (Form C), (2) Municipal Trade Licence from ${city} Municipal Corp., (3) GST Registration, (4) Legal Metrology (Weights & Measures) Verification, and (5) Signage Board Permission.`;
        } else if (cat === 'factory' || cat === 'manufacturing') {
          reply = `For ${businessName} in ${locationString}, the mandatory statutory requirements are: (1) Factory License under Factories Act 1948, (2) Pollution Control NOC (CTO) from State PCB, (3) Fire Safety Certificate (Industrial), (4) High Tension (HT) Electricity Sanction, and (5) Boiler / Pressure Vessel Licence if applicable.`;
        } else {
          reply = `For ${businessName} in ${locationString}, the mandatory statutory requirements are: (1) Shops & Establishments Registration (Form C), (2) Municipal Trade Licence from ${city} Municipal Corp., (3) GST Registration (Turnover threshold/Regular), and (4) Fire Safety Certificate from State Fire & Rescue Services.`;
        }
      } else if (qLower.includes('deadline') || qLower.includes('upcoming') || qLower.includes('due')) {
        if (cat === 'restaurant') {
          reply = `Immediate deadlines for ${businessName}: (1) Food Safety Management System Plan filing due in 5 days, (2) Commercial Kitchen Hood degreasing due in 8 days, and (3) Water potability lab audit due in 25 days.`;
        } else if (cat === 'jewellery') {
          reply = `Immediate deadlines for ${businessName}: (1) BIS Hallmarking HUID tag reconciliation due in 7 days, (2) Monthly PMLA Cash Transaction Reporting (CTR) due in 10 days, and (3) Strong room dual-lock alarm test in 18 days.`;
        } else if (cat === 'retail') {
          reply = `Immediate deadlines for ${businessName}: (1) Annual Legal Metrology weighing scale stamping verification in 14 days, (2) Monthly GSTR-3B tax return in 15 days, and (3) Shop & Establishment annual renewal.`;
        } else if (cat === 'factory' || cat === 'manufacturing') {
          reply = `Immediate deadlines for ${businessName}: (1) Factory Compliance Report (Form 21) in 7 days, (2) Hazardous waste manifest in 12 days, and (3) Substation transformer inspection in 22 days.`;
        } else {
          reply = `Immediate deadlines for ${businessName}: (1) Fire Safety Certificate Renewal due in 2 days (15 May), (2) Professional Tax Payment due in 5 days (18 May), and (3) GSTR-3B Monthly Return overdue by 3 days.`;
        }
      } else if (qLower.includes('trade') || qLower.includes('renew')) {
        reply = `To renew your Municipal Trade Licence with ${city} Municipal Corp: Submit application along with valid Property Tax receipt, annual lease renewal, and Shops & Est. certificate before 31 Mar 2026. Renewal fee is payable online via the ULB portal.`;
      } else if (qLower.includes('fire') || qLower.includes('safety')) {
        if (cat === 'restaurant') {
          reply = `Commercial kitchen fire safety norms for ${businessName}: Automatic kitchen hood wet chemical fire suppression system, Class B/F extinguishers for cooking oil hazards, LPG manifold safety shutoff valves, and dining emergency exit clearances certified by ${state} Fire Services.`;
        } else if (cat === 'jewellery') {
          reply = `Showroom security and fire safety norms for ${businessName}: Reinforced RCC vault / strong room with dual-combination locks, 90-day CCTV video archive retention, smoke detection alarms, and Fire Safety NOC from ${state} Fire Services.`;
        } else if (cat === 'factory' || cat === 'manufacturing') {
          reply = `Industrial factory fire norms for ${businessName}: Dedicated fire water reservoir, automatic sprinkler grid in production bay, hydrant pressure testing, and periodic fire mock drills certified by ${state} Fire Services.`;
        } else {
          reply = `Fire safety norms for commercial ${categoryLabel}: Minimum 2 ABC type dry powder fire extinguishers (5kg capacity) every 1,000 sq ft, unblocked emergency egress routes, illuminated exit signages, and periodic audit by ${state} Fire & Rescue Services.`;
        }
      } else {
        reply = `Based on your ${categoryLabel} business in ${locationString}: All operations are currently mapped against active state and central statutory compliance rules. Check your deadlines or document vault for immediate action items.`;
      }

      setAiLoading(false);
      setAiAnswer(reply);
    }, 450);
  };

  return (
    <div className="space-y-5">
      {/* EXPLAINABLE COMPLIANCE OPERATING SYSTEM: Readiness & Action Banner */}
      <section aria-label="Workspace Readiness" className="bg-gradient-to-r from-blue-950/40 via-[#111827] to-purple-950/30 border border-blue-900/50 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-500/10">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                Workspace Readiness: 88% • Operational
              </span>
              <span className="text-[11px] text-slate-400">
                AI Compliance Operating System active
              </span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-100 mt-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-400 font-bold">Next Best Action:</span>
              <span>File GSTR-3B monthly return before 20th to prevent ₹50/day statutory late fee (CGST Act Sec 47).</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            onClick={() => setModalState({
              isOpen: true,
              type: 'action-proposal',
              data: {
                proposal: {
                  title: 'File GSTR-3B Monthly Return & Generate Challan',
                  action_type: 'GST_RETURN_FILING',
                  urgency: 'HIGH',
                  rationale: 'Filing due in 3 days. Statutory deadline prevents interest penalty under Section 50(1) and recurring late fees.',
                  jurisdiction: 'Central & State GST',
                  regulatory_basis: 'Central Goods and Services Tax Act 2017, Sec 39 / Sec 47',
                  risk_of_inaction: 'Late fee of ₹50/day (₹20/day for NIL) plus 18% p.a. interest on unpaid net tax liability.',
                  payload: {
                    period: 'April 2025',
                    return_type: 'GSTR-3B',
                    turnover: annualTurnover,
                    filing_mode: 'Online Via GST Portal'
                  }
                }
              }
            })}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Propose Human Action</span>
          </button>

          <button
            onClick={() => setModalState({
              isOpen: true,
              type: 'category-comparison',
              data: { catA: businessCategory || 'factory', catB: 'restaurant' }
            })}
            className="px-3 py-2 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] border border-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5 text-blue-400" />
            <span>Compare Categories</span>
          </button>

          <button
            onClick={() => setModalState({
              isOpen: true,
              type: 'audit-trail',
              data: {}
            })}
            className="px-3 py-2 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] border border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>Audit Trail</span>
          </button>
        </div>
      </section>

      {/* ROW 1: Active Business Card (Col 8) + Compliance Health Card (Col 4) */}
      <section aria-label="Business Overview and Score" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Active Business Card (Left Col-8) */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#1E293B] rounded-2xl p-5 flex flex-col md:flex-row items-stretch justify-between gap-6 relative overflow-hidden">
          {/* Left Info with Image */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            <div className="w-36 h-28 sm:w-40 sm:h-28 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shrink-0 shadow-md">
              <img
                src={imageSrc}
                alt={businessName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                    {businessName}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                    Active Business
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>{categoryLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{locationString}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  onClick={() => onNavigate && onNavigate('business-profile')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  View Business Profile
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('business-profile')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  Edit Business
                </button>
              </div>
            </div>
          </div>

          {/* Right Snapshot Grid with Watermark Pillar Icon */}
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6 relative flex flex-col justify-center">
            {/* Watermark Icon */}
            <Building className="w-28 h-28 text-slate-800/20 absolute right-1 bottom-1 pointer-events-none" />

            <h3 className="text-xs font-bold text-white tracking-wide uppercase mb-3">
              Business Snapshot
            </h3>

            <div className="space-y-2 relative z-10 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Constitution</span>
                <span className="text-slate-200 font-semibold">{constitution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">GSTIN</span>
                <span className="text-slate-200 font-mono font-medium">{gstin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Udyam</span>
                <span className="text-slate-200 font-mono font-medium">{udyamNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Employees</span>
                <span className="text-slate-200 font-semibold">{employees}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Health Score Card (Right Col-4) */}
        <div
          onClick={() => setModalState({
            isOpen: true,
            type: 'compliance-health',
            data: { score: 92, businessName }
          })}
          className="lg:col-span-4 bg-[#111827] border border-[#1E293B] hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group shadow-lg"
          title="Click to inspect exact mathematical score calculation"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Circular Progress Gauge */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-800 stroke-current"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Emerald Progress Ring (92% of circumference 251.2 = 231.1) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-emerald-500 stroke-current"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="20.1"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white leading-none">92%</span>
                <span className="text-[9px] font-bold text-emerald-400 mt-0.5">EXCELLENT</span>
              </div>
            </div>

            {/* Score Text + Glowing Shield Icon */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-emerald-400">Deterministic</span>
                <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:border-emerald-400 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Click to inspect exact formula: Licences (36.8) + Docs (23.0) + Tasks (18.4) + Filing (13.8).
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-2 flex justify-between items-center">
            <span className="text-xs text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
              <span>Why 92%? Explain Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate && onNavigate('reports');
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <span>Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ROW 2: KPI Strip (4 Equal Cards) */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Licences */}
        <div
          onClick={() => onNavigate && onNavigate('approvals')}
          className="bg-[#111827] border border-[#1E293B] hover:border-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Total Licences</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">8</div>
            <div className="text-[11px] font-medium text-emerald-400 mt-0.5">
              6 Active <span className="text-slate-500">•</span> 2 Expiring
            </div>
          </div>
        </div>

        {/* Card 2: Due This Month */}
        <div
          onClick={() => onNavigate && onNavigate('compliance-tasks')}
          className="bg-[#111827] border border-[#1E293B] hover:border-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Due This Month</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">5</div>
            <div className="text-[11px] font-medium text-rose-400 mt-0.5">
              3 Overdue <span className="text-slate-500">•</span> 2 Upcoming
            </div>
          </div>
        </div>

        {/* Card 3: Documents */}
        <div
          onClick={() => onNavigate && onNavigate('documents')}
          className="bg-[#111827] border border-[#1E293B] hover:border-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0">
            <FolderLock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Documents</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">24</div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">
              18 Valid <span className="text-slate-500">•</span> 6 Expiring
            </div>
          </div>
        </div>

        {/* Card 4: Applications */}
        <div
          onClick={() => onNavigate && onNavigate('applications')}
          className="bg-[#111827] border border-[#1E293B] hover:border-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-400 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">Applications</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">3</div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">
              2 In Progress <span className="text-slate-500">•</span> 1 Submitted
            </div>
          </div>
        </div>
      </section>

      {/* ROW 3: Compliance Roadmap (Full Width Card) */}
      <section aria-label="Compliance Roadmap" className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-white tracking-wide">Compliance Roadmap</h3>
          <button
            onClick={() => onNavigate && onNavigate('approvals')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
          >
            View All Licences
          </button>
        </div>

        {/* Stepper Grid with Connected Horizontal Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          {/* Step 1: Completed */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-2 z-10 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-white leading-tight">
              Shops &amp; Establishments Registration
            </div>
            <div className="text-[11px] font-medium text-emerald-400 mt-1">Completed</div>
          </div>

          {/* Step 2: Completed */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-2 z-10 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-white leading-tight">
              Municipal Trade Licence
            </div>
            <div className="text-[11px] font-medium text-emerald-400 mt-1">Completed</div>
          </div>

          {/* Step 3: Completed */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-10 h-10 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-2 z-10 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-white leading-tight">
              GST Registration
            </div>
            <div className="text-[11px] font-medium text-emerald-400 mt-1">Completed</div>
          </div>

          {/* Step 4: In Progress */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-10 h-10 rounded-full bg-amber-950 border-2 border-amber-500 flex items-center justify-center text-amber-400 mb-2 z-10 shadow-lg shadow-amber-500/10">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-white leading-tight">
              Fire Safety Certificate
            </div>
            <div className="text-[11px] font-medium text-amber-400 mt-1">In Progress</div>
          </div>

          {/* Step 5: Pending */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-400 mb-2 z-10 font-bold text-xs">
              5
            </div>
            <div className="text-xs font-semibold text-slate-300 leading-tight">
              Signage Board Permission
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-1">Pending</div>
          </div>
        </div>
      </section>

      {/* ROW 4: Two-Column Split (Left Col 8, Right Col 4) */}
      <section aria-label="Detailed Compliance Data" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (approx 65% width) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card A: Required Licences Table */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wide">Required Licences</h3>
              <button
                onClick={() => onNavigate && onNavigate('approvals')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                    <th className="pb-3 pr-4 font-semibold">Licence / Mandate</th>
                    <th className="pb-3 px-4 font-semibold">Statutory Authority</th>
                    <th className="pb-3 px-4 font-semibold">Status</th>
                    <th className="pb-3 px-4 font-semibold">Expiry / Renewal</th>
                    <th className="pb-3 pl-4 text-right font-semibold">Explainability &amp; Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {((businessTemplateBundle?.approvalsList && businessTemplateBundle.approvalsList.length > 0)
                    ? businessTemplateBundle.approvalsList.slice(0, 6)
                    : [
                        { id: 'app-1', name: 'Shops & Establishments Registration', authority: 'Labour Department, TN', status: 'Active', dueDate: '—', category: 'Statutory' },
                        { id: 'app-2', name: 'Municipal Trade Licence', authority: 'Tiruppur Municipal Corp.', status: 'Active', dueDate: '31 Mar 2026', category: 'Municipal' },
                        { id: 'app-3', name: 'GST Registration', authority: 'GST Department', status: 'Active', dueDate: '—', category: 'Taxation' },
                        { id: 'app-4', name: 'Fire Safety Certificate', authority: 'TN Fire & Rescue', status: 'Expiring Soon', dueDate: '15 Jun 2025', category: 'Safety' },
                        { id: 'app-5', name: 'Signage Board Permission', authority: 'Tiruppur Municipal Corp.', status: 'Pending', dueDate: '—', category: 'Municipal' }
                      ]
                  ).map((approval, idx) => (
                    <tr key={approval.id || idx} className="hover:bg-[#141C2B]/60 transition-colors group">
                      <td className="py-3 pr-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{approval.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60 shrink-0">
                            VERIFIED SOURCE
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{approval.authority}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          approval.status === 'Active' || approval.status === 'Completed'
                            ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80'
                            : approval.status === 'Expiring Soon' || approval.status === 'In Progress'
                            ? 'bg-amber-950/80 text-amber-400 border-amber-800/80'
                            : 'bg-blue-950/80 text-blue-400 border-blue-800/80'
                        }`}>
                          {approval.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                        {approval.dueDate || approval.expiryDate || '—'}
                      </td>
                      <td className="py-3 pl-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setModalState({
                              isOpen: true,
                              type: 'why-requirement',
                              data: {
                                approval: {
                                  ...approval,
                                  why_required: approval.why_required || `Statutory mandate applicable to ${categoryLabel} in ${locationString}.`,
                                  regulatory_basis: approval.regulatory_basis || {
                                    act: 'Statutory Compliance Regulation',
                                    section: 'Applicable Provisions',
                                    citation: 'Official Gazette Notification'
                                  }
                                }
                              }
                            })}
                            className="px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-800/80 text-blue-400 hover:text-white font-semibold text-[11px] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                            title="Inspect statutory justification, Act citations, and 8-step decision trace"
                          >
                            <FileQuestion className="w-3 h-3" />
                            <span>Why Required?</span>
                          </button>
                          <button
                            onClick={() => onNavigate && onNavigate('approvals')}
                            className="text-xs text-slate-400 hover:text-white font-semibold cursor-pointer"
                          >
                            View &gt;
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card B: Compliance Tasks */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wide">Compliance Tasks</h3>
              <button
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Task 1: Overdue 3 days */}
              <div
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800/80 text-rose-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      GST Return Filing (GSTR-3B)
                    </div>
                    <div className="text-[11px] text-slate-400">GST Compliance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-rose-400">Overdue 3 days</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Task 2: Overdue 5 days */}
              <div
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800/80 text-rose-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Shops &amp; Establishments Return
                    </div>
                    <div className="text-[11px] text-slate-400">Labour Department</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-rose-400">Overdue 5 days</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Task 3: Due in 2 days */}
              <div
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Fire Extinguisher Inspection
                    </div>
                    <div className="text-[11px] text-slate-400">Annual Compliance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-amber-400">Due in 2 days</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Task 4: Due in 5 days */}
              <div
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400 flex items-center justify-center shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Professional Tax Payment
                    </div>
                    <div className="text-[11px] text-slate-400">Labour Department</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-amber-400">Due in 5 days</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Task 5: Due in 12 days */}
              <div
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      GST Advance Tax - Q1
                    </div>
                    <div className="text-[11px] text-slate-400">GST Department</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-emerald-400">Due in 12 days</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Card C: Compliance Overview Analytics Card */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wide">Compliance Overview</h3>
              <button
                onClick={() => onNavigate && onNavigate('reports')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                View Analytics
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
              {/* Sub-widget 1: Compliance Health Trend */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Compliance Health Trend</div>
                <div className="h-28 bg-[#141C2B]/60 rounded-xl p-2.5 flex flex-col justify-between relative border border-slate-800/60">
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>100</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/80">
                      92%
                    </span>
                  </div>
                  {/* SVG Line Chart */}
                  <svg className="w-full h-12 overflow-visible" viewBox="0 0 140 50">
                    <path
                      d="M 5 40 Q 35 32, 60 30 T 95 20 T 135 8"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                    />
                    <circle cx="5" cy="40" r="3" fill="#3B82F6" />
                    <circle cx="35" cy="34" r="3" fill="#3B82F6" />
                    <circle cx="65" cy="28" r="3" fill="#3B82F6" />
                    <circle cx="95" cy="20" r="3" fill="#3B82F6" />
                    <circle cx="135" cy="8" r="4" fill="#10B981" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                  <div className="flex justify-between text-[9px] text-slate-400 pt-1">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                  </div>
                </div>
              </div>

              {/* Sub-widget 2: Licences by Status */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Licences by Status</div>
                <div className="h-28 bg-[#141C2B]/60 rounded-xl p-2.5 flex items-center justify-around border border-slate-800/60">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-emerald-500 stroke-current"
                        strokeWidth="3.5"
                        strokeDasharray="75, 100"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-amber-400 stroke-current"
                        strokeWidth="3.5"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-75"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center leading-none">
                      <span className="text-xs font-bold text-white block">8</span>
                      <span className="text-[8px] text-slate-400 block">Total</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-400">Active</span>
                      <span className="text-slate-200 font-semibold ml-auto">6 (75%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-slate-400">Expiring</span>
                      <span className="text-slate-200 font-semibold ml-auto">2 (25%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="text-slate-400">Expired</span>
                      <span className="text-slate-200 font-semibold ml-auto">0 (0%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-widget 3: Tasks by Status */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Tasks by Status</div>
                <div className="h-28 bg-[#141C2B]/60 rounded-xl p-2.5 flex items-center justify-around border border-slate-800/60">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-emerald-500 stroke-current"
                        strokeWidth="3.5"
                        strokeDasharray="60, 100"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-amber-400 stroke-current"
                        strokeWidth="3.5"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-60"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-rose-500 stroke-current"
                        strokeWidth="3.5"
                        strokeDasharray="15, 100"
                        strokeDashoffset="-85"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center leading-none">
                      <span className="text-xs font-bold text-white block">20</span>
                      <span className="text-[8px] text-slate-400 block">Total</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-400">Completed</span>
                      <span className="text-slate-200 font-semibold ml-auto">12 (60%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-slate-400">In Progress</span>
                      <span className="text-slate-200 font-semibold ml-auto">5 (25%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="text-slate-400">Overdue</span>
                      <span className="text-slate-200 font-semibold ml-auto">3 (15%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-widget 4: Top Compliance Risks with Explainable Priority Inspector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-300">Top Compliance Risks</div>
                  <span className="text-[10px] text-blue-400 font-medium">Control Tower</span>
                </div>
                <div className="h-28 bg-[#141C2B]/60 rounded-xl p-2 flex flex-col justify-between border border-slate-800/60 text-xs">
                  <button
                    onClick={() => setModalState({
                      isOpen: true,
                      type: 'why-priority',
                      data: {
                        title: 'GST Monthly Return (GSTR-3B) Filing Due',
                        category: 'Statutory Taxation',
                        priority: 'High',
                        authority: 'CBIC / GSTN',
                        due_date: 'Due in 3 days',
                        priority_score: 94,
                        weighted_factors: {
                          'Statutory Penalty Impact': 40,
                          'Urgency / Days Remaining': 28,
                          'Business Operational Risk': 16,
                          'Audit & Scrutiny Trigger': 10
                        },
                        rationale: 'Failing to file GSTR-3B leads to automatic ₹50/day late fees, input tax credit blockages for buyers, and automated scrutiny summons under CGST Act Section 47.',
                        consequences: [
                          'Mandatory late fee of ₹50 per day of delay under CGST Act Sec 47',
                          'Interest at 18% per annum on unpaid tax under Sec 50',
                          'E-way bill generation blocking after 2 consecutive non-filing months'
                        ],
                        recommended_action: 'Generate draft GSTR-3B challan, reconcile outward GSTR-1 supply registers, and complete online return filing.'
                      }
                    })}
                    className="w-full flex items-center justify-between p-1 rounded hover:bg-[#1E293B] text-left transition-colors cursor-pointer group"
                    title="Inspect why this is prioritized as High"
                  >
                    <span className="text-slate-200 text-[11px] truncate group-hover:text-blue-400">1 GST Filing Due</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800 shrink-0">
                      Why? 94/100
                    </span>
                  </button>

                  <button
                    onClick={() => setModalState({
                      isOpen: true,
                      type: 'why-priority',
                      data: {
                        title: 'Fire Safety Certificate Renewal Audit',
                        category: 'Life & Physical Safety',
                        priority: 'Medium',
                        authority: 'State Fire & Rescue Services',
                        due_date: 'Due in 15 days',
                        priority_score: 76,
                        weighted_factors: {
                          'Statutory Penalty Impact': 30,
                          'Urgency / Days Remaining': 22,
                          'Business Operational Risk': 14,
                          'Audit & Scrutiny Trigger': 10
                        },
                        rationale: 'Operating without a certified fire safety certificate exposes commercial premises to immediate closure orders and invalidates property insurance policies.',
                        consequences: [
                          'Potential stop-work notice under State Fire Force Act',
                          'Nullification of commercial fire insurance coverage',
                          'Municipal trade licence suspension'
                        ],
                        recommended_action: 'Conduct inspection of wet chemical extinguishers and schedule local fire department site verification.'
                      }
                    })}
                    className="w-full flex items-center justify-between p-1 rounded hover:bg-[#1E293B] text-left transition-colors cursor-pointer group"
                    title="Inspect why this is prioritized as Medium"
                  >
                    <span className="text-slate-200 text-[11px] truncate group-hover:text-blue-400">2 Fire Safety Audit</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800 shrink-0">
                      Why? 76/100
                    </span>
                  </button>

                  <button
                    onClick={() => setModalState({
                      isOpen: true,
                      type: 'why-priority',
                      data: {
                        title: 'Property Tax Challan Document Expiry',
                        category: 'Municipal & Document Vault',
                        priority: 'Low',
                        authority: 'Municipal Corporation',
                        due_date: 'Due in 30 days',
                        priority_score: 42,
                        weighted_factors: {
                          'Statutory Penalty Impact': 15,
                          'Urgency / Days Remaining': 12,
                          'Business Operational Risk': 10,
                          'Audit & Scrutiny Trigger': 5
                        },
                        rationale: 'Current year property tax assessment receipt is required for annual trade licence renewal.',
                        consequences: [
                          'Trade licence renewal application rejected until tax challan is attached'
                        ],
                        recommended_action: 'Upload latest paid property tax assessment challan to Document Vault.'
                      }
                    })}
                    className="w-full flex items-center justify-between p-1 rounded hover:bg-[#1E293B] text-left transition-colors cursor-pointer group"
                    title="Inspect why this is prioritized as Low"
                  >
                    <span className="text-slate-200 text-[11px] truncate group-hover:text-blue-400">3 Doc Expiry Review</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                      Why? 42/100
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (approx 35% width) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Upcoming Deadlines */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wide">Upcoming Deadlines</h3>
              <button
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                View Calendar
              </button>
            </div>

            <div className="space-y-3">
              {/* Item 1: May 15 */}
              <div className="flex items-center justify-between gap-3 p-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#141C2B] border border-slate-700/80 flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full bg-rose-600 text-white text-[9px] font-bold text-center leading-tight py-0.5">
                      MAY
                    </div>
                    <span className="text-sm font-black text-white leading-tight">15</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Fire Safety Certificate Renewal
                    </div>
                    <div className="text-[11px] text-slate-400">TN Fire &amp; Rescue</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-amber-400 shrink-0">Due in 2 days</span>
              </div>

              {/* Item 2: May 18 */}
              <div className="flex items-center justify-between gap-3 p-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#141C2B] border border-slate-700/80 flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full bg-rose-600 text-white text-[9px] font-bold text-center leading-tight py-0.5">
                      MAY
                    </div>
                    <span className="text-sm font-black text-white leading-tight">18</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Professional Tax Payment
                    </div>
                    <div className="text-[11px] text-slate-400">Labour Department</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-amber-400 shrink-0">Due in 5 days</span>
              </div>

              {/* Item 3: May 25 */}
              <div className="flex items-center justify-between gap-3 p-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#141C2B] border border-slate-700/80 flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full bg-rose-600 text-white text-[9px] font-bold text-center leading-tight py-0.5">
                      MAY
                    </div>
                    <span className="text-sm font-black text-white leading-tight">25</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      GST Return Filing (GSTR-3B)
                    </div>
                    <div className="text-[11px] text-slate-400">GST Department</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-amber-400 shrink-0">Due in 12 days</span>
              </div>

              {/* Item 4: Jun 10 */}
              <div className="flex items-center justify-between gap-3 p-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#141C2B] border border-slate-700/80 flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full bg-rose-600 text-white text-[9px] font-bold text-center leading-tight py-0.5">
                      JUN
                    </div>
                    <span className="text-sm font-black text-white leading-tight">10</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Shops &amp; Est. Return Filing
                    </div>
                    <div className="text-[11px] text-slate-400">Labour Department</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-400 shrink-0">Due in 28 days</span>
              </div>

              {/* Item 5: Jun 15 */}
              <div className="flex items-center justify-between gap-3 p-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#141C2B] border border-slate-700/80 flex flex-col items-center justify-center overflow-hidden shrink-0">
                    <div className="w-full bg-rose-600 text-white text-[9px] font-bold text-center leading-tight py-0.5">
                      JUN
                    </div>
                    <span className="text-sm font-black text-white leading-tight">15</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Trade Licence Renewal
                    </div>
                    <div className="text-[11px] text-slate-400">Tiruppur Municipal Corp.</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-400 shrink-0">Due in 33 days</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-center">
              <button
                onClick={() => onNavigate && onNavigate('compliance-tasks')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                View All Deadlines
              </button>
            </div>
          </div>

          {/* Card 2: Government Schemes For You */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wide">Government Schemes For You</h3>
              <button
                onClick={() => onNavigate && onNavigate('government-schemes')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Scheme 1 */}
              <div
                onClick={() => onNavigate && onNavigate('government-schemes')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/80 text-purple-400 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">ATUFS Scheme</div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Apparel Made-ups &amp; Home Furnishing
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    ₹25L Grant
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Scheme 2 */}
              <div
                onClick={() => onNavigate && onNavigate('government-schemes')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 text-blue-400 flex items-center justify-center shrink-0">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">CGTMSE Scheme</div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Collateral Free Loan for MSE
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                    Loan Support
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Scheme 3 */}
              <div
                onClick={() => onNavigate && onNavigate('government-schemes')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">PM SVANidhi</div>
                    <div className="text-[11px] text-slate-400 truncate">Street Vendor Scheme</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    ₹10K Loan
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Scheme 4 */}
              <div
                onClick={() => onNavigate && onNavigate('government-schemes')}
                className="p-3 rounded-xl bg-[#141C2B]/60 hover:bg-[#141C2B] border border-slate-800/80 flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      NSIC Performance &amp; Credit Rating
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">MSE Rating Benefits</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Priority Support
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: AI Compliance Advisor */}
          <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">AI Compliance Advisor</h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-950 text-blue-400 border border-blue-800">
                BETA
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Ask anything about licences, compliance, or regulations...
            </p>

            {/* Interactive Query Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskAi();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 bg-[#141C2B] border border-[#1E293B] focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={aiLoading || !aiInput.trim()}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-colors cursor-pointer shadow-sm shadow-blue-500/20 shrink-0"
                aria-label="Send Question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Loading or Answer Output Box */}
            {aiLoading && (
              <div className="p-3 bg-[#141C2B] rounded-xl border border-slate-800 text-xs text-slate-400 animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                Evaluating regulatory mandates for {businessName}...
              </div>
            )}

            {aiAnswer && (
              <div className="p-3.5 bg-[#141C2B] rounded-xl border border-blue-900/60 text-xs text-slate-200 leading-relaxed animate-in fade-in duration-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-400 text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Regulatory Assessment
                </div>
                <p>{aiAnswer}</p>
              </div>
            )}

            {/* Quick Suggestion Pills */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setAiInput('What licences are required?');
                  handleAskAi('What licences are required?');
                }}
                className="p-2 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] border border-slate-800/80 text-slate-300 hover:text-white text-[11px] text-left transition-colors cursor-pointer truncate"
              >
                What licences are required?
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiInput('Upcoming deadlines');
                  handleAskAi('Upcoming deadlines');
                }}
                className="p-2 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] border border-slate-800/80 text-slate-300 hover:text-white text-[11px] text-left transition-colors cursor-pointer truncate"
              >
                Upcoming deadlines
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiInput('How to renew trade licence?');
                  handleAskAi('How to renew trade licence?');
                }}
                className="p-2 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] border border-slate-800/80 text-slate-300 hover:text-white text-[11px] text-left transition-colors cursor-pointer truncate"
              >
                How to renew trade licence?
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiInput('Fire safety norms');
                  handleAskAi('Fire safety norms');
                }}
                className="p-2 rounded-xl bg-[#141C2B] hover:bg-[#1E293B] border border-slate-800/80 text-slate-300 hover:text-white text-[11px] text-left transition-colors cursor-pointer truncate"
              >
                Fire safety norms
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
