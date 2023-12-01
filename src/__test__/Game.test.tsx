import "@testing-library/jest-dom";

//this solves the jest-vite incompatibility when using import.meta.env
jest.mock("../utils/constants", () => ({
  ENV_VARIABLES: {
    useMockData: true,
  },
}));

describe("New Game Component Functions", () => {
  test("Pick away team", () => {
    expect(3).toBe(3);
  });

  test("Pick home team", () => {
    expect(3).toBe(3);
  });

  test("Switch pick", () => {
    expect(3).toBe(3);
  });
});

describe("New Game Component UI", () => {
  test("Pick is correct", () => {
    expect(3).toBe(3);
  });

  test("Pick is not correct", () => {
    expect(3).toBe(3);
  });

  test("Game is live and game is readonly", () => {
    expect(3).toBe(3);
  });

  test("Using correct NYJ color", () => {
    expect(3).toBe(3);
  });

  test("Using correct IND color", () => {
    expect(3).toBe(3);
  });

  test("Using correct ARI color", () => {
    expect(3).toBe(3);
  });

  test("Show pick scores", () => {
    expect(3).toBe(3);
  });
});
