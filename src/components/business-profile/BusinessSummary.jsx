import React from 'react';
import {
  Briefcase,
  Factory,
  MapPin,
  Users,
  Calendar,
  Building2
} from 'lucide-react';

export default function BusinessSummary({ data }) {
  const summaryRows = [
    { label: 'Industry', value: data.industry, icon: Factory },
    { label: 'Location', value: data.operatingLocation || `${data.city}, ${data.state}`, icon: MapPin },
    { label: 'Business Size', value: data.companySize, icon: Briefcase },
    { label: 'Employees', value: `${data.employees} Staff`, icon: Users },
    { label: 'Operating Since', value: '2018', icon: Calendar },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Business Summary
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Fast overview snapshot.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {summaryRows.map((row, i) => {
          const Icon = row.icon;
          return (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-2xs">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {row.label}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900 text-right">
                {row.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}