import React from "react";
import { useHookstate } from "@hookstate/core";
import { store } from "../../util/store";

const SocialCurrentRecipeFooter = () => {
  const state = useHookstate(store);

  const listOfNotes = state.socialRecipe.notes.get().map((note) => {
    return <li key={note.id}>{note.text}</li>;
  });

  return (
    <div>
      Notes: <ol>{listOfNotes}</ol>
    </div>
  );
};

export default SocialCurrentRecipeFooter;
