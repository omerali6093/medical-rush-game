import { Btn, Panel, ITEM } from '../ui/motion';
import { motion } from 'framer-motion';
import type { Profile, Screen } from '../../types';
import { DIFFICULTIES, XP_PER_LEVEL, levelOf } from '../../data/config';
import Ring from '../ui/Ring';
import MuteButton from '../ui/MuteButton';

interface Props { go: (s: Screen) => void; profile: Profile; patch: (p: Partial<Profile>) => void }
export default function Home({ go, profile, patch }: Props) {
  return (
    <Panel id="home">
      <motion.h1 animate={{ y: [0, -6, 0] }} 
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
           <img src="../assets/gg-logo.png" alt="GetGoal-Logo" className='logo'/>
      </motion.h1>
      <div className="tag" style={{ color: 'var(--cy)' }}>Race Through the Human Body</div>
      <div className="row push" style={{ alignItems: 'center' }}>
        <Ring id="hlr" label={String(levelOf(profile.xp))} percent={(profile.xp % XP_PER_LEVEL) / (XP_PER_LEVEL / 100)} />
        <div className="glass chip">⭐ XP <b>{profile.xp}</b></div>
        <div className="glass chip">🏆 Best <b>{profile.best}</b></div>
      </div>
      <div className="glass strip">🔥 Day 1 streak · Mission: collect 50 💊 ({Math.min(profile.pills, 50)}/50)</div>
      <Btn className="btn big" onClick={() => go('game')}>▶ PLAY NOW</Btn>
      <div className="row">
        <Btn className="btn ghost" onClick={() => go('worlds')}>🌍 Worlds</Btn>
        <Btn className="btn ghost" onClick={() => go('missions')}>🎯 Missions</Btn>
        <Btn className="btn ghost" onClick={() => go('leaderboard')}>🏆 Leaderboard</Btn>
        <Btn className="btn ghost" onClick={() => go('profile')}>👤 Profile</Btn>
        <Btn className="btn ghost" onClick={() => patch({ difficulty: (profile.difficulty + 1) % DIFFICULTIES.length })}>🎓 {DIFFICULTIES[profile.difficulty].name}</Btn>
        <MuteButton />
      </div>
    </Panel>
  );
}
