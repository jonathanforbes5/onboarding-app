'use client'

import { useState, type FormEvent } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { HealthRecordType, Person, HealthRecordValue } from '@/lib/types'

export interface HealthLogModalProps {
  open: boolean
  onClose: () => void
  person: Person
  type: HealthRecordType
  onSaved?: () => void
}

const FIELD_CLS = 'w-full px-4 py-2.5 rounded-2xl border border-cream-200 bg-white focus:border-lila-400 focus:ring-2 focus:ring-lila-100 outline-none text-sm'
const LABEL_CLS = 'block text-xs font-semibold text-cream-700 mb-1.5'

const TYPE_LABEL: Record<HealthRecordType, string> = {
  weight: 'Weight', height: 'Height', feeding: 'Feeding', sleep: 'Sleep',
  diaper: 'Diaper', temperature: 'Temperature', wellness: 'Wellness', mood_score: 'Mood',
}

export function HealthLogModal({ open, onClose, person, type, onSaved }: HealthLogModalProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weightAmount, setWeightAmount] = useState('')
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs')
  const [heightAmount, setHeightAmount] = useState('')
  const [heightUnit, setHeightUnit] = useState<'in' | 'cm'>('in')
  const [feedType, setFeedType] = useState<'breast' | 'bottle'>('breast')
  const [feedDuration, setFeedDuration] = useState('')
  const [feedAmount, setFeedAmount] = useState('')
  const [feedSide, setFeedSide] = useState<'left' | 'right' | 'both'>('left')
  const [sleepStart, setSleepStart] = useState('')
  const [sleepEnd, setSleepEnd] = useState('')
  const [diaperType, setDiaperType] = useState<'wet' | 'dirty' | 'both'>('wet')
  const [tempAmount, setTempAmount] = useState('')
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F')
  const [score, setScore] = useState(7)
  const [notes, setNotes] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    let value: HealthRecordValue
    try {
      switch (type) {
        case 'weight': value = { amount: parseFloat(weightAmount), unit: weightUnit }; break
        case 'height': value = { amount: parseFloat(heightAmount), unit: heightUnit }; break
        case 'feeding':
          value = { type: feedType, duration_minutes: feedDuration ? parseInt(feedDuration) : undefined, amount_oz: feedAmount ? parseFloat(feedAmount) : undefined, side: feedType === 'breast' ? feedSide : undefined }
          break
        case 'sleep':
          const start = new Date(sleepStart); const end = new Date(sleepEnd)
          value = { start: start.toISOString(), end: end.toISOString(), duration_minutes: Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000)) }
          break
        case 'diaper': value = { type: diaperType }; break
        case 'temperature': value = { amount: parseFloat(tempAmount), unit: tempUnit }; break
        case 'wellness': case 'mood_score': value = { score }; break
        default: throw new Error('Unknown record type')
      }
      const res = await fetch('/api/health', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ person, record_type: type, value, notes: notes || null }) })
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || 'Failed to save') }
      onSaved?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={`Log ${TYPE_LABEL[type]}`}>
      <form onSubmit={submit} className="space-y-4">
        {type === 'weight' && (
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2"><label className={LABEL_CLS}>Weight</label><input required type="number" step="0.01" min="0" value={weightAmount} onChange={(e) => setWeightAmount(e.target.value)} className={FIELD_CLS} placeholder="0.0" /></div>
            <div><label className={LABEL_CLS}>Unit</label><select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')} className={FIELD_CLS}><option value="lbs">lbs</option><option value="kg">kg</option></select></div>
          </div>
        )}
        {type === 'height' && (
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2"><label className={LABEL_CLS}>Height</label><input required type="number" step="0.1" min="0" value={heightAmount} onChange={(e) => setHeightAmount(e.target.value)} className={FIELD_CLS} placeholder="0.0" /></div>
            <div><label className={LABEL_CLS}>Unit</label><select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value as 'in' | 'cm')} className={FIELD_CLS}><option value="in">in</option><option value="cm">cm</option></select></div>
          </div>
        )}
        {type === 'feeding' && (
          <><div><label className={LABEL_CLS}>Type</label><div className="flex rounded-2xl bg-cream-100 p-1">{(['breast', 'bottle'] as const).map((t) => (<button key={t} type="button" onClick={() => setFeedType(t)} className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize ${feedType === t ? 'bg-white shadow-soft text-lila-700' : 'text-cream-600'}`}>{t}</button>))}</div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className={LABEL_CLS}>Duration (min)</label><input type="number" min="0" value={feedDuration} onChange={(e) => setFeedDuration(e.target.value)} className={FIELD_CLS} /></div>{feedType === 'bottle' ? <div><label className={LABEL_CLS}>Amount (oz)</label><input type="number" step="0.1" min="0" value={feedAmount} onChange={(e) => setFeedAmount(e.target.value)} className={FIELD_CLS} /></div> : <div><label className={LABEL_CLS}>Side</label><select value={feedSide} onChange={(e) => setFeedSide(e.target.value as 'left' | 'right' | 'both')} className={FIELD_CLS}><option value="left">Left</option><option value="right">Right</option><option value="both">Both</option></select></div>}</div></>
        )}
        {type === 'sleep' && (<div className="grid grid-cols-2 gap-2"><div><label className={LABEL_CLS}>Started</label><input required type="datetime-local" value={sleepStart} onChange={(e) => setSleepStart(e.target.value)} className={FIELD_CLS} /></div><div><label className={LABEL_CLS}>Ended</label><input required type="datetime-local" value={sleepEnd} onChange={(e) => setSleepEnd(e.target.value)} className={FIELD_CLS} /></div></div>)}
        {type === 'diaper' && (<div><label className={LABEL_CLS}>Type</label><div className="grid grid-cols-3 gap-2">{(['wet', 'dirty', 'both'] as const).map((t) => (<button key={t} type="button" onClick={() => setDiaperType(t)} className={`py-2.5 rounded-2xl border text-sm font-medium capitalize ${diaperType === t ? 'border-lila-400 bg-lila-50 text-lila-700' : 'border-cream-200 bg-white text-cream-600'}`}>{t}</button>))}</div></div>)}
        {type === 'temperature' && (<div className="grid grid-cols-3 gap-2"><div className="col-span-2"><label className={LABEL_CLS}>Temperature</label><input required type="number" step="0.1" value={tempAmount} onChange={(e) => setTempAmount(e.target.value)} className={FIELD_CLS} placeholder="98.6" /></div><div><label className={LABEL_CLS}>Unit</label><select value={tempUnit} onChange={(e) => setTempUnit(e.target.value as 'F' | 'C')} className={FIELD_CLS}><option value="F">°F</option><option value="C">°C</option></select></div></div>)}
        {(type === 'wellness' || type === 'mood_score') && (<div><label className={LABEL_CLS}>How are you feeling? <span className="text-lila-500">{score}/10</span></label><input type="range" min="1" max="10" value={score} onChange={(e) => setScore(parseInt(e.target.value))} className="w-full accent-lila-500" /><div className="flex justify-between text-[10px] text-cream-500 mt-1"><span>Rough</span><span>Great</span></div></div>)}
        <div><label className={LABEL_CLS}>Notes (optional)</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={FIELD_CLS} placeholder="Anything to remember…" /></div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <div className="flex gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} fullWidth type="button">Cancel</Button>
          <Button type="submit" loading={saving} fullWidth>Save</Button>
        </div>
      </form>
    </Modal>
  )
}
