import React, { useState } from 'react';
import {
  FolderKanban,
  FileCheck,
  Clock,
  XCircle,
  UploadCloud,
  Eye,
  Download
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import { documentsStats, initialDocumentsList } from '../data/documentsData';

export default function DocumentsPage({ showToast, setModalState }) {
  const [documents, setDocuments] = useState(initialDocumentsList);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = ['All', 'Statutory License', 'Taxation', 'Environmental', 'Safety', 'Labor & HR'];
  const statuses = ['All', 'Verified', 'Pending', 'Rejected'];

  const filteredDocs = documents.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.relatedApproval.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || doc.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || doc.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const handleOpenUpload = () => {
    setModalState({
      isOpen: true,
      title: 'Upload Business Document',
      type: 'upload-document',
      data: {
        onUpload: (newDoc) => {
          setDocuments((prev) => [newDoc, ...prev]);
          showToast(`Document "${newDoc.name}" uploaded successfully.`);
        },
      },
    });
  };

  const handleOpenDetail = (doc) => {
    setModalState({
      isOpen: true,
      title: doc.name,
      type: 'document-detail',
      data: doc,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Securely manage and track all business and compliance documents.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenUpload}
          className="self-start sm:self-auto text-xs font-semibold"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </Button>
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Total Documents</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{documentsStats.total}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Digital vault</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Verified</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{documentsStats.verified}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Authority approved</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Pending</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{documentsStats.pending}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Under department verification</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Rejected</div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 mt-1">{documentsStats.rejected}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Requires re-upload</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
            <XCircle className="w-5 h-5" />
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
            placeholder="Search documents, approvals..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Table / Card List */}
      {filteredDocs.length === 0 ? (
        <EmptyState
          title="No documents found"
          description="Adjust your search filters or click Upload Document to add files to your vault."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setCategoryFilter('All');
            setStatusFilter('All');
          }}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px] bg-slate-50/50">
                  <th className="py-3.5 px-4">Document Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Related Approval</th>
                  <th className="py-3.5 px-4">Uploaded</th>
                  <th className="py-3.5 px-4">Expiry Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] border border-blue-100 shrink-0">
                          {doc.fileType}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {doc.name}
                          </div>
                          <span className="text-[11px] text-slate-400">{doc.fileSize}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{doc.category}</td>
                    <td className="py-4 px-4 text-slate-900 font-medium">{doc.relatedApproval}</td>
                    <td className="py-4 px-4 text-slate-500">{doc.uploadDate}</td>
                    <td className="py-4 px-4 text-slate-500">{doc.expiryDate}</td>
                    <td className="py-4 px-4">
                      <Badge variant={doc.status} withDot>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(doc)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-colors cursor-pointer"
                          title="Preview Document"
                          aria-label="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => showToast(`Downloading ${doc.name}...`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                          title="Download File"
                          aria-label="Download File"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] border border-blue-100">
                      {doc.fileType}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{doc.name}</h3>
                      <span className="text-[10px] text-slate-400">{doc.fileSize} • {doc.category}</span>
                    </div>
                  </div>
                  <Badge variant={doc.status} withDot size="xs">
                    {doc.status}
                  </Badge>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg space-y-1">
                  <div><strong>Approval:</strong> {doc.relatedApproval}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Uploaded: {doc.uploadDate}</span>
                    <span>Expiry: {doc.expiryDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleOpenDetail(doc)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => showToast(`Downloading ${doc.name}...`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}