import { loadPub, type MWBSchedule } from "meeting-schedules-parser";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";

export interface ParsedMeetingData {
  week_id: string;
  mwb_week_date_locale?: string;
  mwb_weekly_bible_reading: string;
  mwb_song_first: number;
  mwb_tgw_talk: string;
  mwb_tgw_talk_title?: string;
  mwb_tgw_gems_title?: string;
  mwb_tgw_bread: string;
  mwb_tgw_bread_title?: string;
  mwb_ayf_count: number;
  mwb_ayf_part1: string;
  mwb_ayf_part1_time?: number;
  mwb_ayf_part1_type?: string;
  mwb_ayf_part1_title?: string;
  mwb_ayf_part2: string;
  mwb_ayf_part2_time?: number;
  mwb_ayf_part2_type?: string;
  mwb_ayf_part2_title?: string;
  mwb_ayf_part3: string;
  mwb_ayf_part3_time?: number;
  mwb_ayf_part3_type?: string;
  mwb_ayf_part3_title?: string;
  mwb_ayf_part4?: string;
  mwb_ayf_part4_time?: number;
  mwb_ayf_part4_type?: string;
  mwb_ayf_part4_title?: string;
  mwb_song_middle?: string;
  mwb_lc_count: number;
  mwb_lc_part1: string;
  mwb_lc_part1_time?: number;
  mwb_lc_part1_content?: string;
  mwb_lc_part1_title?: string;
  mwb_lc_part2?: string;
  mwb_lc_part2_time?: number;
  mwb_lc_part2_content?: string;
  mwb_lc_part2_title?: string;
  mwb_lc_cbs: string;
  mwb_lc_cbs_title?: string;
  mwb_song_conclude?: string;
}

export class ClamDataService {
  static async parseEpubFile(file: File): Promise<ParsedMeetingData[]> {
    try {
      const pubData = await loadPub(file);

      // Extract the MWB schedule data from the parsed publication
      // Note: loadPub returns the array directly, not wrapped in an object
      const mwbSchedules: MWBSchedule[] = Array.isArray(pubData) ? pubData : pubData.mwb || [];

      return mwbSchedules.map((week: MWBSchedule) => ({
        week_id: week.mwb_week_date, // Note: week_id = mwb_week_date as specified
        mwb_week_date_locale: week.mwb_week_date_locale,
        mwb_weekly_bible_reading: week.mwb_weekly_bible_reading,
        mwb_song_first: week.mwb_song_first,
        mwb_tgw_talk: week.mwb_tgw_talk,
        mwb_tgw_talk_title: week.mwb_tgw_talk_title,
        mwb_tgw_gems_title: week.mwb_tgw_gems_title,
        mwb_tgw_bread: week.mwb_tgw_bread,
        mwb_tgw_bread_title: week.mwb_tgw_bread_title,
        mwb_ayf_count: week.mwb_ayf_count,
        mwb_ayf_part1: week.mwb_ayf_part1,
        mwb_ayf_part1_time: week.mwb_ayf_part1_time,
        mwb_ayf_part1_type: week.mwb_ayf_part1_type,
        mwb_ayf_part1_title: week.mwb_ayf_part1_title,
        mwb_ayf_part2: week.mwb_ayf_part2,
        mwb_ayf_part2_time: week.mwb_ayf_part2_time,
        mwb_ayf_part2_type: week.mwb_ayf_part2_type,
        mwb_ayf_part2_title: week.mwb_ayf_part2_title,
        mwb_ayf_part3: week.mwb_ayf_part3,
        mwb_ayf_part3_time: week.mwb_ayf_part3_time,
        mwb_ayf_part3_type: week.mwb_ayf_part3_type,
        mwb_ayf_part3_title: week.mwb_ayf_part3_title,
        mwb_ayf_part4: week.mwb_ayf_part4,
        mwb_ayf_part4_time: week.mwb_ayf_part4_time,
        mwb_ayf_part4_type: week.mwb_ayf_part4_type,
        mwb_ayf_part4_title: week.mwb_ayf_part4_title,
        mwb_song_middle: week.mwb_song_middle?.toString(),
        mwb_lc_count: week.mwb_lc_count,
        mwb_lc_part1: week.mwb_lc_part1,
        mwb_lc_part1_time: week.mwb_lc_part1_time,
        mwb_lc_part1_content: week.mwb_lc_part1_content,
        mwb_lc_part1_title: week.mwb_lc_part1_title,
        mwb_lc_part2: week.mwb_lc_part2,
        mwb_lc_part2_time: week.mwb_lc_part2_time,
        mwb_lc_part2_content: week.mwb_lc_part2_content,
        mwb_lc_part2_title: week.mwb_lc_part2_title,
        mwb_lc_cbs: week.mwb_lc_cbs,
        mwb_lc_cbs_title: week.mwb_lc_cbs_title,
        mwb_song_conclude: week.mwb_song_conclude?.toString(),
      }));
    } catch (error) {
      console.error("Error parsing EPUB:", error);
      throw new Error(
        `Failed to parse EPUB file: ${error instanceof Error ? error.message : "Unknown error"}`,
        { cause: error },
      );
    }
  }

  static async importMeetingData(data: ParsedMeetingData[]): Promise<void> {
    try {
      // Convert to the format expected by the database
      const dbData: MidweekMeetingData[] = data.map((week) => ({
        week_id: week.week_id,
        mwb_week_date_locale: week.mwb_week_date_locale || null,
        mwb_weekly_bible_reading: week.mwb_weekly_bible_reading,
        mwb_song_first: week.mwb_song_first,
        mwb_tgw_talk: week.mwb_tgw_talk,
        mwb_tgw_talk_title: week.mwb_tgw_talk_title || null,
        mwb_tgw_gems_title: week.mwb_tgw_gems_title || null,
        mwb_tgw_bread: week.mwb_tgw_bread,
        mwb_tgw_bread_title: week.mwb_tgw_bread_title || null,
        mwb_ayf_count: week.mwb_ayf_count,
        mwb_ayf_part1: week.mwb_ayf_part1,
        mwb_ayf_part1_time: week.mwb_ayf_part1_time || null,
        mwb_ayf_part1_type: week.mwb_ayf_part1_type || null,
        mwb_ayf_part1_title: week.mwb_ayf_part1_title || null,
        mwb_ayf_part2: week.mwb_ayf_part2,
        mwb_ayf_part2_time: week.mwb_ayf_part2_time || null,
        mwb_ayf_part2_type: week.mwb_ayf_part2_type || null,
        mwb_ayf_part2_title: week.mwb_ayf_part2_title || null,
        mwb_ayf_part3: week.mwb_ayf_part3,
        mwb_ayf_part3_time: week.mwb_ayf_part3_time || null,
        mwb_ayf_part3_type: week.mwb_ayf_part3_type || null,
        mwb_ayf_part3_title: week.mwb_ayf_part3_title || null,
        mwb_ayf_part4: week.mwb_ayf_part4 || null,
        mwb_ayf_part4_time: week.mwb_ayf_part4_time || null,
        mwb_ayf_part4_type: week.mwb_ayf_part4_type || null,
        mwb_ayf_part4_title: week.mwb_ayf_part4_title || null,
        mwb_song_middle: week.mwb_song_middle || null,
        mwb_lc_count: week.mwb_lc_count,
        mwb_lc_part1: week.mwb_lc_part1,
        mwb_lc_part1_time: week.mwb_lc_part1_time || null,
        mwb_lc_part1_content: week.mwb_lc_part1_content || null,
        mwb_lc_part1_title: week.mwb_lc_part1_title || null,
        mwb_lc_part2: week.mwb_lc_part2 || null,
        mwb_lc_part2_time: week.mwb_lc_part2_time || null,
        mwb_lc_part2_content: week.mwb_lc_part2_content || null,
        mwb_lc_part2_title: week.mwb_lc_part2_title || null,
        mwb_lc_cbs: week.mwb_lc_cbs,
        mwb_lc_cbs_title: week.mwb_lc_cbs_title || null,
        mwb_song_conclude: week.mwb_song_conclude || null,
      }));

      // Use the collection to import data
      // Note: insert() triggers async onInsert but doesn't return a Promise we can await directly
      for (const week of dbData) {
        midweekMeetingDataCollection.insert(week);
      }
    } catch (error) {
      console.error("Error importing meeting data:", error);
      throw new Error(
        `Failed to import meeting data: ${error instanceof Error ? error.message : "Unknown error"}`,
        { cause: error },
      );
    }
  }
}
