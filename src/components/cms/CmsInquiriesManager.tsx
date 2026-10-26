import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ReservationInquiry } from '../../types/portfolio';
import { Mail, Calendar, Users, Clock, CheckCircle, Trash2, ArrowUpRight } from 'lucide-react';

export const CmsInquiriesManager: React.FC = () => {
  const { data, updateInquiryStatus, deleteInquiry } = usePortfolio();
  const [statusFilter, setStatusFilter] = useState<'all' | ReservationInquiry['status']>('all');

  const filteredInquiries = data.inquiries.filter((inq) => {
    if (statusFilter === 'all') return true;
    return inq.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Guest Reservations & Banquet Inquiries Inbox
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Review and track private dining inquiries submitted directly by patrons through the website consultation form
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#dfb877] bg-[#dfb877]/10 px-3 py-1.5 rounded-xl border border-[#dfb877]/25">
            {data.inquiries.filter((i) => i.status === 'new').length} New Pending Requests
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Inquiries' },
          { id: 'new', label: 'New Requests' },
          { id: 'contacted', label: 'In Correspondence' },
          { id: 'confirmed', label: 'Confirmed Banquets' },
          { id: 'archived', label: 'Archived' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === tab.id
                ? 'bg-[#dfb877] text-black font-semibold'
                : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inq) => (
          <div
            key={inq.id}
            className="glass-card rounded-2xl p-6 space-y-4 border border-[#dfb877]/20 hover:border-[#dfb877]/40 transition-all"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dfb877]/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-lg text-white">
                  {inq.fullName}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                    inq.status === 'new'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : inq.status === 'confirmed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : inq.status === 'contacted'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {inq.status}
                </span>
              </div>

              <div className="text-xs text-gray-400 font-mono">
                Received: {new Date(inq.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Banquet Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#0a0a0b]/60 p-3.5 rounded-xl border border-[#dfb877]/10">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#dfb877] font-semibold block">Experience</span>
                <span className="text-white font-medium">{inq.experienceType}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#dfb877] font-semibold block">Party Size</span>
                <span className="text-white font-medium">{inq.guests}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#dfb877] font-semibold block">Target Date</span>
                <span className="text-white font-medium">{inq.targetDate}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#dfb877] font-semibold block">Client Email</span>
                <a
                  href={`mailto:${inq.email}?subject=Private Dining Inquiry — Chef Chit Min Thu Atelier`}
                  className="text-[#f8e4be] hover:underline truncate block"
                >
                  {inq.email}
                </a>
              </div>
            </div>

            {/* Notes */}
            {inq.notes && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">
                  Dietary & Venue Specifications:
                </span>
                <p className="text-xs text-gray-300 font-light leading-relaxed bg-[#141416] p-3 rounded-xl border border-[#dfb877]/10">
                  {inq.notes}
                </p>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Update status:</span>
                <select
                  value={inq.status}
                  onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                  className="bg-[#0a0a0b] border border-[#dfb877]/30 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                >
                  <option value="new">Mark as New</option>
                  <option value="contacted">Mark as Contacted</option>
                  <option value="confirmed">Mark as Confirmed</option>
                  <option value="archived">Mark as Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <a
                  href={`mailto:${inq.email}?subject=Chef Chit Min Thu — Private Atelier Consultation`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs rounded-lg transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete inquiry from ${inq.fullName}?`)) {
                      deleteInquiry(inq.id);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredInquiries.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl space-y-2">
            <p className="text-gray-400 text-sm">No reservation requests in this status.</p>
          </div>
        )}
      </div>
    </div>
  );
};
