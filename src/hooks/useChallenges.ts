import { useState, useEffect } from 'react';
import type { Challenge } from '@/types/rewards';

const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Daily Login Streak',
    description: 'Log in for 7 consecutive days',
    reward: 100,
    type: 'daily',
    progress: 4,
    target: 7,
    completed: false,
    expiresAt: new Date(Date.now() + 86400000),
  },
  {
    id: '2',
    title: 'Gaming Champion',
    description: 'Win 5 games in any supported dApp',
    reward: 250,
    type: 'gaming',
    progress: 3,
    target: 5,
    completed: false,
  },
  {
    id: '3',
    title: 'Social Butterfly',
    description: 'Share on 3 social platforms',
    reward: 150,
    type: 'social',
    progress: 1,
    target: 3,
    completed: false,
  },
  {
    id: '4',
    title: 'First Claim',
    description: 'Claim your first MUSD rewards',
    reward: 50,
    type: 'daily',
    progress: 0,
    target: 1,
    completed: false,
  },
];

export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId
          ? { ...c, progress: c.target, completed: true }
          : c
      )
    );
  };

  const updateProgress = (challengeId: string, progress: number) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId
          ? { ...c, progress: Math.min(progress, c.target) }
          : c
      )
    );
  };

  return {
    challenges,
    completeChallenge,
    updateProgress,
  };
};
