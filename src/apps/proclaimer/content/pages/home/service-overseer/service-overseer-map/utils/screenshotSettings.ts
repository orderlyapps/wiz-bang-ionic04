import { z } from "zod";

export const screenshotSettingsSchema = z.object({
  overlay_font_size: z.coerce.number().min(8).max(32),
  boundary_line_width: z.coerce.number().min(0.5).max(8),
  block_line_width: z.coerce.number().min(0.5).max(8),
  block_text_size: z.coerce.number().min(8).max(32),
  block_opacity: z.coerce.number().min(0).max(1),
});

export type ScreenshotSettings = z.infer<typeof screenshotSettingsSchema>;

export const DEFAULT_SCREENSHOT_SETTINGS: ScreenshotSettings = {
  overlay_font_size: 15,
  boundary_line_width: 2.5,
  block_line_width: 2,
  block_text_size: 13,
  block_opacity: 0.6,
};
