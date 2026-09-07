import React from 'react';
import {
  LayoutDashboard,
  FileText,
  CalendarCheck,
  FolderLock,
  Send,
  Landmark,
  Bell,
  BarChart3,
  Brain,
  Settings,
  Headphones,
  Calendar,
  ChevronRight,
  ChevronDown,
  MapPin,
  X
} from 'lucide-react';
import { navItems } from '../../data/mockData';
import { useBusinessAnalysis } from '../../context/BusinessAnalysisContext';
import { useAuth } from '../../context/AuthContext';

const iconMap = {
  LayoutDashboard,
  FileText,
  CalendarCheck,
  FolderLock,
  Send,
  Landmark,
  Bell,
  BarChart3,
  Brain,
  Settings,
};

export default function Sidebar({
  activeNav,
  setActiveNav,
  mobileOpen,
  setMobileOpen,
  onContactSupport,
  onSwitchBusiness,
}) {
  const auth = useAuth();
  const { businessTemplateBundle, analysisResult, resetOnboarding } = useBusinessAnalysis();

  const userName = auth?.user?.fullName || 'Business Owner';
  const userInitials = auth?.user?.fullName
    ? auth.user.fullName
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'BO';

  const businessName = analysisResult?.businessSummary?.businessName || 'Tiruppur Textile Works';
  const categoryLabel = businessTemplateBundle?.meta?.categoryLabel || 'Clothing & Textile Retail';
  const city = analysisResult?.businessSummary?.city || 'Tiruppur';
  const state = analysisResult?.businessSummary?.state || 'Tamil Nadu';
  const locationString = `${city}, ${state}`;

  const unreadAlertsCount = (businessTemplateBundle?.alertsList || []).filter((a) => !a.read).length;

  const resolvedNavItems = navItems.map((item) =>
    item.id === 'alerts'
      ? { ...item, badge: unreadAlertsCount > 0 ? String(unreadAlertsCount) : '3' }
      : item
  );

  const handleSwitch = () => {
    if (onSwitchBusiness) {
      onSwitchBusiness();
    } else {
      resetOnboarding();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-[#0B0F17] text-slate-300 flex flex-col border-r border-[#1E293B] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10 shrink-0 p-0.5">
              <img src="/logo.png" alt="POWER HOUSE" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-tight leading-none uppercase">
                POWER HOUSE
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-1 tracking-normal">
                Compliance. Simplified.
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {resolvedNavItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive =
              activeNav === item.id ||
              (activeNav === 'dashboard' && item.id === 'overview') ||
              (activeNav === 'overview' && item.id === 'overview');

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id === 'overview' ? 'dashboard' : item.id);
                  if (mobileOpen) setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-[#141C2B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-blue-700'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800/80'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Business Context Section */}
          <div className="pt-5 pb-2">
            <div className="px-2 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              BUSINESS CONTEXT
            </div>
            <div className="bg-[#141C2B] border border-[#1E293B] rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-white text-xs truncate" title={businessName}>
                  {businessName}
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shrink-0">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight truncate">{categoryLabel}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{locationString}</span>
              </div>
              <button
                onClick={handleSwitch}
                className="w-full mt-1 py-1.5 px-3 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-slate-300 hover:text-white text-xs font-medium border border-slate-700/80 transition-colors text-center cursor-pointer"
              >
                Switch Business
              </button>
            </div>
          </div>

          {/* Need Expert Help Card */}
          <div className="pt-2 pb-2">
            <div className="bg-gradient-to-b from-[#141C2B] to-[#111827] border border-[#1E293B] rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/50">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-white">Need Expert Help?</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Talk to our compliance expert
              </p>
              <button
                onClick={onContactSupport}
                className="w-full py-1.5 px-3 rounded-lg bg-[#1E293B] hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-between transition-colors cursor-pointer mt-1"
              >
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Book Consultation</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Capsule at Bottom of Sidebar */}
        <div className="p-3 border-t border-[#1E293B] bg-[#0B0F17]">
          <div className="p-2 rounded-xl bg-[#111827] border border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {userInitials}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white leading-none truncate">
                  {userName}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  Business Owner
                </div>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
