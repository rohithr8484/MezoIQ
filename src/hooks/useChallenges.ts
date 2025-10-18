import { useState, useEffect } from 'react';
import type { Challenge } from '@/types/rewards';
import { useUserProgress } from './useUserProgress';

export const useChallenges = () => {
  const { progress, checkDailyLogin, recordGameWin, recordShare, recordClaim } = useUserProgress();
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Daily Login Streak',
      description: 'Log in for 7 consecutive days',
      reward: 100,
      type: 'daily',
      progress: progress.streak,
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
      progress: progress.gameWins,
      target: 5,
      completed: false,
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Share on 3 social platforms',
      reward: 150,
      type: 'social',
      progress: progress.shares,
      target: 3,
      completed: false,
    },
    {
      id: '4',
      title: 'First Claim',
      description: 'Claim your first MUSD rewards',
      reward: 50,
      type: 'daily',
      progress: progress.claims,
      target: 1,
      completed: progress.claims >= 1,
    },
  ]);

  useEffect(() => {
    setChallenges([
      {
        id: '1',
        title: 'Daily Login Streak',
        description: 'Log in for 7 consecutive days',
        reward: 100,
        type: 'daily',
        progress: progress.streak,
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
        progress: progress.gameWins,
        target: 5,
        completed: false,
      },
      {
        id: '3',
        title: 'Social Butterfly',
        description: 'Share on 3 social platforms',
        reward: 150,
        type: 'social',
        progress: progress.shares,
        target: 3,
        completed: false,
      },
      {
        id: '4',
        title: 'First Claim',
        description: 'Claim your first MUSD rewards',
        reward: 50,
        type: 'daily',
        progress: progress.claims,
        target: 1,
        completed: progress.claims >= 1,
      },
    ]);
  }, [progress]);

  const completeChallenge = (challengeId: string) => {
    let result = { completed: false, reward: 0 };
    
    switch (challengeId) {
      case '1': // Daily Login Streak
        result = checkDailyLogin();
        break;
      case '2': // Gaming Champion
        result = recordGameWin();
        break;
      case '3': // Social Butterfly
        result = recordShare();
        break;
      case '4': // First Claim
        result = recordClaim();
        break;
    }

    if (result.completed) {
      console.log(`💰 Reward sent: +${result.reward} points`);
    }

    return result;
  };

  const updateProgress = (challengeId: string, progressValue: number) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId
          ? { ...c, progress: Math.min(progressValue, c.target) }
          : c
      )
    );
  };

  return {
    challenges,
    completeChallenge,
    updateProgress,
    userProgress: progress,
  };
};
