import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameFlow } from './hooks/useGameFlow';
import Home from './components/screens/Home';
import Worlds from './components/screens/Worlds';
import { Missions, ProfileScreen } from './components/screens/Info';
import Leaderboard from './components/screens/Leaderboard';
import Results from './components/screens/Results';
import Pause from './components/screens/Pause';
import Hud from './components/game/Hud';
import MedicalEvent from './components/game/MedicalEvent';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const g = useGameFlow(canvasRef);
  const inGame = g.screen === 'game' || g.screen === 'pause' || g.screen === 'event';
  return (
    <>
      <canvas ref={canvasRef} />
      <motion.div id="flash" animate={{ opacity: g.flash ? 1 : 0 }} transition={{ duration: g.flash ? 0.05 : 0.4 }} />
      <AnimatePresence>
        {g.screen === 'home' && <Home key="home" go={g.go} profile={g.profile} patch={g.patch} />}
        {g.screen === 'worlds' && <Worlds key="worlds" go={g.go} xp={g.profile.xp} />}
        {g.screen === 'missions' && <Missions key="missions" go={g.go} profile={g.profile} />}
        {g.screen === 'profile' && <ProfileScreen key="profile" go={g.go} profile={g.profile} patch={g.patch} />}
        {g.screen === 'leaderboard' && <Leaderboard key="lb" go={g.go} best={g.profile.best} xp={g.profile.xp} />}
        {g.screen === 'pause' && <Pause key="pause" go={g.go} togglePause={g.togglePause} profile={g.profile} patch={g.patch} />}
        {g.screen === 'event' && g.question && <MedicalEvent key={g.question.q} question={g.question} difficulty={g.profile.difficulty} answer={g.answer} onContinue={g.continueRun} />}
        {g.screen === 'results' && g.result && <Results key="results" go={g.go} result={g.result} />}
      </AnimatePresence>
      {inGame && <Hud {...g} />}
    </>
  );
}
