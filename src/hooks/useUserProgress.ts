import { useState, useEffect } from 'react';

interface UserProgress {
  streak: number;
  lastLogin: string | null;
  gameWins: number;
  shares: number;
  claims: number;
  points: number;
  totalEarned: number;
}

const STORAGE_KEY = 'user_progress';

const getInitialProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    streak: 0,
    lastLogin: null,
    gameWins: 0,
    shares: 0,
    claims: 0,
    points: 0,
    totalEarned: 0,
  };
};

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const checkDailyLogin = (): { completed: boolean; reward: number } => {
    const today = new Date().toDateString();
    if (progress.lastLogin !== today) {
      const newStreak = progress.streak + 1;
      console.log(`📅 Daily login. Streak: ${newStreak}/7`);
      
      if (newStreak >= 7) {
        setProgress(prev => ({
          ...prev,
          streak: 0,
          lastLogin: today,
          points: prev.points + 100,
          totalEarned: prev.totalEarned + 100,
        }));
        return { completed: true, reward: 100 };
      } else {
        setProgress(prev => ({
          ...prev,
          streak: newStreak,
          lastLogin: today,
        }));
      }
    }
    return { completed: false, reward: 0 };
  };

  const recordGameWin = (): { completed: boolean; reward: number } => {
    const newWins = progress.gameWins + 1;
    console.log(`🎯 Game won. Progress: ${newWins}/5`);
    
    if (newWins >= 5) {
      setProgress(prev => ({
        ...prev,
        gameWins: 0,
        points: prev.points + 250,
        totalEarned: prev.totalEarned + 250,
      }));
      return { completed: true, reward: 250 };
    } else {
      setProgress(prev => ({
        ...prev,
        gameWins: newWins,
      }));
    }
    return { completed: false, reward: 0 };
  };

  const recordShare = (): { completed: boolean; reward: number } => {
    const newShares = progress.shares + 1;
    console.log(`📣 Content shared. Progress: ${newShares}/3`);
    
    if (newShares >= 3) {
      setProgress(prev => ({
        ...prev,
        shares: 0,
        points: prev.points + 150,
        totalEarned: prev.totalEarned + 150,
      }));
      return { completed: true, reward: 150 };
    } else {
      setProgress(prev => ({
        ...prev,
        shares: newShares,
      }));
    }
    return { completed: false, reward: 0 };
  };

  const recordClaim = (): { completed: boolean; reward: number } => {
    const newClaims = progress.claims + 1;
    console.log(`💰 Reward claimed. First claim: ${newClaims}/1`);
    
    if (newClaims >= 1) {
      setProgress(prev => ({
        ...prev,
        claims: newClaims,
        points: prev.points + 50,
        totalEarned: prev.totalEarned + 50,
      }));
      return { completed: true, reward: 50 };
    } else {
      setProgress(prev => ({
        ...prev,
        claims: newClaims,
      }));
    }
    return { completed: false, reward: 0 };
  };

  const resetProgress = () => {
    const initial = {
      streak: 0,
      lastLogin: null,
      gameWins: 0,
      shares: 0,
      claims: 0,
      points: 0,
      totalEarned: 0,
    };
    setProgress(initial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  };

  return {
    progress,
    checkDailyLogin,
    recordGameWin,
    recordShare,
    recordClaim,
    resetProgress,
  };
};
