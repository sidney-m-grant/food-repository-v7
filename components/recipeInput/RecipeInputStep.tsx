import React from "react";
import { useHookstate } from "@hookstate/core";
import { StepBlock, store, RecipeStep } from "../util/store";

interface Props {
  inputStep: RecipeStep;
  inputStepBlock: StepBlock;
}

const RecipeInputStep: React.FC<Props> = ({ inputStep, inputStepBlock }) => {
  const state = useHookstate(store);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
      inputStep.stepNumber - 1
    ].stepText.set(e.target.value);
  };
  return (
    <input
      onChange={handleChange}
      value={state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
        inputStep.stepNumber - 1
      ].stepText.get()}
    ></input>
  );
};

export default RecipeInputStep;
