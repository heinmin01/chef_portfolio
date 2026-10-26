import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, Upload, RotateCcw, Database, ShieldCheck, Check, AlertTriangle, Zap, Sparkles } from 'lucide-react';
import { FoodPhotoOptimizerModal } from './FoodPhotoOptimizerModal';

export const CmsSettingsManager: React.FC = () => {
  const { data, exportDataJson, importDataJson, resetToDefault } = usePortfolio();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(
    null
  );
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);

  const handleExportDownload = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chef_chit_min_thu_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;

    const ok = importDataJson(importJsonText);
    if (ok) {
      setImportStatus({ success: true, message: 'Portfolio database restored successfully!' });
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 4000);
    } else {
      setImportStatus({
        success: false,
        message: 'Invalid JSON schema. Please ensure the file contains valid portfolio data.',
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <h3 className="font-serif font-bold text-xl text-white">
          Data Governance, Backups & System Reset
        </h3>
        <p className="text-xs text-gray-400 font-light mt-1">
          Export your complete gastronomic portfolio as a portable JSON package, restore prior snapshots, or reset to original defaults
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center space-y-1">
          <div className="text-xl font-bold font-mono text-[#dfb877]">{data.dishes.length}</div>
          <div className="text-[10px] uppercase text-gray-400">Total Creations</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center space-y-1">
          <div className="text-xl font-bold font-mono text-[#dfb877]">{data.skills.length}</div>
          <div className="text-[10px] uppercase text-gray-400">Mastered Skills</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center space-y-1">
          <div className="text-xl font-bold font-mono text-[#dfb877]">{data.milestones.length}</div>
          <div className="text-[10px] uppercase text-gray-400">Career Stages</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center space-y-1">
          <div className="text-xl font-bold font-mono text-[#dfb877]">{data.inquiries.length}</div>
          <div className="text-[10px] uppercase text-gray-400">Reservation Leads</div>
        </div>
      </div>

      {/* Photo Optimizer Lab Utility Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border border-[#dfb877]/30 bg-gradient-to-r from-[#141416] to-[#1c1d22]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dfb877] text-black flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-base text-white">
                  Raw Food Photography Optimizer Lab
                </h4>
                <span className="text-[10px] font-bold text-[#dfb877] bg-[#dfb877]/10 px-2 py-0.5 rounded-full border border-[#dfb877]/25">
                  Web Engine
                </span>
              </div>
              <p className="text-xs text-gray-300 font-light mt-0.5">
                Drop uncompressed raw food photography from professional DSLR/mirrorless cameras to convert them into sub-second, low-latency WebP images.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOptimizerOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle whitespace-nowrap self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Optimizer Lab</span>
          </button>
        </div>
      </div>

      {/* Export Section */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#dfb877]/20 border border-[#dfb877]/30 flex items-center justify-center text-[#dfb877]">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-white">
              Export Portfolio Snapshot (JSON)
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Download all dishes, tasting notes, contact details, masteries, and inquiries into a standalone backup file
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleExportDownload}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup JSON</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1c1d22] border border-[#dfb877]/30 flex items-center justify-center text-[#dfb877]">
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-white">
              Import & Restore Portfolio Data
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Restore an existing backup by uploading a JSON file or pasting its JSON text
            </p>
          </div>
        </div>

        {importStatus && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              importStatus.success
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-300'
            }`}
          >
            {importStatus.success ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleImportSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#1c1d22] file:text-[#dfb877] hover:file:bg-[#25262c] cursor-pointer"
            />
          </div>

          <textarea
            rows={4}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder="Or paste backup JSON payload here..."
            className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#dfb877] resize-none"
          />

          <button
            type="submit"
            disabled={!importJsonText.trim()}
            className="px-6 py-2.5 bg-[#1c1d22] hover:bg-[#dfb877] text-white hover:text-black font-semibold text-xs uppercase tracking-wider border border-[#dfb877]/30 rounded-xl transition-all disabled:opacity-40"
          >
            Restore Backup
          </button>
        </form>
      </div>

      {/* Reset to Default */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 border-red-500/20 bg-red-950/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-white">
              Reset to Original Website Template
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Revert all changes and restore the original portfolio structure and seed data for Chef Chit Min Thu
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={resetToDefault}
            className="px-5 py-2.5 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/40 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            Reset All Portfolio Data
          </button>
        </div>
      </div>

      {/* Raw Food Photo Optimizer Lab Modal */}
      <FoodPhotoOptimizerModal
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        onApplyOptimizedImage={() => {
          setIsOptimizerOpen(false);
        }}
      />
    </div>
  );
};


