//takes espn nfl schedule for any given week and breaks it into objects useful for app

import { Game } from "../../types/Game";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getWeekData = (schedule: any) => {
  const currentWeekKeys = Object.keys(schedule);

  let currentWeeksGames: Game[] = [];

  currentWeekKeys.forEach((key) => {
    const games: Game[] = schedule[key]?.games.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ date, id, links, name, shortName, competitions, status }: any) => {
        return {
          date: date,
          id: id,
          links: links[0]?.href,
          name: name,
          shortName: shortName,
          venue: competitions[0]?.venue?.fullName,
          completed: status?.type?.completed,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          competitors: competitions[0]?.competitors?.map((competitor: any) => {
            return {
              score: competitor.score,
              isHome: competitor.homeAway === "home",
              abbreviation: competitor?.team?.abbreviation,
              id: competitor.id,
              location: competitor?.team?.location,
              name: competitor?.team?.name,
              color: competitor?.team?.color,
              alternateColor: competitor?.team?.alternateColor,
            };
          }),
        };
      }
    );

    currentWeeksGames = [...currentWeeksGames, ...games];
  });

  return currentWeeksGames;
};
