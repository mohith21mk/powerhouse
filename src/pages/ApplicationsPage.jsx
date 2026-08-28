import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Building,
  Calendar,
  ChevronRight,
  Plus
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import { applicationsStats, initialApplicationsList } from '../data/applicationsData';

export default function ApplicationsPage({ showToast, setModalState }) {
  const [applications, setApplications] = useState(initialApplicationsList);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const departments = [
    'All',
    'Directorate of Industries',
    'Pollution Control Board',
    'Fire & Emergency Services',
    'Electricity Supply Board',
    'Labour Department',
  ];

  const statuses = ['All', 'Submitted', 'Under Review', 'Approved', 'Pending'];

  const filteredApps = applications.filter((app) => {
    const matchSearch =
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.application.toLowerCase().includes(search.toLowerCase()) ||
      app.department.toLowerCase().includes(search.toLowerCase()) ||
      app.referenceNo.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'All' || app.department === departmentFilter;
    const matchStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const handleOpenNewApplication = () => {
    setModalState({
      isOpen: true,
      title: 'Submit New Regulatory Application',
      type: 'new-application',
      data: {
        onSubmit: (newApp) => {
          setApplications((prev) => [newApp, ...prev]);
          showToast(`Application ${newApp.id} successfully lodged.`);
        },
      },
    });
  };

  const handleOpenDetail = (app) => {
    setModalState({
      isOpen: true,
      title: `Application Journey: ${app.id}`,
      type: 'application-timeline',
      data: app,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor and track your government and regulatory applications.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenNewApplication}
          className="self-start sm:self-auto text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Application</span>
        </Button>
      </div>

      {/* Top 5 Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Total Applications</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{applicationsStats.total}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Send className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Submitted</div>
            <div className="text-xl sm:text-2xl font-black text-sky-600 mt-1">{applicationsStats.submitted}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Under Review</div>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 mt-1">{applicationsStats.underReview}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Approved</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{applicationsStats.approved}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <div className="text-xs font-semibold text-slate-500">Pending Action</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{applicationsStats.pending}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search applications, ID, ref..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                Department: {d}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      {filteredApps.length === 0 ? (
        <EmptyState
          title="No applications found"
          description="Adjust your search filters or initiate a new statutory application."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setDepartmentFilter('All');
            setStatusFilter('All');
          }}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px] bg-slate-50/50">
                  <th className="py-3.5 px-4">Application ID</th>
                  <th className="py-3.5 px-4">Application Name</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4">Reference No</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-4 font-mono font-bold text-blue-600">
                      {app.id}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {app.application}
                    </td>
                    <td className="py-4 px-4 text-slate-600 flex items-center gap-1.5 mt-2.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{app.department}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        {app.currentStage}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-500 text-[11px]">
                      {app.referenceNo}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={app.status} withDot>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(app)}
                        className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-colors inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
                      >
                        <span>Timeline</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}