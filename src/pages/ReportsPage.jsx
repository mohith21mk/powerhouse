import React from 'react';
import {
  FileSpreadsheet,
  Award,
  CheckCircle2,
  FileCheck,
  CheckSquare,
  FolderKanban,
  Printer
} from 'lucide-react';
import Button from '../components/ui/Button';
import {
  reportsSummary,
  scoreTrend,
  approvalDistribution,
  taskDistribution,
  performanceSummary
} from '../data/reportsData';

export default function ReportsPage({ showToast, setModalState }) {
  const handleGenerateReport = () => {
    showToast('Generating official compliance dossier report...');
    setTimeout(() => {
      setModalState({
        isOpen: true,
        title: 'Compliance Executive Dossier (H1 2026)',
        type: 'report-generate',
        data: {
          company: 'Powerhouse Industries',
          score: '78%',
          generatedOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        },
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Reports & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View compliance health analytics, statutory audit reports, and business intelligence summaries.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Printing summary report...')}
            className="text-xs font-semibold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print View</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerateReport}
            className="text-xs font-semibold"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Generate Full Dossier</span>
          </Button>
        </div>
      </div>

      {/* Top 4 Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Overall Health Score</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{reportsSummary.complianceScore}%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">↑ +16% this quarter</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Approvals Acquired</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{reportsSummary.completedApprovals.done}/{reportsSummary.completedApprovals.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">3 in final audit</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Tasks Completed</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{reportsSummary.completedTasks.done}/{reportsSummary.completedTasks.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">33% workflow complete</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Verified Documents</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{reportsSummary.documentsVerified.done}/{reportsSummary.documentsVerified.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">70% digital vault secure</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shrink-0">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Row 1 Charts: Health Trend (Line) + Approval Distribution (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Score Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">Compliance Score Trend</h2>
              <p className="text-xs text-slate-500 mt-1">Monthly statutory index progression (Jan - Jun 2026)</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              +16 pts Growth
            </span>
          </div>

          {/* SVG Line Chart */}
          <div className="pt-4">
            <div className="relative h-44 w-full">
              <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="65" x2="500" y2="65" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                {/* Filled Area */}
                <path
                  d="M 20 120 L 110 105 L 200 85 L 290 70 L 380 45 L 470 20 L 470 140 L 20 140 Z"
                  fill="url(#lineGrad)"
                />

                {/* Smooth Polyline */}
                <path
                  d="M 20 120 L 110 105 L 200 85 L 290 70 L 380 45 L 470 20"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {[
                  { x: 20, y: 120, label: '62%' },
                  { x: 110, y: 105, label: '65%' },
                  { x: 200, y: 85, label: '68%' },
                  { x: 290, y: 70, label: '70%' },
                  { x: 380, y: 45, label: '74%' },
                  { x: 470, y: 20, label: '78%' },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                    <text x={pt.x} y={pt.y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-2 mt-2">
              {scoreTrend.map((item) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Approvals Status Donut (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-none">Approvals Breakdown</h2>
            <p className="text-xs text-slate-500 mt-1">12 total statutory approvals status</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            {/* SVG Donut Chart */}
            <div className="relative w-32 h-32 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Completed (33.3%) */}
                <path
                  className="text-emerald-500"
                  strokeDasharray="33.3, 100"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* In Progress (25%) */}
                <path
                  className="text-blue-500"
                  strokeDasharray="25, 100"
                  strokeDashoffset="-33.3"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Pending (41.7%) */}
                <path
                  className="text-amber-500"
                  strokeDasharray="41.7, 100"
                  strokeDashoffset="-58.3"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-900 leading-none">12</span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Total</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 text-xs w-full sm:w-auto">
              {approvalDistribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-medium">{item.label}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.count} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Task Distribution Bars + Key Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tasks Breakdown Bar Metrics (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-none">Compliance Tasks Overview</h2>
            <p className="text-xs text-slate-500 mt-1">18 total statutory tasks distribution</p>
          </div>

          <div className="space-y-4 pt-2">
            {taskDistribution.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.label}</span>
                  <span className="font-bold text-slate-900">{item.count} Tasks</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{
                      width: item.barHeight,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Strengths & Highlights (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-none">Statutory Highlights</h2>
            <p className="text-xs text-slate-500 mt-1">Key operational audit standing points</p>
          </div>

          <div className="space-y-3 pt-1">
            {performanceSummary.strongAreas.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}