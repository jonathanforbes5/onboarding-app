export type UserRole = 'admin' | 'family'

export type Mood = 'happy' | 'grateful' | 'tired' | 'overwhelmed' | 'proud' | 'emotional' | 'peaceful'

export type Person = 'lilakae' | 'andrew' | 'shania'

export type HealthRecordType = 'weight' | 'height' | 'feeding' | 'sleep' | 'diaper' | 'temperature' | 'wellness' | 'mood_score'

export type MilestoneCategory = 'physical' | 'cognitive' | 'social' | 'feeding' | 'sleep' | 'custom'

export type EventType = 'gathering' | 'milestone' | 'appointment' | 'celebration' | 'other'

export type RsvpStatus = 'going' | 'maybe' | 'not_going'

export type ReactionEntityType = 'diary_entry' | 'milestone' | 'announcement'

export interface Profile {
  id: string
  full_name: string
  nickname: string | null
  role: UserRole
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Invite {
  id: string
  code: string
  email: string | null
  name: string | null
  role: UserRole
  created_by: string | null
  used_by: string | null
  used_at: string | null
  expires_at: string
  created_at: string
}

export interface DiaryEntry {
  id: string
  title: string | null
  content: string
  mood: Mood | null
  entry_date: string
  photos: string[] | null
  tags: string[] | null
  is_milestone: boolean
  author_id: string | null
  created_at: string
  updated_at: string
  author?: Profile
  reactions?: Reaction[]
  comments?: Comment[]
  _count?: { reactions: number; comments: number }
}

export interface WeightValue { amount: number; unit: 'lbs' | 'oz' | 'kg' | 'g' }
export interface HeightValue { amount: number; unit: 'in' | 'cm' }
export interface FeedingValue { type: 'breast' | 'bottle'; duration_minutes?: number; amount_oz?: number; side?: 'left' | 'right' | 'both' }
export interface SleepValue { start: string; end: string; duration_minutes: number }
export interface DiaperValue { type: 'wet' | 'dirty' | 'both' }
export interface TemperatureValue { amount: number; unit: 'F' | 'C' }
export interface WellnessValue { score: number }
export interface MoodScoreValue { score: number; mood?: string }

export type HealthRecordValue = WeightValue | HeightValue | FeedingValue | SleepValue | DiaperValue | TemperatureValue | WellnessValue | MoodScoreValue

export interface HealthRecord {
  id: string
  person: Person
  record_type: HealthRecordType
  value: HealthRecordValue
  notes: string | null
  recorded_at: string
  created_by: string | null
  created_by_profile?: Profile
}

export interface Milestone {
  id: string
  title: string
  description: string | null
  milestone_date: string
  category: MilestoneCategory
  photo_url: string | null
  age_weeks: number | null
  created_by: string | null
  created_at: string
  created_by_profile?: Profile
}

export interface Announcement {
  id: string
  title: string
  content: string
  pinned: boolean
  emoji: string
  author_id: string | null
  created_at: string
  author?: Profile
}

export interface Event {
  id: string
  title: string
  description: string | null
  event_date: string
  location: string | null
  cover_photo: string | null
  event_type: EventType
  created_by: string | null
  created_at: string
  rsvps?: EventRsvp[]
  rsvp_counts?: { going: number; maybe: number; not_going: number }
  my_rsvp?: RsvpStatus | null
}

export interface EventRsvp {
  id: string
  event_id: string
  user_id: string
  status: RsvpStatus
  created_at: string
  profile?: Profile
}

export interface Reaction {
  id: string
  entity_type: ReactionEntityType
  entity_id: string
  user_id: string
  emoji: string
  created_at: string
  profile?: Profile
}

export interface Comment {
  id: string
  entity_type: string
  entity_id: string
  user_id: string
  content: string
  created_at: string
  profile?: Profile
}

export const MOOD_EMOJI: Record<Mood, string> = {
  happy: '😊', grateful: '🙏', tired: '😴', overwhelmed: '🥺', proud: '🥹', emotional: '🥲', peaceful: '☺️',
}

export const MOOD_LABEL: Record<Mood, string> = {
  happy: 'Happy', grateful: 'Grateful', tired: 'Tired', overwhelmed: 'Overwhelmed', proud: 'Proud', emotional: 'Emotional', peaceful: 'Peaceful',
}

export const CATEGORY_EMOJI: Record<MilestoneCategory, string> = {
  physical: '🏃', cognitive: '🧠', social: '💬', feeding: '🍼', sleep: '😴', custom: '⭐',
}

export const CATEGORY_LABEL: Record<MilestoneCategory, string> = {
  physical: 'Physical', cognitive: 'Cognitive', social: 'Social', feeding: 'Feeding', sleep: 'Sleep', custom: 'Special',
}

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  gathering: 'Gathering', milestone: 'Milestone', appointment: 'Appointment', celebration: 'Celebration', other: 'Other',
}

export const REACTION_EMOJIS = ['❤️', '😊', '🥺', '😂', '🙏', '🎉'] as const
