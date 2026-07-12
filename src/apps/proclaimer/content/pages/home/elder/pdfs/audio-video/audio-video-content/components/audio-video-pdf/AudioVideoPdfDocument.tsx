import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { SchedulePdfHeader } from "@proclaimer-content/pages/home/elder/pdfs/clam/clam-content/components/schedule-pdf-header/SchedulePdfHeader";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { AvWeekData } from "../../hooks/useAudioVideoScheduleData";

const midweekIDs = [
  "video_midweek",
  "audio_midweek",
  "platform_midweek",
  "microphone_1_midweek",
  "microphone_2_midweek",
  "entrance_midweek",
  "auditorium_midweek",
  "zoom_midweek",
] as const;

const weekendIDs = [
  "video_weekend",
  "audio_weekend",
  "platform_weekend",
  "microphone_1_weekend",
  "microphone_2_weekend",
  "entrance_weekend",
  "auditorium_weekend",
  "zoom_weekend",
] as const;

const columnLabels: Record<string, string> = {
  video_midweek: "Video",
  audio_midweek: "Audio",
  platform_midweek: "Platform",
  microphone_1_midweek: "Mic",
  microphone_2_midweek: "Mic",
  entrance_midweek: "Entrance",
  auditorium_midweek: "Auditorium",
  zoom_midweek: "Zoom",
  video_weekend: "Video",
  audio_weekend: "Audio",
  platform_weekend: "Platform",
  microphone_1_weekend: "Mic",
  microphone_2_weekend: "Mic",
  entrance_weekend: "Entrance",
  auditorium_weekend: "Auditorium",
  zoom_weekend: "Zoom",
};

const styles = StyleSheet.create({
  table: {
    flexDirection: "column",
    width: "100%",
  },
  columnHeaderRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #333",
    paddingBottom: 2,
    marginBottom: 6,
    fontWeight: "bold",
  },
  meetingLabelCell: {
    width: "12%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  columnHeaderCell: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  weekLabelRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #333",
    paddingBottom: 4,
    paddingTop: 6,
  },
  weekLabelText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  meetingRow: {
    flexDirection: "column",
    borderBottom: "0.5pt solid #ddd",
    paddingBottom: 2,
    marginBottom: 6,
    paddingTop: 2,
  },
  assignmentRow: {
    flexDirection: "row",
  },
  meetingLabel: {
    width: "12%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#666",
    paddingBottom: 4,
  },
  assignmentCell: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
  assignmentLastName: {
    fontSize: 10,
    color: "#333",
    textAlign: "center",
  },
  highlightedCell: {
    backgroundColor: "#fff3cd",
    borderRadius: 2,
    padding: 1,
  },
  eventBanner: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f0f0f0",
    padding: 3,
    marginVertical: 3,
    textAlign: "center",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});

type AudioVideoPdfDocumentProps = {
  readonly weeks: AvWeekData[];
  readonly isLoading: boolean;
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
  readonly highlightPublisherId?: string;
};

function TableHeader() {
  const cellWidth = `${100 / midweekIDs.length}%`;

  return (
    <View style={styles.columnHeaderRow}>
      {midweekIDs.map((id) => (
        <Text key={id} style={[styles.columnHeaderCell, { width: cellWidth }]}>
          {columnLabels[id]}
        </Text>
      ))}
    </View>
  );
}

function MeetingRow({
  label,
  ids,
  assignments,
  highlightPublisherId,
}: {
  label: string;
  ids: readonly string[];
  assignments: Map<string, Publisher | undefined>;
  highlightPublisherId?: string;
}) {
  const cellWidth = `${100 / ids.length}%`;

  return (
    <View style={styles.meetingRow}>
      <Text style={styles.meetingLabel}>{label}</Text>
      <View style={styles.assignmentRow}>
        {ids.map((id) => {
          const participant = assignments.get(id);
          if (!participant) {
            return <View key={id} style={{ width: cellWidth }} />;
          }
          const firstLine = participant.display_name ?? participant.first_name;
          const is_highlighted =
            highlightPublisherId != null && participant.id === highlightPublisherId;
          return (
            <View
              key={id}
              style={[{ width: cellWidth }, ...(is_highlighted ? [styles.highlightedCell] : [])]}
            >
              <Text style={styles.assignmentCell}>{firstLine}</Text>
              <Text style={styles.assignmentLastName}>{participant.last_name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function WeekSection({
  weekId,
  assignments,
  events,
  highlightPublisherId,
}: {
  weekId: string;
  assignments: Map<string, Publisher | undefined>;
  events: { type: string }[];
  highlightPublisherId?: string;
}) {
  const dateLabel = getTheocraticWeekLabel(weekId, { format: "week-range-capital-case" });

  const hasCircuitAssembly = events.some((e) => e.type === "circuit_assembly");
  const hasConvention = events.some((e) => e.type === "convention");

  return (
    <>
      <View style={styles.weekLabelRow}>
        <Text style={styles.weekLabelText}>{dateLabel}</Text>
      </View>
      {hasCircuitAssembly && <Text style={styles.eventBanner}>Circuit Assembly</Text>}
      {hasConvention && <Text style={styles.eventBanner}>Convention</Text>}
      <MeetingRow
        label="Midweek"
        ids={midweekIDs}
        assignments={assignments}
        highlightPublisherId={highlightPublisherId}
      />
      <View style={{ paddingBottom: 30 }}>
        <MeetingRow
          label="Weekend"
          ids={weekendIDs}
          assignments={assignments}
          highlightPublisherId={highlightPublisherId}
        />
      </View>
    </>
  );
}

export function AudioVideoPdfDocument({
  weeks,
  isLoading,
  dateRange,
  highlightPublisherId,
}: AudioVideoPdfDocumentProps) {
  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader scheduleName="Audio & Video" monthDate={dateRange.firstMonday} />
          <Text style={styles.noData}>Loading schedule data...</Text>
        </PdfPage>
      </Document>
    );
  }

  if (weeks.length === 0) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader scheduleName="Audio & Video" monthDate={dateRange.firstMonday} />
          <Text style={styles.noData}>No schedule data found for the selected month.</Text>
        </PdfPage>
      </Document>
    );
  }

  return (
    <Document>
      <PdfPage>
        <SchedulePdfHeader scheduleName="Audio & Video" monthDate={dateRange.firstMonday} />
        <View style={styles.table}>
          <TableHeader />
          {weeks.map((week) => (
            <WeekSection
              key={week.weekId}
              weekId={week.weekId}
              assignments={week.assignments}
              events={week.events}
              highlightPublisherId={highlightPublisherId}
            />
          ))}
        </View>
      </PdfPage>
    </Document>
  );
}
