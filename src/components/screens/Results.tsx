import { Btn, Panel, ITEM, STAGGER } from '../ui/motion';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { FinalResult, Screen } from '../../types';

/** Animates a number from 0 → target over `ms`. */
function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now(); let raf = 0;
    const f = (t: number) => { const k = Math.min(1, (t - t0) / ms); setV(Math.round(target * k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}
const Stat = ({ label, value, prefix = '', suffix = '' }: { label: string; value: number; prefix?: string; suffix?: string }) => {
  const v = useCountUp(value); return <motion.div variants={ITEM}><b>{prefix}{v}{suffix}</b><small>{label}</small></motion.div>;
};

export default function Results({ go, result: r }: { go: (s: Screen) => void; result: FinalResult }) {
  return (
    <Panel id="results">
      <div className="card glass">
        <h2 style={{ textAlign: 'center' }}>
          {r.newBest ? '🎉 New Best!' : 'Run Complete'}<br />
          <span style={{ fontSize: 30 }}>{'⭐'.repeat(r.stars)}{'☆'.repeat(3 - r.stars)}</span>
          {r.levelUp && <><br /><small style={{ color: '#ffd24d' }}>⬆ LEVEL UP → {r.levelUp}{r.levelUp === 2 ? ' · Surgeon skin unlocked' : r.levelUp === 3 ? ' · Paramedic skin unlocked' : ''}</small></>}
        </h2>
        <motion.div className="res" initial="h" animate="s" variants={STAGGER}>
          <Stat label="SCORE" value={r.score} /><Stat label="DISTANCE" value={r.dist} suffix="m" /><Stat label="XP EARNED" value={r.xp} prefix="+" />
          <motion.div variants={ITEM}><b>{r.ans}</b><small>QUESTIONS</small></motion.div><motion.div variants={ITEM}><b>{r.accuracy}</b><small>ACCURACY</small></motion.div><Stat label="💊 COLLECTED" value={r.pills} />
        </motion.div>
        {r.missed.length > 0 && <div className="pat" style={{ fontSize: 13 }}><b>📚 Review missed</b><br />{r.missed.map(q => <div key={q.q}>• {q.q} → <b>{q.o[q.a]}</b></div>)}</div>}
        <div className="row">
          <Btn className="btn big" style={{ padding: '14px 34px', fontSize: 17 }} onClick={() => go('game')}>↻ Replay</Btn>
          <Btn className="btn ghost" onClick={() => go('home')}>Continue</Btn>
        </div>
      </div>
    </Panel>
  );
}
