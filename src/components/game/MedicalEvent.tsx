import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Question } from '../../types';
import { DIFFICULTIES } from '../../data/config';
import { sfx } from '../../engine/audio';
import { Btn, EASE } from '../ui/motion';
import Ecg from './Ecg';

interface Props {
  question: Question; difficulty: number; onContinue: () => void;
  answer: (correct: boolean) => { xp: number; bonus: number; streak: number };
}
export default function MedicalEvent({ question: q, difficulty, answer, onContinue }: Props) {
  const total = DIFFICULTIES[difficulty].seconds;
  const [left, setLeft] = useState(total);
  const [picked, setPicked] = useState<number | null>(null); // -1 = timed out
  const [msg, setMsg] = useState('');
  const done = picked !== null, doneRef = useRef(false);

  const choose = (j: number) => {
    if (doneRef.current) return; doneRef.current = true; setPicked(j);
    const ok = j === q.a, r = answer(ok);
    if (ok) { sfx(880, 0.25); setMsg(`✅ Correct! +${r.xp} XP, +20 HP. ${r.streak >= 2 ? `🏅 Clinical Mastery x${r.streak}: +${r.bonus} pts. ` : ''}`); }
    else { sfx(150, 0.3, 'square'); setMsg(`${j < 0 ? '⏱ Time up! ' : '❌ Incorrect. '}−10 HP. `); }
  };
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setLeft(l => { if (l <= 0.1) { clearInterval(id); queueMicrotask(() => choose(-1)); return 0; } return l - 0.1; }), 100);
    return () => clearInterval(id);
  }); // eslint-disable-line
  const urgent = left / total < 0.3 && !done;

  return (
    <motion.section id="event" className="screen active" style={{ background: '#020812b0', zIndex: 6 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="card glass" initial={{ y: 80, scale: 0.9, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 22 }}>
        <div className="tag" style={{ textAlign: 'left' }}>🩺 Medical Event</div>
        <Ecg hr={q.vitals.hr} />
        <div className="row" style={{ justifyContent: 'space-between', fontWeight: 800, fontSize: 13, color: '#8ff' }}>
          <span>❤ {q.vitals.hr} bpm</span><span>BP {q.vitals.bp}</span><span>SpO₂ {q.vitals.spo2}%</span>
        </div>
        <div className="bar" style={{ height: 8 }}>
          <motion.i animate={{ width: `${(left / total) * 100}%`, backgroundColor: urgent ? '#ff3d6e' : '#22e4ff' }} transition={{ duration: 0.1, ease: 'linear' }} style={{ transition: 'none', boxShadow: '0 0 10px currentColor' }} />
        </div>
        <div className="pat">{q.p}</div>
        <h3 style={{ fontSize: 18 }}>{q.q}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.o.map((o, j) => {
            const wrong = done && picked === j && j !== q.a;
            return (
              <Btn key={o} className={`opt ${done && j === q.a ? 'ok' : ''} ${wrong ? 'no' : ''}`} onClick={() => choose(j)}
                initial={{ opacity: 0, x: -24 }} animate={wrong ? { opacity: 1, x: [0, -9, 9, -5, 0] } : done && j === q.a ? { opacity: 1, x: 0, scale: [1, 1.04, 1] } : { opacity: 1, x: 0 }}
                transition={done ? { duration: 0.45 } : { delay: 0.15 + j * 0.09, ease: EASE }} whileHover={done ? undefined : { x: 6, scale: 1 }} whileTap={{ scale: 0.97 }}>
                {String.fromCharCode(65 + j)}. {o}
              </Btn>
            );
          })}
        </div>
        <AnimatePresence>
          {done && <motion.div key="fb" className="pat" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ overflow: 'hidden' }}>{msg}{q.e}</motion.div>}
        </AnimatePresence>
        {done && <Btn className="btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={onContinue}>Continue →</Btn>}
      </motion.div>
    </motion.section>
  );
}
