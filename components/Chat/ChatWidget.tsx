'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, X, MessageSquare, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

interface FeedbackState {
  msgId: string;
  mode: 'idle' | 'thumbs-down' | 'submitted';
}

const SUGGESTED = [
  'How do I run a client onboarding call?',
  'What do I do when a client threatens to cancel?',
  'What is Layer 1 vs Layer 2?',
  'How do I brief Ken for creative requests?',
  'What should I check when a client is red?',
  'When do I escalate to Jonathan?',
];

const C = {
  bg: '#0A0A0A', surf: '#141414', surf2: '#1C1C1C', surf3: '#222',
  border: '#2A2A2A', border2: '#333',
  text: '#F5F5F5', muted: '#888', muted2: '#555',
  acc: '#F5C800', green: '#22C55E',
};

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';

  const escalateMatch = msg.content.match(/---ESCALATE---([\s\S]*?)---END---/);
  const mainContent = escalateMatch
    ? msg.content.replace(/---ESCALATE---([\s\S]*?)---END---/, '').trim()
    : msg.content;
  const escalateContent = escalateMatch ? escalateMatch[1].trim() : null;

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={i} style={{ color: isUser ? '#000' : '#fff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('`') && part.endsWith('`'))
        return <code key={i} style={{ backgroundColor: isUser ? 'rgba(0,0,0,0.1)' : '#2A2A2A', borderRadius: 4, padding: '1px 4px', fontSize: 11, fontFamily: 'monospace', color: isUser ? '#000' : C.acc }}>{part.slice(1, -1)}</code>;
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch)
        return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: isUser ? '#000' : C.acc, textDecoration: 'underline' }}>{linkMatch[1]}</a>;
      return part;
    });
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} style={{ margin: '4px 0', paddingLeft: 16 }}>
            {listItems.map((item, i) => (
              <li key={i} style={{ color: isUser ? '#000' : C.text, fontSize: 12.5, lineHeight: 1.6, marginBottom: 2 }}>
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, i) => {
      if (line.startsWith('### ') || line.startsWith('## ')) {
        flushList();
        elements.push(<strong key={i} style={{ color: isUser ? '#000' : C.acc, fontSize: 12, display: 'block', marginTop: 8 }}>{line.replace(/^#{2,3} /, '')}</strong>);
      } else if (line.match(/^[-•*] /) || line.match(/^\d+\. /)) {
        listItems.push(line.replace(/^[-•*] /, '').replace(/^\d+\. /, ''));
      } else if (line.trim() === '') {
        flushList();
        if (i > 0) elements.push(<div key={i} style={{ height: 4 }} />);
      } else {
        flushList();
        elements.push(<p key={i} style={{ color: isUser ? '#000' : C.text, fontSize: 12.5, lineHeight: 1.6, margin: '2px 0' }}>{renderInline(line)}</p>);
      }
    });
    flushList();
    return elements;
  };

  return (
    <div style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 7, marginBottom: 12, alignItems: 'flex-start' }}>
      {!isUser && (
        <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: C.acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0, fontWeight: 900, color: '#000' }}>
          RI
        </div>
      )}
      <div style={{ maxWidth: '85%', minWidth: 40 }}>
        <div style={{
          backgroundColor: isUser ? C.acc : C.surf2,
          border: `1px solid ${isUser ? 'transparent' : C.border}`,
          borderRadius: isUser ? '14px 14px 3px 14px' : '3px 14px 14px 14px',
          padding: '8px 11px',
        }}>
          {renderMarkdown(mainContent)}
        </div>
        {escalateContent && (
          <div style={{ marginTop: 6, backgroundColor: '#1A1200', border: '1px solid #F5C80033', borderRadius: 8, padding: '8px 11px' }}>
            <div style={{ color: C.acc, fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Suggested escalation</div>
            <pre style={{ color: '#ccc', fontSize: 11, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{escalateContent}</pre>
            <button onClick={() => navigator.clipboard?.writeText(escalateContent)} style={{ marginTop: 6, backgroundColor: '#F5C80022', border: '1px solid #F5C80044', borderRadius: 4, padding: '3px 8px', color: C.acc, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingDot() {
  return (
    <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: C.acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0, fontWeight: 900, color: '#000' }}>RI</div>
      <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: '3px 14px 14px 14px', padding: '10px 12px' }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: C.muted, animation: `wbounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes wbounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}`}</style>
    </div>
  );
}

const CHAT_DISABLED = false;

export function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [unread, setUnread]   = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [notConfigured, setNotConfigured] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText, open]);

  const send = async (question?: string) => {
    const text = (question ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text, id: Math.random().toString(36).slice(2) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreamText('');
    setFeedback(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        let errMsg = "Ask RI hit an error.";
        try {
          const d = await res.json();
          if (res.status === 503) {
            setNotConfigured(true);
            errMsg = "Ask RI isn't set up yet — the AI key hasn't been added. In the meantime you can submit questions using the thumbs-down button and we'll add answers.";
          } else {
            errMsg = `Ask RI error: ${d.error ?? res.status}`;
          }
        } catch { errMsg = `Ask RI error (${res.status}) — try again or ask Jonathan in Slack.`; }
        setMessages((prev) => [...prev, { role: 'assistant', content: errMsg, id: Math.random().toString(36).slice(2) }]);
        setLoading(false);
        if (open) inputRef.current?.focus();
        return;
      }
      setNotConfigured(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamText(full);
      }

      const msgId = Math.random().toString(36).slice(2);
      setMessages((prev) => [...prev, { role: 'assistant', content: full, id: msgId }]);
      setStreamText('');
      setFeedback({ msgId, mode: 'idle' });
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "I couldn't reach the AI right now. Please try again or ask Jonathan directly in Slack." }]);
    } finally {
      setLoading(false);
      if (open) inputRef.current?.focus();
    }
  };

  const submitFeedback = async () => {
    if (!feedbackText.trim() || !feedback) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    await fetch('/api/chat/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: lastUserMsg?.content ?? 'Unknown question',
        answer: feedbackText.trim(),
        submittedBy: typeof window !== 'undefined'
          ? (() => { try { return JSON.parse(localStorage.getItem('ri_bypass_profile') ?? '{}').userKey; } catch { return 'unknown'; } })()
          : 'unknown',
      }),
    });
    setFeedback({ msgId: feedback.msgId, mode: 'submitted' });
    setFeedbackText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const reset = () => { setMessages([]); setInput(''); setStreamText(''); setLoading(false); };
  const isEmpty = messages.length === 0 && !streamText;

  return (
    <>
      {/* Floating panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 80, right: 20, zIndex: 200,
          width: 360, maxWidth: 'calc(100vw - 40px)',
          height: 520, maxHeight: 'calc(100vh - 120px)',
          backgroundColor: C.surf, border: `1px solid ${C.border}`,
          borderRadius: 18, boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,200,0,0.08)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          fontFamily: 'Inter, system-ui, sans-serif',
          animation: 'chatSlideUp 0.2s ease-out',
        }}>
          <style>{`@keyframes chatSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Panel header */}
          <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: C.acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#000' }}>RI</div>
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Ask RI</div>
                <div style={{ color: C.muted, fontSize: 10 }}>AI · Knows all SOPs & processes</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {messages.length > 0 && (
                <button onClick={reset} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 8px', color: C.muted, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>
                  <RotateCcw size={10} /> New
                </button>
              )}
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 4, display: 'flex' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px' }}>
            {CHAT_DISABLED ? (
              <div style={{ textAlign: 'center', paddingTop: 40 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🤖</div>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>Ask RI is being configured — check back soon.</p>
              </div>
            ) : isEmpty ? (
              <div>
                <p style={{ color: C.muted, fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>
                  Ask anything about Roof Ignite processes, SOPs, or how to handle account situations.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      style={{
                        backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 8,
                        padding: '8px 11px', textAlign: 'left', cursor: 'pointer', color: C.muted,
                        fontSize: 12, lineHeight: 1.4, fontFamily: 'inherit', transition: 'all 0.12s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.acc + '55'; e.currentTarget.style.color = C.text; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i}>
                    <MessageBubble msg={msg} />
                    {msg.role === 'assistant' && msg.id && feedback?.msgId === msg.id && (
                      <div style={{ marginLeft: 31, marginTop: -6, marginBottom: 12 }}>
                        {feedback.mode === 'idle' && (
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <span style={{ color: C.muted2, fontSize: 10 }}>Helpful?</span>
                            <button
                              onClick={() => setFeedback({ msgId: msg.id!, mode: 'submitted' })}
                              style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '2px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, color: C.muted }}
                            >
                              <ThumbsUp size={10} /> <span style={{ fontSize: 10 }}>Yes</span>
                            </button>
                            <button
                              onClick={() => setFeedback({ msgId: msg.id!, mode: 'thumbs-down' })}
                              style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '2px 7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, color: C.muted }}
                            >
                              <ThumbsDown size={10} /> <span style={{ fontSize: 10 }}>No</span>
                            </button>
                          </div>
                        )}
                        {feedback.mode === 'thumbs-down' && (
                          <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
                            <p style={{ color: '#ccc', fontSize: 11.5, margin: '0 0 8px', lineHeight: 1.5 }}>
                              What should the answer be? Help us improve Ask RI.
                            </p>
                            <textarea
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              placeholder="Type the correct answer here…"
                              rows={3}
                              style={{ width: '100%', backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: 7, padding: '8px 10px', color: C.text, fontSize: 12, outline: 'none', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
                            />
                            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                              <button
                                onClick={submitFeedback}
                                disabled={!feedbackText.trim()}
                                style={{ flex: 1, backgroundColor: feedbackText.trim() ? C.acc : C.surf3, color: feedbackText.trim() ? '#000' : C.muted, border: 'none', borderRadius: 7, padding: '7px', fontSize: 11.5, fontWeight: 700, cursor: feedbackText.trim() ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}
                              >
                                Submit →
                              </button>
                              <button
                                onClick={() => setFeedback({ msgId: msg.id!, mode: 'idle' })}
                                style={{ backgroundColor: C.surf3, border: `1px solid ${C.border}`, borderRadius: 7, padding: '7px 10px', fontSize: 11.5, color: C.muted, cursor: 'pointer', fontFamily: 'inherit' }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                        {feedback.mode === 'submitted' && (
                          <span style={{ color: C.green, fontSize: 10 }}>✓ Thanks — we'll update Ask RI with this.</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {loading && !streamText && <TypingDot />}
                {streamText && <MessageBubble msg={{ role: 'assistant', content: streamText }} />}
              </>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!CHAT_DISABLED && (
            <div style={{ borderTop: `1px solid ${C.border}`, padding: '10px 12px', flexShrink: 0, backgroundColor: C.bg }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything…"
                  disabled={loading}
                  rows={1}
                  style={{
                    flex: 1, backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10,
                    padding: '9px 12px', color: C.text, fontSize: 13, outline: 'none',
                    fontFamily: 'inherit', resize: 'none', lineHeight: 1.5, maxHeight: 100,
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.acc + '88')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    backgroundColor: loading || !input.trim() ? C.surf3 : C.acc,
                    border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background-color 0.15s',
                  }}
                >
                  <Send size={13} style={{ color: loading || !input.trim() ? C.muted2 : '#000' }} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 200,
          width: 52, height: 52, borderRadius: '50%',
          backgroundColor: C.acc, border: 'none',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(245,200,0,0.35), 0 2px 8px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(245,200,0,0.45), 0 2px 8px rgba(0,0,0,0.4)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,200,0,0.35), 0 2px 8px rgba(0,0,0,0.4)'; }}
        title="Ask RI — AI Assistant"
      >
        {open ? <X size={20} color="#000" /> : <MessageSquare size={20} color="#000" />}
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: -2, right: -2,
            backgroundColor: '#EF4444', color: '#fff',
            borderRadius: '50%', width: 18, height: 18,
            fontSize: 10, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {unread}
          </span>
        )}
      </button>
    </>
  );
}
