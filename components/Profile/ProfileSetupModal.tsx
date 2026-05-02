'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X } from 'lucide-react';

const AVATAR_EMOJIS = [
  '🦊','🚀','⚡','🎯','🔥','💡','🏆','🦁','🐺','🌊',
  '🎸','🛡️','⚔️','🌟','🦅','🐯','🌙','☀️','🧠','💎',
  '🎲','🦈','🌿','🔑','🎩',
];

export function ProfileSetupModal({ onClose }: { onClose: () => void }) {
  const { currentUser, updateUserProfile } = useApp();
  const [bio, setBio]               = useState(currentUser?.bio ?? '');
  const [goal, setGoal]             = useState(currentUser?.goal ?? '');
  const [avatar, setAvatar]         = useState(currentUser?.avatarEmoji ?? '');
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState('');

  if (!currentUser) return null;

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateUserProfile({ bio: bio.trim(), goal: goal.trim(), avatarEmoji: avatar });
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
        style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 20, padding: '28px 28px 24px', maxWidth: 460, width: '100%', fontFamily: 'Inter, system-ui, sans-serif' }}
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

        {/* Avatar emoji picker */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ color: C.muted, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>
            Choose your avatar
          </label>
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
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ color: C.muted, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>
            Bio <span style={{ color: C.muted, fontWeight: 400, textTransform: 'none' }}>(one-liner — how you'd describe yourself)</span>
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
            Your 30-day goal <span style={{ color: C.muted, fontWeight: 400, textTransform: 'none' }}>(what do you want to accomplish in your first month?)</span>
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            maxLength={200}
            rows={2}
            placeholder="e.g. Get fully operational on 20+ accounts and hit my first cycle billings."
            style={{
              width: '100%', backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '10px 13px', color: C.text, fontSize: 13, outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box', resize: 'none', lineHeight: 1.5, transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
            onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
          />
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
