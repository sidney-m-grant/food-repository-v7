import React from "react";
import { Note, store } from "../util/store";
import { useHookstate } from "@hookstate/core";

interface Props {
  note: Note;
}

const RecipeEditNote: React.FC<Props> = ({ note }) => {
  const state = useHookstate(store);

  const handleChangeNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.notes[note.id].text.set(e.target.value);
  };

  return (
    <textarea
      onChange={handleChangeNote}
      value={state.editedRecipe.notes[note.id].text.get()}
    ></textarea>
  );
};

export default RecipeEditNote;
