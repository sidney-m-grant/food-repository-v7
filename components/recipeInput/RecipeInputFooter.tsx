import React from "react";
import { store } from "../util/store";
import { useHookstate } from "@hookstate/core";
import RecipeInputNote from "./RecipeInputNote";
import styled from "styled-components";

export const Recipe_Input_Footer = styled.div`
  border: 1px;
  border-style: solid;
`;

const RecipeInputFooter = () => {
  const state = useHookstate(store);

  const listOfNotes = state.inputRecipe.notes.get().map((note) => {
    return (
      <li key={note.id}>
        <RecipeInputNote note={note} key={note.id}></RecipeInputNote>
      </li>
    );
  });

  return (
    <Recipe_Input_Footer>
      Notes:
      <ol>{listOfNotes}</ol>
    </Recipe_Input_Footer>
  );
};

export default RecipeInputFooter;
