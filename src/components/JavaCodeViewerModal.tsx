import React, { useState } from 'react';
import { JAVA_PROJECT_FILES, JavaFile } from '../data/javaCodeFiles';
import JSZip from 'jszip';
import {
  Code2,
  Copy,
  Check,
  Download,
  FolderArchive,
  FileCode,
  FileText,
  Search,
  X,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';

interface JavaCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaCodeViewerModal: React.FC<JavaCodeViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<JavaFile>(
    JAVA_PROJECT_FILES[0]
  );
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const filteredFiles = JAVA_PROJECT_FILES.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadSingleFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      JAVA_PROJECT_FILES.forEach((f) => {
        zip.file(f.path, f.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'EquipLink-Java-Complete-Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">
                  EquipLink Java Codebase Explorer
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Java 17+ / OOP / Swing / Spring
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Detailed Java classes, models, workflows, and Swing GUI matching
                all 25 wireframe pages.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAllZip}
              disabled={isZipping}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition"
              title="Download entire Java project as a ZIP archive"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>{isZipping ? 'Archiving...' : 'Download Project (.zip)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left File Tree & Right Code Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-80 border-r border-slate-800 bg-slate-950/50 flex flex-col shrink-0">
            {/* Search Filter */}
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Java files & classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Project Files ({filteredFiles.length})
              </div>
              {filteredFiles.map((file) => {
                const isSelected = selectedFile.name === file.name;
                const isJava = file.name.endsWith('.java');
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition ${
                      isSelected
                        ? 'bg-blue-600/20 border border-blue-500/40 text-blue-200'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    {isJava ? (
                      <FileCode
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isSelected ? 'text-blue-400' : 'text-amber-400'
                        }`}
                      />
                    ) : (
                      <FileText className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                    )}
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold truncate leading-tight">
                        {file.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {file.package}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Compiling Info Pill */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1 font-semibold text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compilation Tip</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                javac -d bin src/**/*.java
                <br />
                java -cp bin com.equiplink.Main
              </p>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            {/* File Path & Toolbar */}
            <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-mono text-slate-400 truncate text-[11px]">
                  {selectedFile.path}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-[11px]">
                  {selectedFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                  title="Copy Java code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadSingleFile}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                  title="Download single file"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed bg-[#0b132b]/80">
              <pre className="text-slate-200">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
