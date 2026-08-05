import { useRef } from "react";
import { useStudyTimer } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudyTimer";
import { TimerDisplay } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/components/timer-display/TimerDisplay";
import { TimerControls } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/components/timer-controls/TimerControls";
import type { StudySection } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/hooks/useStudies";

interface CongregationBibleStudyTimerProps {
  sections: StudySection[];
  end_time: string;
}

export function CongregationBibleStudyTimer({
  sections,
  end_time,
}: CongregationBibleStudyTimerProps) {
  const timer = useStudyTimer({ sections, end_time });
  const is_overtime = timer.section_remaining_seconds < 0;

  const frozen_section_ref = useRef(timer.current_section_index);
  const frozen_difference_ref = useRef(timer.time_difference);
  if (timer.current_section_index !== frozen_section_ref.current) {
    frozen_section_ref.current = timer.current_section_index;
    frozen_difference_ref.current = timer.time_difference;
  }
  const is_section_finished = timer.section_remaining_seconds <= 0;
  const time_difference_display = is_section_finished
    ? timer.time_difference
    : frozen_difference_ref.current;

  return (
    <div className="ion-padding ion-text-center">
      <TimerDisplay
        current_section={timer.current_section}
        section_remaining_seconds={timer.section_remaining_seconds}
        overall_remaining_seconds={timer.overall_remaining_seconds}
        time_difference={timer.time_difference}
        is_overtime={is_overtime}
        time_difference_display={time_difference_display}
      />
      <TimerControls
        is_playing={timer.is_playing}
        current_section_index={timer.current_section_index}
        section_count={sections.length}
        on_play={timer.play}
        on_pause={timer.pause}
        on_prev={timer.prev_section}
        on_next={timer.next_section}
        on_reset={timer.reset}
      />
    </div>
  );
}
