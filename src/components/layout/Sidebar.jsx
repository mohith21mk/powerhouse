import React from 'react';
import {
  LayoutDashboard,
  Building2,
  FileCheck,
  CheckSquare,
  FolderKanban,
  Send,
  Landmark,
  BellRing,
  BarChart3,
  Settings,
  ShieldCheck,
  Headphones,
  X,
  ChevronRight
} from 'lucide-react';
import { navItems } from '../../data/mockData';

const iconMap = {
  LayoutDashboard,
  Building2,
  FileCheck,
  CheckSquare,
  FolderKanban,
  Send,
  Landmark,
  BellRing,
  BarChart3,
  Settings,
};

export default function Sidebar({
  activeNav,
  setActiveNav,
  mobileOpen,
  setMobileOpen,
  onContactSupport,
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/30 ring-1 ring-blue-400/30">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-tight leading-none">
                POWER HOUSE
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-1 tracking-normal">
                Business Intelligence Platform
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
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu Navigation
          </div>
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  if (mobileOpen) setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-blue-700'
                        : 'bg-blue-950 text-blue-400 border border-blue-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Support Card in Sidebar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 rounded-md bg-blue-950 text-blue-400 border border-blue-900/50">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-white">Need Help?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Connect with our compliance and approval experts for assistance.
            </p>
            <button
              onClick={onContactSupport}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-100 text-xs font-medium border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Contact Support</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
