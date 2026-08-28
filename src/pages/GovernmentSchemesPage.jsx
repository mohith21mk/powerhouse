import React, { useState } from 'react';
import {
  Landmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import { schemesHighlight, schemesList } from '../data/schemesData';

export default function GovernmentSchemesPage({ showToast, setModalState }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['All', 'Central Government Subsidy', 'State Industry Policy', 'Technology & Modernization', 'Foreign Trade Policy'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Government scheme database updated with live ministry data.');
    }, 600);
  };

  const filteredSchemes = schemesList.filter((scheme) => {
    const matchSearch = scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(search.toLowerCase()) ||
      scheme.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || scheme.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleOpenDetail = (scheme) => {
    setModalState({
      isOpen: true,
      title: scheme.name,
      type: 'scheme-detail',
      data: scheme,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Government Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover and apply for government incentives, subsidies, and schemes matching your profile.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleRefresh}
          className="self-start sm:self-auto text-xs font-semibold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          <span>Refresh Database</span>
        </Button>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-950/20 border border-blue-800/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{schemesHighlight.title}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {schemesHighlight.totalSchemes} Government Schemes Eligible for Powerhouse Industries
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {schemesHighlight.description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">{schemesHighlight.highMatch}</div>
              <div className="text-[10px] text-blue-200 uppercase font-semibold">High Priority</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">35%</div>
              <div className="text-[10px] text-emerald-200 uppercase font-semibold">Max Subsidy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search schemes, subsidies, keywords..."
          />
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length === 0 ? (
        <EmptyState
          title="No schemes matched your search"
          description="Adjust your search criteria or category filter to discover programs."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setCategoryFilter('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {scheme.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {scheme.matchPercentage}% Match
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-3">
                  {scheme.name}
                </h3>
                <span className="text-xs text-slate-400 font-medium block mt-0.5">
                  {scheme.officialSource}
                </span>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {scheme.description}
                </p>

                {/* Subsidized Benefit Callout */}
                <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-700">Financial Benefit</span>
                    <div className="text-xs font-bold text-blue-950 mt-0.5">{scheme.benefit}</div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Deadline: {scheme.deadline}</span>
                <button
                  onClick={() => handleOpenDetail(scheme)}
                  className="py-1.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}