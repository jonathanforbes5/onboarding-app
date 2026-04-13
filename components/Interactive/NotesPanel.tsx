'use client';
import React, { useState, useEffect } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

export function NotesPanel() {
  const { showNotes, setShowNotes, notes, saveNote, currentSection } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(notes[currentSection]?.text || '');
  }, [currentSection, notes]);

  const handleSave = () => {
    saveNote(currentSection, text);
  };

  const section = SECTIONS.find((s) => s.id === currentSection);

  if (!showNotes) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={() => setShowNotes(false)}>
      <div
        className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-brand-black text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-brand-yellow" />
            <span className="font-bold text-sm">My Notes</span>
          </div>
          <button onClick={() => setShowNotes(false)}>
            <X size={18} className="hover:text-brand-yellow transition-colors" />
          </button>
        </div>

        {/* Section context */}
        <div className="px-4 py-2 bg-brand-gray-light border-b border-brand-gray-mid flex-shrink-0">
          <span className="text-xs text-brand-gray">
            Section {currentSection}: {section?.title}
          </span>
        </div>

        {/* Textarea */}
        <textarea
          className="flex-1 p-4 text-sm resize-none outline-none font-sans"
          placeholder="Write your notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Footer */}
        <div className="p-4 border-t border-brand-gray-mid flex-shrink-0">
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-brand-yellow text-brand-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-yellow-dark transition-colors"
          >
            <Save size={14} />
            Save Note
          </button>
          {notes[currentSection]?.updatedAt && (
            <div className="text-xs text-brand-gray text-center mt-2">
              Last saved: {new Date(notes[currentSection].updatedAt).toLocaleString()}
            </div>
          )}
        </div>

        {/* All notes overview */}
        {Object.keys(notes).length > 0 && (
          <div className="border-t border-brand-gray-mid flex-shrink-0 max-h-40 overflow-y-auto">
            <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-gray bg-brand-gray-light">
              All Notes
            </div>
            {Object.entries(notes).map(([id, note]) => {
              const sec = SECTIONS.find((s) => s.id === Number(id));
              if (!note.text) return null;
              return (
                <div key={id} className="px-4 py-2 border-b border-brand-gray-mid last:border-0">
                  <div className="text-xs font-bold text-brand-black">{sec?.title}</div>
                  <div className="text-xs text-brand-gray mt-0.5 line-clamp-2">{note.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
