export type PhotoId =
  | 'ai-network'
  | 'code-dark'
  | 'tower-up'
  | 'code-laptop'
  | 'server-blue'
  | 'circuit'
  | 'facade'
  | 'code-blue'
  | 'tower-night'
  | 'monitors'
  | 'rocket'
  | 'robot'
  | 'vr'
  | 'city'
  | 'team'
  | 'robot2';

export interface Photo {
  id: PhotoId;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Pexels photo id; confirm each licence page before publishing (see docs/content-guide.md). */
  pexelsId: number;
}

const p = (id: PhotoId, pexelsId: number, caption: string, alt: string): Photo => ({
  id,
  src: `/photos/${id}.jpg`,
  width: 1600,
  height: 1000,
  alt,
  caption,
  pexelsId,
});

export const photos: Record<PhotoId, Photo> = {
  'ai-network': p(
    'ai-network',
    8386440,
    'Artificial intelligence',
    'Glowing blue neural network lines',
  ),
  'code-dark': p('code-dark', 6424584, 'Code', 'Source code on a dark screen'),
  'tower-up': p('tower-up', 833460, 'Architecture', 'Glass tower seen from below'),
  'code-laptop': p('code-laptop', 546819, 'Interfaces', 'Laptop showing code in a dim room'),
  'server-blue': p('server-blue', 17323801, 'Infrastructure', 'Rows of servers lit in blue'),
  circuit: p('circuit', 40270826, 'Circuits', 'Close view of a circuit board'),
  facade: p('facade', 16113867, 'Structure', 'Repeating lines of a building facade'),
  'code-blue': p('code-blue', 6424590, 'Systems', 'Code on a screen with blue light'),
  'tower-night': p('tower-night', 8712702, 'Innovation', 'Tower lit up at night'),
  monitors: p('monitors', 5380792, 'Engineering', 'Monitors full of terminal output'),
  rocket: p('rocket', 586087, 'Ship it', 'Rocket lifting off'),
  robot: p('robot', 18799044, 'Robotics', 'Humanoid robot portrait'),
  vr: p('vr', 6498299, 'Immersive worlds', 'Person wearing a VR headset'),
  city: p('city', 16705973, 'Scale', 'Aerial view of a dense city'),
  team: p('team', 39205090, 'Startups', 'Team working around a table'),
  robot2: p('robot2', 35280155, 'Machine intelligence', 'Robot hand reaching forward'),
};

/** Order used by the launch cuts (matches the design's PHOTOS array). */
export const launchPhotoOrder: readonly PhotoId[] = [
  'ai-network',
  'code-dark',
  'tower-up',
  'code-laptop',
  'server-blue',
  'circuit',
  'facade',
  'code-blue',
  'tower-night',
  'monitors',
  'rocket',
  'robot',
  'vr',
  'city',
  'team',
  'robot2',
];
