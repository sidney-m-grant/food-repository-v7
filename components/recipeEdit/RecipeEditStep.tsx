import React from "react";
import { useHookstate } from "@hookstate/core";
import { StepBlock, store, RecipeStep } from "../util/store";

interface Props {
  editStep: RecipeStep;
  editStepBlock: StepBlock;
}

const RecipeEditStep: React.FC<Props> = ({ editStep, editStepBlock }) => {
  const state = useHookstate(store);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.stepList[editStepBlock.blockNumber].steps[
      editStep.stepNumber - 1
    ].stepText.set(e.target.value);
  };
  return (
    <input
      onChange={handleChange}
      value={state.editedRecipe.stepList[editStepBlock.blockNumber].steps[
        editStep.stepNumber - 1
      ].stepText.get()}
    ></input>
  );
};

export default RecipeEditStep;
