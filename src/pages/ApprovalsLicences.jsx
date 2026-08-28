import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Building,
  ArrowRight,
  Milestone
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import { approvalsStats, approvalsList } from '../data/approvalsData';

export default function ApprovalsLicences({ onNavigateToRoadmap, setModalState, showToast }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', 'Business Registration', 'Environmental', 'Safety', 'Utilities', 'Labour', 'Taxation'];
  const statuses = ['All', 'Completed', 'In Progress', 'Pending'];

  const filteredApprovals = approvalsList
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.authority.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'priority') return a.priority === 'High' ? -1 : 1;
      return 0;
    });

  const handleOpenDetails = (approval) => {
    setModalState({
      isOpen: true,
      title: approval.name,
      type: 'approval-detail',
      data: approval,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Approvals & Licences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage all approvals, licences, and regulatory requirements applicable to your business.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            onNavigateToRoadmap();
            showToast('Navigated to Approval Roadmap.');
          }}
          className="self-start sm:self-auto text-xs font-semibold"
        >
          <Milestone className="w-3.5 h-3.5" />
          <span>View Approval Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Total Approvals</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{approvalsStats.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Statutory mapped</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Completed</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{approvalsStats.completed}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Licenses active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">In Progress</div>
            <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">{approvalsStats.inProgress}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Under department audit</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Pending</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{approvalsStats.pending}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Application queue</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
            <AlertCircle className="w-5 h-5" />
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
            placeholder="Search approvals, authorities..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                Status: {st}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Approvals Grid */}
      {filteredApprovals.length === 0 ? (
        <EmptyState
          title="No approvals match your filter"
          description="Try resetting your search query or selecting 'All' for status and category filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setStatusFilter('All');
            setCategoryFilter('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredApprovals.map((approval) => (
            <div
              key={approval.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {approval.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        approval.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {approval.priority} Priority
                    </span>
                  </div>
                  <Badge variant={approval.status} withDot size="xs">
                    {approval.status}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-3">
                  {approval.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{approval.authority}</span>
                </div>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                  {approval.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600">Application Progress</span>
                    <span className="font-bold text-slate-900">{approval.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        approval.status === 'Completed'
                          ? 'bg-emerald-500'
                          : approval.status === 'In Progress'
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${approval.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta details */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>{approval.documentsCount} Documents</span>
                  </div>
                  <span className="font-medium text-slate-500">{approval.dueDate}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenDetails(approval)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold border border-slate-200/80 hover:border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}