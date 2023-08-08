import { Game } from "../components/Game/Game";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
import { PageLayout } from "../layouts/PageLayout";
import { Team } from "../types/Team";
import { ReactComponent as DownArrowIcon } from "../assets/icons/down-arrow.svg";

const testTabs = [{ id: "weekly", text: "Week 1 Picks", active: true }];

const homeTeam: Team & { score?: string; pick?: boolean } = {
  abbreviation: "DAL",
  id: "1",
  name: "Cowboys",
  color: "#2A6499",
  alternateColor: "#2A6499",
  location: "Dallas",
  score: "7",
  pick: true,
};

const awayTeam: Team & { score?: string; pick?: boolean } = {
  abbreviation: "PHI",
  id: "2",
  name: "Eagles",
  color: "#235703",
  alternateColor: "#235703",
  location: "Philedelphia",
  score: "14",
  pick: false,
};

const HomePage = () => {
  return (
    <PageLayout>
      <div className="flex justify-center">
        <Tabs tabs={testTabs}></Tabs>
      </div>
      <SectionLabel label={"Your Score"}></SectionLabel>
      <Scoreboard wins="7" loses="3" roi="+723" roiStyle="text-green-500" />
      <SectionLabel label={"Games"}></SectionLabel>
      <Game
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        wager="133"
        live={false}
        lock={false}
      />
      <Game
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        wager="13"
        live={true}
        lock={true}
      />
      <div className="flex w-full items-center justify-center">
        <SectionLabel label="Finished Games" />
        <DownArrowIcon className="stroke-purple-500" />
      </div>
      <Game
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        wager="127"
        correctPick={true}
        showPickResult={true}
      />{" "}
      <Game
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        wager="88"
        correctPick={false}
        showPickResult={true}
      />
    </PageLayout>
  );
};

export { HomePage };
