import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, BookOpen, Settings, Star, Play, 
  Home, MessageCircle, Send, X, Sparkles, Trophy,
  ChevronLeft, GraduationCap, ShoppingBag,
  AlertTriangle, CheckCircle2, Ghost
} from 'lucide-react';

// --- КОНСТАНТЫ И ДАННЫЕ ---

const NOTE_NAMES = {
  latin: { 'C': 'C', 'C#': 'C#', 'D': 'D', 'D#': 'D#', 'E': 'E', 'F': 'F', 'F#': 'F#', 'G': 'G', 'G#': 'G#', 'A': 'A', 'A#': 'A#', 'B': 'B' },
  syllabic: { 'C': 'До', 'C#': 'До#', 'D': 'Ре', 'D#': 'Ре#', 'E': 'Ми', 'F': 'Фа', 'F#': 'Фа#', 'G': 'Соль', 'G#': 'Соль#', 'A': 'Ля', 'A#': 'Ля#', 'B': 'Си' }
};

const FREQS = {
  'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
};

const NOTE_Y_MAP = {
  'G3': 92, 'A3': 88, 'B3': 84, 'C4': 80, 'C#4': 80, 'D4': 76, 'D#4': 76, 
  'E4': 72, 'F4': 68, 'F#4': 68, 'G4': 64, 'A4': 60, 'A#4': 60, 'B4': 56,
  'C5': 52, 'C#5': 52, 'D5': 48, 'D#5': 48, 'E5': 44, 'F5': 40, 'F#5': 40, 
  'G5': 36, 'G#5': 36, 'A5': 32, 'B5': 24
};

const SCALES = [
  { id: 'c_maj', name: 'До Мажор', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], cost: 0, desc: 'Базовая гамма без знаков.' },
  { id: 'a_min', name: 'Ля Минор', notes: ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'], cost: 100, desc: 'Натуральный минор.' },
  { id: 'g_maj', name: 'Соль Мажор', notes: ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G4'], cost: 250, desc: 'Один диез: Фа#.' },
  { id: 'f_maj', name: 'Фа Мажор', notes: ['F4', 'G4', 'A4', 'A#4', 'C5', 'D5', 'E5', 'F5'], cost: 400, desc: 'Один бемоль: Си♭.' },
  { id: 'd_maj', name: 'Ре Мажор', notes: ['D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5'], cost: 600, desc: 'Два диеза: Фа# и До#.' },
];

const THEMES = {
  nebula: { id: 'nebula', name: 'Небула', cost: 0, bg: '#0f172a', accent: '#6366f1', gradient: 'linear-gradient(to bottom right, rgba(49, 46, 129, 0.5), #0f172a, rgba(88, 28, 135, 0.3))' },
  cyber: { id: 'cyber', name: 'Киберпанк', cost: 300, bg: '#000000', accent: '#d946ef', gradient: 'linear-gradient(to bottom right, rgba(112, 26, 117, 0.4), #000000, rgba(22, 78, 99, 0.3))' },
  forest: { id: 'forest', name: 'Лес', cost: 500, bg: '#061a14', accent: '#10b981', gradient: 'linear-gradient(to bottom right, rgba(6, 78, 59, 0.4), #061a14, rgba(20, 83, 45, 0.2))' },
  royal: { id: 'royal', name: 'Королевский', cost: 1500, bg: '#1e1b4b', accent: '#f59e0b', gradient: 'linear-gradient(to bottom right, rgba(120, 53, 15, 0.2), #1e1b4b, #0f172a)' }
};

// --- МОЗГ ИИ ---
const getAIResponse = (input, userData) => {
  const text = input.toLowerCase();
  
  if (text.includes('привет') || text.includes('здравств')) return `Привет, ${userData.name}! Готов помузицировать? 🎹`;
  if (text.includes('как дела')) return "Я просто код, но мои алгоритмы в отличном настроении!";
  if (text.includes('до мажор') || text.includes('c maj')) return "До Мажор (C Major) — это основа. В ней нет ни диезов, ни бемолей. Только белые клавиши!";
  if (text.includes('монет') || text.includes('купить')) return "Монеты (⭐️) даются за прохождение уроков. В режиме 'Экзамен' награда выше, но ошибаться нельзя!";
  if (text.includes('аккорд')) return "Аккорд — это когда звучат три и более нот одновременно. Попробуй нажать C, E и G вместе!";
  if (text.includes('тема') || text.includes('фон')) return "Темы меняют вид приложения. Загляни в Магазин, чтобы купить 'Киберпанк' или 'Лес'.";
  
  const generic = [
    "Музыка — это язык души. Продолжай практиковаться!",
    "Интересный вопрос. А сможешь сыграть гамму с закрытыми глазами?",
    "Я всего лишь ИИ, но звучит это красиво.",
    "Попробуй режим 'Фристайл', чтобы поэкспериментировать."
  ];
  return generic[Math.floor(Math.random() * generic.length)];
};

// --- КОМПОНЕНТЫ ---

const Staff = ({ notes = [], currentIdx = -1, isExam = false, accent }) => (
  <div className="staff-container">
    <svg viewBox="0 0 400 120" style={{ width: '100%', overflow: 'visible' }}>
      {[40, 48, 56, 64, 72].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeOpacity="0.2" strokeWidth="1" />)}
      <text x="5" y="85" fontSize="70" fill="white" style={{ opacity: 0.3, fontFamily: 'serif', userSelect: 'none' }}>𝄞</text>
      {notes.map((note, i) => {
        const y = NOTE_Y_MAP[note] || 80;
        const x = 70 + (i * 42);
        const isSharp = note.includes('#');
        const isActive = i === currentIdx + 1;
        const isCompleted = i <= currentIdx;
        const isVisible = !isExam || isCompleted || isActive;
        let color = isCompleted ? '#10b981' : isActive ? accent : 'rgba(255,255,255,0.2)';

        return isVisible && (
          <g key={i} style={{ transition: 'all 0.5s' }}>
            {y >= 80 && <line x1={x-12} y1="80" x2={x+12} y2="80" stroke={color} strokeWidth="2" />}
            <ellipse cx={x} cy={y} rx="7" ry="5" transform={`rotate(-20 ${x} ${y})`} fill={color} />
            <line x1={x + 7} y1={y} x2={x + 7} y2={y - 30} stroke={color} strokeWidth="2" />
            {isSharp && <text x={x - 24} y={y + 6} fontSize="20" fill={color} fontWeight="bold">♯</text>}
            {isActive && <circle cx={x} cy={y} r="15" fill={color} opacity="0.15" className="pulse" />}
          </g>
        );
      })}
    </svg>
  </div>
);

const Piano = ({ activeNotes, nextNote, onPlay, notation, accent }) => {
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const blackKeys = [{ n: 'C#4', l: '10.5%' }, { n: 'D#4', l: '23%' }, { n: 'F#4', l: '48%' }, { n: 'G#4', l: '60.5%' }, { n: 'A#4', l: '73%' }];

  return (
    <div className="piano-wrapper">
      {whiteKeys.map((n) => (
        <div key={n} onMouseDown={() => onPlay(n)} className={`key white ${activeNotes.includes(n) ? 'active' : ''} ${n === nextNote ? 'target' : ''}`} style={{ '--accent': accent }}>
          <span className="key-label">{NOTE_NAMES[notation][n.replace(/\d/,'')]}</span>
        </div>
      ))}
      {blackKeys.map((k) => (
        <div key={k.n} onMouseDown={() => onPlay(k.n)} className={`key black ${activeNotes.includes(k.n) ? 'active' : ''} ${k.n === nextNote ? 'target' : ''}`} style={{ left: k.l, '--accent': accent }} />
      ))}
    </div>
  );
};

// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

export default function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('sm_pro_v6');
    return saved ? JSON.parse(saved) : { 
      name: '', coins: 200, unlockedScales: ['c_maj'], unlockedThemes: ['nebula'], theme: 'nebula', volume: 0.5, notation: 'syllabic' 
    };
  });

  const [view, setView] = useState(userData.name ? 'home' : 'welcome');
  const [activeScale, setActiveScale] = useState(null);
  const [progress, setProgress] = useState(-1);
  const [activeNotes, setActiveNotes] = useState([]);
  const [mode, setMode] = useState('training');
  const [modal, setModal] = useState(null);
  const audioCtx = useRef(null);

  // Состояния чата
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Привет! Я твой музыкальный помощник. Спрашивай о нотах или гаммах!' }]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { localStorage.setItem('sm_pro_v6', JSON.stringify(userData)); }, [userData]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, showChat, isTyping]);

  const initAudio = () => { if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)(); };

  const playNote = (note) => {
    initAudio();
    const ctx = audioCtx.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(FREQS[note] || 440, ctx.currentTime);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(userData.volume * 0.5, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.5);

    setActiveNotes(prev => [...prev, note]);
    setTimeout(() => setActiveNotes(prev => prev.filter(n => n !== note)), 300);

    if (activeScale && view === 'play') {
      const target = activeScale.notes[progress + 1];
      if (note === target) {
        const next = progress + 1;
        setProgress(next);
        if (next === activeScale.notes.length - 1) {
          const reward = mode === 'exam' ? 200 : 60;
          setUserData(p => ({ ...p, coins: p.coins + reward }));
          setModal({ title: "Браво!", content: `Награда: ${reward} монет.`, type: "success" });
          setView('home');
        }
      } else if (mode === 'exam') {
        setModal({ title: "Ошибка!", content: "Экзамен провален.", type: "error" });
        setView('home');
      }
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(text, userData) }]);
      setIsTyping(false);
    }, 1500);
  };

  const theme = THEMES[userData.theme] || THEMES.nebula;

  if (view === 'welcome') return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <div className="logo-box"><Music size={48} color="white"/></div>
        <h1>Scale<span>Master</span></h1>
        <input placeholder="Твое имя..." onKeyDown={e => e.key === 'Enter' && e.target.value.trim() && (setUserData({...userData, name: e.target.value}), setView('home'))}/>
      </div>
      <style>{allStyles}</style>
    </div>
  );

  return (
    <div className="app-container" style={{ backgroundColor: theme.bg, '--accent': theme.accent }}>
      <div className="bg-gradient-overlay" style={{ background: theme.gradient }} />

      <nav className="header-nav">
        <div className="user-profile" onClick={() => setView('home')}>
          <div className="avatar">{userData.name[0]}</div>
          <span className="name">{userData.name}</span>
        </div>
        <div className="stats-box">
           <div className="coins"><Star size={16} fill="#fbbf24" stroke="none"/> {userData.coins}</div>
           <button onClick={() => setShowChat(!showChat)} className={`chat-btn ${showChat ? 'active' : ''}`}><MessageCircle size={20}/></button>
        </div>
      </nav>

      <main className="main-content">
        {view === 'home' && (
          <div className="grid-layout">
            <div className="card" onClick={() => setView('library')}>
              <div className="icon-circle" style={{background: theme.accent+'33'}}><BookOpen color={theme.accent} size={32}/></div>
              <h2>Школа</h2><p>Изучай гаммы</p>
            </div>
            <div className="card" onClick={() => { setMode('sandbox'); setView('play'); setActiveScale(null); }}>
              <div className="icon-circle" style={{background: '#10b98133'}}><Music color="#10b981" size={32}/></div>
              <h2>Фристайл</h2><p>Свободная игра</p>
            </div>
            <div className="card" onClick={() => setView('shop')}>
               <div className="icon-circle" style={{background: '#f59e0b33'}}><ShoppingBag color="#f59e0b" size={32}/></div>
               <h2>Магазин</h2><p>Новые темы</p>
            </div>
          </div>
        )}

        {view === 'library' && (
          <div className="list-view">
            <div className="view-header"><button onClick={() => setView('home')}><ChevronLeft/></button><h2>Гаммы</h2></div>
            {SCALES.map(s => (
              <div key={s.id} className="list-item">
                <div><h3>{s.name}</h3><p>{s.desc}</p></div>
                {userData.unlockedScales.includes(s.id) ? (
                  <div className="btn-group">
                    <button className="primary-btn" onClick={() => { setActiveScale(s); setMode('training'); setProgress(-1); setView('play'); }}>Урок</button>
                    <button className="secondary-btn" onClick={() => { setActiveScale(s); setMode('exam'); setProgress(-1); setView('play'); }}>Экзамен</button>
                  </div>
                ) : (
                  <button className="buy-btn" onClick={() => userData.coins >= s.cost && setUserData(p => ({...p, coins: p.coins - s.cost, unlockedScales: [...p.unlockedScales, s.id]}))}>{s.cost} <Star size={12}/></button>
                )}
              </div>
            ))}
          </div>
        )}

        {view === 'play' && (
          <div className="play-zone">
             <div className="play-header"><h2>{activeScale?.name || 'Фристайл'}</h2><button onClick={() => setView('home')}>Выход</button></div>
             <Staff notes={activeScale?.notes || []} currentIdx={progress} isExam={mode === 'exam'} accent={theme.accent} />
             <div className="note-display"><span>{activeNotes.length > 0 ? NOTE_NAMES[userData.notation][activeNotes[0].replace(/\d/,'')] : '...'}</span></div>
             <Piano activeNotes={activeNotes} nextNote={activeScale?.notes[progress + 1]} onPlay={playNote} notation={userData.notation} accent={theme.accent} />
          </div>
        )}

        {view === 'shop' && (
          <div className="grid-layout">
            <div className="view-header" style={{width:'100%'}}><button onClick={() => setView('home')}><ChevronLeft color="white"/></button><h2>Темы</h2></div>
            {Object.entries(THEMES).map(([id, t]) => (
              <div key={id} className={`theme-card ${userData.theme === id ? 'selected' : ''}`} onClick={() => {
                  if (userData.unlockedThemes.includes(id)) setUserData(p => ({...p, theme: id}));
                  else if (userData.coins >= t.cost) setUserData(p => ({...p, coins: p.coins - t.cost, unlockedThemes: [...p.unlockedThemes, id], theme: id}));
                }}>
                <div className="theme-preview" style={{ background: t.gradient }} />
                <div className="theme-info"><span>{t.name}</span>{!userData.unlockedThemes.includes(id) && <span className="cost">{t.cost} <Star size={12}/></span>}</div>
              </div>
            ))}
          </div>
        )}

        {view === 'settings' && (
             <div className="settings-panel">
               <div className="view-header"><button onClick={() => setView('home')}><ChevronLeft/></button><h2>Опции</h2></div>
               <div className="list-item"><span>Громкость</span><input type="range" min="0" max="1" step="0.1" value={userData.volume} onChange={e => setUserData(p =>({...p, volume: parseFloat(e.target.value)}))}/></div>
               <div className="list-item"><span>Нотация</span><button onClick={() => setUserData(p => ({...p, notation: p.notation === 'syllabic' ? 'latin' : 'syllabic'}))}>{userData.notation}</button></div>
             </div>
        )}
      </main>

      {/* CHAT WINDOW */}
      {showChat && (
        <div className="chat-overlay">
          <div className="chat-window">
            <div className="chat-header">
              <div className="ai-status"><div className="status-dot"/><span>AI Tutor</span></div>
              <button onClick={() => setShowChat(false)}><X size={18}/></button>
            </div>
            <div className="chat-body">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`} style={{'--bg': msg.role === 'user' ? theme.accent : 'rgba(255,255,255,0.1)'}}>{msg.text}</div>
              ))}
              {isTyping && <div className="message ai typing"><span>•</span><span>•</span><span>•</span></div>}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-footer">
              <input placeholder="Спроси..." onKeyDown={(e) => { if (e.key === 'Enter') { handleSendMessage(e.target.value); e.target.value = ''; }}} autoFocus />
              <button className="send-btn" style={{background: theme.accent}}><Send size={16}/></button>
            </div>
          </div>
        </div>
      )}

      {/* DOCK */}
      <div className="dock-container">
         <nav className="dock">
            <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}><Home size={22}/><span>Главная</span></button>
            <button className={view === 'library' ? 'active' : ''} onClick={() => setView('library')}><GraduationCap size={22}/><span>Уроки</span></button>
            <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}><Settings size={22}/><span>Опции</span></button>
         </nav>
      </div>

      {modal && (
        <div className="modal-overlay">
           <div className="modal">
              <div className="modal-icon">{modal.type === 'success' ? <Trophy size={40} color="#fbbf24"/> : <AlertTriangle size={40} color="#f43f5e"/>}</div>
              <h2>{modal.title}</h2><p>{modal.content}</p>
              <button onClick={() => setModal(null)} style={{background: theme.accent}}>OK</button>
           </div>
        </div>
      )}

      <style>{allStyles}</style>
    </div>
  );
}

// --- ВСЕ СТИЛИ ---
const allStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
  * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
  body { margin: 0; background: #020617; overflow-x: hidden; color: white; }
  
  .app-container { min-height: 100vh; padding-bottom: 100px; }
  .bg-gradient-overlay { position: fixed; inset: 0; pointer-events: none; opacity: 0.6; z-index: 0; }
  
  /* Welcome */
  .welcome-screen { height: 100vh; display: flex; align-items: center; justify-content: center; background: #020617; }
  .welcome-card { text-align: center; width: 320px; }
  .logo-box { width: 80px; height: 80px; background: #6366f1; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transform: rotate(10deg); }
  .welcome-card h1 { font-size: 3rem; margin: 0 0 40px; }
  .welcome-card h1 span { color: #6366f1; }
  .welcome-card input { width: 100%; padding: 15px; border-radius: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: white; outline: none; text-align: center; }

  /* Header */
  .header-nav { height: 70px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; }
  .user-profile { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .avatar { width: 36px; height: 36px; border-radius: 10px; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: bold; }
  .stats-box { display: flex; gap: 10px; align-items: center; }
  .coins { background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 10px; display: flex; align-items: center; gap: 6px; font-weight: bold; }
  .chat-btn { background: none; border: none; color: white; padding: 8px; cursor: pointer; border-radius: 8px; }
  .chat-btn.active { color: var(--accent); background: rgba(255,255,255,0.1); }

  /* Main */
  .main-content { max-width: 800px; margin: 0 auto; padding: 20px; position: relative; z-index: 1; }
  .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
  .card { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 20px; cursor: pointer; transition: 0.2s; }
  .card:hover { transform: translateY(-5px); border-color: var(--accent); }
  .icon-circle { width: 50px; height: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
  
  /* Lists & Shop */
  .list-view { display: flex; flex-direction: column; gap: 10px; }
  .view-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .view-header button { background: rgba(255,255,255,0.1); border: none; color: white; padding: 8px; border-radius: 8px; cursor: pointer; }
  .list-item { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; }
  .btn-group { display: flex; gap: 8px; }
  .primary-btn, .secondary-btn, .buy-btn { border: none; padding: 10px 16px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 12px; text-transform: uppercase; }
  .primary-btn { background: var(--accent); color: white; }
  .secondary-btn { background: rgba(255,255,255,0.1); color: white; }
  .buy-btn { background: #fbbf24; color: black; display: flex; align-items: center; gap: 4px; }
  
  .theme-card { border-radius: 20px; background: rgba(255,255,255,0.05); padding: 10px; cursor: pointer; border: 2px solid transparent; }
  .theme-card.selected { border-color: var(--accent); }
  .theme-preview { height: 80px; border-radius: 12px; margin-bottom: 10px; }
  .theme-info { display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; }

  /* Play Zone */
  .play-zone { display: flex; flex-direction: column; gap: 20px; }
  .play-header { display: flex; justify-content: space-between; align-items: center; }
  .play-header button { background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; }
  .staff-container { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 20px; }
  .note-display { text-align: center; font-size: 3rem; font-weight: 900; color: var(--accent); height: 60px; }
  
  /* Piano */
  .piano-wrapper { height: 200px; display: flex; position: relative; user-select: none; }
  .key { border-radius: 0 0 10px 10px; cursor: pointer; }
  .key.white { flex: 1; background: white; margin: 1px; position: relative; }
  .key.white.active { background: var(--accent); transform: translateY(4px); }
  .key.white.target { border-bottom: 5px solid var(--accent); }
  .key-label { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); color: #333; font-size: 10px; font-weight: bold; }
  .key.black { position: absolute; width: 10%; height: 60%; background: #1e293b; z-index: 2; border: 1px solid rgba(255,255,255,0.2); }
  .key.black.active { background: var(--accent); transform: translateY(2px); }

  /* Chat */
  .chat-overlay { position: fixed; bottom: 90px; right: 20px; width: 340px; height: 450px; z-index: 200; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .chat-window { width: 100%; height: 100%; background: rgba(15,23,42,0.9); backdrop-filter: blur(20px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  .chat-header { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); }
  .ai-status { display: flex; align-items: center; gap: 8px; font-weight: bold; font-size: 14px; }
  .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
  .chat-header button { background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; }
  
  .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
  .chat-body::-webkit-scrollbar { width: 4px; }
  .chat-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
  
  .message { padding: 10px 14px; border-radius: 16px; font-size: 14px; max-width: 85%; line-height: 1.4; background: var(--bg); color: white; word-wrap: break-word; }
  .message.ai { align-self: flex-start; border-bottom-left-radius: 4px; }
  .message.user { align-self: flex-end; border-bottom-right-radius: 4px; }
  .message.typing { display: flex; gap: 4px; padding: 14px; width: fit-content; }
  .message.typing span { width: 4px; height: 4px; background: white; border-radius: 50%; animation: blink 1.4s infinite; }
  .message.typing span:nth-child(2) { animation-delay: 0.2s; }
  .message.typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink { 0%, 100% { opacity: 0.2; } 20% { opacity: 1; } }

  .chat-footer { padding: 10px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 10px; }
  .chat-footer input { flex: 1; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 12px; color: white; outline: none; }
  .send-btn { width: 40px; height: 40px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; }

  /* Dock */
  .dock-container { position: fixed; bottom: 20px; left: 0; right: 0; display: flex; justify-content: center; z-index: 100; pointer-events: none; }
  .dock { background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); padding: 10px; border-radius: 25px; border: 1px solid rgba(255,255,255,0.1); display: flex; gap: 10px; pointer-events: auto; }
  .dock button { background: none; border: none; color: rgba(255,255,255,0.5); display: flex; flex-direction: column; align-items: center; padding: 8px 16px; border-radius: 15px; cursor: pointer; transition: 0.2s; }
  .dock button span { font-size: 10px; margin-top: 4px; font-weight: bold; }
  .dock button.active { color: white; background: var(--accent); transform: scale(1.1); }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: #1e293b; padding: 40px; border-radius: 30px; text-align: center; border: 1px solid rgba(255,255,255,0.1); max-width: 350px; width: 100%; }
  .modal-icon { display: flex; justify-content: center; margin-bottom: 20px; }
  .modal h2 { margin: 0 0 10px; font-size: 24px; }
  .modal p { margin: 0 0 25px; opacity: 0.7; }
  .modal button { width: 100%; padding: 15px; border: none; border-radius: 15px; color: white; font-weight: bold; cursor: pointer; }

  @media (max-width: 600px) {
    .chat-overlay { top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; }
    .chat-window { border-radius: 0; }
  }
`;