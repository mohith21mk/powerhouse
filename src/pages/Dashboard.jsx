import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import ApprovalRoadmap from '../components/dashboard/ApprovalRoadmap';
import ComplianceTasks from '../components/dashboard/ComplianceTasks';
import DocumentStatus from '../components/dashboard/DocumentStatus';
import RecommendedSchemes from '../components/dashboard/RecommendedSchemes';
import ApplicationTracking from '../components/dashboard/ApplicationTracking';
import Badge from '../components/ui/Badge';
import {
  summaryStats as mockSummaryStats,
  roadmapSteps as mockRoadmapSteps,
  complianceTasks as mockComplianceTasks,
  documentStatusData,
  recommendedSchemes as mockRecommendedSchemes,
  applicationTracking,
} from '../data/mockData';
import {
  X,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useBusinessAnalysis } from '../context/BusinessAnalysisContext';

export default function Dashboard({
  modalState,
  setModalState,
  onNavigate,
}) {
  const { analysisResult } = useBusinessAnalysis();

  // Dynamic KPI Stats wired to analysis results with seamless fallback to mock data
  const dynamicStats = mockSummaryStats.map((stat) => {
    if (!analysisResult || !analysisResult.summary) return stat;

    if (stat.id === 'approvals') {
      return {
        ...stat,
        value: analysisResult.summary.totalApprovals.toString(),
        trend: `${analysisResult.summary.highPriorityApprovals} High Priority`,
      };
    }
    if (stat.id === 'tasks') {
      return {
        ...stat,
        value: analysisResult.summary.complianceTasks.toString(),
        trend: `${analysisResult.summary.upcomingTasks} due soon`,
      };
    }
    if (stat.id === 'deadlines') {
      return {
        ...stat,
        value: analysisResult.summary.upcomingTasks.toString(),
        trend: 'Active calendar monitoring',
      };
    }
    if (stat.id === 'score') {
      return {
        ...stat,
        value: `${analysisResult.summary.complianceScore}%`,
        trend: `${analysisResult.riskLevel} Risk Profile`,
      };
    }
    return stat;
  });

  return (
    <div className="space-y-6">
      {/* Top 4 Summary Statistics */}
      <section aria-label="Key Performance Indicators">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {dynamicStats.map((stat) => (
            <StatCard
              key={stat.id}
              item={stat}
              onClick={() =>
                setModalState({
                  isOpen: true,
                  title: stat.title,
                  type: 'stat',
                  data: stat,
                })
              }
            />
          ))}
        </div>
      </section>

      {/* Main Content Layout Grid */}
      {/* Desktop: Left 65-70% / Right 30-35% */}
      <section aria-label="Roadmap and Tasks Section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Approx 68% width on 12 cols = 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: AI Approval Roadmap */}
            <ApprovalRoadmap
              steps={mockRoadmapSteps}
              onViewFullRoadmap={() =>
                setModalState({
                  isOpen: true,
                  title: 'AI-Generated Approval Roadmap',
                  type: 'roadmap',
                  data: mockRoadmapSteps,
                })
              }
            />

            {/* Section 2: Compliance Tasks */}
            <ComplianceTasks
              tasks={mockComplianceTasks}
              onViewAll={() =>
                setModalState({
                  isOpen: true,
                  title: 'All Compliance Tasks',
                  type: 'tasks',
                  data: mockComplianceTasks,
                })
              }
            />
          </div>

          {/* Right Column (Approx 32% width on 12 cols = 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Business Analysis Banner Card */}
            {analysisResult && (
              <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-blue-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-blue-200">Analysis Engine v1.0</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Live Active
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white leading-tight">
                    {analysisResult.summary.totalApprovals} Approvals Mapped
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    {analysisResult.insights?.[0]?.message || 'Personalized regulatory analysis generated for Powerhouse Industries.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-blue-200">{analysisResult.summary.recommendedSchemes} Schemes Matched</span>
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate('business-analysis');
                    }}
                    className="text-xs font-bold text-white hover:text-blue-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Right Widget 1: Document Status Donut Chart */}
            <DocumentStatus
              data={documentStatusData}
              onManageDocs={() =>
                setModalState({
                  isOpen: true,
                  title: 'Document Vault Management',
                  type: 'docs',
                  data: documentStatusData,
                })
              }
            />

            {/* Right Widget 2: Recommended Schemes */}
            <RecommendedSchemes
              schemes={mockRecommendedSchemes}
              onViewAll={() =>
                setModalState({
                  isOpen: true,
                  title: 'Eligible Government Schemes',
                  type: 'schemes',
                  data: mockRecommendedSchemes,
                })
              }
              onSchemeDetails={(scheme) =>
                setModalState({
                  isOpen: true,
                  title: scheme.title,
                  type: 'scheme-detail',
                  data: scheme,
                })
              }
            />
          </div>
        </div>
      </section>

      {/* Bottom Section: Full Width Application Tracking */}
      <section aria-label="Application Tracking Table">
        <ApplicationTracking
          applications={applicationTracking}
          onViewAll={() =>
            setModalState({
              isOpen: true,
              title: 'All Department Applications',
              type: 'applications',
              data: applicationTracking,
            })
          }
          onActionClick={(app) =>
            setModalState({
              isOpen: true,
              title: `Application: ${app.id}`,
              type: 'app-detail',
              data: app,
            })
          }
        />
      </section>

      {/* Interactive Details Modal for Prototype Interactions */}
      {modalState.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setModalState({ isOpen: false })}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {modalState.title}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    POWER HOUSE Intelligence View
                  </span>
                </div>
              </div>
              <button
                onClick={() => setModalState({ isOpen: false })}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 text-sm text-slate-600 space-y-4">
              {modalState.type === 'stat' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Current Metric
                    </span>
                    <span className="text-2xl font-bold text-slate-900">
                      {modalState.data?.value}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    This metric is continuously calculated based on active statutory mandates, factory inspections, and recurring compliance calendars.
                  </p>
                </div>
              )}

              {modalState.type === 'scheme-detail' && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                    <div className="text-xs font-semibold text-blue-800">
                      Subsidized Benefit
                    </div>
                    <div className="text-lg font-bold text-blue-950 mt-0.5">
                      {modalState.data?.benefit}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {modalState.data?.description}
                  </p>
                  <div className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Scheme Category:</span>
                      <span>{modalState.data?.badge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Eligibility Status:</span>
                      <span className="text-emerald-600 font-semibold">100% Pre-qualified</span>
                    </div>
                  </div>
                </div>
              )}

              {modalState.type === 'app-detail' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Department
                      </span>
                      <span className="font-semibold text-slate-800">
                        {modalState.data?.department}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Reference Number
                      </span>
                      <span className="font-mono text-slate-800 font-medium">
                        {modalState.data?.referenceNo || 'REF-992182'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-600 font-medium">Current Status:</span>
                    <Badge variant={modalState.data?.status} withDot>
                      {modalState.data?.status}
                    </Badge>
                  </div>
                </div>
              )}

              {modalState.type !== 'stat' &&
                modalState.type !== 'scheme-detail' &&
                modalState.type !== 'app-detail' && (
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Detailed view for <strong>{modalState.title}</strong> is active in this prototype session. All records are synchronized with state compliance databases.
                    </p>
                  </div>
                )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setModalState({ isOpen: false })}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Action logged for ${modalState.title}`);
                  setModalState({ isOpen: false });
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
              >
                Proceed / Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
