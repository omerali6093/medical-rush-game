import { Btn, Panel, ITEM } from '../ui/motion';
import { motion } from 'framer-motion';
import type { Profile, Screen } from '../../types';
import { SKINS, levelOf } from '../../data/config';

interface P { go: (s: Screen) => void; profile: Profile }
const Row = ({ k, v }: { k: string; v: string | number }) => <div className="lb"><div className="nm">{k}</div><div>{v}</div></div>;

export function Missions({ go, profile }: P) {
  const list: [string, number, number][] = [['Collect 50 medicines', profile.pills, 50], ['Answer 5 questions correctly', profile.ok, 5], ['Run 3 times', profile.runs, 3]];
  return (
    <Panel id="missions"><h2>Missions</h2>
      <div className="card glass">{list.map(([t, v, n]) => <Row key={t} k={t} v={`${Math.min(v, n)}/${n} ${v >= n ? '✅' : ''}`} />)}</div>
      <Btn className="btn ghost" onClick={() => go('home')}>← Back</Btn>
    </Panel>
  );
}

export function ProfileScreen({ go, profile, patch }: P & { patch: (p: Partial<Profile>) => void }) {
  const lv = levelOf(profile.xp);
  return (
    <Panel id="profile"><h2>Profile</h2>
      <div className="card glass">
        <Row k="Level" v={lv} /><Row k="Total XP" v={profile.xp} /><Row k="Best score" v={profile.best} /><Row k="Runs" v={profile.runs} />
        <Row k="Accuracy" v={profile.ans ? Math.round((profile.ok / profile.ans) * 100) + '%' : '—'} />
        <div className="tag">Doctor skin</div>
        <div className="row">
          {SKINS.map((k, i) => (
            <Btn key={k.name} className={`btn ${profile.skin === i ? '' : 'ghost'}`} disabled={lv < k.level} style={lv < k.level ? { opacity: 0.4 } : undefined} onClick={() => patch({ skin: i })}>
              {k.name}{lv < k.level ? ` 🔒Lv${k.level}` : ''}
            </Btn>
          ))}
        </div>
      </div>
      <Btn className="btn ghost" onClick={() => go('home')}>← Back</Btn>
    </Panel>
  );
}
