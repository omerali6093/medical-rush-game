import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { GameEngine, type Action } from '../engine/GameEngine';
import { QUESTIONS } from '../data/questions';
import { DIFFICULTIES, SKINS, levelOf } from '../data/config';
import { useProfile } from '../store/profile';
import type { FinalResult, HudState, Question, Screen } from '../types';

export interface FloatText { id: number; t: string; x: number; y: number; c: string }
const INITIAL_HUD: HudState = { hp: 100, score: 0, dist: 0, xp: 0, pills: 0, streak: 0, shield: false, mult: 0, count: null };
let uid = 0;

/** Connects the Three.js engine to React state: screens, HUD, questions and results. */
export function useGameFlow(canvasRef: RefObject<HTMLCanvasElement>) {
  const { profile, patch } = useProfile();
  const [screen, setScreen] = useState<Screen>('home');
  const [hud, setHud] = useState<HudState>(INITIAL_HUD);
  const [flash, setFlash] = useState(false);
  const [banner, setBanner] = useState<{ id: number; text: string } | null>(null);
  const [floats, setFloats] = useState<FloatText[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [result, setResult] = useState<FinalResult | null>(null);
  const engine = useRef<GameEngine | null>(null);
  const prof = useRef(profile); prof.current = profile;
  const run = useRef({ ans: 0, ok: 0, streak: 0, miss: [] as Question[], qi: 0, pending: { hp: 0, score: 0, xp: 0 } });

  useEffect(() => {
    const e = new GameEngine(canvasRef.current!, {
      onHud: setHud,
      onHit: () => { setFlash(true); setTimeout(() => setFlash(false), 150); },
      onBanner: text => setBanner({ id: ++uid, text }),
      onFloat: (t, x, y, c) => { const id = ++uid; setFloats(f => [...f, { id, t, x, y, c }]); setTimeout(() => setFloats(f => f.filter(i => i.id !== id)), 800); },
      onPause: p => setScreen(p ? 'pause' : 'game'),
      onQuestion: () => { setQuestion(QUESTIONS[run.current.qi++ % QUESTIONS.length]); setScreen('event'); },
      onOver: r => {
        const p = prof.current, ru = run.current, xpGain = r.xp + Math.floor(r.score / 50), newXp = p.xp + xpGain;
        setResult({ ...r, ans: ru.ans, ok: ru.ok, accuracy: ru.ans ? Math.round((ru.ok / ru.ans) * 100) + '%' : '—',
          stars: r.score > 3000 ? 3 : r.score > 1200 ? 2 : 1, newBest: r.score > p.best, levelUp: levelOf(newXp) > levelOf(p.xp) ? levelOf(newXp) : null, missed: ru.miss });
        patch({ xp: newXp, best: Math.max(p.best, r.score), runs: p.runs + 1, pills: p.pills + r.pills, ans: p.ans + ru.ans, ok: p.ok + ru.ok });
        setScreen('results');
      },
    });
    engine.current = e; return () => e.dispose();
  }, [canvasRef, patch]);

  useEffect(() => { engine.current?.setSkin(SKINS[profile.skin]); }, [profile.skin]);

  const play = useCallback(() => { run.current = { ...run.current, ans: 0, ok: 0, streak: 0, miss: [] }; engine.current?.start(); setScreen('game'); }, []);
  const go = useCallback((s: Screen) => { if (s === 'game') return play(); engine.current?.toIdle(); setScreen(s); }, [play]);
  const answer = useCallback((correct: boolean) => {
    const r = run.current; r.ans++; let xp = 0, bonus = 0;
    if (correct) { r.ok++; r.streak++; xp = Math.round(50 * DIFFICULTIES[prof.current.difficulty].xpMult); if (r.streak >= 2) bonus = r.streak * 20; }
    else { r.streak = 0; if (question) r.miss.push(question); }
    r.pending = { hp: correct ? 20 : -10, score: correct ? 200 + bonus : 0, xp };
    return { xp, bonus, streak: r.streak };
  }, [question]);
  const continueRun = useCallback(() => { engine.current?.resume(run.current.pending); setScreen('game'); }, []);
  const act = useCallback((a: Action) => engine.current?.act(a), []);
  const togglePause = useCallback(() => engine.current?.togglePause(), []);

  return { screen, go, hud, flash, banner, floats, question, result, answer, continueRun, act, togglePause, profile, patch };
}
