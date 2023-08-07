import { Tabs } from "../components/Tabs";
import { PageLayout } from "../layouts/PageLayout";

const testTabs = [{ id: "weekly", text: "Week 1 Picks", active: true }];

const HomePage = () => {
  return (
    <PageLayout>
      <div className="flex justify-center">
        <Tabs tabDetails={testTabs}></Tabs>
      </div>
    </PageLayout>
  );
};

export { HomePage };
