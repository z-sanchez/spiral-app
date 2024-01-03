import "@testing-library/jest-dom";
import * as recoil from "recoil";
import { userPicksStateMock } from "./fixtures/userPicksStateMock";
import { Firestore } from "firebase/firestore";
import { userMock } from "./fixtures/userMock";
import { usePicks } from "../hooks/usePicks";
import { renderHook } from "@testing-library/react";

//prevent this import from trying to read env variables
jest.mock("../utils/constants", () => ({
  NO_PICK: "no pick",
}));

jest.mock("recoil", () => ({
  //only want to mock a few functions
  ...jest.requireActual("recoil"),
  useSetRecoilState: jest.fn(),
  useRecoilState: jest.fn(),
  useRecoilValue: jest.fn(),
}));

//module returns some objects
jest.mock("../hooks/useGameSchedule", () => ({
  //this object is function that returns more objects
  useGameSchedule: () => ({
    currentWeekGames: [],
    currentWeekId: 0,
    currentWeekNumber: 0,
  }),
}));

//external dependecies we can just mock
jest.mock("../utils/helpers/updatePicks", () => ({
  updatePicks: jest.fn(),
}));

//external dependecies we can just mock
jest.mock("../firebase/updateUserPicks", () => ({
  updateUserPicks: jest.fn(),
}));

describe("usePicks Hook", () => {
  //arrange
  //unit test for getting number of missing picks
  test("Hook inititalizes", () => {
    (
      recoil.useRecoilValue as jest.MockedFunction<typeof recoil.useRecoilValue>
    ).mockReturnValueOnce({} as Firestore);

    (
      recoil.useRecoilValue as jest.MockedFunction<typeof recoil.useRecoilValue>
    ).mockReturnValueOnce(userMock);

    (
      recoil.useRecoilState as jest.MockedFunction<typeof recoil.useRecoilState>
    ).mockReturnValueOnce([userPicksStateMock, jest.fn()]);

    const result = renderHook(() => usePicks());

    expect(result).toBeTruthy();
  });
});
