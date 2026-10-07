export type Screen = 'home' | 'worlds' | 'missions' | 'profile' | 'leaderboard' | 'game' | 'event' | 'results' | 'pause';
export interface Vitals { hr: number; bp: string; spo2: number }
export interface Question { p: string; q: string; o: string[]; a: number; e: string; vitals: Vitals }
export interface WorldInfo { name: string; icon: string; gradient: string; specialty: string; level: number }
export interface Skin { name: string; coat: number; accent: number; level: number }
export interface Difficulty { name: string; seconds: number; xpMult: number }
export interface LeaderRow { name: string; score: number; xp: number }
export interface Profile { xp: number; best: number; runs: number; pills: number; ans: number; ok: number; skin: number; difficulty: number; muted: boolean; padOn: boolean }
export interface HudState { hp: number; score: number; dist: number; xp: number; pills: number; streak: number; shield: boolean; mult: number; count: number | null }
export interface RunResult { score: number; dist: number; xp: number; pills: number }
export interface FinalResult extends RunResult { ans: number; ok: number; accuracy: string; stars: number; newBest: boolean; levelUp: number | null; missed: Question[] }
