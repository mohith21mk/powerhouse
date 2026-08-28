import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import BusinessProfile from './pages/BusinessProfile';
import BusinessAnalysisPage from './pages/BusinessAnalysisPage';
import ApprovalsLicences from './pages/ApprovalsLicences';
import ComplianceTasksPage from './pages/ComplianceTasksPage';
import DocumentsPage from './pages/DocumentsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import {
  X,
  CheckCircle2,
  UploadCloud,
  AlertTriangle,
  FileCheck,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import Button from './components/ui/Button';
import { BusinessAnalysisProvider, useBusinessAnalysis } from './context/BusinessAnalysisContext';

function MainAppContent() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', type: '', data: null });
  const [toastMessage, setToastMessage] = useState(null);

  const { isAnalyzing, currentStepIndex, analysisSteps } = useBusinessAnalysis();

  // Form states for modals
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskApproval, setNewTaskApproval] = useState('Factory License');

  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Statutory License');
  const [newDocApproval, setNewDocApproval] = useState('Factory License');

  const [newAppDept, setNewAppDept] = useState('Directorate of Industries');
  const [newAppTitle, setNewAppTitle] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('All statutory compliance & application data refreshed successfully.');
    }, 800);
  };

  const handleContactSupport = () => {
    setModalState({
      isOpen: true,
      title: 'Powerhouse Dedicated Support',
      type: 'support',
      data: { message: 'Our compliance advisors are available 24/7 for filing assistance.' }
    });
  };

  const handleOpenNotification = (notif) => {
    setModalState({
      isOpen: true,
      title: notif.title || 'Notification Details',
      type: 'notification',
      data: notif
    });
  };

  const handleOpenProfile = (section) => {
    if (section === 'business') {
      setActiveNav('business-profile');
      showToast('Switched to Business Profile');
      return;
    }
    if (section === 'security') {
      setActiveNav('settings');
      showToast('Navigated to Compliance Settings');
      return;
    }
    setModalState({
      isOpen: true,
      title: 'Sign Out Confirmation',
      type: 'logout',
      data: { section }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 p-0.5"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Realistic Multi-Step Analysis Loading Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto shadow-xs">
                <BrainCircuit className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Executing Business Analysis Engine
              </h3>
              <p className="text-xs text-slate-500">
                Evaluating deterministic compliance rules for Powerhouse Industries...
              </p>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-medium">
              {analysisSteps.map((step, idx) => {
                const isPast = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 transition-all duration-150 ${
                      isPast
                        ? 'text-emerald-700 font-semibold'
                        : isCurrent
                        ? 'text-blue-700 font-bold'
                        : 'text-slate-400 opacity-60'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] shrink-0 text-slate-400">
                        {idx + 1}
                      </span>
                    )}
                    <span className="truncate">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onContactSupport={handleContactSupport}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px] transition-all duration-300">
        {/* Sticky Top Header */}
        <Header
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          onOpenMobileMenu={() => setMobileOpen(true)}
          onOpenProfile={handleOpenProfile}
          onOpenNotification={handleOpenNotification}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {activeNav === 'dashboard' && (
            <Dashboard
              modalState={modalState}
              setModalState={setModalState}
              onNavigate={(route) => setActiveNav(route)}
            />
          )}

          {activeNav === 'business-profile' && (
            <BusinessProfile
              showToast={showToast}
              setModalState={setModalState}
              onNavigate={(route) => setActiveNav(route)}
            />
          )}

          {activeNav === 'business-analysis' && (
            <BusinessAnalysisPage
              onNavigate={(route) => setActiveNav(route)}
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'approvals' && (
            <ApprovalsLicences
              onNavigateToRoadmap={() => setActiveNav('dashboard')}
              setModalState={setModalState}
              showToast={showToast}
            />
          )}

          {activeNav === 'compliance-tasks' && (
            <ComplianceTasksPage
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'documents' && (
            <DocumentsPage
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'applications' && (
            <ApplicationsPage
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'government-schemes' && (
            <GovernmentSchemesPage
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'alerts' && (
            <AlertsPage
              onNavigate={(route) => setActiveNav(route)}
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'reports' && (
            <ReportsPage
              showToast={showToast}
              setModalState={setModalState}
            />
          )}

          {activeNav === 'settings' && (
            <SettingsPage
              onNavigateToProfile={() => setActiveNav('business-profile')}
              showToast={showToast}
              setModalState={setModalState}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals for Entire Application */}
      {modalState.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setModalState({ isOpen: false, title: '', type: '', data: null })}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{modalState.title}</h3>
                  <span className="text-[11px] text-slate-400">POWER HOUSE Intelligence View</span>
                </div>
              </div>
              <button
                onClick={() => setModalState({ isOpen: false, title: '', type: '', data: null })}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Router by type */}
            <div className="py-5 text-sm text-slate-600 space-y-4">
              {modalState.type === 'stat' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Current Metric</span>
                    <span className="text-2xl font-bold text-slate-900">{modalState.data?.value}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    This metric is continuously calculated based on active statutory mandates, factory inspections, and recurring compliance calendars.
                  </p>
                </div>
              )}

              {modalState.type === 'approval-detail' && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <div className="text-xs text-slate-500 font-medium">Authority & Category</div>
                    <div className="font-bold text-slate-900">{modalState.data?.authority} • {modalState.data?.category}</div>
                    <p className="text-xs text-slate-600 mt-2">{modalState.data?.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900">Application Milestones</div>
                    <div className="space-y-1.5">
                      {modalState.data?.steps?.map((st, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                          <span>{st.name}</span>
                          <span className="font-bold text-blue-600">{st.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalState.type === 'add-task' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Hazardous waste audit report"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Related License</label>
                    <select
                      value={newTaskApproval}
                      onChange={(e) => setNewTaskApproval(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Factory License">Factory License</option>
                      <option value="Pollution Control NOC (CTO)">Pollution Control NOC (CTO)</option>
                      <option value="Fire Safety Certificate">Fire Safety Certificate</option>
                      <option value="Labour Establishment Registration">Labour Establishment Registration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                    <div className="flex gap-2">
                      {['High', 'Medium', 'Low'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setNewTaskPriority(p)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                            newTaskPriority === p
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalState.type === 'task-detail' && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="text-xs font-bold text-slate-900">{modalState.data?.title}</div>
                    <div className="text-xs text-slate-500">{modalState.data?.description}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Assignee</span>
                      <span className="font-bold text-slate-800">{modalState.data?.assignee}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Due Date</span>
                      <span className="font-bold text-slate-800">{modalState.data?.dueDate}</span>
                    </div>
                  </div>
                </div>
              )}

              {modalState.type === 'upload-document' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50 hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-800 block">Click to upload or drag & drop</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">PDF, DOCX, XLSX up to 25MB</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Factory Safety Plan 2026"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newDocCategory}
                        onChange={(e) => setNewDocCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Statutory License">Statutory License</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Safety">Safety</option>
                        <option value="Taxation">Taxation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Related License</label>
                      <select
                        value={newDocApproval}
                        onChange={(e) => setNewDocApproval(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Factory License">Factory License</option>
                        <option value="Pollution Control NOC (CTO)">Pollution Control NOC</option>
                        <option value="Fire Safety Certificate">Fire Safety Certificate</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {modalState.type === 'document-detail' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{modalState.data?.name}</div>
                      <div className="text-xs text-slate-400">{modalState.data?.category} • {modalState.data?.fileSize}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {modalState.data?.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <div>Uploaded on: <strong>{modalState.data?.uploadDate}</strong></div>
                    <div>Expiry: <strong>{modalState.data?.expiryDate}</strong></div>
                    <div>Verified by: <strong>{modalState.data?.verifiedBy}</strong></div>
                  </div>
                </div>
              )}

              {modalState.type === 'new-application' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Department</label>
                    <select
                      value={newAppDept}
                      onChange={(e) => setNewAppDept(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Directorate of Industries">Directorate of Industries</option>
                      <option value="Pollution Control Board">Pollution Control Board</option>
                      <option value="Fire & Emergency Services">Fire & Emergency Services</option>
                      <option value="Electricity Supply Board">Electricity Supply Board</option>
                      <option value="Labour Department">Labour Department</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Application Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Additional boiler installation consent"
                      value={newAppTitle}
                      onChange={(e) => setNewAppTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {modalState.type === 'application-timeline' && (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900">{modalState.data?.application}</div>
                    <div className="text-xs text-slate-500">{modalState.data?.department} • Ref: {modalState.data?.referenceNo}</div>
                  </div>

                  <div>
                    <div className="font-bold text-xs text-slate-900 mb-2">Stage Progression</div>
                    <div className="space-y-2">
                      {modalState.data?.stages?.map((stage, idx) => {
                        const isCurrent = stage === modalState.data?.currentStage;

                        return (
                          <div
                            key={stage}
                            className={`flex items-center gap-3 p-2.5 rounded-xl text-xs ${
                              isCurrent
                                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                                : 'text-slate-500 bg-slate-50'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-bold border border-slate-200">
                              {idx + 1}
                            </span>
                            <span>{stage}</span>
                            {isCurrent && <span className="ml-auto text-[10px] text-blue-600 uppercase font-bold">Active Stage</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {modalState.type === 'scheme-detail' && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="text-xs font-bold text-blue-800">Direct Subsidy Benefit</div>
                    <div className="text-lg font-black text-blue-950 mt-0.5">{modalState.data?.benefit}</div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs mb-1">Key Eligibility Criteria</div>
                    <ul className="list-disc list-inside text-slate-600 text-xs space-y-1">
                      {modalState.data?.eligibility?.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {modalState.type === 'report-generate' && (
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <div className="font-bold text-emerald-950 text-base">Executive Dossier Generated</div>
                    <div className="text-xs text-emerald-700">Verified for compliance audit requirements</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div>Organization: <strong>{modalState.data?.company}</strong></div>
                    <div>Statutory Score: <strong>{modalState.data?.score}</strong></div>
                    <div>Date of Compilation: <strong>{modalState.data?.generatedOn}</strong></div>
                  </div>
                </div>
              )}

              {modalState.type === 'delete-confirm' && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{modalState.data?.message}</span>
                </div>
              )}

              {modalState.type === 'support' && (
                <div className="space-y-3 text-xs leading-relaxed">
                  <p>{modalState.data?.message}</p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div>Toll-free Hotline: <strong>1800-419-7000</strong></div>
                    <div>Support Desk: <strong>compliance@powerhouse.in</strong></div>
                    <div>Working Hours: <strong>Mon - Sat (9:00 AM - 7:00 PM IST)</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setModalState({ isOpen: false, title: '', type: '', data: null })}
                className="text-xs font-semibold"
              >
                Close
              </Button>

              {modalState.type === 'add-task' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (!newTaskTitle) return;
                    modalState.data?.onAdd({
                      id: `task-${Date.now()}`,
                      title: newTaskTitle,
                      relatedApproval: newTaskApproval,
                      priority: newTaskPriority,
                      dueDate: 'Due in 14 days',
                      status: 'Upcoming',
                      assignee: 'Business Owner',
                      completed: false,
                    });
                    setNewTaskTitle('');
                    setModalState({ isOpen: false, title: '', type: '', data: null });
                  }}
                  className="text-xs font-semibold"
                >
                  Create Task
                </Button>
              )}

              {modalState.type === 'upload-document' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (!newDocName) return;
                    modalState.data?.onUpload({
                      id: `doc-${Date.now()}`,
                      name: newDocName,
                      category: newDocCategory,
                      relatedApproval: newDocApproval,
                      uploadDate: 'Just now',
                      expiryDate: '31 Dec 2026',
                      status: 'Verified',
                      fileType: 'PDF',
                      fileSize: '1.8 MB',
                      uploadedBy: 'Current User',
                      verifiedBy: 'Auto-verified',
                    });
                    setNewDocName('');
                    setModalState({ isOpen: false, title: '', type: '', data: null });
                  }}
                  className="text-xs font-semibold"
                >
                  Upload File
                </Button>
              )}

              {modalState.type === 'new-application' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (!newAppTitle) return;
                    modalState.data?.onSubmit({
                      id: `APP-2024-00${Math.floor(Math.random() * 90 + 10)}`,
                      department: newAppDept,
                      application: newAppTitle,
                      status: 'Submitted',
                      submissionDate: 'Just now',
                      updatedOn: 'Just now',
                      referenceNo: `REG/${Date.now().toString().slice(-4)}`,
                      currentStage: 'Submitted',
                      stages: ['Draft', 'Submitted', 'Under Review', 'Additional Documents', 'Approved'],
                    });
                    setNewAppTitle('');
                    setModalState({ isOpen: false, title: '', type: '', data: null });
                  }}
                  className="text-xs font-semibold"
                >
                  Submit Application
                </Button>
              )}

              {modalState.type === 'delete-confirm' && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    showToast('Local prototype data purged.');
                    setModalState({ isOpen: false, title: '', type: '', data: null });
                  }}
                  className="text-xs font-semibold"
                >
                  Confirm Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BusinessAnalysisProvider>
      <MainAppContent />
    </BusinessAnalysisProvider>
  );
}