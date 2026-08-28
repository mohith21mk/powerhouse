import React from 'react';
import {
  MapPin,
  Building,
  Navigation,
  Globe2,
  Compass,
  Map
} from 'lucide-react';
import ProfileField from '../shared/ProfileField';
import { profileOptions } from '../../data/businessProfileData';

export default function BusinessLocation({ data, isEditing, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Business Location
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Registered location and operating address.
          </p>
        </div>
      </div>

      {/* Content grid: Fields on left, Abstract Map placeholder on right */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 divide-y divide-slate-50">
          <ProfileField
            label="Registered Address"
            value={data.registeredAddress}
            name="registeredAddress"
            type="textarea"
            isEditing={isEditing}
            onChange={onChange}
            icon={Building}
            placeholder="Address..."
          />

          <ProfileField
            label="City"
            value={data.city}
            name="city"
            isEditing={isEditing}
            onChange={onChange}
            icon={Navigation}
            placeholder="e.g. Mumbai"
          />

          <ProfileField
            label="State"
            value={data.state}
            name="state"
            type="select"
            options={profileOptions.states}
            isEditing={isEditing}
            onChange={onChange}
            icon={Compass}
          />

          <ProfileField
            label="Country"
            value={data.country}
            name="country"
            isEditing={isEditing}
            onChange={onChange}
            icon={Globe2}
            placeholder="India"
          />

          <ProfileField
            label="PIN Code"
            value={data.pinCode}
            name="pinCode"
            isEditing={isEditing}
            onChange={onChange}
            icon={MapPin}
            placeholder="400093"
          />

          <ProfileField
            label="Operating Location"
            value={data.operatingLocation}
            name="operatingLocation"
            isEditing={isEditing}
            onChange={onChange}
            icon={Map}
            placeholder="Mumbai, Maharashtra"
          />
        </div>

        {/* Abstract Map Graphic Placeholder */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-xl border border-dashed border-slate-200 text-center min-h-[220px]">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <MapPin className="w-8 h-8 animate-bounce stroke-[2.2]" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold">
              ✓
            </span>
          </div>

          <span className="text-xs font-bold text-slate-800">
            {data.city}, {data.state}
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5">
            PIN: {data.pinCode} • Geo-verified
          </span>

          <div className="mt-3 px-3 py-1 bg-white rounded-md border border-slate-200 text-[10px] font-medium text-slate-600">
            Industrial Estate Jurisdiction: MIDC Andheri Zone
          </div>
        </div>
      </div>
    </div>
  );
}