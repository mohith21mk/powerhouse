import React from 'react';
import { CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { profileStatusChecklist } from '../../data/businessProfileData';

export default function ProfileStatus({ checklist = profileStatusChecklist, completionPercentage = 85 }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Profile Status
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Section completion checklist
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {checklist.map((item) => {
          const isDone = item.status === 'Completed';

          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className="text-xs font-medium text-slate-700">
                  {item.label}
                </span>
              </div>

              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  isDone
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600">Profile Completion</span>
          <span className="font-bold text-blue-600">{completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}