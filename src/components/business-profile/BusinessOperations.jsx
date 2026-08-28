import React from 'react';
import {
  Cog,
  Workflow,
  Factory,
  ArrowDownLeft,
  ArrowUpRight,
  Leaf,
  Activity
} from 'lucide-react';
import ProfileField from '../shared/ProfileField';
import Badge from '../ui/Badge';
import { profileOptions } from '../../data/businessProfileData';

export default function BusinessOperations({ data, isEditing, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
          <Cog className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Business Operations
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Information about your business activities and operations.
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="mt-4 divide-y divide-slate-50">
        <ProfileField
          label="Primary Activity"
          value={data.primaryActivity}
          name="primaryActivity"
          isEditing={isEditing}
          onChange={onChange}
          icon={Workflow}
          placeholder="e.g. Manufacturing Industrial Equipment"
        />

        <ProfileField
          label="Secondary Activities"
          value={data.secondaryActivities}
          name="secondaryActivities"
          isEditing={isEditing}
          onChange={onChange}
          icon={Workflow}
          placeholder="e.g. Equipment Assembly, Distribution"
        />

        <ProfileField
          label="Manufacturing Activity"
          value={data.manufacturingActivity}
          name="manufacturingActivity"
          type="select"
          options={profileOptions.yesNoOptions}
          isEditing={isEditing}
          onChange={onChange}
          icon={Factory}
          badge={
            <Badge variant={data.manufacturingActivity === 'Yes' ? 'Completed' : 'Upcoming'} withDot>
              {data.manufacturingActivity}
            </Badge>
          }
        />

        <ProfileField
          label="Import Activities"
          value={data.importActivities}
          name="importActivities"
          type="select"
          options={profileOptions.yesNoOptions}
          isEditing={isEditing}
          onChange={onChange}
          icon={ArrowDownLeft}
          badge={
            <Badge variant={data.importActivities === 'Yes' ? 'In Progress' : 'Upcoming'} withDot>
              {data.importActivities}
            </Badge>
          }
        />

        <ProfileField
          label="Export Activities"
          value={data.exportActivities}
          name="exportActivities"
          type="select"
          options={profileOptions.yesNoOptions}
          isEditing={isEditing}
          onChange={onChange}
          icon={ArrowUpRight}
          badge={
            <Badge variant={data.exportActivities === 'Yes' ? 'Completed' : 'Upcoming'}>
              {data.exportActivities}
            </Badge>
          }
        />

        <ProfileField
          label="Environmental Impact"
          value={data.environmentalImpact}
          name="environmentalImpact"
          type="select"
          options={profileOptions.environmentalImpacts}
          isEditing={isEditing}
          onChange={onChange}
          icon={Leaf}
          badge={
            <Badge variant={data.environmentalImpact === 'Moderate' ? 'Pending' : 'In Progress'} withDot>
              {data.environmentalImpact}
            </Badge>
          }
        />

        <ProfileField
          label="Operating Status"
          value={data.operatingStatus}
          name="operatingStatus"
          type="select"
          options={profileOptions.operatingStatuses}
          isEditing={isEditing}
          onChange={onChange}
          icon={Activity}
          badge={
            <Badge variant={data.operatingStatus === 'Active' ? 'Approved' : 'Pending'} withDot>
              {data.operatingStatus}
            </Badge>
          }
        />
      </div>
    </div>
  );
}