import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { SectionLabel } from "../components/SectionLabel";
import { Tabs } from "../components/Tabs";
import { PageLayout } from "../layouts/PageLayout";

const testTabs = [{ id: "weekly", text: "Week 1 Picks", active: true }];

const HomePage = () => {
  return (
    <PageLayout>
      <div className="flex justify-center">
        <Tabs tabs={testTabs}></Tabs>
      </div>
      <SectionLabel label={"Your Score"}></SectionLabel>
      <Scoreboard wins="7" loses="3" roi="+723" roiStyle="text-green-500" />
    </PageLayout>
  );
};

export { HomePage };
