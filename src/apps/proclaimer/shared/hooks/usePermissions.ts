import { useLiveQuery } from "@tanstack/react-db";
import { cleanPermissionCollection } from "@shared/database/collections/clean-permission";
import { reportPermissionCollection } from "@shared/database/collections/report-permission";
import { secretaryPermissionCollection } from "@shared/database/collections/secretary-permission";
import { elderPermissionCollection } from "@shared/database/collections/elder-permission";
import { clamOverseerPermissionCollection } from "@shared/database/collections/clam-overseer-permission";
import { serviceOverseerPermissionCollection } from "@shared/database/collections/service-overseer-permission";
import { cobePermissionCollection } from "@shared/database/collections/cobe-permission";
import { territoryServantPermissionCollection } from "@shared/database/collections/territory-servant-permission";
import { avOverseerPermissionCollection } from "@shared/database/collections/av-overseer-permission";
import { speakerPermissionCollection } from "@shared/database/collections/speaker-permission";
import { weekendPermissionCollection } from "@shared/database/collections/weekend-permission";
import { reminderPermissionCollection } from "@shared/database/collections/reminder-permission";
import { eventPermissionCollection } from "@shared/database/collections/event-permission";
import { watchtowerPermissionCollection } from "@shared/database/collections/watchtower-permission";
import { ministerialServantPermissionCollection } from "@shared/database/collections/ministerial-servant-permission";
import { congregationAdminCollection } from "@shared/database/collections/congregation-admin";
import { authUserCollection } from "@shared/database/collections/auth-user";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";

interface Permissions {
  has_cleaning: boolean;
  has_reports: boolean;
  has_secretary: boolean;
  has_elder: boolean;
  has_ministerial_servant: boolean;
  has_clam_overseer: boolean;
  has_service_overseer: boolean;
  has_cobe: boolean;
  has_territory_servant: boolean;
  has_av_overseer: boolean;
  has_speaker: boolean;
  has_weekend: boolean;
  has_reminders: boolean;
  has_events: boolean;
  has_watchtower: boolean;
  has_congregation_admin: boolean;
  is_super_admin: boolean;
  is_authenticated: boolean;
  is_loaded: boolean;
}

export function usePermissions(): Permissions {
  const session = useAuthSession();
  const stored_congregation = useStoredCongregation();
  const auth_user_id = session?.user?.id;
  const congregation_id = stored_congregation?.id;
  const { data: clean_permissions } = useLiveQuery((q) =>
    q.from({ cp: cleanPermissionCollection }),
  );
  const { data: report_permissions } = useLiveQuery((q) =>
    q.from({ rp: reportPermissionCollection }),
  );
  const { data: secretary_permissions } = useLiveQuery((q) =>
    q.from({ sp: secretaryPermissionCollection }),
  );
  const { data: elder_permissions } = useLiveQuery((q) =>
    q.from({ ep: elderPermissionCollection }),
  );
  const { data: clam_permissions } = useLiveQuery((q) =>
    q.from({ cp: clamOverseerPermissionCollection }),
  );
  const { data: service_permissions } = useLiveQuery((q) =>
    q.from({ sop: serviceOverseerPermissionCollection }),
  );
  const { data: cobe_permissions } = useLiveQuery((q) => q.from({ cop: cobePermissionCollection }));
  const { data: territory_permissions } = useLiveQuery((q) =>
    q.from({ tp: territoryServantPermissionCollection }),
  );
  const { data: av_permissions } = useLiveQuery((q) =>
    q.from({ ap: avOverseerPermissionCollection }),
  );
  const { data: speaker_permissions } = useLiveQuery((q) =>
    q.from({ sp: speakerPermissionCollection }),
  );
  const { data: weekend_permissions } = useLiveQuery((q) =>
    q.from({ wp: weekendPermissionCollection }),
  );
  const { data: reminder_permissions } = useLiveQuery((q) =>
    q.from({ rp: reminderPermissionCollection }),
  );
  const { data: event_permissions } = useLiveQuery((q) =>
    q.from({ ep: eventPermissionCollection }),
  );
  const { data: watchtower_permissions } = useLiveQuery((q) =>
    q.from({ wp: watchtowerPermissionCollection }),
  );
  const { data: ministerial_servant_permissions } = useLiveQuery((q) =>
    q.from({ msp: ministerialServantPermissionCollection }),
  );
  const { data: congregation_admins } = useLiveQuery((q) =>
    q.from({ ca: congregationAdminCollection }),
  );
  const { data: auth_users } = useLiveQuery((q) => q.from({ au: authUserCollection }));

  if (session === undefined) {
    return {
      has_cleaning: false,
      has_reports: false,
      has_secretary: false,
      has_elder: false,
      has_ministerial_servant: false,
      has_clam_overseer: false,
      has_service_overseer: false,
      has_cobe: false,
      has_territory_servant: false,
      has_av_overseer: false,
      has_speaker: false,
      has_weekend: false,
      has_reminders: false,
      has_events: false,
      has_watchtower: false,
      has_congregation_admin: false,
      is_super_admin: false,
      is_authenticated: false,
      is_loaded: false,
    };
  }

  if (!auth_user_id || !congregation_id) {
    return {
      has_cleaning: false,
      has_reports: false,
      has_secretary: false,
      has_elder: false,
      has_ministerial_servant: false,
      has_clam_overseer: false,
      has_service_overseer: false,
      has_cobe: false,
      has_territory_servant: false,
      has_av_overseer: false,
      has_speaker: false,
      has_weekend: false,
      has_reminders: false,
      has_events: false,
      has_watchtower: false,
      has_congregation_admin: false,
      is_super_admin: false,
      is_authenticated: !!auth_user_id,
      is_loaded: true,
    };
  }

  const is_super_admin = auth_users.some(
    (au) => au.auth_user_id === auth_user_id && au.is_super_admin,
  );

  const has_congregation_admin = congregation_admins.some(
    (ca) => ca.auth_user_id === auth_user_id && ca.congregation_id === congregation_id,
  );

  const has_cleaning = clean_permissions.some(
    (cp) =>
      cp.auth_user_id === auth_user_id && cp.congregation_id === congregation_id && cp.can_edit,
  );

  const has_reports = report_permissions.some(
    (rp) => rp.auth_user_id === auth_user_id && (rp.can_read || rp.can_edit),
  );

  const has_secretary = secretary_permissions.some(
    (sp) =>
      sp.auth_user_id === auth_user_id && sp.congregation_id === congregation_id && sp.can_edit,
  );

  const has_elder = elder_permissions.some(
    (ep) =>
      ep.auth_user_id === auth_user_id && ep.congregation_id === congregation_id && ep.can_edit,
  );

  const has_clam_overseer = clam_permissions.some(
    (cp) =>
      cp.auth_user_id === auth_user_id && cp.congregation_id === congregation_id && cp.can_edit,
  );

  const has_service_overseer = service_permissions.some(
    (sop) =>
      sop.auth_user_id === auth_user_id && sop.congregation_id === congregation_id && sop.can_edit,
  );

  const has_cobe = cobe_permissions.some(
    (cop) =>
      cop.auth_user_id === auth_user_id && cop.congregation_id === congregation_id && cop.can_edit,
  );

  const has_territory_servant = territory_permissions.some(
    (tp) =>
      tp.auth_user_id === auth_user_id && tp.congregation_id === congregation_id && tp.can_edit,
  );

  const has_av_overseer = av_permissions.some(
    (ap) =>
      ap.auth_user_id === auth_user_id && ap.congregation_id === congregation_id && ap.can_edit,
  );

  const has_speaker = speaker_permissions.some(
    (sp) =>
      sp.auth_user_id === auth_user_id && sp.congregation_id === congregation_id && sp.can_edit,
  );

  const has_weekend = weekend_permissions.some(
    (wp) =>
      wp.auth_user_id === auth_user_id && wp.congregation_id === congregation_id && wp.can_edit,
  );

  const has_reminders = reminder_permissions.some(
    (rp) =>
      rp.auth_user_id === auth_user_id && rp.congregation_id === congregation_id && rp.can_edit,
  );

  const has_events = event_permissions.some(
    (ep) =>
      ep.auth_user_id === auth_user_id && ep.congregation_id === congregation_id && ep.can_edit,
  );

  const has_watchtower = watchtower_permissions.some(
    (wp) =>
      wp.auth_user_id === auth_user_id && wp.congregation_id === congregation_id && wp.can_edit,
  );

  const has_ministerial_servant = ministerial_servant_permissions.some(
    (msp) =>
      msp.auth_user_id === auth_user_id && msp.congregation_id === congregation_id && msp.can_edit,
  );

  return {
    has_cleaning,
    has_reports,
    has_secretary,
    has_elder,
    has_ministerial_servant,
    has_clam_overseer,
    has_service_overseer,
    has_cobe,
    has_territory_servant,
    has_av_overseer,
    has_speaker,
    has_weekend,
    has_reminders,
    has_events,
    has_watchtower,
    has_congregation_admin,
    is_super_admin,
    is_authenticated: true,
    is_loaded: true,
  };
}
