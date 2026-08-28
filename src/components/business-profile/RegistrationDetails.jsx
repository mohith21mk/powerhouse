import React, { useState } from 'react';
import {
  FileCheck,
  Copy,
  Check,
  ShieldCheck,
  Award,
  Hash
} from 'lucide-react';
import Badge from '../ui/Badge';

export default function RegistrationDetails({ data, isEditing, onChange }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const regFields = [
    { label: 'CIN', key: 'cin', value: data.cin, icon: Hash, desc: 'Corporate Identification Number' },
    { label: 'PAN', key: 'pan', value: data.pan, icon: Award, desc: 'Permanent Account Number' },
    { label: 'GSTIN', key: 'gstin', value: data.gstin, icon: ShieldCheck, desc: 'Goods & Services Tax ID' },
    { label: 'MSME Registration', key: 'msmeRegistration', value: data.msmeRegistration, icon: FileCheck, isBadge: true },
    { label: 'Udyam Number', key: 'udyamNumber', value: data.udyamNumber, icon: Hash, desc: 'Ministry of MSME Identifier' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          <FileCheck className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Registration Details
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Statutory registration numbers and IDs.
          </p>
        </div>
      </div>

      {/* Grid of Registration Number Cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {regFields.map((item) => {
          const Icon = item.icon;
          const isCopied = copiedKey === item.key;

          return (
            <div
              key={item.key}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  <span className="text-xs font-semibold text-slate-600">
                    {item.label}
                  </span>
                </div>

                {!isEditing && item.value && !item.isBadge && (
                  <button
                    onClick={() => handleCopy(item.value, item.key)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                    title={`Copy ${item.label}`}
                    aria-label={`Copy ${item.label}`}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              <div className="mt-2">
                {isEditing ? (
                  <input
                    type="text"
                    name={item.key}
                    value={item.value || ''}
                    onChange={onChange}
                    className="w-full px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                ) : item.isBadge ? (
                  <div className="pt-0.5">
                    <Badge variant="Completed" withDot>
                      {item.value}
                    </Badge>
                  </div>
                ) : (
                  <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 tracking-tight select-all">
                    {item.value}
                  </div>
                )}

                {item.desc && (
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {item.desc}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}