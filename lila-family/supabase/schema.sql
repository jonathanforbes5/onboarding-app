-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  nickname TEXT,
  role TEXT NOT NULL DEFAULT 'family' CHECK (role IN ('admin', 'family')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invites
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'family' CHECK (role IN ('admin', 'family')),
  created_by UUID REFERENCES profiles(id),
  used_by UUID REFERENCES profiles(id),
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Diary entries
CREATE TABLE diary_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('happy', 'grateful', 'tired', 'overwhelmed', 'proud', 'emotional', 'peaceful')),
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  photos TEXT[],
  tags TEXT[],
  is_milestone BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Health records
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person TEXT NOT NULL CHECK (person IN ('lilakae', 'andrew', 'shania')),
  record_type TEXT NOT NULL CHECK (record_type IN ('weight', 'height', 'feeding', 'sleep', 'diaper', 'temperature', 'wellness', 'mood_score')),
  value JSONB NOT NULL,
  notes TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Milestones
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  milestone_date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('physical', 'cognitive', 'social', 'feeding', 'sleep', 'custom')),
  photo_url TEXT,
  age_weeks INTEGER,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  pinned BOOLEAN DEFAULT FALSE,
  emoji TEXT DEFAULT '📢',
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  cover_photo TEXT,
  event_type TEXT DEFAULT 'gathering' CHECK (event_type IN ('gathering', 'milestone', 'appointment', 'celebration', 'other')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event RSVPs
CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL CHECK (status IN ('going', 'maybe', 'not_going')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Reactions
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('diary_entry', 'milestone', 'announcement')),
  entity_id UUID NOT NULL,
  user_id UUID REFERENCES profiles(id),
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, user_id)
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_diary_entries_date ON diary_entries(entry_date DESC);
CREATE INDEX idx_diary_entries_author ON diary_entries(author_id);
CREATE INDEX idx_health_records_person_type ON health_records(person, record_type);
CREATE INDEX idx_health_records_recorded ON health_records(recorded_at DESC);
CREATE INDEX idx_milestones_date ON milestones(milestone_date DESC);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_reactions_entity ON reactions(entity_type, entity_id);
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read profiles" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated can read diary entries" ON diary_entries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert diary entries" ON diary_entries FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update diary entries" ON diary_entries FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete diary entries" ON diary_entries FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read health records" ON health_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage health records" ON health_records FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read milestones" ON milestones FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage milestones" ON milestones FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read announcements" ON announcements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read events" ON events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage events" ON events FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Authenticated can read rsvps" ON event_rsvps FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can manage own rsvps" ON event_rsvps FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated can read reactions" ON reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can manage own reactions" ON reactions FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated can read comments" ON comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert comments" ON comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage invites" ON invites FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Anyone can read invites by code" ON invites FOR SELECT USING (true);

-- Storage buckets (run in Supabase dashboard SQL editor or Storage UI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('diary-photos', 'diary-photos', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('event-covers', 'event-covers', true);
