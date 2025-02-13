import { useCallback, useRef } from "react";

export function useAudioFeedback() {
  const audioContextRef = useRef<AudioContext>();

  const playSpeedChangeSound = useCallback((speed: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Higher pitch for faster time, lower for slower
    oscillator.frequency.value = speed < 1 ? 220 : 440;
    
    // Short beep
    gainNode.gain.setValueAtTime(0.2, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);
  }, []);

  return { playSpeedChangeSound };
}
