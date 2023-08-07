import { Game } from "../components/Game/Game";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
import { PageLayout } from "../layouts/PageLayout";
import { Team } from "../types/Team";

const testTabs = [{ id: "weekly", text: "Week 1 Picks", active: true }];

const homeTeam: Team & { score?: string; pick?: boolean } = {
  abbreviation: "DAL",
  id: "1",
  name: "Cowboys",
  color: "#2A6499",
  alternateColor: "#2A6499",
  location: "Dallas",
  score: "7",
  pick: false,
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
        lock={true}
        correctPick={true}
        showPickResult={false}
      />
    </PageLayout>
  );
};

export { HomePage };
