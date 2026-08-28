import React, { useState } from 'react';
import {
  Building,
  Bell,
  Sliders,
  ShieldAlert,
  Pencil,
  Download,
  Trash2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { initialSettings } from '../data/settingsData';

export default function SettingsPage({ onNavigateToProfile, showToast, setModalState }) {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggleNotification = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    showToast('Notification preference updated.');
  };

  const handleDensityChange = (density) => {
    setSettings((prev) => ({
      ...prev,
      display: { ...prev.display, density },
    }));
    showToast(`Display density set to ${density}.`);
  };

  const handleOpenDeleteConfirm = () => {
    setModalState({
      isOpen: true,
      title: 'Delete Business Data Confirmation',
      type: 'delete-confirm',
      data: {
        message: 'This will purge local mock data for Powerhouse Industries. This action cannot be reversed.',
      },
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="pb-1">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your POWER HOUSE platform preferences.
        </p>
      </div>

      {/* Section 1: Business Settings */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                Business Settings
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Primary organization configuration
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={onNavigateToProfile}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Business Profile</span>
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Business Name</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{settings.business.name}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Industry & Sector</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{settings.business.industry}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Business Location</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{settings.business.location}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 font-medium block">Business Size</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{settings.business.size}</span>
          </div>
        </div>
      </div>

      {/* Section 2: Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-none">
              Notification Preferences
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select channels and frequency of compliance reminders
            </p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-100 text-xs">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive statutory audit digests and critical regulatory updates via email.' },
            { key: 'deadlineReminders', label: 'Deadline Reminders', desc: 'Alerts 7 days and 48 hours prior to compliance and filing deadlines.' },
            { key: 'documentExpiryAlerts', label: 'Document Expiry Alerts', desc: 'Notifications when licenses or NOC certificates near their expiration date.' },
            { key: 'schemeUpdates', label: 'Government Scheme Updates', desc: 'AI matching recommendations for newly announced central and state MSME subsidies.' },
          ].map((item) => {
            const isChecked = settings.notifications[item.key];

            return (
              <div key={item.key} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{item.label}</h3>
                  <p className="text-slate-500 mt-0.5">{item.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleNotification(item.key)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${
                    isChecked ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                  role="switch"
                  aria-checked={isChecked}
                  aria-label={item.label}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isChecked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Display Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-none">
              Display Preferences
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Customize dashboard layout and sidebar density
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 block">Dashboard Density</span>
            <div className="flex items-center gap-2 pt-1">
              {['Comfortable', 'Compact'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDensityChange(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    settings.display.density === d
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-bold text-slate-900 block">Sidebar Navigation</span>
            <div className="flex items-center gap-2 pt-1">
              {['Expanded', 'Collapsed'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSettings((prev) => ({ ...prev, display: { ...prev.display, sidebar: s } }));
                    showToast(`Sidebar mode set to ${s}.`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    settings.display.sidebar === s
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Data & Privacy */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-none">
              Data & Privacy
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Local enterprise storage and data portability
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Enterprise data sandbox settings opened.')}
            className="text-xs font-semibold"
          >
            <span>Manage Business Data</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Exporting business compliance vault JSON...')}
            className="text-xs font-semibold text-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Business Data</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleOpenDeleteConfirm}
            className="text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Delete Business Data</span>
          </Button>
        </div>
      </div>

      {/* Section 5: About POWER HOUSE */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-6 text-white border border-slate-700 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm">
            PH
          </div>
          <div>
            <h3 className="font-bold text-base text-white">{settings.about.platform}</h3>
            <span className="text-xs text-slate-400">{settings.about.subtitle}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-700/80 text-slate-300">
          <div>
            <span className="text-slate-400 block text-[11px]">Version</span>
            <span className="font-semibold">{settings.about.version}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Build</span>
            <span className="font-semibold">{settings.about.build}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Engine</span>
            <span className="font-semibold text-cyan-400">AI Roadmap v2.4</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Environment</span>
            <span className="font-semibold text-emerald-400">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}