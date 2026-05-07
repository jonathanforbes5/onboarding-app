'use client';
import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Camera, Smile, Brain } from 'lucide-react';

const AVATAR_EMOJIS = [
  '🦊','🚀','⚡','🎯','🔥','💡','🏆','🦁','🐺','🌊',
  '🎸','🛡️','⚔️','🌟','🦅','🐯','🌙','☀️','🧠','💎',
  '🎲','🦈','🌿','🔑','🎩',
];

function resizeImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas unavailable')); return; }
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;
        ctx.drawImage(img, x, y, size, size, 0, 0, 100, 100);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ProfileSetupModal({ onClose }: { onClose: () => void }) {
  const { currentUser, updateUserProfile } = useApp();
  const [bio, setBio]               = useState(currentUser?.bio ?? '');
  const [goal, setGoal]             = useState(currentUser?.goal ?? '');
  const [avatar, setAvatar]         = useState(currentUser?.avatarEmoji ?? '');
  const [avatarUrl, setAvatarUrl]   = useState(currentUser?.avatarUrl ?? '');
  const [avatarTab, setAvatarTab]   = useState<'emoji' | 'photo'>(currentUser?.avatarUrl ? 'photo' : 'emoji');
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');
  const [photoLoading, setPhotoLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quiz reminder preference (default true)
  const getQuizPref = () => {
    if (!currentUser) return true;
    try { return localStorage.getItem(`ri_${currentUser.userKey}_quiz_reminder`) !== 'false'; } catch { return true; }
  };
  const [quizReminder, setQuizReminder] = useState(getQuizPref);

  if (!currentUser) return null;

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoLoading(true);
    setError('');
    try {
      const base64 = await resizeImageToBase64(file);
      setAvatarUrl(base64);
    } catch {
      setError('Could not process image. Please try a different file.');
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateUserProfile({
        bio: bio.trim(),
        goal: goal.trim(),
        avatarEmoji: avatarTab === 'emoji' ? avatar : '',
        avatarUrl: avatarTab === 'photo' ? avatarUrl : '',
      });
      // Persist quiz reminder pref
      if (currentUser) {
        try { localStorage.setItem(`ri_${currentUser.userKey}_quiz_reminder`, quizReminder ? 'true' : 'false'); } catch {}
      }
      onClose();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const C = {
    bg: '#0A0A0A', surf: '#141414', surf2: '#1C1C1C', border: '#2A2A2A',
    text: '#F5F5F5', muted: '#888', acc: '#F5C800',
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 20, padding: '28px 28px 24px', maxWidth: 460, width: '100%', fontFamily: 'Inter, system-ui, sans-serif', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Your Profile
            </div>
            <h2 style={{ color: C.text, fontSize: 18, fontWeight: 900, margin: 0 }}>
              Hey {currentUser.displayName}! Set up your profile.
            </h2>
            <p style={{ color: C.muted, fontSize: 12.5, margin: '6px 0 0', lineHeight: 1.5 }}>
              Shown in the team directory so your peers know who you are and what you&apos;re working toward.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 4, flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>

        {/* Avatar section */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ color: C.muted, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>
            Your avatar
          </label>

          {/* Tab toggle */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {(['emoji', 'photo'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAvatarTab(tab)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  backgroundColor: avatarTab === tab ? C.acc + '22' : C.surf2,
                  border: `1.5px solid ${avatarTab === tab ? C.acc : C.border}`,
                  color: avatarTab === tab ? C.acc : C.muted,
                  transition: 'all 0.1s',
                }}
              >
                {tab === 'emoji' ? <><Smile size={13} /> Choose emoji</> : <><Camera size={13} /> Upload photo</>}
              </button>
            ))}
          </div>

          {avatarTab === 'emoji' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {AVATAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setAvatar(avatar === emoji ? '' : emoji)}
                  style={{
                    width: 38, height: 38, borderRadius: 10, fontSize: 20,
                    backgroundColor: avatar === emoji ? C.acc + '22' : C.surf2,
                    border: `2px solid ${avatar === emoji ? C.acc : C.border}`,
                    cursor: 'pointer', transition: 'all 0.1s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <div>
              {avatarUrl ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={avatarUrl}
                    alt="Your photo"
                    style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.acc}` }}
                  />
                  <div>
                    <p style={{ color: C.text, fontSize: 13, margin: '0 0 6px' }}>Looking good!</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        padding: '5px 10px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                        backgroundColor: C.surf2, border: `1px solid ${C.border}`, color: C.muted,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      Change photo
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${C.border}`, borderRadius: 12, padding: '20px',
                    textAlign: 'center', cursor: 'pointer', backgroundColor: C.bg,
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.acc)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                >
                  {photoLoading ? (
                    <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Processing…</p>
                  ) : (
                    <>
                      <Camera size={24} color={C.muted} style={{ marginBottom: 8 }} />
                      <p style={{ color: C.muted, fontSize: 13, margin: '0 0 4px' }}>Click to upload a photo</p>
                      <p style={{ color: '#444', fontSize: 11, margin: 0 }}>JPG, PNG, WebP — cropped to square</p>
                    </>
                  )}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </div>
          )}
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ color: C.muted, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>
            Bio <span style={{ color: C.muted, fontWeight: 400, textTransform: 'none' }}>(one-liner — how you&apos;d describe yourself)</span>
          </label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={120}
            placeholder="e.g. Former sales manager, obsessed with systems and client results."
            style={{
              width: '100%', backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '10px 13px', color: C.text, fontSize: 13, outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box', transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
            onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
          />
        </div>

        {/* Goal */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: C.muted, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>
            Your goal{' '}
            <span style={{ color: C.muted, fontWeight: 400, textTransform: 'none' }}>
              (work or personal — what are you working toward?)
            </span>
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            maxLength={200}
            rows={2}
            placeholder="e.g. Buy a house by end of year, hit 30 accounts under management, get my Supra."
            style={{
              width: '100%', backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '10px 13px', color: C.text, fontSize: 13, outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box', resize: 'none', lineHeight: 1.5, transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
            onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
          />
        </div>

        {/* Quiz reminder toggle */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: C.muted, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>
            Preferences
          </label>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Brain size={16} color={quizReminder ? '#F5C800' : C.muted} />
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>Quiz reminders</div>
                <div style={{ color: C.muted, fontSize: 11 }}>Occasional knowledge-check prompts while browsing</div>
              </div>
            </div>
            <button
              onClick={() => setQuizReminder(v => !v)}
              style={{
                width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
                backgroundColor: quizReminder ? '#F5C800' : '#2A2A2A',
                position: 'relative', transition: 'background-color 0.2s', flexShrink: 0,
              }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: '50%', backgroundColor: '#fff',
                position: 'absolute', top: 3,
                left: quizReminder ? 21 : 3,
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>
        </div>

        {error && <p style={{ color: '#EF4444', fontSize: 12, marginBottom: 12 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              flex: 1, backgroundColor: saving ? '#1A1A00' : C.acc, color: saving ? '#555' : '#000',
              fontWeight: 800, fontSize: 13, padding: '11px', borderRadius: 10,
              border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            }}
          >
            {saving ? 'Saving…' : 'Save profile →'}
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent', color: C.muted, fontWeight: 600, fontSize: 13,
              padding: '11px 16px', borderRadius: 10, border: `1px solid ${C.border}`,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
