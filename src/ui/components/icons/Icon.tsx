import { IonIcon } from "@ionic/react";
import React from "react";
import addChairman from "./svgs/add-chairman.svg";
import add from "./svgs/add.svg";
import baptise from "./svgs/baptise.svg";
import bibleStudy from "./svgs/bible-study.svg";
import bookmarkFilled from "./svgs/bookmark-filled.svg";
import bookmark from "./svgs/bookmark.svg";
import boy from "./svgs/boy.svg";
import brotherSister from "./svgs/brother-sister.svg";
import brother from "./svgs/brother.svg";
import cart from "./svgs/cart.svg";
import chat from "./svgs/chat.svg";
import checkList from "./svgs/check-list.svg";
import chevronBackJW from "./svgs/chevronBackJW.svg";
import chevronDownJW from "./svgs/chevronDownJW.svg";
import chevronForwardJW from "./svgs/chevronForwardJW.svg";
import chevronUpJW from "./svgs/chevronUpJW.svg";
import children from "./svgs/children.svg";
import congregation from "./svgs/congregation.svg";
import contributions from "./svgs/contributions.svg";
import convention from "./svgs/convention.svg";
import copy from "./svgs/copy.svg";
import cross from "./svgs/cross.svg";
import deleteIcon from "./svgs/delete.svg";
import docx from "./svgs/docx.svg";
import download from "./svgs/download.svg";
import edit from "./svgs/edit.svg";
import expand from "./svgs/expand.svg";
import exportIcon from "./svgs/export.svg";
import fast from "./svgs/fast.svg";
import gem from "./svgs/gem.svg";
import girl from "./svgs/girl.svg";
import home from "./svgs/home.svg";
import image from "./svgs/image.svg";
import importIcon from "./svgs/import.svg";
import letterWriting from "./svgs/letter-writing.svg";
import letter from "./svgs/letter.svg";
import map from "./svgs/map.svg";
import memorial from "./svgs/memorial.svg";
import message from "./svgs/message.svg";
import midweekMeeting from "./svgs/midweek-meeting.svg";
import ministry from "./svgs/ministry.svg";
import minus from "./svgs/minus.svg";
import offline from "./svgs/offline.svg";
import outline from "./svgs/outline.svg";
import pdf from "./svgs/pdf.svg";
import play from "./svgs/play.svg";
import publishers from "./svgs/publishers.svg";
import repeat from "./svgs/repeat.svg";
import schedules from "./svgs/schedules.svg";
import settings from "./svgs/settings.svg";
import sheepCopy from "./svgs/sheep-copy.svg";
import sheep from "./svgs/sheep.svg";
import shepherd from "./svgs/shepherd.svg";
import sister from "./svgs/sister.svg";
import slow from "./svgs/slow.svg";
import sort from "./svgs/sort.svg";
import talk from "./svgs/talk.svg";
import upload from "./svgs/upload.svg";
import weekendMeeting from "./svgs/weekend-meeting.svg";
import wheat from "./svgs/wheat.svg";
import work from "./svgs/work.svg";

export type IconName =
  | "add-chairman"
  | "add"
  | "baptise"
  | "bible-study"
  | "bookmark-filled"
  | "bookmark"
  | "boy"
  | "brother-sister"
  | "brother"
  | "cart"
  | "chat"
  | "check-list"
  | "chevronBackJW"
  | "chevronDownJW"
  | "chevronForwardJW"
  | "chevronUpJW"
  | "children"
  | "congregation"
  | "contributions"
  | "convention"
  | "copy"
  | "cross"
  | "delete"
  | "docx"
  | "download"
  | "edit"
  | "expand"
  | "export"
  | "fast"
  | "gem"
  | "girl"
  | "home"
  | "image"
  | "import"
  | "letter-writing"
  | "letter"
  | "map"
  | "memorial"
  | "message"
  | "midweek-meeting"
  | "ministry"
  | "minus"
  | "offline"
  | "outline"
  | "pdf"
  | "play"
  | "publishers"
  | "repeat"
  | "schedules"
  | "settings"
  | "sheep-copy"
  | "sheep"
  | "shepherd"
  | "sister"
  | "slow"
  | "sort"
  | "talk"
  | "upload"
  | "weekend-meeting"
  | "wheat"
  | "work";

const icon: Record<IconName, string> = {
  "add-chairman": addChairman,
  add: add,
  baptise: baptise,
  "bible-study": bibleStudy,
  "bookmark-filled": bookmarkFilled,
  bookmark: bookmark,
  boy: boy,
  "brother-sister": brotherSister,
  brother: brother,
  cart: cart,
  chat: chat,
  "check-list": checkList,
  chevronBackJW: chevronBackJW,
  chevronDownJW: chevronDownJW,
  chevronForwardJW: chevronForwardJW,
  chevronUpJW: chevronUpJW,
  children: children,
  congregation: congregation,
  contributions: contributions,
  convention: convention,
  copy: copy,
  cross: cross,
  delete: deleteIcon,
  docx: docx,
  download: download,
  edit: edit,
  expand: expand,
  export: exportIcon,
  fast: fast,
  gem: gem,
  girl: girl,
  home: home,
  image: image,
  import: importIcon,
  "letter-writing": letterWriting,
  letter: letter,
  map: map,
  memorial: memorial,
  message: message,
  "midweek-meeting": midweekMeeting,
  ministry: ministry,
  minus: minus,
  offline: offline,
  outline: outline,
  pdf: pdf,
  play: play,
  publishers: publishers,
  repeat: repeat,
  schedules: schedules,
  settings: settings,
  "sheep-copy": sheepCopy,
  sheep: sheep,
  shepherd: shepherd,
  sister: sister,
  slow: slow,
  sort: sort,
  talk: talk,
  upload: upload,
  "weekend-meeting": weekendMeeting,
  wheat: wheat,
  work: work,
} as const;

interface Props extends Omit<React.ComponentProps<typeof IonIcon>, "icon" | "src"> {
  name: IconName;
  disabled?: boolean;
}

export const Icon: React.FC<Props> = ({ name, disabled, ...props }) => {
  return (
    <IonIcon
      {...props}
      src={icon[name]}
      color={disabled ? "medium" : props.color}
      style={
        disabled
          ? {
              opacity: 0.4,
              pointerEvents: "none",
              ...props.style,
            }
          : props.style
      }
    />
  );
};
