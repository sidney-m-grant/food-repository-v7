import React from "react";
import { useHookstate } from "@hookstate/core";
import { StepBlock, store, RecipeStep } from "../util/store";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  editStep: RecipeStep;
  editStepBlock: StepBlock;
}

const RecipeEditStep: React.FC<Props> = ({ editStep, editStepBlock }) => {
  const state = useHookstate(store);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    state.editedRecipe.stepList[editStepBlock.blockNumber].steps[
      editStep.stepNumber - 1
    ].stepText.set(e.target.value);
  };
  return (
    <TextareaAutosize
      onChange={handleChange}
      value={state.editedRecipe.stepList[editStepBlock.blockNumber].steps[
        editStep.stepNumber - 1
      ].stepText.get()}
      style={{ width: 500 }}
      maxRows={10}
      minRows={3}
    ></TextareaAutosize>
  );
};

export default RecipeEditStep;
