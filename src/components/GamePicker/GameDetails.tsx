import { LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "determinate" &&
            ownerState.color === "primary" && {
              backgroundColor: "green",
              height: "4px",
            }),
        }),
        bar1Determinate: {
          backgroundColor: "blue",
        },
      },
    },
  },
});

const GameDetails = () => (
  <ThemeProvider theme={theme}>
    <div className="flex h-full w-full px-5 flex-col">
      <div className="flex w-full ">
        <div className="flex flex-col w-1/2 items-start">
          <p>Dallas</p>
          <div className="flex items-end">
            <p className="font-semibold text-2xl">Cowboys</p>
            <p className="font-light text-gray-400 pl-3">3-2</p>
          </div>
        </div>
        <div className="flex w-1/2 flex-col items-end">
          <p>Philidephia</p>
          <div className="flex items-end">
            <p className="font-light text-gray-400 pr-3">3-2</p>
            <p className="font-semibold text-2xl">Eagles</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <LinearProgress
          className="mt-2 mb-1 w-full"
          color="primary"
          value={50}
          variant="determinate"
        ></LinearProgress>
        <div className="flex justify-between">
          <p className="text-sm text-gray-300">50%</p>
          <p className="text-sm text-gray-300">50%</p>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-5">
          <p className="text-gray-700 text-sm font-semibold">Date and Time</p>
          <p className="text-gray-700">September 7th 2023, 7:20pm</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-700 text-sm font-semibold">Location</p>
          <p className="text-gray-700">
            Lincoln Financial Field{" "}
            <span className="text-green-500">(eagles)</span>
          </p>
        </div>
      </div>
    </div>
  </ThemeProvider>
);

export { GameDetails };
