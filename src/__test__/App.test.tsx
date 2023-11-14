import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { FormButton } from "../components/Form/FormButton";
import { Record } from "../types/Record";
import { Picks } from "../types/Picks";

const picksObject: Picks = [
  {
    games: [
      {
        winner: "PHI",
        id: "401547410",
        pick: "PHI",
      },
      {
        winner: "ATL",
        id: "401547417",
        pick: "GB",
      },
      {
        winner: "BUF",
        id: "401547411",
        pick: "BUF",
      },
      {
        winner: "BAL",
        pick: "CIN",
        id: "401547412",
      },
      {
        id: "401547418",
        pick: "SEA",
        winner: "SEA",
      },
      {
        id: "401547414",
        pick: "LAC",
        winner: "TEN",
      },
      {
        id: "401547420",
        winner: "TB",
        pick: "TB",
      },
      {
        id: "401547413",
        winner: "KC",
        pick: "KC",
      },
      {
        pick: "IND",
        winner: "IND",
        id: "401547419",
      },
      {
        id: "401547422",
        winner: "SF",
        pick: "SF",
      },
      {
        id: "401547421",
        winner: "NYG",
        pick: "ARI",
      },
      {
        winner: "DAL",
        pick: "DAL",
        id: "401547415",
      },
      {
        winner: "WSH",
        id: "401547416",
        pick: "DEN",
      },
      {
        id: "401547423",
        winner: "MIA",
        pick: "MIA",
      },
      {
        pick: "CAR",
        winner: "NO",
        id: "401547425",
      },
      {
        id: "401547424",
        pick: "CLE",
        winner: "PIT",
      },
    ],
    record: {
      loses: 7,
      wins: 9,
      ties: 0,
    },
    id: "222023",
    completed: true,
  },
  {
    id: "232023",
    completed: true,
    games: [
      {
        id: "401547426",
        winner: "SF",
        pick: "SF",
      },
      {
        id: "401547428",
        winner: "CLE",
        pick: "TEN",
      },
      {
        id: "401547433",
        winner: "DET",
        pick: "ATL",
      },
      {
        pick: "NO",
        id: "401547434",
        winner: "GB",
      },
      {
        winner: "MIA",
        id: "401547429",
        pick: "MIA",
      },
      {
        id: "401547436",
        pick: "MIN",
        winner: "LAC",
      },
      {
        winner: "NE",
        id: "401547430",
        pick: "NYJ",
      },
      {
        id: "401547431",
        winner: "BUF",
        pick: "BUF",
      },
      {
        id: "401547435",
        winner: "HOU",
        pick: "JAX",
      },
      {
        winner: "IND",
        pick: "BAL",
        id: "401547427",
      },
      {
        winner: "SEA",
        id: "401547432",
        pick: "SEA",
      },
      {
        winner: "KC",
        id: "401547438",
        pick: "KC",
      },
      {
        pick: "DAL",
        id: "401547437",
        winner: "ARI",
      },
      {
        pick: "LV",
        winner: "PIT",
        id: "401547439",
      },
      {
        pick: "PHI",
        id: "401547440",
        winner: "PHI",
      },
      {
        winner: "CIN",
        id: "401547441",
        pick: "LAR",
      },
    ],
    record: {
      wins: 6,
      ties: 0,
      loses: 10,
    },
  },
  {
    record: {
      loses: 16,
      wins: 0,
      ties: 0,
    },
    id: "242023",
    completed: true,
    games: [
      {
        winner: "DET",
        id: "401547442",
        pick: "no pick",
      },
      {
        winner: "JAX",
        pick: "no pick",
        id: "401547227",
      },
      {
        id: "401547443",
        winner: "BUF",
        pick: "no pick",
      },
      {
        winner: "DEN",
        id: "401547444",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "BAL",
        id: "401547445",
      },
      {
        pick: "no pick",
        id: "401547452",
        winner: "TEN",
      },
      {
        pick: "no pick",
        id: "401547449",
        winner: "LAR",
      },
      {
        id: "401547450",
        winner: "TB",
        pick: "no pick",
      },
      {
        pick: "no pick",
        id: "401547451",
        winner: "PHI",
      },
      {
        pick: "no pick",
        winner: "MIN",
        id: "401547448",
      },
      {
        pick: "no pick",
        winner: "HOU",
        id: "401547446",
      },
      {
        id: "401547447",
        pick: "no pick",
        winner: "LAC",
      },
      {
        winner: "DAL",
        pick: "no pick",
        id: "401547453",
      },
      {
        id: "401547454",
        pick: "no pick",
        winner: "SF",
      },
      {
        winner: "KC",
        id: "401547455",
        pick: "no pick",
      },
      {
        winner: "SEA",
        pick: "no pick",
        id: "401547456",
      },
    ],
  },
  {
    completed: true,
    games: [
      {
        pick: "no pick",
        winner: "CHI",
        id: "401547457",
      },
      {
        pick: "no pick",
        winner: "ATL",
        id: "401547463",
      },
      {
        winner: "DET",
        pick: "no pick",
        id: "401547464",
      },
      {
        id: "401547458",
        pick: "no pick",
        winner: "IND",
      },
      {
        winner: "MIA",
        id: "401547465",
        pick: "no pick",
      },
      {
        pick: "no pick",
        id: "401547459",
        winner: "NO",
      },
      {
        pick: "no pick",
        winner: "PIT",
        id: "401547460",
      },
      {
        winner: "JAX",
        id: "401547228",
        pick: "no pick",
      },
      {
        id: "401547467",
        winner: "PHI",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "CIN",
        id: "401547466",
      },
      {
        winner: "NYJ",
        pick: "no pick",
        id: "401547461",
      },
      {
        id: "401547462",
        winner: "KC",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "SF",
        id: "401547354",
      },
      {
        id: "401547468",
        pick: "no pick",
        winner: "LV",
      },
    ],
    id: "252023",
    record: {
      ties: 0,
      wins: 0,
      loses: 14,
    },
  },
  {
    record: {
      ties: 0,
      loses: 15,
      wins: 0,
    },
    id: "262023",
    games: [
      {
        id: "401547469",
        winner: "KC",
        pick: "no pick",
      },
      {
        winner: "LV",
        id: "401547474",
        pick: "no pick",
      },
      {
        id: "401547479",
        pick: "no pick",
        winner: "LAR",
      },
      {
        id: "401547480",
        pick: "no pick",
        winner: "NYJ",
      },
      {
        id: "401547478",
        pick: "no pick",
        winner: "DET",
      },
      {
        pick: "no pick",
        id: "401547229",
        winner: "BAL",
      },
      {
        pick: "no pick",
        id: "401547470",
        winner: "WSH",
      },
      {
        pick: "no pick",
        winner: "MIN",
        id: "401547475",
      },
      {
        id: "401547471",
        winner: "CIN",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "CLE",
        id: "401547476",
      },
      {
        id: "401547473",
        pick: "no pick",
        winner: "MIA",
      },
      {
        winner: "JAX",
        pick: "no pick",
        id: "401547472",
      },
      {
        pick: "no pick",
        id: "401547477",
        winner: "HOU",
      },
      {
        pick: "no pick",
        id: "401547481",
        winner: "BUF",
      },
      {
        id: "401547482",
        pick: "no pick",
        winner: "DAL",
      },
    ],
    completed: true,
  },
  {
    id: "272023",
    record: {
      loses: 13,
      wins: 0,
      ties: 0,
    },
    completed: true,
    games: [
      {
        winner: "JAX",
        id: "401547483",
        pick: "no pick",
      },
      {
        pick: "no pick",
        id: "401547490",
        winner: "CHI",
      },
      {
        id: "401547484",
        winner: "CLE",
        pick: "no pick",
      },
      {
        id: "401547485",
        winner: "NE",
        pick: "no pick",
      },
      {
        winner: "NYG",
        pick: "no pick",
        id: "401547486",
      },
      {
        winner: "ATL",
        pick: "no pick",
        id: "401547491",
      },
      {
        winner: "BAL",
        id: "401547489",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "PIT",
        id: "401547492",
      },
      {
        pick: "no pick",
        winner: "SEA",
        id: "401547493",
      },
      {
        winner: "DEN",
        pick: "no pick",
        id: "401547487",
      },
      {
        pick: "no pick",
        winner: "KC",
        id: "401547488",
      },
      {
        pick: "no pick",
        id: "401547494",
        winner: "PHI",
      },
      {
        id: "401547495",
        pick: "no pick",
        winner: "MIN",
      },
    ],
  },
  {
    completed: true,
    record: {
      loses: 16,
      ties: 0,
      wins: 0,
    },
    id: "282023",
    games: [
      {
        id: "401547496",
        pick: "no pick",
        winner: "BUF",
      },
      {
        id: "401547505",
        winner: "DAL",
        pick: "no pick",
      },
      {
        id: "401547506",
        winner: "MIN",
        pick: "no pick",
      },
      {
        winner: "TEN",
        id: "401547500",
        pick: "no pick",
      },
      {
        winner: "NO",
        pick: "no pick",
        id: "401547507",
      },
      {
        winner: "MIA",
        id: "401547497",
        pick: "no pick",
      },
      {
        id: "401547498",
        pick: "no pick",
        winner: "NYJ",
      },
      {
        winner: "JAX",
        id: "401547499",
        pick: "no pick",
      },
      {
        winner: "PHI",
        id: "401547508",
        pick: "no pick",
      },
      {
        winner: "CAR",
        pick: "no pick",
        id: "401547504",
      },
      {
        id: "401547509",
        winner: "SEA",
        pick: "no pick",
      },
      {
        id: "401547502",
        winner: "DEN",
        pick: "no pick",
      },
      {
        id: "401547501",
        pick: "no pick",
        winner: "BAL",
      },
      {
        id: "401547503",
        winner: "CIN",
        pick: "no pick",
      },
      {
        winner: "LAC",
        id: "401547510",
        pick: "no pick",
      },
      {
        winner: "DET",
        pick: "no pick",
        id: "401547511",
      },
    ],
  },
  {
    record: {
      loses: 14,
      ties: 0,
      wins: 0,
    },
    id: "292023",
    completed: true,
    games: [
      {
        winner: "PIT",
        pick: "no pick",
        id: "401547512",
      },
      {
        winner: "KC",
        id: "401547230",
        pick: "no pick",
      },
      {
        id: "401547518",
        pick: "no pick",
        winner: "MIN",
      },
      {
        winner: "CLE",
        id: "401547514",
        pick: "no pick",
      },
      {
        id: "401547519",
        pick: "no pick",
        winner: "GB",
      },
      {
        winner: "WSH",
        pick: "no pick",
        id: "401547520",
      },
      {
        winner: "NO",
        id: "401547516",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "BAL",
        id: "401547513",
      },
      {
        winner: "HOU",
        pick: "no pick",
        id: "401547515",
      },
      {
        pick: "no pick",
        winner: "IND",
        id: "401547517",
      },
      {
        pick: "no pick",
        id: "401547521",
        winner: "LV",
      },
      {
        winner: "PHI",
        pick: "no pick",
        id: "401547522",
      },
      {
        id: "401547523",
        pick: "no pick",
        winner: "CIN",
      },
      {
        pick: "no pick",
        winner: "LAC",
        id: "401547524",
      },
    ],
  },
  {
    id: "2102023",
    record: {
      ties: 0,
      loses: 14,
      wins: 0,
    },
    games: [
      {
        pick: "no pick",
        id: "401547525",
        winner: "CHI",
      },
      {
        pick: "no pick",
        id: "401547231",
        winner: "IND",
      },
      {
        id: "401547526",
        pick: "no pick",
        winner: "HOU",
      },
      {
        winner: "MIN",
        id: "401547533",
        pick: "no pick",
      },
      {
        id: "401547527",
        pick: "no pick",
        winner: "PIT",
      },
      {
        winner: "TB",
        id: "401547528",
        pick: "no pick",
      },
      {
        winner: "SF",
        id: "401547532",
        pick: "no pick",
      },
      {
        pick: "no pick",
        winner: "CLE",
        id: "401547531",
      },
      {
        pick: "no pick",
        id: "401547529",
        winner: "ARI",
      },
      {
        id: "401547530",
        winner: "DET",
        pick: "no pick",
      },
      {
        winner: "DAL",
        pick: "no pick",
        id: "401547534",
      },
      {
        winner: "SEA",
        pick: "no pick",
        id: "401547535",
      },
      {
        pick: "no pick",
        id: "401547536",
        winner: "LV",
      },
      {
        id: "401547537",
        pick: "no pick",
        winner: "DEN",
      },
    ],
    completed: true,
  },
];

const getCurrentWeekRecord = (picks: Picks, currentWeekId: string): Record => {
  return (
    picks.find((weekPicks) => weekPicks.id === currentWeekId)?.record || {
      wins: 0,
      loses: 0,
      ties: 0,
    }
  );
};

const weekRecord = getCurrentWeekRecord(picksObject, "2102023");

//this solves the jest-vite incompatibility when using import.meta.env
jest.mock("../utils/constants", () => ({
  ENV_VARIABLES: {
    useMockData: true,
  },
}));

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<FormButton text="HI" onClick={() => null} />);

  expect(true).toBeTruthy();
});

describe("Get Current Week Records Test", () => {
  test("Get Current Week Record Wins", () => {
    expect(weekRecord.wins).toBe(3);
  });

  test("Get Current Week Record Ties", () => {
    expect(weekRecord.ties).toBe(2);
  });

  test("Get Current Week Record Losses", () => {
    expect(weekRecord.loses).toBe(14);
  });
});
