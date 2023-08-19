const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const WeekSelector = ({ activeWeekNumber }: { activeWeekNumber?: number }) => {
  return (
    <div className="w-full flex border-b-2 mt-4 py-2 border-gray-50 overflow-scroll">
      {weeks.map((number) => {
        return (
          <p
            className={
              "text-gray-500 px-3 text-sm " +
              (activeWeekNumber === number
                ? "text-purple-500 font-semibold"
                : "")
            }
            key={number}
          >
            WK{number}
          </p>
        );
      })}
    </div>
  );
};

export { WeekSelector };
