import type { ProgramItem } from '../types';

const defaultProgramItems: ProgramItem[] = [
  {
    id: 'prg_1',
    time: 'Jour 1 — 08:00',
    title: 'Cérémonie d\'ouverture & Contrôle Technique',
    description: 'Accueil des 8 ligues régionales à Maradi et vérification des licences FNC.',
  },
  {
    id: 'prg_2',
    time: 'Jour 2 — 07:30',
    title: 'Épreuve Étape en Ligne (120 km)',
    description: 'Course en peloton sur l\'axe Maradi-Dakoro.',
  },
  {
    id: 'prg_3',
    time: 'Jour 3 — 15:00',
    title: 'Contre-la-montre individuel (25 km)',
    description: 'Épreuve chronométrée individuelle.',
  },
];

export const programService = {
  /**
   * Récupérer le programme officiel de la compétition (6ème Édition Maradi 2026)
   */
  async getProgramItems(): Promise<ProgramItem[]> {
    return defaultProgramItems;
  },
};
