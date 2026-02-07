import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Music, BookOpen, Settings, ChevronLeft, 
  X, Star, Play, Trophy, Pause,
  Volume2, Moon, Sun, Coins, Sparkles, 
  Gamepad2, CheckCircle2, AlertCircle,
  GraduationCap, ShoppingBag, User,
  Lock, ArrowRight, Zap, Layout,
  RotateCcw, ChevronRight, Palette,
  Award, BarChart3, Bell, Headphones, Key,
  Mic2, Radio, Disc, Activity, Flame,
  Target, Calendar, Share2, Download,
  Trash2, Save, Layers, FastForward,
  Info, History, Heart, UserCircle, Sliders,
  CheckCircle, MousePointer2, RefreshCw,
  Gift, Lightbulb, Dna, Keyboard,
  Bomb, Crown, Gem, HelpCircle, XCircle,
  Terminal, Shield, Wifi, Cpu, Ghost,
  Home, DownloadCloud, UploadCloud,
  LogOut, Clock, TrendingUp, Sparkle,
  Music2, VolumeX, Volume1, GamepadIcon,
  Dice5, PartyPopper, Rocket, Zap as Lightning
} from 'lucide-react';

// ==========================================
// --- УЛУЧШЕННЫЕ КОНСТАНТЫ ---
// ==========================================

const APP_VERSION = "3.1.0-NEON";

const THEMES = {
  cyber: {
    id: 'cyber',
    name: 'NEON CYBER',
    price: 0,
    colors: {
      bg: 'bg-[#050510]',
      primary: 'text-cyan-400',
      accent: 'text-purple-500',
      border: 'border-cyan-500/40',
      glass: 'bg-zinc-900/80 backdrop-blur-xl',
      gradient: 'from-cyan-500 via-purple-500 to-purple-600',
      particle: '#22d3ee',
      button: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]',
      card: 'bg-black/50 backdrop-blur-xl border border-white/10',
      glow: 'shadow-[0_0_40px_rgba(34,211,238,0.3)]'
    }
  },
  matrix: {
    id: 'matrix',
    name: 'THE CONSTRUCT',
    price: 1000,
    colors: {
      bg: 'bg-[#001100]',
      primary: 'text-green-500',
      accent: 'text-green-300',
      border: 'border-green-500/60',
      glass: 'bg-green-950/60 backdrop-blur-xl',
      gradient: 'from-green-600 via-emerald-500 to-emerald-400',
      particle: '#4ade80',
      button: 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 hover:shadow-[0_0_30px_rgba(74,222,128,0.7)]',
      card: 'bg-black/60 backdrop-blur-xl border border-green-500/20',
      glow: 'shadow-[0_0_40px_rgba(74,222,128,0.3)]'
    }
  },
  sunset: {
    id: 'sunset',
    name: 'RETRO WAVE',
    price: 1500,
    colors: {
      bg: 'bg-[#1a0b3e]',
      primary: 'text-pink-500',
      accent: 'text-yellow-400',
      border: 'border-pink-500/50',
      glass: 'bg-indigo-950/70 backdrop-blur-xl',
      gradient: 'from-pink-600 via-pink-500 to-yellow-500',
      particle: '#f472b6',
      button: 'bg-gradient-to-r from-pink-600 to-yellow-500 hover:from-pink-500 hover:to-yellow-400 hover:shadow-[0_0_30px_rgba(244,114,182,0.7)]',
      card: 'bg-black/50 backdrop-blur-xl border border-pink-500/20',
      glow: 'shadow-[0_0_40px_rgba(244,114,182,0.3)]'
    }
  },
  void: {
    id: 'void',
    name: 'DEEP VOID',
    price: 5000,
    colors: {
      bg: 'bg-black',
      primary: 'text-white',
      accent: 'text-zinc-300',
      border: 'border-white/30',
      glass: 'bg-white/10 backdrop-blur-xl',
      gradient: 'from-white via-zinc-300 to-zinc-500',
      particle: '#ffffff',
      button: 'bg-gradient-to-r from-white to-zinc-300 text-black hover:from-zinc-200 hover:to-zinc-400 hover:shadow-[0_0_30px_rgba(255,255,255,0.7)]',
      card: 'bg-black/70 backdrop-blur-xl border border-white/20',
      glow: 'shadow-[0_0_40px_rgba(255,255,255,0.2)]'
    }
  }
};

const NOTES_LIB = [
  { name: 'C4', freq: 261.63, key: 'A', label: 'До', color: '#ef4444' }, 
  { name: 'C#4', freq: 277.18, key: 'W', label: 'До#', color: '#f97316' },
  { name: 'D4', freq: 293.66, key: 'S', label: 'Ре', color: '#eab308' }, 
  { name: 'D#4', freq: 311.13, key: 'E', label: 'Ре#', color: '#84cc16' },
  { name: 'E4', freq: 329.63, key: 'D', label: 'Ми', color: '#10b981' }, 
  { name: 'F4', freq: 349.23, key: 'F', label: 'Фа', color: '#0ea5e9' },
  { name: 'F#4', freq: 369.99, key: 'T', label: 'Фа#', color: '#8b5cf6' }, 
  { name: 'G4', freq: 392.00, key: 'G', label: 'Соль', color: '#ec4899' },
  { name: 'G#4', freq: 415.30, key: 'Y', label: 'Соль#', color: '#f43f5e' }, 
  { name: 'A4', freq: 440.00, key: 'H', label: 'Ля', color: '#6366f1' },
  { name: 'A#4', freq: 466.16, key: 'U', label: 'Ля#', color: '#a855f7' }, 
  { name: 'B4', freq: 493.88, key: 'J', label: 'Си', color: '#d946ef' },
  { name: 'C5', freq: 523.25, key: 'K', label: 'До', color: '#ef4444' }, 
  { name: 'C#5', freq: 554.37, key: 'O', label: 'До#', color: '#f97316' },
  { name: 'D5', freq: 587.33, key: 'L', label: 'Ре', color: '#eab308' },
  { name: 'D#5', freq: 622.25, key: 'P', label: 'Ре#', color: '#84cc16' },
  { name: 'E5', freq: 659.25, key: ';', label: 'Ми', color: '#10b981' }
];

const SCALES_DB = [
  { 
    id: 'c-major', 
    title: 'До мажор', 
    price: 0, 
    notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], 
    reward: 100, 
    difficulty: 'Новичок',
    description: 'Базовая мажорная гамма',
    color: '#3b82f6',
    icon: Music
  },
  { 
    id: 'a-minor', 
    title: 'Ля минор', 
    price: 200, 
    notes: ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5'], 
    reward: 120, 
    difficulty: 'Новичок',
    description: 'Натуральный минор',
    color: '#10b981',
    icon: Moon
  },
  { 
    id: 'pentatonic-c', 
    title: 'Пентатоника C', 
    price: 800, 
    notes: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'], 
    reward: 250, 
    difficulty: 'Продвинутый',
    description: '5-нотная гамма для импровизации',
    color: '#f59e0b',
    icon: Flame
  },
  { 
    id: 'blues-c', 
    title: 'Блюз C', 
    price: 1200, 
    notes: ['C4', 'D#4', 'F4', 'F#4', 'G4', 'A#4', 'C5'], 
    reward: 350, 
    difficulty: 'Профессионал',
    description: 'Блюзовая гамма с характерным звучанием',
    color: '#8b5cf6',
    icon: Radio
  },
  { 
    id: 'chromatic', 
    title: 'Хроматика', 
    price: 9999, 
    notes: ['C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4','C5'], 
    reward: 1000, 
    difficulty: 'Легенда',
    description: 'Все 12 полутонов октавы',
    color: '#ec4899',
    icon: Zap
  }
];

const AVATARS = [
  { id: 'Felix', rarity: 'ОБЫЧНЫЙ', price: 0, color: '#6b7280', emoji: '😺' },
  { id: 'Luna', rarity: 'ОБЫЧНЫЙ', price: 100, color: '#8b5cf6', emoji: '🌙' },
  { id: 'Oscar', rarity: 'РЕДКИЙ', price: 500, color: '#10b981', emoji: '🎵' },
  { id: 'Jazz', rarity: 'РЕДКИЙ', price: 600, color: '#f59e0b', emoji: '🎷' },
  { id: 'Zoe', rarity: 'ЭПИЧЕСКИЙ', price: 1200, color: '#ec4899', emoji: '✨' },
  { id: 'Rex', rarity: 'ЛЕГЕНДАРНЫЙ', price: 5000, color: '#eab308', emoji: '👑' },
  { id: 'Midnight', rarity: 'ЛЕГЕНДАРНЫЙ', price: 7000, color: '#0ea5e9', emoji: '🌌' },
  { id: 'CyberDemon', rarity: 'АНОМАЛИЯ', price: 15000, color: '#ef4444', emoji: '👾' }
];

const ROULETTE_ITEMS = [
  { id: 'coins_100', label: '100 CR', rarity: 'ОБЫЧНЫЙ', color: '#22d3ee', icon: Coins, probability: 40, value: 100 },
  { id: 'coins_500', label: '500 CR', rarity: 'РЕДКИЙ', color: '#a855f7', icon: Flame, probability: 20, value: 500 },
  { id: 'coins_200', label: '200 CR', rarity: 'ОБЫЧНЫЙ', color: '#22d3ee', icon: Coins, probability: 30, value: 200 },
  { id: 'avatar_rare', label: 'РЕДКИЙ СКИН', rarity: 'РЕДКИЙ', color: '#a855f7', icon: User, probability: 15, value: 'rare_skin' },
  { id: 'avatar_legend', label: 'ЛЕГЕНДА СКИН', rarity: 'ЛЕГЕНДАРНЫЙ', color: '#eab308', icon: Crown, probability: 5, value: 'legend_skin' },
  { id: 'nothing', label: 'ГЛИТЧ', rarity: 'ПРОВАЛ', color: '#ef4444', icon: XCircle, probability: 10, value: 0 },
  { id: 'jackpot', label: '1000 CR', rarity: 'ЛЕГЕНДАРНЫЙ', color: '#eab308', icon: Gem, probability: 10, value: 1000 },
  { id: 'double_spin', label: 'ДВОЙНОЙ СПИН', rarity: 'РЕДКИЙ', color: '#84cc16', icon: RefreshCw, probability: 10, value: 'double' },
];

const INSTRUMENTS = {
  synth: { type: 'sawtooth', release: 0.3, attack: 0.05, filter: 6000, name: 'Синтезатор', gain: 0.3, color: '#8b5cf6', icon: Cpu },
  piano: { type: 'triangle', release: 0.8, attack: 0.02, filter: 3000, name: 'Пианино', gain: 0.6, color: '#10b981', icon: Music2 },
  bass:  { type: 'square', release: 0.2, attack: 0.05, filter: 800, name: 'Басс', gain: 0.5, color: '#f59e0b', icon: Radio },
  lead:  { type: 'sine', release: 0.4, attack: 0.1, filter: 2000, name: 'Лид', gain: 0.4, color: '#ec4899', icon: Mic2 }
};

const NOTE_COORDS = {
  'C4': 140, 'C#4': 140, 'D4': 130, 'D#4': 130, 'E4': 120,
  'F4': 110, 'F#4': 110, 'G4': 100, 'G#4': 100, 'A4': 90,
  'A#4': 90, 'B4': 80, 'C5': 70, 'C#5': 70, 'D5': 60,
  'D#5': 60, 'E5': 50, 'F5': 40
};

// ==========================================
// --- УЛУЧШЕННЫЙ АУДИО ДВИЖОК ---
// ==========================================

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.sequencerTimer = null;
    this.isPlayingBgm = false;
    this.tempo = 110;
    this.currentStep = 0;
    this.activeNotes = new Set();
    this.bgmPattern = [
      { note: 65.41, time: 0 }, { note: 0, time: 0.25 }, { note: 65.41, time: 0.5 }, { note: 0, time: 0.75 },
      { note: 77.78, time: 1.0 }, { note: 0, time: 1.25 }, { note: 65.41, time: 1.5 }, { note: 0, time: 1.75 }
    ];
    this.bassFrequencies = [65.41, 73.42, 82.41, 87.31];
    this.bassIndex = 0;
  }

  async init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      await this.ctx.resume();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.35;
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.5;
      this.sfxGain.connect(this.masterGain);
    }
    return this.ctx;
  }

  playBgm() {
    if (this.isPlayingBgm || !this.ctx) return;
    this.isPlayingBgm = true;
    this.currentStep = 0;
    this.bassIndex = 0;
    this.scheduleNextStep();
  }

  stopBgm() {
    this.isPlayingBgm = false;
    clearTimeout(this.sequencerTimer);
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, this.ctx.currentTime);
      this.bgmGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }
  }

  scheduleNextStep() {
    if (!this.isPlayingBgm || !this.ctx) return;

    const secondsPerBeat = 60.0 / this.tempo;
    const stepTime = secondsPerBeat / 4;
    const time = this.ctx.currentTime;

    // Bassline с вариацией
    if (this.currentStep % 8 === 0) {
      this.bassIndex = (this.bassIndex + 1) % this.bassFrequencies.length;
    }
    
    const bassPattern = [1, 0, 1, 0, 1, 0, 1, 0];
    if (bassPattern[this.currentStep % 8] && this.currentStep % 2 === 0) {
      const freq = this.bassFrequencies[this.bassIndex];
      this.triggerSynth(freq, time, 0.3, 'square', 200, 0.25);
    }

    // Hi-hat с акцентом
    if (this.currentStep % 2 === 0) {
      this.triggerHiHat(time, this.currentStep % 4 === 2);
    }

    // Snare на 2 и 4
    if (this.currentStep % 8 === 4 || this.currentStep % 8 === 6) {
      this.triggerSnare(time);
    }

    // Kick на сильные доли
    if (this.currentStep % 4 === 0) {
      this.triggerKick(time);
    }

    // Арпеджио каждые 16 шагов
    if (this.currentStep % 16 === 0) {
      const arpNotes = [329.63, 392.00, 493.88, 587.33];
      arpNotes.forEach((note, i) => {
        setTimeout(() => {
          this.triggerSynth(note, this.ctx.currentTime, 0.2, 'sine', 1500, 0.15);
        }, i * 50);
      });
    }

    this.currentStep++;
    this.sequencerTimer = setTimeout(() => this.scheduleNextStep(), stepTime * 1000);
  }

  triggerSynth(freq, time, dur, type, filterFreq, vol) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.value = freq;

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, time);
      filter.frequency.exponentialRampToValueAtTime(100, time + dur);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(vol, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(time);
      osc.stop(time + dur);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  triggerKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.5);
  }

  triggerSnare(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, time);
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.2);
  }

  triggerHiHat(time, open) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'square';
    osc.frequency.value = 8000;
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const dur = open ? 0.1 : 0.03;
    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + dur);
  }

  playNote(freq, instrumentConfig) {
    if (!this.ctx) this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = instrumentConfig.type;
    osc.frequency.setValueAtTime(freq, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(instrumentConfig.filter, t);
    filter.frequency.exponentialRampToValueAtTime(100, t + instrumentConfig.release);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(instrumentConfig.gain, t + instrumentConfig.attack);
    gain.gain.exponentialRampToValueAtTime(0.001, t + instrumentConfig.release);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    const noteId = `${freq}-${Date.now()}`;
    this.activeNotes.add(noteId);

    osc.start(t);
    osc.stop(t + instrumentConfig.release);

    osc.onended = () => {
      this.activeNotes.delete(noteId);
    };
  }

  playSfx(type) {
    if (!this.ctx) return;
    
    const t = this.ctx.currentTime;
    
    switch(type) {
      case 'hover':
        this.createTone(1200, 0.03, 'sine', 0.02);
        break;
      case 'click':
        this.createTone(300, 0.1, 'triangle', 0.1);
        break;
      case 'success':
        this.playChord([523.25, 659.25, 783.99], 0.2);
        break;
      case 'error':
        this.createTone(150, 0.2, 'sawtooth', 0.2);
        break;
      case 'spin_tick':
        this.createTone(800 + Math.random() * 400, 0.05, 'square', 0.1);
        break;
      case 'levelup':
        this.playChord([523.25, 659.25, 783.99, 1046.50], 0.3);
        break;
      case 'win':
        this.playArpeggio([523.25, 659.25, 783.99, 1046.50], 0.1);
        break;
      case 'spin_start':
        this.createTone(200, 0.2, 'sawtooth', 0.3);
        break;
      case 'slot_stop':
        this.createTone(600, 0.1, 'sine', 0.1);
        break;
    }
  }

  createTone(freq, duration, type, volume) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    
    osc.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playChord(frequencies, duration = 0.5) {
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.createTone(freq, duration, 'sine', 0.15);
      }, i * 50);
    });
  }

  playArpeggio(frequencies, noteDuration = 0.1) {
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.createTone(freq, noteDuration, 'triangle', 0.2);
      }, i * noteDuration * 1000);
    });
  }

  setVolume(level) {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(level, this.ctx.currentTime);
    }
  }

  muteAll() {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  unmuteAll() {
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    }
  }
}

const audio = new AudioEngine();

// ==========================================
// --- КОМПОНЕНТЫ ---
// ==========================================

const ParticleBackground = ({ themeColor }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      color: themeColor,
      glow: Math.random() > 0.7
    }));
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Glow effect
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color + '20';
          ctx.fill();
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor]);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

const CyberBtn = ({ children, onClick, className = "", variant = "primary", disabled = false, icon: Icon, glow = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button 
      onMouseEnter={() => {
        setIsHovered(true);
        if (!disabled) audio.playSfx('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => { 
        if (!disabled) {
          audio.playSfx('click');
          onClick?.(e);
        } else {
          audio.playSfx('error');
        }
      }}
      disabled={disabled}
      className={`
        relative px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 
        transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === 'primary' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]' : ''}
        ${variant === 'secondary' ? 'bg-zinc-800/80 text-white hover:bg-zinc-700/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}
        ${variant === 'outline' ? 'border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5' : ''}
        ${variant === 'gradient' ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]' : ''}
        ${glow ? 'shadow-[0_0_25px_rgba(34,211,238,0.5)]' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-2 relative z-10">
        {Icon && <Icon size={18} />}
        {children}
      </div>
      {isHovered && !disabled && (
        <div className="absolute inset-0 rounded-xl border border-white/30 animate-pulse" />
      )}
    </button>
  );
};

const Staff = ({ notes = [], activeIdx = -1, singleNote = null, feedback = null, theme }) => {
  const noteName = singleNote?.name || (activeIdx >= 0 ? notes[activeIdx] : null);
  
  return (
    <div className={`w-full h-64 relative overflow-hidden rounded-2xl border-2 ${theme.colors.border} ${theme.colors.card} p-6 ${theme.colors.glow}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.colors.gradient} opacity-10`} />
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 relative">
          <svg viewBox="0 0 400 180" className="w-full h-full">
            {/* Staff lines */}
            {[40, 60, 80, 100, 120].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeWidth="1" className="opacity-20" />
            ))}
            
            {/* Notes */}
            {singleNote ? (
              <g>
                <ellipse 
                  cx="200" 
                  cy={NOTE_COORDS[singleNote.name]} 
                  rx="15" 
                  ry="12" 
                  className={`${feedback === 'correct' ? 'fill-green-500' : feedback === 'wrong' ? 'fill-red-500' : 'fill-white'} transition-all duration-300`}
                  transform="rotate(-15 200 100)"
                />
                <line 
                  x1="215" 
                  y1={NOTE_COORDS[singleNote.name]} 
                  x2="215" 
                  y2={NOTE_COORDS[singleNote.name] - 40} 
                  stroke={feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : 'white'} 
                  strokeWidth="2"
                />
                {singleNote.name.includes('#') && (
                  <text x="180" y={NOTE_COORDS[singleNote.name] + 5} className="text-2xl fill-white">♯</text>
                )}
              </g>
            ) : notes.map((note, i) => {
              const x = 50 + (i * 40);
              const y = NOTE_COORDS[note] || 100;
              const isActive = i === activeIdx;
              
              return (
                <g key={i}>
                  <ellipse 
                    cx={x} 
                    cy={y} 
                    rx="12" 
                    ry="9" 
                    className={`${isActive ? 'fill-cyan-400' : 'fill-white/40'} transition-all duration-300`}
                    transform={`rotate(-15 ${x} ${y})`}
                  />
                  <line 
                    x1={x + 10} 
                    y1={y} 
                    x2={x + 10} 
                    y2={y - 30} 
                    stroke={isActive ? '#22d3ee' : 'white'} 
                    strokeWidth="1.5"
                    className="opacity-60"
                  />
                  {note.includes('#') && (
                    <text x={x - 15} y={y + 5} className="text-lg fill-white/60">♯</text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {noteName && (
          <div className="mt-4 text-center">
            <div className="text-sm text-zinc-400 uppercase tracking-widest">Текущая нота</div>
            <div className={`text-3xl font-black ${theme.colors.primary}`}>{noteName}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const KeyboardDisplay = ({ pressedKeys, handleInput, activeNote, theme, instrument }) => {
  const blackNotes = ['C#4', 'D#4', 'F#4', 'G#4', 'A#4', 'C#5', 'D#5'];
  
  return (
    <div className="relative p-4 rounded-xl bg-zinc-900/70 border border-white/10 backdrop-blur-sm">
      <div className="flex justify-center gap-1 mb-2">
        {NOTES_LIB.map((note) => {
          const isBlack = blackNotes.includes(note.name);
          const isPressed = pressedKeys[note.key] || activeNote === note.name;
          
          return (
            <div
              key={note.name}
              className={`
                relative flex flex-col items-center justify-end pb-2 cursor-pointer transition-all duration-100
                ${isBlack 
                  ? 'w-8 h-32 -mx-4 z-10 rounded-b' 
                  : 'w-12 h-48 rounded-b-md'
                }
                ${isPressed 
                  ? isBlack 
                    ? 'bg-gradient-to-b from-purple-600 to-purple-800 shadow-lg' 
                    : 'bg-gradient-to-b from-cyan-500 to-cyan-700 shadow-lg'
                  : isBlack 
                    ? 'bg-zinc-800 hover:bg-zinc-700' 
                    : 'bg-white hover:bg-zinc-100'
                }
              `}
              onMouseDown={() => handleInput(note.name)}
              onTouchStart={() => handleInput(note.name)}
            >
              <div className={`text-center ${isBlack ? 'text-white' : 'text-zinc-800'}`}>
                <div className="text-[10px] font-bold">{note.key}</div>
                <div className="text-[9px] opacity-60">{note.label}</div>
              </div>
              
              {isPressed && (
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-zinc-500">
        Инструмент: <span className={theme.colors.primary}>{INSTRUMENTS[instrument].name}</span>
      </div>
    </div>
  );
};

const RouletteWheel = ({ items, spinDuration = 4000, onSpinComplete, spinning, setSpinning, setRotation, rotation }) => {
  const wheelRef = useRef(null);
  const segmentAngle = 360 / items.length;
  
  const spin = () => {
    if (spinning) return;
    
    setSpinning(true);
    audio.playSfx('spin_start');
    
    const fullRotations = 5;
    const randomSegment = Math.floor(Math.random() * items.length);
    const targetRotation = fullRotations * 360 + (randomSegment * segmentAngle);
    
    const startTime = Date.now();
    const startRotation = rotation;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + (targetRotation - startRotation) * easeOut;
      
      setRotation(currentRotation);
      
      if (progress < 1) {
        if (elapsed % 100 < 50) {
          audio.playSfx('spin_tick');
        }
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setSpinning(false);
          onSpinComplete?.(items[randomSegment]);
          audio.playSfx('slot_stop');
        }, 500);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  return (
    <div className="relative">
      <div 
        ref={wheelRef}
        className="relative w-96 h-96 mx-auto rounded-full border-4 border-cyan-500/50 overflow-hidden"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? 'none' : 'transform 0.5s ease-out',
          background: `conic-gradient(from 0deg, ${items.map((item, i) => `${item.color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(', ')})`
        }}
      >
        {items.map((item, index) => {
          const angle = index * segmentAngle;
          const isHighlight = item.rarity === 'ЛЕГЕНДАРНЫЙ';
          
          return (
            <div
              key={item.id}
              className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className={`absolute top-6 left-8 transform -rotate-90 text-white font-bold text-sm ${isHighlight ? 'text-yellow-300' : ''}`}>
                {item.label}
              </div>
            </div>
          );
        })}
        
        {/* Центр рулетки */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-black/80 rounded-full border-4 border-cyan-500 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <div className="text-xs text-cyan-400 font-bold">CSM</div>
            <div className="text-xs text-white font-bold">V3</div>
          </div>
        </div>
      </div>
      
      {/* Указатель */}
      <div className="absolute top-0 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
        <div className="w-2 h-8 bg-red-500 mx-auto shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
      </div>
      
      {/* Кнопка вращения */}
      <button
        onClick={spin}
        disabled={spinning}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-30 shadow-[0_0_30px_rgba(34,211,238,0.8)]"
      >
        {spinning ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          'SPIN'
        )}
      </button>
    </div>
  );
};

const SlotMachine = ({ items, onSpinComplete, spinning, setSpinning }) => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [results, setResults] = useState([null, null, null]);
  
  const spin = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResults([null, null, null]);
    audio.playSfx('spin_start');
    
    const spinDuration = 3000;
    const reelSpeeds = [100, 120, 140];
    const finalResults = [];
    
    // Случайные результаты для каждого барабана
    for (let i = 0; i < 3; i++) {
      finalResults.push(Math.floor(Math.random() * items.length));
    }
    
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      const newReels = reels.map((reel, i) => {
        const speed = reelSpeeds[i];
        const target = finalResults[i];
        
        if (progress > (i + 1) / 4) {
          return target;
        }
        
        return (reel + speed) % items.length;
      });
      
      setReels(newReels);
      
      if (progress < 1) {
        if (elapsed % 100 < 50) {
          audio.playSfx('spin_tick');
        }
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setResults(finalResults.map(i => items[i]));
          setSpinning(false);
          onSpinComplete?.(items[finalResults[Math.floor(Math.random() * 3)]]);
          audio.playSfx('win');
        }, 500);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  return (
    <div className="relative">
      <div className="flex gap-4 justify-center mb-8">
        {[0, 1, 2].map((reelIndex) => (
          <div key={reelIndex} className="relative">
            <div className="w-32 h-48 bg-black/50 border-2 border-cyan-500/50 rounded-xl overflow-hidden">
              <div 
                className="transition-transform duration-100"
                style={{ transform: `translateY(${-reels[reelIndex] * 48}px)` }}
              >
                {items.concat(items).map((item, i) => (
                  <div
                    key={`${reelIndex}-${i}`}
                    className="w-32 h-48 flex flex-col items-center justify-center border-b border-white/10"
                    style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, ${item.color}20 100%)` }}
                  >
                    <item.icon size={36} style={{ color: item.color }} className="mb-3" />
                    <div className="text-xs font-bold uppercase text-zinc-500 mb-1">{item.rarity}</div>
                    <div className="text-lg font-black" style={{ color: item.color }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Выделение */}
            <div className="absolute top-1/2 left-0 right-0 h-16 border-t-2 border-b-2 border-cyan-400 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-400 -translate-y-1/2 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
          </div>
        ))}
      </div>
      
      {/* Кнопка вращения */}
      <button
        onClick={spin}
        disabled={spinning}
        className="mx-auto block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(34,211,238,0.6)]"
      >
        {spinning ? 'ВРАЩАЕТСЯ...' : 'ЗАПУСТИТЬ СЛОТЫ'}
      </button>
      
      {/* Результаты */}
      {results.every(r => r) && (
        <div className="mt-6 text-center animate-in fade-in duration-500">
          <div className="flex justify-center gap-4 mb-4">
            {results.map((result, i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-lg flex items-center justify-center"
                style={{ 
                  border: `2px solid ${result.color}`,
                  background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, ${result.color}20 100%)`
                }}
              >
                <result.icon size={24} style={{ color: result.color }} />
              </div>
            ))}
          </div>
          <div className={`text-xl font-bold ${results[0].rarity === 'ПРОВАЛ' ? 'text-red-500' : 'text-green-400'}`}>
            {results[0].rarity === 'ПРОВАЛ' ? 'ГЛИТЧ!' : 'ВЫИГРЫШ!'}
          </div>
        </div>
      )}
    </div>
  );
};

const CyberRoulette = ({ user, setUser, onClose, theme }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [rouletteType, setRouletteType] = useState('wheel'); // 'wheel' или 'slots'
  const [freeSpins, setFreeSpins] = useState(0);
  
  const handleSpinComplete = (winner) => {
    setResult(winner);
    
    if (winner.id === 'nothing') {
      audio.playSfx('error');
    } else {
      audio.playSfx('win');
      
      // Выдача наград
      let rewardText = '';
      let rewardCoins = 0;
      
      switch(winner.value) {
        case 100:
        case 200:
        case 500:
        case 1000:
          rewardCoins = winner.value;
          setUser(u => ({ ...u, coins: u.coins + rewardCoins }));
          rewardText = `+${rewardCoins} CR`;
          break;
          
        case 'rare_skin':
          const rareAvatars = AVATARS.filter(a => a.rarity === 'РЕДКИЙ' && !user.unlockedAvatars.includes(a.id));
          if (rareAvatars.length > 0) {
            const randomAvatar = rareAvatars[Math.floor(Math.random() * rareAvatars.length)];
            setUser(u => ({ 
              ...u, 
              unlockedAvatars: [...u.unlockedAvatars, randomAvatar.id]
            }));
            rewardText = `Разблокирован: ${randomAvatar.id}`;
          } else {
            rewardCoins = 500;
            setUser(u => ({ ...u, coins: u.coins + rewardCoins }));
            rewardText = `+${rewardCoins} CR (вместо скина)`;
          }
          break;
          
        case 'legend_skin':
          const legendAvatars = AVATARS.filter(a => a.rarity === 'ЛЕГЕНДАРНЫЙ' && !user.unlockedAvatars.includes(a.id));
          if (legendAvatars.length > 0) {
            const randomAvatar = legendAvatars[Math.floor(Math.random() * legendAvatars.length)];
            setUser(u => ({ 
              ...u, 
              unlockedAvatars: [...u.unlockedAvatars, randomAvatar.id]
            }));
            rewardText = `Разблокирован: ${randomAvatar.id}`;
          } else {
            rewardCoins = 1000;
            setUser(u => ({ ...u, coins: u.coins + rewardCoins }));
            rewardText = `+${rewardCoins} CR (вместо скина)`;
          }
          break;
          
        case 'double':
          setFreeSpins(prev => prev + 1);
          rewardText = 'Дополнительный спин!';
          break;
      }
      
      // Показываем уведомление о награде
      setTimeout(() => {
        if (rewardText) {
          audio.playSfx('success');
        }
      }, 1000);
    }
  };
  
  const spin = () => {
    if (user.coins < 100 || spinning) {
      audio.playSfx('error');
      return;
    }
    
    if (freeSpins > 0) {
      setFreeSpins(prev => prev - 1);
    } else {
      setUser(u => ({ ...u, coins: u.coins - 100 }));
    }
  };
  
  const canSpin = user.coins >= 100 || freeSpins > 0;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className={`relative w-full max-w-4xl ${theme.colors.bg} rounded-3xl border-2 ${theme.colors.border} overflow-hidden ${theme.colors.glow}`}>
        {/* Заголовок */}
        <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Dice5 size={48} className={theme.colors.primary} />
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                NEON <span className={theme.colors.primary}>РУЛЕТКА</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Испытай кибер-удачу</p>
          </div>
          
          {/* Переключатель типа рулетки */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setRouletteType('wheel')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${rouletteType === 'wheel' ? `bg-gradient-to-r ${theme.colors.gradient} text-white` : 'bg-zinc-800 text-zinc-400'}`}
            >
              Колесо
            </button>
            <button
              onClick={() => setRouletteType('slots')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${rouletteType === 'slots' ? `bg-gradient-to-r ${theme.colors.gradient} text-white` : 'bg-zinc-800 text-zinc-400'}`}
            >
              Слоты
            </button>
          </div>
        </div>
        
        {/* Основной контент */}
        <div className="p-8">
          {rouletteType === 'wheel' ? (
            <RouletteWheel
              items={ROULETTE_ITEMS}
              onSpinComplete={handleSpinComplete}
              spinning={spinning}
              setSpinning={setSpinning}
              setRotation={setRotation}
              rotation={rotation}
            />
          ) : (
            <SlotMachine
              items={ROULETTE_ITEMS}
              onSpinComplete={handleSpinComplete}
              spinning={spinning}
              setSpinning={setSpinning}
            />
          )}
          
          {/* Статус и кнопка */}
          <div className="mt-8 text-center space-y-6">
            {result ? (
              <div className="animate-in zoom-in duration-500">
                <div className={`text-2xl font-black mb-2 ${result.rarity === 'ПРОВАЛ' ? 'text-red-500' : 'text-green-400'}`}>
                  {result.rarity === 'ПРОВАЛ' ? 'ГЛИТЧ!' : 'ВЫИГРЫШ!'}
                </div>
                <div className="text-xl font-bold mb-4 flex items-center justify-center gap-3">
                  <result.icon size={24} style={{ color: result.color }} />
                  <span style={{ color: result.color }}>{result.label}</span>
                </div>
                <CyberBtn 
                  onClick={() => {
                    setResult(null);
                    if (freeSpins > 0) {
                      setFreeSpins(prev => prev - 1);
                    } else if (user.coins >= 100) {
                      setUser(u => ({ ...u, coins: u.coins - 100 }));
                    }
                  }}
                  disabled={!canSpin}
                  className="px-8 py-3"
                  glow={true}
                >
                  {freeSpins > 0 ? 'КРУТИТЬ БЕСПЛАТНО' : 'КРУТИТЬ СНОВА [100 CR]'}
                </CyberBtn>
              </div>
            ) : (
              <CyberBtn
                onClick={spin}
                disabled={spinning || !canSpin}
                className="px-8 py-4 text-lg"
                glow={true}
              >
                {spinning ? 'ВРАЩЕНИЕ...' : freeSpins > 0 ? `БЕСПЛАТНЫЙ СПИН (${freeSpins} осталось)` : 'ЗАПУСТИТЬ РУЛЕТКУ [100 CR]'}
              </CyberBtn>
            )}
            
            {/* Статистика */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40">
                <Coins size={16} className="text-yellow-400" />
                <span className="font-mono font-bold">{user.coins} CR</span>
              </div>
              
              {freeSpins > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20">
                  <Gift size={16} className="text-green-400" />
                  <span className="font-bold">{freeSpins} бесплатных спинов</span>
                </div>
              )}
              
              <div className="text-zinc-500">
                Шансы: <span className="text-green-400">80%</span> на выигрыш
              </div>
            </div>
            
            {/* Призы */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              {ROULETTE_ITEMS.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-zinc-900/50 border border-white/10 text-center"
                >
                  <item.icon size={20} style={{ color: item.color }} className="mx-auto mb-1" />
                  <div className="text-xs font-bold" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-[10px] text-zinc-500">{item.probability}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopLoader = ({ theme, onLoaded }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoaded, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [onLoaded]);
  
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className={`w-20 h-20 border-4 ${theme.colors.border} border-t-transparent rounded-full animate-spin mb-6`} />
      <div className="text-center mb-4">
        <div className="text-xl font-bold mb-2">Загрузка магазина...</div>
        <div className="text-sm text-zinc-500">Декодирование криптовалютных каналов</div>
      </div>
      <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-zinc-500">{progress}%</div>
    </div>
  );
};

const AchievementBadge = ({ title, description, unlocked, icon: Icon }) => (
  <div className={`p-4 rounded-xl border ${unlocked ? 'border-green-500/50 bg-green-500/10' : 'border-zinc-800 bg-zinc-900/50'} transition-all duration-300 hover:scale-[1.02]`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${unlocked ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="font-bold">{title}</div>
        <div className="text-sm text-zinc-500">{description}</div>
      </div>
      {unlocked ? (
        <CheckCircle size={20} className="text-green-500" />
      ) : (
        <Lock size={20} className="text-zinc-600" />
      )}
    </div>
  </div>
);

// ==========================================
// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---
// ==========================================

export default function CyberScaleMaster() {
  // Основные состояния
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('csm_v3_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  
  // Состояния приложения
  const [view, setView] = useState('dashboard');
  const [themeId, setThemeId] = useState('cyber');
  const [instrument, setInstrument] = useState('synth');
  const [volume, setVolume] = useState(true);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Игровые состояния
  const [activeNote, setActiveNote] = useState(null);
  const [pressedKeys, setPressedKeys] = useState({});
  const [testNote, setTestNote] = useState(null);
  const [testFeedback, setTestFeedback] = useState(null);
  const [learnSession, setLearnSession] = useState(null);
  const [combo, setCombo] = useState(0);
  const [showComboEffect, setShowComboEffect] = useState(false);
  
  // Магазин
  const [isShopLoading, setIsShopLoading] = useState(false);
  const [shopTab, setShopTab] = useState('avatars');
  
  // Достижения
  const achievements = [
    { id: 'first_note', title: 'Первая нота', description: 'Сыграйте свою первую ноту', icon: Music, unlocked: user?.xp > 0 },
    { id: 'scale_master', title: 'Мастер гамм', description: 'Изучите 3 гаммы', icon: GraduationCap, unlocked: user?.unlockedScales.length >= 3 },
    { id: 'combo_king', title: 'Король комбо', description: 'Соберите комбо x10', icon: Trophy, unlocked: combo >= 10 },
    { id: 'rich', title: 'Крипто-кит', description: 'Заработайте 5000 CR', icon: Coins, unlocked: user?.coins >= 5000 },
    { id: 'theme_collector', title: 'Коллекционер', description: 'Купите все темы', icon: Palette, unlocked: user?.unlockedThemes?.length >= Object.keys(THEMES).length },
  ];
  
  const theme = THEMES[themeId];
  
  // Сохранение прогресса
  useEffect(() => {
    if (user) {
      localStorage.setItem('csm_v3_user', JSON.stringify(user));
    }
  }, [user]);
  
  // Инициализация аудио
  useEffect(() => {
    if (started && volume) {
      audio.init().then(() => {
        audio.playBgm();
      });
    } else if (started && !volume) {
      audio.stopBgm();
    }
  }, [started, volume]);
  
  // Обработка клавиатуры
  useEffect(() => {
    if (!started) return;
    
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      
      const key = e.key.toUpperCase();
      const noteObj = NOTES_LIB.find(n => n.key === key);
      
      if (noteObj) {
        setPressedKeys(prev => ({ ...prev, [key]: true }));
        handleInput(noteObj.name);
      }
      
      // Быстрые клавиши
      switch(key) {
        case '1': setView('dashboard'); break;
        case '2': setView('learn'); break;
        case '3': setView('training'); break;
        case '4': setView('freestyle'); break;
        case '5': setView('shop'); break;
        case '6': setView('achievements'); break;
        case 'M': setVolume(!volume); break;
        case 'R': if (view === 'training') generateNewNote(); break;
        case 'L': if (view === 'learn' && learnSession && !learnSession.completed) {
          const currentNote = learnSession.scale.notes[learnSession.currentIndex];
          audio.playNote(NOTES_LIB.find(n => n.name === currentNote).freq, INSTRUMENTS[instrument]);
        }; break;
      }
    };
    
    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => ({ ...prev, [key]: false }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [started, view, learnSession, testNote, instrument]);
  
  // Основная логика игры
  const handleInput = (noteName) => {
    const note = NOTES_LIB.find(n => n.name === noteName);
    if (!note) return;
    
    // Воспроизведение звука
    audio.playNote(note.freq, INSTRUMENTS[instrument]);
    setActiveNote(noteName);
    setTimeout(() => setActiveNote(null), 200);
    
    // Режим тренировки
    if (view === 'training' && testNote) {
      if (noteName === testNote.name) {
        setTestFeedback('correct');
        audio.playSfx('success');
        
        const newCombo = combo + 1;
        setCombo(newCombo);
        
        if (newCombo >= 5) {
          setShowComboEffect(true);
          setTimeout(() => setShowComboEffect(false), 1000);
        }
        
        const xpGain = 15 * (1 + newCombo * 0.1);
        const coinsGain = 5 * (1 + newCombo * 0.1);
        
        updateStats(xpGain, coinsGain);
        
        setTimeout(() => {
          generateNewNote();
          setTestFeedback(null);
        }, 600);
      } else {
        setTestFeedback('wrong');
        audio.playSfx('error');
        setCombo(0);
        setTimeout(() => setTestFeedback(null), 400);
      }
    }
    
    // Режим обучения
    if (view === 'learn' && learnSession && !learnSession.completed) {
      const currentNote = learnSession.scale.notes[learnSession.currentIndex];
      
      if (noteName === currentNote) {
        const nextIndex = learnSession.currentIndex + 1;
        
        if (nextIndex >= learnSession.scale.notes.length) {
          // Гамма изучена
          setLearnSession(prev => ({ ...prev, completed: true }));
          audio.playSfx('success');
          updateStats(learnSession.scale.reward, learnSession.scale.reward / 2);
          
          // Разблокируем следующую гамму
          const scaleIndex = SCALES_DB.findIndex(s => s.id === learnSession.scale.id);
          if (scaleIndex < SCALES_DB.length - 1) {
            const nextScale = SCALES_DB[scaleIndex + 1];
            if (!user.unlockedScales.includes(nextScale.id)) {
              setUser(prev => ({
                ...prev,
                unlockedScales: [...prev.unlockedScales, nextScale.id]
              }));
            }
          }
        } else {
          setLearnSession(prev => ({ ...prev, currentIndex: nextIndex }));
          audio.playSfx('click');
        }
      } else {
        audio.playSfx('error');
      }
    }
  };
  
  const updateStats = (xpAdd, coinsAdd) => {
    setUser(prev => {
      const newXp = prev.xp + xpAdd;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const levelUp = newLevel > prev.level;
      
      if (levelUp) {
        audio.playSfx('levelup');
      }
      
      return {
        ...prev,
        xp: newXp,
        coins: prev.coins + Math.floor(coinsAdd),
        level: newLevel,
        totalCoinsEarned: (prev.totalCoinsEarned || 0) + Math.floor(coinsAdd)
      };
    });
  };
  
  const generateNewNote = () => {
    const availableNotes = NOTES_LIB.filter(n => !testNote || n.name !== testNote.name);
    const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
    setTestNote(randomNote);
  };
  
  const startLearningScale = (scale) => {
    if (!user.unlockedScales.includes(scale.id)) {
      if (user.coins >= scale.price) {
        setUser(prev => ({
          ...prev,
          coins: prev.coins - scale.price,
          unlockedScales: [...prev.unlockedScales, scale.id]
        }));
        audio.playSfx('success');
      } else {
        audio.playSfx('error');
        return;
      }
    }
    
    setLearnSession({
      scale,
      currentIndex: 0,
      completed: false,
      startTime: Date.now()
    });
    setView('learn');
  };
  
  const buyAvatar = (avatar) => {
    if (user.coins >= avatar.price) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - avatar.price,
        unlockedAvatars: [...prev.unlockedAvatars, avatar.id]
      }));
      audio.playSfx('success');
    } else {
      audio.playSfx('error');
    }
  };
  
  const buyTheme = (themeToBuy) => {
    if (user.coins >= themeToBuy.price) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - themeToBuy.price,
        unlockedThemes: [...prev.unlockedThemes, themeToBuy.id]
      }));
      audio.playSfx('success');
    } else {
      audio.playSfx('error');
    }
  };
  
  const initializeUser = () => {
    if (!userName.trim()) {
      audio.playSfx('error');
      return;
    }
    
    audio.playSfx('success');
    
    setTimeout(() => {
      const newUser = {
        name: userName,
        coins: 1000,
        xp: 0,
        level: 1,
        unlockedAvatars: ['Felix'],
        unlockedScales: ['c-major'],
        unlockedThemes: ['cyber'],
        equippedAvatar: 'Felix',
        equippedTheme: 'cyber',
        totalCoinsEarned: 0,
        playTime: 0,
        notesPlayed: 0,
        scalesCompleted: 0
      };
      
      setUser(newUser);
      setStarted(true);
      audio.playBgm();
    }, 1000);
  };
  
  const handleStartExisting = () => {
    setStarted(true);
    setThemeId(user.equippedTheme);
    audio.init().then(() => {
      audio.playBgm();
    });
  };
  
  const logout = () => {
    audio.stopBgm();
    setStarted(false);
    setUser(null);
    setUserName('');
  };
  
  const exportSave = () => {
    const saveData = JSON.stringify(user, null, 2);
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `csm_save_${user.name}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const importSave = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target.result);
        setUser(saveData);
        audio.playSfx('success');
      } catch {
        audio.playSfx('error');
      }
    };
    reader.readAsText(file);
  };
  
  // Экран приветствия
  if (!started) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <ParticleBackground themeColor="#22d3ee" />
        
        {user ? (
          // Возвращающийся пользователь
          <div className="relative z-10 max-w-md w-full space-y-8 animate-in zoom-in duration-700">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-cyan-500 overflow-hidden bg-black shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.equippedAvatar}`} 
                  alt="Avatar"
                  className="w-full h-full"
                />
              </div>
              <h1 className="text-4xl font-black italic uppercase mb-2">
                С возвращением, <span className="text-cyan-400">{user.name}</span>
              </h1>
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-8">
                Уровень {user.level} | {user.coins} CR
              </p>
            </div>
            
            <div className="space-y-4">
              <CyberBtn onClick={handleStartExisting} className="w-full py-4 text-lg" icon={Zap} glow>
                ПРОДОЛЖИТЬ
              </CyberBtn>
              
              <div className="flex gap-4">
                <CyberBtn 
                  onClick={exportSave}
                  variant="outline"
                  className="flex-1 py-3"
                  icon={DownloadCloud}
                >
                  Экспорт
                </CyberBtn>
                
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSave}
                    className="hidden"
                  />
                  <div className="w-full h-full">
                    <CyberBtn
                      variant="outline"
                      className="w-full py-3"
                      icon={UploadCloud}
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    >
                      Импорт
                    </CyberBtn>
                  </div>
                </label>
              </div>
              
              <CyberBtn 
                onClick={logout}
                variant="secondary"
                className="w-full py-3"
                icon={LogOut}
              >
                Выйти
              </CyberBtn>
            </div>
          </div>
        ) : (
          // Новый пользователь
          <div className="relative z-10 max-w-md w-full space-y-8 animate-in zoom-in duration-700">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.7)]">
                <Music2 size={48} className="text-white" />
              </div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                CYBER<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">SCALE</span>
              </h1>
              <p className="text-cyan-600/50 text-xs tracking-[0.5em] uppercase">
                Нейро-аудио интерфейс v{APP_VERSION}
              </p>
            </div>
            
            <div className="bg-zinc-900/80 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-zinc-500 mb-2 uppercase font-bold tracking-widest">
                    Введите позывной
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (e.target.value.length > 0) audio.playSfx('click');
                    }}
                    className="w-full bg-black/50 border-b-2 border-cyan-500/50 text-2xl font-bold py-3 px-4 focus:outline-none focus:border-cyan-400 text-white placeholder-white/20 uppercase tracking-wider"
                    placeholder="USER_01"
                    maxLength={12}
                    onKeyDown={(e) => e.key === 'Enter' && initializeUser()}
                  />
                </div>
                
                <div className="space-y-3">
                  <CyberBtn
                    onClick={initializeUser}
                    disabled={!userName.trim()}
                    className="w-full py-4 text-lg"
                    icon={Rocket}
                    glow
                  >
                    ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ
                  </CyberBtn>
                  
                  <p className="text-center text-xs text-zinc-500">
                    Нажмите Enter для быстрого старта
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${theme.colors.bg} text-white font-sans flex flex-col relative overflow-hidden transition-colors duration-700`}>
      <ParticleBackground themeColor={theme.colors.particle} />
      
      {showRoulette && (
        <CyberRoulette
          user={user}
          setUser={setUser}
          onClose={() => setShowRoulette(false)}
          theme={theme}
        />
      )}
      
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className={`relative max-w-md w-full ${theme.colors.bg} rounded-2xl border-2 ${theme.colors.border} p-6 ${theme.colors.glow}`}>
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-2xl font-bold mb-6">Настройки</h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-zinc-500 mb-2">Громкость</div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setVolume(false)}
                    className={`p-2 rounded-lg ${!volume ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'bg-zinc-800'}`}
                  >
                    <VolumeX size={20} />
                  </button>
                  <button
                    onClick={() => setVolume(true)}
                    className={`p-2 rounded-lg ${volume ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'bg-zinc-800'}`}
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-zinc-500 mb-2">Инструмент</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(INSTRUMENTS).map(([key, inst]) => (
                    <button
                      key={key}
                      onClick={() => setInstrument(key)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        instrument === key
                          ? `bg-gradient-to-r ${theme.colors.gradient} text-white shadow-lg`
                          : 'bg-zinc-800 hover:bg-zinc-700'
                      }`}
                    >
                      <div className="font-bold">{inst.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-zinc-500 mb-2">Управление</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>A-W-S-E-D-F...</span>
                    <span className="text-cyan-400">Играть ноты</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1-2-3-4-5-6</span>
                    <span className="text-cyan-400">Переключение режимов</span>
                  </div>
                  <div className="flex justify-between">
                    <span>M</span>
                    <span className="text-cyan-400">Музыка вкл/выкл</span>
                  </div>
                  <div className="flex justify-between">
                    <span>R</span>
                    <span className="text-cyan-400">Новая нота (тренировка)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>L</span>
                    <span className="text-cyan-400">Повторить ноту (обучение)</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <CyberBtn onClick={exportSave} className="w-full" icon={Download} glow>
                  Экспорт сохранения
                </CyberBtn>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Шапка */}
      <header className={`sticky top-0 z-40 border-b ${theme.colors.border} ${theme.colors.glass} backdrop-blur-xl px-4 md:px-8 py-4`}>
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setView('dashboard')}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${theme.colors.gradient} ${theme.colors.glow}`}>
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter leading-none">
                CYBER<span className={theme.colors.primary}>SCALE</span>
              </h1>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                v{APP_VERSION} | {user.name}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full border ${theme.colors.border} bg-black/40`}>
                <div className="flex items-center gap-2">
                  <Coins size={16} className="text-yellow-400" />
                  <span className="font-mono font-bold text-yellow-400">{user.coins}</span>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-full border ${theme.colors.border} bg-black/40`}>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span className="font-bold">Ур. {user.level}</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowRoulette(true)}
                className={`px-4 py-2 rounded-full border ${theme.colors.border} bg-black/40 hover:bg-black/60 transition-colors flex items-center gap-2`}
              >
                <Dice5 size={16} className="text-purple-400" />
                <span className="font-bold">Рулетка</span>
              </button>
            </div>
            
            <button
              onClick={() => setVolume(!volume)}
              className={`p-2 rounded-lg ${volume ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-500'}`}
            >
              {volume ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
            >
              <Settings size={20} />
            </button>
            
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/50 overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.equippedAvatar}`}
                alt="Avatar"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Навигация */}
      <nav className="sticky top-[72px] z-30 border-b ${theme.colors.border} ${theme.colors.glass} backdrop-blur-xl px-4 md:px-8 py-3">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {[
            { id: 'dashboard', label: 'Панель', icon: Home },
            { id: 'learn', label: 'Обучение', icon: BookOpen },
            { id: 'training', label: 'Тренировка', icon: Target },
            { id: 'freestyle', label: 'Свободная игра', icon: Keyboard },
            { id: 'shop', label: 'Магазин', icon: ShoppingBag },
            { id: 'achievements', label: 'Достижения', icon: Trophy }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'shop') setIsShopLoading(true);
                setView(item.id);
                audio.playSfx('click');
              }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300
                ${view === item.id
                  ? `bg-gradient-to-r ${theme.colors.gradient} text-white shadow-lg`
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <item.icon size={18} />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Основной контент */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {view === 'dashboard' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`col-span-1 md:col-span-2 ${theme.colors.card} rounded-2xl p-6 ${theme.colors.glow}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Прогресс обучения</h2>
                    <p className="text-zinc-500">Продолжайте тренироваться для улучшения навыков</p>
                  </div>
                  <Trophy size={32} className={theme.colors.primary} />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Уровень {user.level}</span>
                      <span>{user.xp % 1000}/1000 XP</span>
                    </div>
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-1000"
                        style={{ width: `${(user.xp % 1000) / 10}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 rounded-xl bg-zinc-900/50">
                      <div className="text-3xl font-black text-cyan-400">{user.unlockedScales.length}</div>
                      <div className="text-sm text-zinc-500">Изученных гамм</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-zinc-900/50">
                      <div className="text-3xl font-black text-purple-400">{user.coins}</div>
                      <div className="text-sm text-zinc-500">Крипто-кредитов</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className={`${theme.colors.card} rounded-2xl p-6 ${theme.colors.glow}`}>
                  <h3 className="font-bold mb-4">Быстрый старт</h3>
                  <div className="space-y-3">
                    <CyberBtn onClick={() => setView('training')} className="w-full" icon={Target} glow>
                      Тренировка слуха
                    </CyberBtn>
                    <CyberBtn onClick={() => setView('learn')} className="w-full" icon={BookOpen}>
                      Изучить гамму
                    </CyberBtn>
                    <CyberBtn onClick={() => setShowRoulette(true)} variant="gradient" className="w-full" icon={Dice5} glow>
                      Кибер-рулетка
                    </CyberBtn>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Гаммы */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Доступные гаммы</h2>
                <button
                  onClick={() => setView('learn')}
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Посмотреть все →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SCALES_DB.slice(0, 3).map((scale) => (
                  <div
                    key={scale.id}
                    className={`${theme.colors.card} rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer ${theme.colors.glow}`}
                    onClick={() => startLearningScale(scale)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{scale.title}</h3>
                        <div className="text-sm text-zinc-500">{scale.description}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${user.unlockedScales.includes(scale.id) ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {user.unlockedScales.includes(scale.id) ? 'ИЗУЧЕНО' : `${scale.price} CR`}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">{scale.notes.length} нот</span>
                      <span className={`font-bold ${scale.difficulty === 'Новичок' ? 'text-green-400' : scale.difficulty === 'Профессионал' ? 'text-yellow-400' : 'text-purple-400'}`}>
                        {scale.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {view === 'learn' && (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            {learnSession ? (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setLearnSession(null)}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold">{learnSession.scale.title}</h2>
                    <p className="text-zinc-500">Изучение гаммы</p>
                  </div>
                </div>
                
                {learnSession.completed ? (
                  <div className={`${theme.colors.card} rounded-2xl p-8 text-center ${theme.colors.glow}`}>
                    <Trophy size={64} className="mx-auto text-yellow-400 mb-6" />
                    <h3 className="text-3xl font-bold mb-4">Гамма изучена!</h3>
                    <p className="text-zinc-400 mb-6">
                      Вы успешно освоили {learnSession.scale.title}. Награда: +{learnSession.scale.reward} XP
                    </p>
                    <CyberBtn onClick={() => setLearnSession(null)} className="mx-auto" glow>
                      Продолжить обучение
                    </CyberBtn>
                  </div>
                ) : (
                  <>
                    <Staff
                      notes={learnSession.scale.notes}
                      activeIdx={learnSession.currentIndex}
                      theme={theme}
                    />
                    
                    <div className="text-center">
                      <p className="text-zinc-500 mb-2">Сыграйте следующую ноту:</p>
                      <div className={`text-5xl font-black ${theme.colors.primary} mb-6`}>
                        {learnSession.scale.notes[learnSession.currentIndex]}
                      </div>
                      <p className="text-sm text-zinc-500">
                        Прогресс: {learnSession.currentIndex + 1}/{learnSession.scale.notes.length}
                      </p>
                    </div>
                    
                    <KeyboardDisplay
                      pressedKeys={pressedKeys}
                      handleInput={handleInput}
                      activeNote={activeNote}
                      theme={theme}
                      instrument={instrument}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Изучение гамм</h2>
                  <p className="text-zinc-500">
                    Выберите гамму для изучения. Каждая гамма открывает новые возможности!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SCALES_DB.map((scale) => {
                    const isUnlocked = user.unlockedScales.includes(scale.id);
                    const isEquipped = user.equippedScale === scale.id;
                    
                    return (
                      <div
                        key={scale.id}
                        className={`${theme.colors.card} rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 ${theme.colors.glow}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl mb-1">{scale.title}</h3>
                            <p className="text-sm text-zinc-500">{scale.description}</p>
                          </div>
                          {!isUnlocked && <Lock size={20} className="text-zinc-600" />}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-500">Сложность:</span>
                            <span className={`font-bold ${
                              scale.difficulty === 'Новичок' ? 'text-green-400' :
                              scale.difficulty === 'Продвинутый' ? 'text-yellow-400' :
                              scale.difficulty === 'Профессионал' ? 'text-orange-400' : 'text-purple-400'
                            }`}>
                              {scale.difficulty}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-500">Награда:</span>
                            <span className="font-bold text-green-400">+{scale.reward} XP</span>
                          </div>
                          
                          {isUnlocked ? (
                            <CyberBtn
                              onClick={() => startLearningScale(scale)}
                              className="w-full"
                              icon={Play}
                              glow
                            >
                              {isEquipped ? 'ПРОДОЛЖИТЬ' : 'НАЧАТЬ ОБУЧЕНИЕ'}
                            </CyberBtn>
                          ) : (
                            <CyberBtn
                              onClick={() => {
                                if (user.coins >= scale.price) {
                                  setUser(prev => ({
                                    ...prev,
                                    coins: prev.coins - scale.price,
                                    unlockedScales: [...prev.unlockedScales, scale.id]
                                  }));
                                  audio.playSfx('success');
                                } else {
                                  audio.playSfx('error');
                                }
                              }}
                              disabled={user.coins < scale.price}
                              variant="outline"
                              className="w-full"
                              icon={Coins}
                            >
                              КУПИТЬ ЗА {scale.price} CR
                            </CyberBtn>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
        {view === 'training' && (
          <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">Тренировка слуха</h2>
                <p className="text-zinc-500">Определите ноту на слух</p>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-zinc-500 uppercase tracking-widest mb-1">Комбо</div>
                <div className={`text-4xl font-black ${combo >= 5 ? 'animate-pulse text-yellow-400' : 'text-white'}`}>
                  x{combo}
                </div>
              </div>
            </div>
            
            {testNote ? (
              <div className="space-y-8">
                <Staff
                  singleNote={testNote}
                  feedback={testFeedback}
                  theme={theme}
                />
                
                <div className="h-16 flex items-center justify-center">
                  {testFeedback === 'correct' && (
                    <div className="text-green-400 text-2xl font-black animate-bounce flex items-center gap-3">
                      <CheckCircle size={28} />
                      ВЕРНО! +{Math.floor(15 * (1 + combo * 0.1))} XP
                    </div>
                  )}
                  {testFeedback === 'wrong' && (
                    <div className="text-red-400 text-2xl font-black animate-shake flex items-center gap-3">
                      <XCircle size={28} />
                      НЕВЕРНО
                    </div>
                  )}
                  {!testFeedback && (
                    <div className="text-zinc-500 text-sm uppercase tracking-widest animate-pulse">
                      Слушайте и нажимайте соответствующую клавишу...
                    </div>
                  )}
                </div>
                
                <KeyboardDisplay
                  pressedKeys={pressedKeys}
                  handleInput={handleInput}
                  activeNote={activeNote}
                  theme={theme}
                  instrument={instrument}
                />
                
                <div className="flex justify-center gap-4">
                  <CyberBtn
                    onClick={generateNewNote}
                    variant="outline"
                    icon={RefreshCw}
                  >
                    СЛЕДУЮЩАЯ НОТА (R)
                  </CyberBtn>
                  
                  <CyberBtn
                    onClick={() => {
                      setTestNote(null);
                      setCombo(0);
                      setTestFeedback(null);
                    }}
                    variant="secondary"
                    icon={X}
                  >
                    ЗАКОНЧИТЬ
                  </CyberBtn>
                </div>
              </div>
            ) : (
              <div className={`${theme.colors.card} rounded-2xl p-12 text-center ${theme.colors.glow}`}>
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br ${theme.colors.gradient} animate-pulse shadow-[0_0_40px_rgba(34,211,238,0.5)]`}>
                  <Target size={40} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Готовы к тренировке?</h3>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                  Система будет играть случайные ноты. Ваша задача — определить их и нажать соответствующую клавишу на клавиатуре.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CyberBtn onClick={generateNewNote} className="px-8 py-4 text-lg" icon={Play} glow>
                    НАЧАТЬ ТРЕНИРОВКУ
                  </CyberBtn>
                  
                  <CyberBtn
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    icon={Settings}
                  >
                    НАСТРОЙКИ
                  </CyberBtn>
                </div>
                
                <div className="mt-8 text-sm text-zinc-500">
                  <p>Используйте клавиши A, W, S, E, D, F, T, G, Y, H, U, J, K, O, L, P, ; для игры</p>
                  <p>Нажмите R для следующей ноты, M для отключения музыки</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {view === 'freestyle' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Свободная игра</h2>
                <p className="text-zinc-500">Экспериментируйте со звуками и создавайте музыку</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {Object.entries(INSTRUMENTS).map(([key, inst]) => (
                  <button
                    key={key}
                    onClick={() => setInstrument(key)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      instrument === key
                        ? `bg-gradient-to-r ${theme.colors.gradient} text-white shadow-lg`
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
                    }`}
                  >
                    {inst.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={`h-64 ${theme.colors.card} rounded-2xl p-6 ${theme.colors.glow}`}>
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Music2 size={48} className="mx-auto mb-4 text-zinc-600" />
                    <div className="text-zinc-500">
                      Используйте клавиатуру для игры. Текущий инструмент:{' '}
                      <span className={theme.colors.primary}>{INSTRUMENTS[instrument].name}</span>
                    </div>
                  </div>
                </div>
                
                {activeNote && (
                  <div className="text-center">
                    <div className="text-sm text-zinc-500 mb-1">Играется:</div>
                    <div className={`text-3xl font-black ${theme.colors.primary}`}>
                      {activeNote}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <KeyboardDisplay
              pressedKeys={pressedKeys}
              handleInput={handleInput}
              activeNote={activeNote}
              theme={theme}
              instrument={instrument}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${theme.colors.card} rounded-xl p-6 ${theme.colors.glow}`}>
                <h3 className="font-bold mb-3">Подсказки</h3>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>• Используйте клавиатуру для игры</li>
                  <li>• Меняйте инструменты для разного звучания</li>
                  <li>• Экспериментируйте с аккордами и мелодиями</li>
                  <li>• Нажмите M для отключения фоновой музыки</li>
                </ul>
              </div>
              
              <div className={`${theme.colors.card} rounded-xl p-6 ${theme.colors.glow}`}>
                <h3 className="font-bold mb-3">Горячие клавиши</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">1-5:</span>
                    <span className="text-cyan-400">Переключение режимов</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">A-;:</span>
                    <span className="text-cyan-400">Играть ноты</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">M:</span>
                    <span className="text-cyan-400">Музыка вкл/выкл</span>
                  </div>
                </div>
              </div>
              
              <div className={`${theme.colors.card} rounded-xl p-6 ${theme.colors.glow}`}>
                <h3 className="font-bold mb-3">Инструменты</h3>
                <div className="space-y-3">
                  {Object.entries(INSTRUMENTS).map(([key, inst]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: inst.color }}
                      />
                      <div className="flex-1 text-sm">{inst.name}</div>
                      <div className="text-xs text-zinc-500">{inst.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {view === 'shop' && (
          <div className="max-w-6xl mx-auto animate-in zoom-in-95 duration-300">
            {isShopLoading ? (
              <ShopLoader theme={theme} onLoaded={() => setIsShopLoading(false)} />
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Кибер-магазин</h2>
                    <p className="text-zinc-500">Потратьте свои крипто-кредиты с умом</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Coins size={24} className="text-yellow-400" />
                    <span className="text-2xl font-black text-yellow-400">{user.coins} CR</span>
                  </div>
                </div>
                
                <div className="flex gap-4 border-b border-white/10 pb-4">
                  <button
                    onClick={() => setShopTab('avatars')}
                    className={`px-4 py-2 font-bold transition-all ${
                      shopTab === 'avatars'
                        ? `border-b-2 ${theme.colors.primary}`
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    Аватары
                  </button>
                  <button
                    onClick={() => setShopTab('themes')}
                    className={`px-4 py-2 font-bold transition-all ${
                      shopTab === 'themes'
                        ? `border-b-2 ${theme.colors.primary}`
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    Темы
                  </button>
                  <button
                    onClick={() => setShopTab('roulette')}
                    className={`px-4 py-2 font-bold transition-all ${
                      shopTab === 'roulette'
                        ? `border-b-2 ${theme.colors.primary}`
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    Рулетка
                  </button>
                </div>
                
                {shopTab === 'avatars' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {AVATARS.map((avatar) => {
                      const isOwned = user.unlockedAvatars.includes(avatar.id);
                      const isEquipped = user.equippedAvatar === avatar.id;
                      
                      return (
                        <div
                          key={avatar.id}
                          className={`${theme.colors.card} rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] ${theme.colors.glow}`}
                        >
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 bg-black">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar.id}`}
                              alt={avatar.id}
                              className={`w-full h-full ${!isOwned && 'grayscale opacity-50'}`}
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="font-bold text-lg">{avatar.id}</div>
                              <div className={`text-xs font-bold uppercase tracking-widest ${
                                avatar.rarity === 'ЛЕГЕНДАРНЫЙ' ? 'text-yellow-400' :
                                avatar.rarity === 'ЭПИЧЕСКИЙ' ? 'text-purple-400' :
                                avatar.rarity === 'РЕДКИЙ' ? 'text-blue-400' : 'text-zinc-500'
                              }`}>
                                {avatar.rarity}
                              </div>
                            </div>
                            
                            {isOwned ? (
                              <CyberBtn
                                onClick={() => {
                                  if (!isEquipped) {
                                    setUser(prev => ({ ...prev, equippedAvatar: avatar.id }));
                                    audio.playSfx('click');
                                  }
                                }}
                                disabled={isEquipped}
                                className="w-full"
                                glow={isEquipped}
                              >
                                {isEquipped ? 'ВЫБРАН' : 'ВЫБРАТЬ'}
                              </CyberBtn>
                            ) : (
                              <CyberBtn
                                onClick={() => buyAvatar(avatar)}
                                disabled={user.coins < avatar.price}
                                variant="outline"
                                className="w-full"
                                icon={Coins}
                              >
                                {avatar.price} CR
                              </CyberBtn>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {shopTab === 'themes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.values(THEMES).map((themeItem) => {
                      const isOwned = user.unlockedThemes.includes(themeItem.id);
                      const isEquipped = themeId === themeItem.id;
                      
                      return (
                        <div
                          key={themeItem.id}
                          className={`${theme.colors.card} rounded-xl p-6 ${isEquipped ? theme.colors.glow : ''}`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`text-xl font-bold ${themeItem.colors.primary}`}>
                                {themeItem.name}
                              </h3>
                              <p className="text-zinc-500 text-sm">Визуальная тема интерфейса</p>
                            </div>
                            
                            {isEquipped && (
                              <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                                АКТИВНО
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              <div className={`w-8 h-8 rounded ${themeItem.colors.bg}`} />
                              <div className={`w-8 h-8 rounded ${themeItem.colors.glass}`} />
                              <div className={`flex-1 rounded bg-gradient-to-r ${themeItem.colors.gradient}`} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold">
                                {themeItem.price === 0 ? 'БЕСПЛАТНО' : `${themeItem.price} CR`}
                              </div>
                              
                              {isOwned ? (
                                <CyberBtn
                                  onClick={() => {
                                    if (!isEquipped) {
                                      setThemeId(themeItem.id);
                                      setUser(prev => ({ ...prev, equippedTheme: themeItem.id }));
                                      audio.playSfx('click');
                                    }
                                  }}
                                  disabled={isEquipped}
                                  className="px-6"
                                  glow={isEquipped}
                                >
                                  {isEquipped ? 'ВЫБРАНО' : 'ВЫБРАТЬ'}
                                </CyberBtn>
                              ) : (
                                <CyberBtn
                                  onClick={() => buyTheme(themeItem)}
                                  disabled={user.coins < themeItem.price}
                                  variant="outline"
                                  className="px-6"
                                  icon={Coins}
                                >
                                  КУПИТЬ
                                </CyberBtn>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {shopTab === 'roulette' && (
                  <div className={`${theme.colors.card} rounded-2xl p-8 text-center ${theme.colors.glow}`}>
                    <Dice5 size={64} className="mx-auto text-cyan-400 mb-6" />
                    
                    <h3 className="text-2xl font-bold mb-4">Кибер-рулетка</h3>
                    <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                      Испытайте удачу! За 100 CR вы можете выиграть до 1000 CR или редкие предметы.
                      Шансы на выигрыш: 80%
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                      {ROULETTE_ITEMS.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col items-center p-4 rounded-lg bg-zinc-900/50 border border-white/10"
                        >
                          <item.icon size={24} style={{ color: item.color }} className="mb-2" />
                          <div className="text-sm font-bold" style={{ color: item.color }}>
                            {item.label}
                          </div>
                          <div className="text-xs text-zinc-500">{item.probability}%</div>
                        </div>
                      ))}
                    </div>
                    
                    <CyberBtn
                      onClick={() => setShowRoulette(true)}
                      variant="gradient"
                      className="px-8 py-4 text-lg"
                      icon={Dice5}
                      glow
                    >
                      ИГРАТЬ В РУЛЕТКУ [100 CR]
                    </CyberBtn>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {view === 'achievements' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Достижения</h2>
              <p className="text-zinc-500">
                Отслеживайте свой прогресс и получайте награды за достижения
              </p>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} {...achievement} />
              ))}
            </div>
            
            <div className={`mt-8 ${theme.colors.card} rounded-2xl p-6 ${theme.colors.glow}`}>
              <h3 className="font-bold mb-4">Статистика</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-zinc-900/50">
                  <div className="text-3xl font-black text-cyan-400">{user.level}</div>
                  <div className="text-sm text-zinc-500">Уровень</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-zinc-900/50">
                  <div className="text-3xl font-black text-green-400">{user.coins}</div>
                  <div className="text-sm text-zinc-500">Кредитов</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-zinc-900/50">
                  <div className="text-3xl font-black text-purple-400">{user.unlockedScales.length}</div>
                  <div className="text-sm text-zinc-500">Гамм изучено</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-zinc-900/50">
                  <div className="text-3xl font-black text-yellow-400">
                    {Math.floor(user.xp / 1000) * 1000}+
                  </div>
                  <div className="text-sm text-zinc-500">Всего XP</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Эффект комбо */}
        {showComboEffect && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="text-6xl font-black text-yellow-400 animate-pulse text-center drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]">
              КОМБО x{combo}!
            </div>
          </div>
        )}
      </main>
      
      {/* Подвал */}
      <footer className="py-4 px-6 border-t border-white/10 text-center text-sm text-zinc-500">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>CYBER SCALE v{APP_VERSION} | Нейро-аудио тренажер</div>
            <div className="flex items-center gap-4">
              <button
                onClick={exportSave}
                className="hover:text-cyan-400 transition-colors"
              >
                Экспорт сохранения
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="hover:text-cyan-400 transition-colors"
              >
                Настройки
              </button>
              <button
                onClick={logout}
                className="hover:text-red-400 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}