'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, ChevronDown, ExternalLink } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED = [
  'How do I run a client onboarding call?',
  'What do I do when a client threatens to cancel?',
  'How does A2P registration work?',
  'What are the 6 approved Meta placements?',
  'What is Layer 1 vs Layer 2?',
  'How do I brief Ken for creative requests?',
  'What should I check when a client is red?',
  'When do I escalate to Jonathan vs handling it myself?',
];

const C = {
  bg: '#0A0A0A', surf: '#141414', surf2: '#1C1C1C', surf3: '#222',
  border: '#2A2A2A', border2: '#333',
  text: '#F5F5F5', muted: '#888', muted2: '#555',
  acc: '#F5C800', green: '#22C55E',
};

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';

  // Parse escalation blocks
  const escalateMatch = msg.content.match(/---ESCALATE---([\s\S]*?)---END---/);
  const mainContent = escalateMatch
    ? msg.content.replace(/---ESCALATE---([\s\S]*?)---END---/, '').trim()
    : msg.content;
  const escalateContent = escalateMatch ? escalateMatch[1].trim() : null;

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} style={{ margin: '6px 0', paddingLeft: 18 }}>
            {listItems.map((item, i) => (
              <li key={i} style={{ color: isUser ? '#000' : C.text, fontSize: 13.5, lineHeight: 1.7, marginBottom: 2 }}>
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, i) => {
      if (line.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={i} style={{ color: isUser ? '#000' : C.acc, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '12px 0 4px' }}>{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={i} style={{ color: isUser ? '#000' : C.acc, fontSize: 13, fontWeight: 800, margin: '10px 0 4px' }}>{line.slice(3)}</h2>);
      } else if (line.match(/^[-•*] /)) {
        listItems.push(line.replace(/^[-•*] /, ''));
      } else if (line.match(/^\d+\. /)) {
        listItems.push(line.replace(/^\d+\. /, ''));
      } else if (line.trim() === '') {
        flushList();
        if (i > 0) elements.push(<div key={i} style={{ height: 6 }} />);
      } else {
        flushList();
        elements.push(<p key={i} style={{ color: isUser ? '#000' : C.text, fontSize: 13.5, lineHeight: 1.7, margin: '2px 0' }}>{renderInline(line)}</p>);
      }
    });
    flushList();
    return elements;
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: isUser ? '#000' : '#fff', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} style={{ backgroundColor: isUser ? 'rgba(0,0,0,0.1)' : '#2A2A2A', borderRadius: 4, padding: '1px 5px', fontSize: 12, fontFamily: 'monospace', color: isUser ? '#000' : C.acc }}>{part.slice(1, -1)}</code>;
      }
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ color: isUser ? '#000' : C.acc, textDecoration: 'underline' }}>{linkMatch[1]}</a>;
      }
      return part;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row', gap: 10, marginBottom: 16, alignItems: 'flex-start' }}>
      {!isUser && (
        <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: C.acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, fontWeight: 900, color: '#000' }}>
          RI
        </div>
      )}
      <div style={{ maxWidth: '82%', minWidth: 40 }}>
        <div style={{
          backgroundColor: isUser ? C.acc : C.surf2,
          border: `1px solid ${isUser ? 'transparent' : C.border}`,
          borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
          padding: '10px 14px',
        }}>
          {renderMarkdown(mainContent)}
        </div>
        {escalateContent && (
          <div style={{
            marginTop: 8, backgroundColor: '#1A1200', border: '1px solid #F5C80033',
            borderRadius: 10, padding: '10px 13px',
          }}>
            <div style={{ color: C.acc, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Suggested escalation
            </div>
            <pre style={{ color: '#ccc', fontSize: 12, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {escalateContent}
            </pre>
            <button
              onClick={() => navigator.clipboard?.writeText(escalateContent)}
              style={{ marginTop: 8, backgroundColor: '#F5C80022', border: '1px solid #F5C80044', borderRadius: 6, padding: '4px 10px', color: C.acc, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Copy message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingDot() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: C.acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, fontWeight: 900, color: '#000' }}>
        RI
      </div>
      <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: '4px 18px 18px 18px', padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.muted, animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const CHAT_DISABLED = !process.env.NEXT_PUBLIC_CHAT_ENABLED;

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [streamText, setStreamText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  const send = async (question?: string) => {
    const text = (question ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreamText('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Failed to get response');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamText(full);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: full }]);
      setStreamText('');
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "I couldn't process that request. Please try again or ask Jonathan directly in Slack." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    setMessages([]);
    setInput('');
    setStreamText('');
    setLoading(false);
  };

  const isEmpty = messages.length === 0 && !streamText;

  if (CHAT_DISABLED) {
    return (
      <div style={{ minHeight: 'calc(100vh - 48px)', backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🤖</div>
          <h2 style={{ color: C.text, fontSize: 20, fontWeight: 900, margin: '0 0 10px' }}>Ask RI is coming soon</h2>
          <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
            The AI assistant is being configured. Set <code style={{ backgroundColor: C.surf2, padding: '1px 6px', borderRadius: 4, fontSize: 12, color: C.acc }}>ANTHROPIC_API_KEY</code> and <code style={{ backgroundColor: C.surf2, padding: '1px 6px', borderRadius: 4, fontSize: 12, color: C.acc }}>NEXT_PUBLIC_CHAT_ENABLED=true</code> in your environment variables to enable it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 48px)', backgroundColor: C.bg, display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: C.acc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#000' }}>RI</div>
          <div>
            <div style={{ color: C.text, fontSize: 14, fontWeight: 800 }}>Ask RI</div>
            <div style={{ color: C.muted, fontSize: 11 }}>Powered by Claude · Knows all SOPs, recordings, and processes</div>
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={reset} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '5px 10px', color: C.muted, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
            <RotateCcw size={12} /> New chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {isEmpty && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 28, paddingTop: 12 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🧠</div>
                <h2 style={{ color: C.text, fontSize: 18, fontWeight: 900, margin: '0 0 8px' }}>What do you need to know?</h2>
                <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                  Ask anything about Roof Ignite processes, SOPs, recordings, or how to handle account situations.
                </p>
              </div>

              {/* Suggested questions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    style={{
                      backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 10,
                      padding: '10px 13px', textAlign: 'left', cursor: 'pointer', color: C.text,
                      fontSize: 13, lineHeight: 1.5, fontFamily: 'inherit', transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.acc + '66')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 24, backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 12, padding: '12px 16px' }}>
                <div style={{ color: C.acc, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>What Ask RI knows</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
                  {['All 17 SOPs + descriptions', '35+ Loom training walkthroughs', 'Full 9-phase client journey', 'Team contacts & escalation paths', 'Meta advertising rules', 'KPI targets & Layer 1/2 framework'].map((item) => (
                    <div key={item} style={{ color: C.muted, fontSize: 12, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <span style={{ color: C.green, flexShrink: 0 }}>✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {loading && !streamText && <TypingDot />}

          {streamText && (
            <MessageBubble msg={{ role: 'assistant', content: streamText }} />
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 16px', flexShrink: 0, backgroundColor: C.surf }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Roof Ignite processes, SOPs, or how to handle a situation…"
            disabled={loading}
            rows={1}
            style={{
              flex: 1, backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 12,
              padding: '11px 14px', color: C.text, fontSize: 13.5, outline: 'none',
              fontFamily: 'inherit', resize: 'none', lineHeight: 1.5, maxHeight: 120,
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = C.acc + '88')}
            onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = Math.min(el.scrollHeight, 120) + 'px';
            }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              backgroundColor: loading || !input.trim() ? C.surf3 : C.acc,
              border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.15s',
            }}
          >
            <Send size={15} style={{ color: loading || !input.trim() ? C.muted2 : '#000' }} />
          </button>
        </div>
        <div style={{ maxWidth: 720, margin: '6px auto 0', textAlign: 'center' }}>
          <span style={{ color: C.muted2, fontSize: 11 }}>Enter to send · Shift+Enter for new line · For account-specific issues, check Command Center</span>
        </div>
      </div>
    </div>
  );
}
