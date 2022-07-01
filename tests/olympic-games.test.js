import { render } from "@testing-library/react";
import { List } from "../components/List";

const mockOlympicGames = [
  { name: "Athens 1896" },
  { name: "Paris 1900" },
  { name: "St. Louis 1904" },
  { name: "London 1908" },
  { name: "Stockholm 1912" },
  { name: "Antwerp 1920" },
  { name: "Chamonix 1924" },
];

describe("Olympic Games page", () => {
  test("a list of olympic games should be displayed", () => {
    const screen = render(<List items={mockOlympicGames} />);
    const firstOlympicGame = screen.queryByText('Athens 1896', {
      exact: false,
    });
    expect(firstOlympicGame).toBeInTheDocument();
  });
});
