import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface UserProgress {
  streak: number;
  lastLogin: string | null;
  gameWins: number;
  shares: number;
  claims: number;
  points: number;
  totalEarned: number;
  enrolled: boolean;
  enrolledAt: string | null;
}

const STORAGE_KEY = 'user_progress';

const getStorageKey = (address: string | undefined) => {
  return address ? `${STORAGE_KEY}_${address.toLowerCase()}` : STORAGE_KEY;
};

const getInitialProgress = (address: string | undefined): UserProgress => {
  const key = getStorageKey(address);
  const stored = localStorage.getItem(key);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Ensure enrolled field exists for backwards compatibility
    return {
      ...parsed,
      enrolled: parsed.enrolled ?? false,
      enrolledAt: parsed.enrolledAt ?? null,
    };
  }
  return {
    streak: 0,
    lastLogin: null,
    gameWins: 0,
    shares: 0,
    claims: 0,
    points: 0,
    totalEarned: 0,
    enrolled: false,
    enrolledAt: null,
  };
};

export const useUserProgress = () => {
  const { address, isConnected } = useAccount();
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgress(address));

  // Re-initialize progress when wallet changes
  useEffect(() => {
    if (isConnected && address) {
      setProgress(getInitialProgress(address));
    } else {
      // Reset to defaults when disconnected
      setProgress({
        streak: 0,
        lastLogin: null,
        gameWins: 0,
        shares: 0,
        claims: 0,
        points: 0,
        totalEarned: 0,
        enrolled: false,
        enrolledAt: null,
      });
    }
  }, [address, isConnected]);

  // Persist progress when it changes
  useEffect(() => {
    if (isConnected && address) {
      const key = getStorageKey(address);
      localStorage.setItem(key, JSON.stringify(progress));
    }
  }, [progress, address, isConnected]);

  const enrollInRewards = (): { success: boolean; bonusPoints: number } => {
    if (progress.enrolled) {
      return { success: false, bonusPoints: 0 };
    }

    const welcomeBonus = 10; // 10 MUSD welcome bonus
    setProgress(prev => ({
      ...prev,
      enrolled: true,
      enrolledAt: new Date().toISOString(),
      points: prev.points + welcomeBonus,
      totalEarned: prev.totalEarned + welcomeBonus,
    }));

    return { success: true, bonusPoints: welcomeBonus };
  };

  const checkDailyLogin = (): { completed: boolean; reward: number } => {
    if (!progress.enrolled) {
      return { completed: false, reward: 0 };
    }

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
    if (!progress.enrolled) {
      return { completed: false, reward: 0 };
    }

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
    if (!progress.enrolled) {
      return { completed: false, reward: 0 };
    }

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
    if (!progress.enrolled) {
      return { completed: false, reward: 0 };
    }

    if (progress.claims === 0) {
      console.log(`💰 First reward claimed!`);
      setProgress(prev => ({
        ...prev,
        claims: 1,
        points: prev.points + 50,
        totalEarned: prev.totalEarned + 50,
      }));
      return { completed: true, reward: 50 };
    }
    return { completed: false, reward: 0 };
  };

  const resetProgress = () => {
    const initial: UserProgress = {
      streak: 0,
      lastLogin: null,
      gameWins: 0,
      shares: 0,
      claims: 0,
      points: 0,
      totalEarned: 0,
      enrolled: false,
      enrolledAt: null,
    };
    setProgress(initial);
    if (address) {
      const key = getStorageKey(address);
      localStorage.setItem(key, JSON.stringify(initial));
    }
  };

  return {
    progress,
    isEnrolled: progress.enrolled,
    enrollInRewards,
    checkDailyLogin,
    recordGameWin,
    recordShare,
    recordClaim,
    resetProgress,
  };
};
