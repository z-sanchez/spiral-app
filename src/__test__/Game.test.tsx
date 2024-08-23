import "@testing-library/jest-dom";
import { Game } from "../components/Game/Game";
import { fireEvent, render, screen } from "@testing-library/react";

//this solves the jest-vite incompatibility when using import.meta.env
jest.mock("../utils/constants", () => ({
  ENV_VARIABLES: {
    useMockData: true,
  },
}));

const pickedStyles = {
  outline: "1px solid rgba(168, 85, 247, 0.76)",
  background: "rgba(168, 85, 247, 0.04)",
};

const correctPickStyles = {
  outline: "1px solid #4EDB76",
  background: "rgba(78, 219, 118, 0.04)",
};

const wrongPickStyles = {
  outline: "1px solid #ef4444",
  background: "rgba(239, 68, 68, 0.04)",
};

const homeTeam = {
  score: "0",
  isHome: true,
  abbreviation: "JAX",
  id: "30",
  location: "Jacksonville",
  name: "Jaguars",
  color: "#007487",
  alternateColor: "#d7a22a",
  record: {
    wins: 8,
    loses: 3,
    ties: 0,
  },
  isPicked: false,
};

const awayTeam = {
  score: "0",
  isHome: false,
  abbreviation: "CIN",
  id: "4",
  location: "Cincinnati",
  name: "Bengals",
  color: "#fb4f14",
  alternateColor: "#000000",
  record: {
    wins: 5,
    loses: 6,
    ties: 0,
  },
  isPicked: false,
};

const handlePickMock = jest.fn();

const GameComponent = (
  <Game
    gameId="1234"
    readonly={false}
    homeTeam={homeTeam}
    awayTeam={awayTeam}
    showScores={false}
    onPick={handlePickMock}
  ></Game>
);

describe("New Game Component Functions", () => {
  let homeTeamComponent: HTMLElement | null = null;
  let awayTeamComponent: HTMLElement | null = null;

  beforeEach(() => {
    render(GameComponent);
    homeTeamComponent = screen.getByTestId("homeTeam");
    awayTeamComponent = screen.getByTestId("awayTeam");
  });

  test("Pick away team", () => {
    fireEvent.click(awayTeamComponent!);

    expect(handlePickMock).toHaveBeenCalledWith("CIN");
  });

  test("Pick home team", () => {
    fireEvent.click(homeTeamComponent!);

    expect(handlePickMock).toHaveBeenCalledWith("JAX");
  });

  test("Switch pick from Away Team to Home Team", () => {
    fireEvent.click(awayTeamComponent!);
    fireEvent.click(homeTeamComponent!);

    expect(handlePickMock).toHaveBeenCalledWith("JAX");
  });

  test("Game is live and game is readonly", () => {
    const mockPick = jest.fn();

    render(
      <Game
        gameId="1234"
        readonly={true}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        showScores={false}
        onPick={mockPick}
      ></Game>
    );

    fireEvent.click(awayTeamComponent!);

    expect(mockPick).toHaveBeenCalledTimes(0);
  });
});

describe("New Game Component UI", () => {
  test("Component renders", () => {
    expect(() => {
      render(GameComponent);
    }).not.toThrow();
  });

  test("Pick is correct and highlighted green", () => {
    const homeTeamPicked = { ...homeTeam, isPicked: true };

    render(
      <Game
        gameId="1234"
        readonly={true}
        homeTeam={homeTeamPicked}
        awayTeam={awayTeam}
        showScores={false}
        onPick={handlePickMock}
        showResults={true}
        correctPick={true}
      ></Game>
    );

    const homeTeamComponent = screen.getByTestId("homeTeam");

    //getComputedStyle reflects final style output after all computation
    //.style.backgroundColor would only reflect the inline code that was written
    const backgroundColor = getComputedStyle(homeTeamComponent).backgroundColor;
    const outline = getComputedStyle(homeTeamComponent).outline;

    expect(outline).toBe(correctPickStyles.outline);
    expect(backgroundColor).toBe(correctPickStyles.background);
  });

  test("Pick is not correct and highlighted red", () => {
    const homeTeamPicked = { ...homeTeam, isPicked: true };

    render(
      <Game
        gameId="1234"
        readonly={true}
        homeTeam={homeTeamPicked}
        awayTeam={awayTeam}
        showScores={false}
        onPick={handlePickMock}
        showResults={true}
        correctPick={false}
      ></Game>
    );

    const homeTeamComponent = screen.getByTestId("homeTeam");

    const backgroundColor = getComputedStyle(homeTeamComponent).backgroundColor;
    const outline = getComputedStyle(homeTeamComponent).outline;

    expect(outline).toBe(wrongPickStyles.outline);
    expect(backgroundColor).toBe(wrongPickStyles.background);
  });

  test("Home team picked and highlighted", () => {
    const homeTeamPicked = { ...homeTeam, isPicked: true };

    render(
      <Game
        gameId="1234"
        readonly={false}
        homeTeam={homeTeamPicked}
        awayTeam={awayTeam}
        showScores={false}
        onPick={handlePickMock}
        showResults={false}
        correctPick={false}
      ></Game>
    );

    const homeTeamComponent = screen.getByTestId("homeTeam");

    const backgroundColor = getComputedStyle(homeTeamComponent).backgroundColor;
    const outline = getComputedStyle(homeTeamComponent).outline;

    expect(outline).toBe(pickedStyles.outline);
    expect(backgroundColor).toBe(pickedStyles.background);
  });

  test("Away team picked and highlighted", () => {
    const awayTeamPicked = { ...awayTeam, isPicked: true };

    render(
      <Game
        gameId="1234"
        readonly={false}
        homeTeam={homeTeam}
        awayTeam={awayTeamPicked}
        showScores={false}
        onPick={handlePickMock}
        showResults={false}
        correctPick={false}
      ></Game>
    );

    const awayTeamComponent = screen.getByTestId("awayTeam");

    const backgroundColor = getComputedStyle(awayTeamComponent).backgroundColor;
    const outline = getComputedStyle(awayTeamComponent).outline;

    expect(outline).toBe(pickedStyles.outline);
    expect(backgroundColor).toBe(pickedStyles.background);
  });

  test("Away team picked and highlighted", () => {
    const awayTeamPicked = { ...awayTeam, isPicked: true };

    render(
      <Game
        gameId="1234"
        readonly={false}
        homeTeam={homeTeam}
        awayTeam={awayTeamPicked}
        showScores={false}
        onPick={handlePickMock}
        showResults={false}
        correctPick={false}
      ></Game>
    );

    const awayTeamComponent = screen.getByTestId("awayTeam");

    const backgroundColor = getComputedStyle(awayTeamComponent).backgroundColor;
    const outline = getComputedStyle(awayTeamComponent).outline;

    expect(outline).toBe(pickedStyles.outline);
    expect(backgroundColor).toBe(pickedStyles.background);
  });

  test("No pick made", () => {
    render(
      <Game
        gameId="1234"
        readonly={false}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        showScores={false}
        onPick={handlePickMock}
        showResults={false}
        correctPick={false}
      ></Game>
    );

    const homeTeamComponent = screen.getByTestId("homeTeam");

    const homeBackgroundColor =
      getComputedStyle(homeTeamComponent).backgroundColor;
    const homeOutline = getComputedStyle(homeTeamComponent).outline;

    const awayTeamComponent = screen.getByTestId("awayTeam");

    const awayBackgroundColor =
      getComputedStyle(awayTeamComponent).backgroundColor;
    const awayOutline = getComputedStyle(awayTeamComponent).outline;

    expect(homeBackgroundColor).toBe("");
    expect(homeOutline).toBe("");

    expect(awayBackgroundColor).toBe("");
    expect(awayOutline).toBe("");
  });

  test("Show pick scores", () => {
    render(
      <Game
        gameId="1234"
        readonly={false}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        showScores={true}
        onPick={handlePickMock}
        showResults={false}
        correctPick={false}
      ></Game>
    );

    const homeTeamScore = screen.getByTestId("homeTeamScore");

    const awayTeamScore = screen.getByTestId("awayTeamScore");

    expect(homeTeamScore.textContent).toBe(homeTeam.score);
    expect(awayTeamScore.textContent).toBe(awayTeam.score);
  });
});
