import { useState, useRef, useCallback, useEffect } from "react";
import type { WatchtowerSection } from "./useWatchtowerSettings";

interface UseWatchtowerTimerProps {
  sections: WatchtowerSection[];
  end_time: string | null;
}

interface UseWatchtowerTimerReturn {
  is_playing: boolean;
  current_section_index: number;
  total_budget_seconds: number;
  overall_remaining_seconds: number;
  section_remaining_seconds: number;
  current_section: WatchtowerSection | null;
  play: () => void;
  pause: () => void;
  reset: () => void;
  next_section: () => void;
  prev_section: () => void;
}

function parseEndTime(end_time: string | null): number | null {
  if (!end_time) return null;
  const match = end_time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const now = new Date();
  const end = new Date();
  end.setHours(parseInt(match[1], 10), parseInt(match[2], 10), 0, 0);
  const diff_ms = end.getTime() - now.getTime();
  return diff_ms > 0 ? diff_ms / 1000 : null;
}

function getTotalSectionsDuration(sections: WatchtowerSection[]): number {
  return sections.reduce((sum, s) => sum + s.duration_seconds, 0);
}

export function useWatchtowerTimer({
  sections,
  end_time,
}: UseWatchtowerTimerProps): UseWatchtowerTimerReturn {
  const [is_playing, setIsPlaying] = useState(false);
  const [current_section_index, setCurrentSectionIndex] = useState(0);
  const [elapsed_seconds, setElapsedSeconds] = useState(0);
  const [section_start_elapsed, setSectionStartElapsed] = useState(0);
  const [adjustment_factor, setAdjustmentFactor] = useState(1);

  const interval_ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const total_duration = getTotalSectionsDuration(sections);
  const end_time_seconds = parseEndTime(end_time);
  const total_budget_seconds = Math.min(total_duration, end_time_seconds ?? total_duration);

  const current_section = sections[current_section_index] ?? null;

  const adjusted_section_duration = current_section
    ? current_section.duration_seconds * adjustment_factor
    : 0;

  const overall_remaining_seconds = Math.max(0, total_budget_seconds - elapsed_seconds);

  const section_elapsed = elapsed_seconds - section_start_elapsed;
  const section_remaining_seconds = adjusted_section_duration - section_elapsed;

  useEffect(() => {
    if (is_playing) {
      interval_ref.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (interval_ref.current) {
      clearInterval(interval_ref.current);
      interval_ref.current = null;
    }
    return () => {
      if (interval_ref.current) {
        clearInterval(interval_ref.current);
        interval_ref.current = null;
      }
    };
  }, [is_playing]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentSectionIndex(0);
    setElapsedSeconds(0);
    setSectionStartElapsed(0);
    setAdjustmentFactor(1);
  }, []);

  const next_section = useCallback(() => {
    setCurrentSectionIndex((prev_idx) => {
      if (prev_idx + 1 >= sections.length) return prev_idx;

      const planned_elapsed = sections
        .slice(0, prev_idx + 1)
        .reduce((sum, s) => sum + s.duration_seconds, 0);

      if (planned_elapsed > 0 && elapsed_seconds > 0) {
        const percentage_ahead = (planned_elapsed - elapsed_seconds) / planned_elapsed;
        setAdjustmentFactor(1 + percentage_ahead);
      }

      setSectionStartElapsed(elapsed_seconds);
      return prev_idx + 1;
    });
  }, [sections, elapsed_seconds]);

  const prev_section = useCallback(() => {
    setCurrentSectionIndex((prev_idx) => {
      if (prev_idx <= 0) return 0;

      const new_idx = prev_idx - 1;
      const planned_elapsed = sections
        .slice(0, new_idx)
        .reduce((sum, s) => sum + s.duration_seconds, 0);

      if (planned_elapsed > 0 && elapsed_seconds > 0) {
        const percentage_ahead = (planned_elapsed - elapsed_seconds) / planned_elapsed;
        setAdjustmentFactor(1 + percentage_ahead);
      }

      const prev_section_start = sections
        .slice(0, new_idx)
        .reduce((sum, s) => sum + s.duration_seconds, 0);
      setSectionStartElapsed(prev_section_start);
      return new_idx;
    });
  }, [sections, elapsed_seconds]);

  useEffect(() => {
    if (current_section_index >= sections.length) {
      setCurrentSectionIndex(0);
    }
  }, [sections.length, current_section_index]);

  return {
    is_playing,
    current_section_index,
    total_budget_seconds,
    overall_remaining_seconds,
    section_remaining_seconds,
    current_section,
    play,
    pause,
    reset,
    next_section,
    prev_section,
  };
}
