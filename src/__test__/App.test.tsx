import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../App";
import { FormButton } from "../components/Form/FormButton";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<FormButton text="HI" onClick={() => null} />);

  expect(true).toBeTruthy();
});

test("Renders App", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
