import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders FreshMart home page", () => {
  render(<App />);
  expect(screen.getByText(/FreshMart/i)).toBeInTheDocument();
});
