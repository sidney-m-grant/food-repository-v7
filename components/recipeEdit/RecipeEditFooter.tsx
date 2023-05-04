import React from "react";
import { store } from "../util/store";
import { useHookstate } from "@hookstate/core";
import RecipeEditNote from "./RecipeEditNote";
import styled from "styled-components";

export const Recipe_Edit_Footer = styled.div`
  border: 1px;
  border-style: solid;
`;

const RecipeEditFooter = () => {
  const state = useHookstate(store);

  const listOfNotes = state.editedRecipe.notes.get().map((note) => {
    return (
      <li key={note.id}>
        <RecipeEditNote note={note} key={note.id}></RecipeEditNote>
      </li>
    );
  });

  return (
    <Recipe_Edit_Footer>
      Notes:
      <ol>{listOfNotes}</ol>
    </Recipe_Edit_Footer>
  );
};

export default RecipeEditFooter;
