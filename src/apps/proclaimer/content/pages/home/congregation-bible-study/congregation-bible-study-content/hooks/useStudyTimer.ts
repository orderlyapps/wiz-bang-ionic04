import { useState, useRef, useEffect } from "react";
import type { StudySection } from "./useStudies";

interface UseStudyTimerProps {
  study_id: string;
  sections: StudySection[];
  end_time: string;
}

interface UseStudyTimerReturn {
  is_playing: boolean;
  current_section_index: number;
  total_budget_seconds: number;
  overall_remaining_seconds: number;
  section_remaining_seconds: number;
  time_difference: number;
  current_section: StudySection | null;
  play: () => void;
  pause: () => void;
  reset: () => void;
  next_section: () => void;
  prev_section: () => void;
}

function parseEndTime(end_time: string): number | null {
  if (!end_time) return null;
  const match = end_time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const now = new Date();
  const end = new Date();
  end.setHours(parseInt(match[1], 10), parseInt(match[2], 10), 0, 0);
  const diff_ms = end.getTime() - now.getTime();
  return Math.max(0, diff_ms / 1000);
}

function getTotalSectionsDuration(sections: StudySection[]): number {
  return sections.reduce((sum, s) => sum + s.duration_seconds, 0);
}

export function useStudyTimer({
  study_id,
  sections,
  end_time,
}: UseStudyTimerProps): UseStudyTimerReturn {
  const [is_playing, setIsPlaying] = useState(false);
  const [current_section_index, setCurrentSectionIndex] = useState(0);
  const [elapsed_seconds, setElapsedSeconds] = useState(0);
  const [section_start_elapsed, setSectionStartElapsed] = useState(0);
  const interval_ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const previous_study_id_ref = useRef(study_id);

  // Reset the timer only when a different study becomes active.
  useEffect(() => {
    if (previous_study_id_ref.current === study_id) return;
    previous_study_id_ref.current = study_id;
    setIsPlaying(false);
    setCurrentSectionIndex(0);
    setElapsedSeconds(0);
    setSectionStartElapsed(0);
  }, [study_id]);

  const total_duration = getTotalSectionsDuration(sections);
  const end_time_seconds = parseEndTime(end_time);
  const total_budget_seconds = Math.min(total_duration, end_time_seconds ?? total_duration);

  const current_section = sections[current_section_index] ?? null;

  const overall_remaining_seconds = Math.max(0, total_budget_seconds - elapsed_seconds);

  const remaining_planned_seconds = sections
    .slice(current_section_index)
    .reduce((sum, s) => sum + s.duration_seconds, 0);

  const budget_ratio = total_duration > 0 ? total_budget_seconds / total_duration : 1;
  const time_difference = overall_remaining_seconds - remaining_planned_seconds * budget_ratio;

  const adjustment_factor =
    remaining_planned_seconds > 0 ? overall_remaining_seconds / remaining_planned_seconds : 1;

  const section_elapsed = elapsed_seconds - section_start_elapsed;
  const section_remaining_seconds = current_section
    ? current_section.duration_seconds * adjustment_factor - section_elapsed
    : 0;

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

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentSectionIndex(0);
    setElapsedSeconds(0);
    setSectionStartElapsed(0);
  };

  const next_section = () => {
    if (current_section_index + 1 >= sections.length) return;
    setSectionStartElapsed(elapsed_seconds);
    setCurrentSectionIndex(current_section_index + 1);
  };

  const prev_section = () => {
    if (current_section_index <= 0) return;
    setSectionStartElapsed(elapsed_seconds);
    setCurrentSectionIndex(current_section_index - 1);
  };

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
    time_difference,
    current_section,
    play,
    pause,
    reset,
    next_section,
    prev_section,
  };
}
