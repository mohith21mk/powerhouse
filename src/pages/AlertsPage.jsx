import React, { useState } from 'react';
import {
  BellRing,
  AlertTriangle,
  Clock,
  Info,
  CheckCheck,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import { alertsStats, initialAlertsList } from '../data/alertsData';

export default function AlertsPage({ onNavigate, showToast, setModalState }) {
  const [alerts, setAlerts] = useState(initialAlertsList);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const tabs = ['All', 'Critical', 'Upcoming', 'Information'];

  const handleMarkAsRead = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
    showToast('Alert marked as read.');
  };

  const handleMarkAllAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
    showToast('All alerts marked as read.');
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchSearch =
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.description.toLowerCase().includes(search.toLowerCase()) ||
      alert.category.toLowerCase().includes(search.toLowerCase());

    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Critical' && alert.severity === 'critical') ||
      (activeTab === 'Upcoming' && alert.severity === 'upcoming') ||
      (activeTab === 'Information' && alert.severity === 'information');

    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Alerts & Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Stay informed about compliance deadlines, renewals, and regulatory updates.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleMarkAllAsRead}
          className="self-start sm:self-auto text-xs font-semibold"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </Button>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Critical Alerts</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{alertsStats.critical}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Immediate action required</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Upcoming Deadlines</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{alertsStats.upcoming}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Due in next 14 days</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Information</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{alertsStats.information}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Advisories and scheme notifications</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Info className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Category Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full md:max-w-xs">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search alerts..."
          />
        </div>
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <EmptyState
          title="No alerts in this category"
          description="Adjust your search or filter tabs to review historical compliance notices."
          actionLabel="View All Alerts"
          onAction={() => {
            setSearch('');
            setActiveTab('All');
          }}
        />
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            const isUpcoming = alert.severity === 'upcoming';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-2xl border transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  !alert.read
                    ? isCritical
                      ? 'border-rose-200 bg-rose-50/20 shadow-2xs'
                      : isUpcoming
                      ? 'border-amber-200 bg-amber-50/20 shadow-2xs'
                      : 'border-blue-200 bg-blue-50/20 shadow-2xs'
                    : 'border-slate-200/90 bg-white opacity-80'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isCritical
                        ? 'bg-rose-100 text-rose-600'
                        : isUpcoming
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {isCritical ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : isUpcoming ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Info className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {alert.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                      <Calendar className="w-3 h-3" />
                      <span>{alert.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {!alert.read && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                    >
                      Mark as read
                    </button>
                  )}

                  {alert.actionRoute && (
                    <button
                      onClick={() => onNavigate(alert.actionRoute)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}