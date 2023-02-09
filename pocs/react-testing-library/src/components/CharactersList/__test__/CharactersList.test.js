import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CHARACTERS } from "../../../hooks/useCharacters";
import CharactersList from "../CharactersList";
import { MemoryRouter } from "react-router-dom";

it("should render characters", async () => {
  const charactersMock = {
    request: {
      query: GET_CHARACTERS,
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            },
          ],
        },
      },
    },
  };
  render(
    <MockedProvider mocks={[charactersMock]} addTypename={false}>
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
});
