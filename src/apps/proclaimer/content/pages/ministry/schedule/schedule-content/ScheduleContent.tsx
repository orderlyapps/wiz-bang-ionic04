import React, { Fragment } from "react";
import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";

export const ScheduleContent: React.FC = () => {
  const weeklySchedule = [
    {
      day: "Monday",
      groups: [{ time: "9:15", location: "Kingdom Hall", conductor: "Igor De Souza" }],
    },
    { day: "Tuesday", groups: [] },
    {
      day: "Wednesday",
      groups: [
        { time: "9:15", location: "Kingdom Hall", conductor: "John Bray" },
        {
          time: "2:00",
          location: "180A George St, East Maitland",
          conductor: "Callum MacDonald",
        },
        // {
        //   time: "5:30",
        //   location: "180A George St, East Maitland",
        //   conductor: "Callum MacDonald",
        // },
      ],
    },
    {
      day: "Thursday",
      groups: [
        {
          time: "9:15",
          location: "3 Nardoo Ave, Aberglasslyn",
          conductor: "Steve Willder",
        },
      ],
    },
    {
      day: "Friday",
      groups: [{ time: "9:15", location: "Kingdom Hall", conductor: "Damian Amodeo" }],
    },
    {
      day: "Saturday",
      groups: [
        {
          time: "9:15",
          location: "Group Locations",
          conductor: "Group Overseers",
        },
      ],
    },
    {
      day: "Sunday",
      groups: [{ time: "9:45", location: "Kingdom Hall", conductor: "Damian Amodeo" }],
    },
  ];

  // const sundayGroups = [
  //   {
  //     month: "November",
  //     weeks: [
  //       { date: "2", group: "Group 3" },
  //       { date: "9", group: "Circuit Assembly" },
  //       { date: "16", group: "Group 4" },
  //       { date: "23", group: "Group 5" },
  //       { date: "30", group: "Group 6" },
  //     ],
  //   },
  //   {
  //     month: "December",
  //     weeks: [
  //       { date: "7", group: "Group 1" },
  //       { date: "14", group: "Group 2" },
  //       { date: "21", group: "Group 3" },
  //       { date: "28", group: "Group 4" },
  //     ],
  //   },
  //   {
  //     month: "January",
  //     weeks: [
  //       { date: "4", group: "Group 5" },
  //       { date: "11", group: "Group 6" },
  //       { date: "18", group: "Group 1" },
  //       { date: "25", group: "Group 2" },
  //     ],
  //   },
  // ];
  return (
    <IonList className="ion-no-padding">
      {weeklySchedule.map(({ day, groups }) => {
        if (groups.length === 0) {
          return null;
        }

        return (
          <IonItem key={day}>
            <IonLabel>
              <strong>{day}</strong>
              <br />
              <IonGrid>
                {groups.map(({ time, location, conductor }) => {
                  return (
                    <Fragment key={time}>
                      <IonRow>
                        <IonCol size="2" className="ion-no-padding">
                          <>{time}</>
                        </IonCol>
                        <IonCol size="auto" className="ion-no-padding">
                          <>{location}</>
                        </IonCol>
                      </IonRow>
                      <Space size="xs" />
                      <IonRow key={time} className="ion-padding-bottom">
                        <IonCol size="2" className="ion-no-padding"></IonCol>
                        <IonCol size="auto" className="ion-no-padding">
                          <>{conductor}</>
                        </IonCol>
                      </IonRow>
                    </Fragment>
                  );
                })}
              </IonGrid>
            </IonLabel>
          </IonItem>
        );
      })}

      <Space />

      {/* <ItemDivider>Sunday Field Service </ItemDivider> */}

      {/* {sundayGroups.map(({ month, weeks }) => {
        return (
          <IonItem key={month}>
            <IonLabel>
              <strong>{month}</strong>
              <br />
              <IonGrid>
                {weeks.map(({ date, group }) => {
                  return (
                    <IonRow key={date}>
                      <IonCol size="2">
                        <h3>{date}</h3>
                      </IonCol>
                      <IonCol size="auto">
                        <h3>{group}</h3>
                      </IonCol>
                    </IonRow>
                  );
                })}
              </IonGrid>
            </IonLabel>
          </IonItem>
        );
      })} */}
    </IonList>
  );
};
