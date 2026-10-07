import type { Difficulty, Skin } from '../types';
export const SKINS: Skin[] = [
  { name: 'Lab Coat', coat: 0xf2fbff, accent: 0x22e4ff, level: 1 },
  { name: 'Surgeon', coat: 0x38d6b4, accent: 0x0b7a66, level: 2 },
  { name: 'Paramedic', coat: 0xff8a3d, accent: 0xffd24d, level: 3 },
];
export const DIFFICULTIES: Difficulty[] = [
  { name: 'Student', seconds: 12, xpMult: 1 },
  { name: 'Resident', seconds: 9, xpMult: 1.5 },
  { name: 'Specialist', seconds: 6, xpMult: 2 },
];
export const XP_PER_LEVEL = 500;
export const levelOf = (xp: number) => 1 + Math.floor(xp / XP_PER_LEVEL);
