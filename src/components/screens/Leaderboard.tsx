import { Btn, Panel, ITEM } from '../ui/motion';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Screen } from '../../types';
import { GLOBAL, WEEKLY } from '../../data/leaderboard';

export default function Leaderboard({ go, best, xp }: { go: (s: Screen) => void; best: number; xp: number }) {
  const [tab, setTab] = useState<'g' | 'w'>('g');
  const rows = [...(tab === 'g' ? GLOBAL : WEEKLY), { name: 'You (Dr. Player)', score: best, xp }].sort((a, b) => b.score - a.score);
  return (
    <Panel id="lb"><h2>Leaderboard</h2>
      <div className="tabs">
        <Btn className={`btn ${tab === 'g' ? 'on' : 'ghost'}`} onClick={() => setTab('g')}>Global</Btn>
        <Btn className={`btn ${tab === 'w' ? 'on' : 'ghost'}`} onClick={() => setTab('w')}>Weekly</Btn>
      </div>
      <div className="card glass" style={{ gap: 8 }}>
        {rows.map((r, i) => (
          <motion.div key={r.name} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={`lb ${r.name.startsWith('You') ? 'me' : ''}`}>
            <div className="rk">{['🥇', '🥈', '🥉'][i] || i + 1}</div>
            <div className="nm">{r.name}<br /><em>⭐ {r.xp} XP</em></div><div>{r.score.toLocaleString()}</div>
          </motion.div>
        ))}
      </div>
      <Btn className="btn ghost" onClick={() => go('home')}>← Back</Btn>
    </Panel>
  );
}
