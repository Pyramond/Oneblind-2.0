"use client";

import { useEffect, useState } from "react";

import { Button, Slider } from "@radix-ui/themes";
import {
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import playAlert from "@/utils/playAlert";

interface Props {
  duration: number;
  onPrev: () => void;
  onNext: () => void;
  currentStep: number;
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function Timer({
  duration,
  onPrev,
  onNext,
  currentStep,
}: Props) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [playing, setPlaying] = useState(currentStep !== 0);

  // Tick every second
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  // Log when 10 seconds remain
  useEffect(() => {
    if (timeRemaining === 10 && playing) {
      playAlert();
    }
  }, [timeRemaining, playing]);

  // Advance to next step once timer reaches 0
  useEffect(() => {
    if (timeRemaining === 0 && playing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
      onNext();
    }
  }, [timeRemaining, playing, onNext]);

  return (
    <div className="flex flex-col h-full w-full px-12 py-8">
      <div className="flex flex-1 items-center justify-center">
        <span className="text-[8rem] font-mono font-bold leading-none tabular-nums text-zinc-700 dark:text-zinc-300">
          {formatTime(timeRemaining)}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <Slider
          value={[duration - timeRemaining]}
          min={0}
          max={duration}
          onValueChange={([val]) => setTimeRemaining(duration - val)}
          className="w-full"
          size="2"
        />

        <div className="flex items-center justify-center gap-4">
          <Button variant="soft" size="3" onClick={onPrev}>
            <TrackPreviousIcon width={20} height={20} />
          </Button>
          <Button size="3" onClick={() => setPlaying((p) => !p)}>
            {playing ? (
              <PauseIcon width={20} height={20} />
            ) : (
              <PlayIcon width={20} height={20} />
            )}
          </Button>
          <Button variant="soft" size="3" onClick={onNext}>
            <TrackNextIcon width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
