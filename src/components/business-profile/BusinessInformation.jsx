import React from 'react';
import {
  Building2,
  Briefcase,
  Layers,
  Calendar,
  Users,
  IndianRupee,
  Factory
} from 'lucide-react';
import ProfileField from '../shared/ProfileField';
import { profileOptions } from '../../data/businessProfileData';

export default function BusinessInformation({ data, isEditing, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          <Building2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Business Information
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Basic information about your business.
          </p>
        </div>
      </div>

      {/* Fields List */}
      <div className="mt-4 divide-y divide-slate-50">
        <ProfileField
          label="Business Name"
          value={data.businessName}
          name="businessName"
          isEditing={isEditing}
          onChange={onChange}
          icon={Building2}
          placeholder="e.g. Powerhouse Industries"
        />

        <ProfileField
          label="Business Type"
          value={data.businessType}
          name="businessType"
          type="select"
          options={profileOptions.businessTypes}
          isEditing={isEditing}
          onChange={onChange}
          icon={Briefcase}
        />

        <ProfileField
          label="Industry"
          value={data.industry}
          name="industry"
          type="select"
          options={profileOptions.industries}
          isEditing={isEditing}
          onChange={onChange}
          icon={Factory}
        />

        <ProfileField
          label="Business Sector"
          value={data.sector}
          name="sector"
          type="select"
          options={profileOptions.sectors}
          isEditing={isEditing}
          onChange={onChange}
          icon={Layers}
        />

        <ProfileField
          label="Date of Establishment"
          value={data.establishedDate}
          name="establishedDate"
          isEditing={isEditing}
          onChange={onChange}
          icon={Calendar}
          placeholder="e.g. 15 March 2018"
        />

        <ProfileField
          label="Company Size"
          value={data.companySize}
          name="companySize"
          type="select"
          options={profileOptions.companySizes}
          isEditing={isEditing}
          onChange={onChange}
          icon={Users}
        />

        <ProfileField
          label="Number of Employees"
          value={data.employees?.toString()}
          name="employees"
          type="number"
          isEditing={isEditing}
          onChange={onChange}
          icon={Users}
          placeholder="85"
        />

        <ProfileField
          label="Annual Turnover"
          value={data.annualTurnover}
          name="annualTurnover"
          isEditing={isEditing}
          onChange={onChange}
          icon={IndianRupee}
          placeholder="₹12.5 Crore"
        />
      </div>
    </div>
  );
}