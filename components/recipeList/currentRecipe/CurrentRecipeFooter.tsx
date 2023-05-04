import React from "react";
import { useHookstate } from "@hookstate/core";
import { store } from "../../util/store";

const CurrentRecipeFooter = () => {
  const state = useHookstate(store);

  const listOfNotes = state.currentRecipe.notes.get().map((note) => {
    return <li key={note.id}>{note.text}</li>;
  });

  return (
    <div>
      Notes: <ol>{listOfNotes}</ol>
    </div>
  );
};

export default CurrentRecipeFooter;
