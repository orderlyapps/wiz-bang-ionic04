import { useState } from "react";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { clearStoredCongregation } from "@util/app/congregation/utils";
import { clearStoredPublisher } from "@proclaimer-shared/publisher/publisherUtils";
import { setStoredFontSize, applyFontSize, DEFAULT_FONT_SIZE } from "@util/app/font-size/utils";
import { setStoredTheme, applyTheme } from "@util/app/theme";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { clearAllTanstackData } from "@shared/database/persistence";

export function ResetSettingsButton() {
  const [show_alert, set_show_alert] = useState(false);

  const handleReset = async () => {
    await supabase.auth.signOut({ scope: "local" });
    clearStoredCongregation();
    clearStoredPublisher();
    setStoredFontSize(DEFAULT_FONT_SIZE);
    applyFontSize(DEFAULT_FONT_SIZE);
    setStoredTheme("auto");
    applyTheme("auto");
    await clearAllTanstackData();
    window.location.reload();
  };

  return (
    <>
      <TextButton
        label="Reset to Default Settings"
        color="danger"
        fill="outline"
        on_click={() => set_show_alert(true)}
      />
      <ConfirmationAlert
        is_open={show_alert}
        header="Reset Settings"
        message="This will clear your congregation and publisher selections and reset appearance settings to defaults."
        confirm_text="Reset"
        confirm_color="danger"
        cancel_text="Cancel"
        on_confirm={handleReset}
        on_cancel={() => set_show_alert(false)}
      />
    </>
  );
}
