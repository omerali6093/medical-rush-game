import type { Question } from '../types';
export const QUESTIONS: Question[] = [
  { p: '58-year-old man, crushing chest pain radiating to the left arm, sweating. ECG: ST elevation.', q: 'Which immediate drug should be given?', o: ['Chewed aspirin', 'Oral paracetamol', 'Salbutamol inhaler'], a: 0, e: 'Antiplatelet therapy (aspirin) is first-line in suspected STEMI.', vitals: { hr: 112, bp: '90/60', spo2: 94 } },
  { p: '24-year-old develops stridor, facial swelling and hypotension after a wasp sting.', q: 'First-line treatment?', o: ['Oral prednisolone', 'IM adrenaline', 'IV antihistamine'], a: 1, e: 'IM adrenaline is the first-line, life-saving treatment in anaphylaxis.', vitals: { hr: 128, bp: '70/40', spo2: 88 } },
  { p: 'Unresponsive patient, respiratory rate 6/min, pinpoint pupils.', q: 'Best antidote?', o: ['Flumazenil', 'Atropine', 'Naloxone'], a: 2, e: 'Naloxone reverses opioid-induced respiratory depression.', vitals: { hr: 48, bp: '100/60', spo2: 82 } },
  { p: 'Known type 1 diabetic found confused and sweaty. Glucose 1.8 mmol/L, IV access available.', q: 'Best immediate treatment?', o: ['IV dextrose', 'Subcutaneous insulin', 'Oral metformin'], a: 0, e: 'Severe hypoglycaemia needs IV glucose (or IM glucagon without access).', vitals: { hr: 118, bp: '110/70', spo2: 96 } },
];
