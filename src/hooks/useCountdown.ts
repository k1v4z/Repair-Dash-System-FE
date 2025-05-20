import { UseCountdownReturn } from '@/types/globals.type';
import { useState, useEffect, useCallback } from 'react';

interface UseCountdownProps {
  initialTime: number;
  onExpire?: () => void;
}

export const useCountdown = ({ initialTime, onExpire }: UseCountdownProps): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            onExpire?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft, onExpire]);

  const startCountdown = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
  }, [initialTime]);

  const stopCountdown = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetCountdown = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
  }, [initialTime]);

  return {
    timeLeft,
    isExpired: timeLeft === 0,
    formattedTime: formatTime(timeLeft),
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
}; 