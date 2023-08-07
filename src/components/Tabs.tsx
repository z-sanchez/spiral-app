type TabsProps = {
  id: string;
  text: string;
  active: boolean;
};

const Tabs = ({
  tabs,
  onTabChange,
}: {
  tabs: TabsProps[];
  onTabChange?: () => void;
}) => {
  return (
    <div className="w-full flex justify-center">
      {tabs.map(({ text, active, id }) => {
        return (
          <p
            key={id}
            className={
              "text-center border-b-2 w-2/4 " +
              (active
                ? "border-purple-500 text-purple-500"
                : " text-gray-700 border-gray-100")
            }
          >
            {text}
          </p>
        );
      })}
    </div>
  );
};

export { Tabs };
