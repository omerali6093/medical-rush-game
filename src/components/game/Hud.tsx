import { motion } from 'framer-motion';
import type { HudState, Profile } from '../../types';
import type { Action } from '../../engine/GameEngine';
import type { FloatText } from '../../hooks/useGameFlow';
import Ring from '../ui/Ring';
import { Btn, Panel } from '../ui/motion';

interface Props { hud: HudState; floats: FloatText[]; banner: { id: number; text: string } | null; profile: Profile; act: (a: Action) => void; togglePause: () => void }
const PAD: [Action, string][] = [['l', '◀'], ['r', '▶'], ['u', '▲'], ['d', '▼']];

export default function Hud({ hud, floats, banner, profile, act, togglePause }: Props) {
  return (
    <>
      <Panel id="hud">
        <div className="top">
          <span id="hrt" style={{ ['--hr' as string]: `${0.35 + (hud.hp / 100) * 0.6}s` }}>❤️</span>
          <div className="bar"><motion.i initial={false} animate={{ width: `${Math.max(0, hud.hp)}%` }} transition={{ type: 'spring', stiffness: 140, damping: 20 }} style={{ transition: 'none' }} /></div>
          <Btn className="btn ghost" style={{ padding: '8px 14px', pointerEvents: 'auto' }} onClick={togglePause}>⏸</Btn>
        </div>
        <div id="big"><motion.b key={Math.floor(hud.score / 100)} initial={{ scale: 1.3, color: '#22e4ff' }} animate={{ scale: 1, color: '#ffffff' }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} style={{ display: 'inline-block' }}>{hud.score}</motion.b></div>
        <div className="stats glass"><span><small>DISTANCE</small><b>{hud.dist}m</b></span><span><small>XP</small><b>{hud.xp}</b></span><span><small>💊</small><b>{hud.pills}</b></span></div>
        <div id="stk">{hud.streak >= 5 && <motion.span key={hud.streak} initial={{ scale: 1.5 }} animate={{ scale: 1 }} style={{ display: 'inline-block' }}>🔥 STREAK x{hud.streak}</motion.span>}</div>
        <div id="pw"><Ring label="🛡" percent={100} hidden={!hud.shield} /><Ring label="✨" percent={(hud.mult / 8) * 100} hidden={hud.mult <= 0} /></div>
      </Panel>
      <div id="low" style={{ opacity: hud.hp < 30 ? (1 - hud.hp / 30) * 0.85 : 0 }} />
      {banner && <div id="ban"><motion.div key={banner.id} initial={{ opacity: 0, x: -60 }} animate={{ opacity: [0, 1, 1, 0], x: [-60, 0, 0, 60] }} transition={{ duration: 2.4, times: [0, 0.15, 0.8, 1] }}>{banner.text}</motion.div></div>}
      {hud.count !== null && <div id="cd" className="on"><motion.span key={hud.count} initial={{ scale: 2.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>{hud.count > 0 ? hud.count : 'GO!'}</motion.span></div>}
      {hud.count !== null && hud.dist < 5 && <div id="hint">← → switch lanes · ↑ jump · ↓ slide (or swipe)</div>}
      {floats.map(f => <div key={f.id} className="ft" style={{ left: f.x, top: f.y, color: f.c }}><motion.div initial={{ y: 0, opacity: 1, scale: 0.8 }} animate={{ y: -130, opacity: 0, scale: 1.4 }} transition={{ duration: 0.8, ease: 'easeOut' }}>{f.t}</motion.div></div>)}
      {profile.padOn && <div id="pad" style={{ display: 'block' }}>{PAD.map(([a, l]) => <Btn key={a} data-a={a} onPointerDown={() => act(a)}>{l}</Btn>)}</div>}
    </>
  );
}
