import React from "react";
import CharactersList from "../CharactersList/CharactersList";
import Header from "../Header/Header";
import "./Characters.css";

export default function Characters() {
  return (
    <div className="characters">
      <Header title="Characters" />
      <CharactersList />
    </div>
  );
}
