import React from "react";
import { useHookstate } from "@hookstate/core";
import { StepBlock, store, RecipeStep } from "../util/store";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  inputStep: RecipeStep;
  inputStepBlock: StepBlock;
}

const RecipeInputStep: React.FC<Props> = ({ inputStep, inputStepBlock }) => {
  const state = useHookstate(store);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
      inputStep.stepNumber - 1
    ].stepText.set(e.target.value);
  };
  return (
    <TextareaAutosize
      onChange={handleChange}
      value={state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
        inputStep.stepNumber - 1
      ].stepText.get()}
      style={{ width: 500 }}
      maxRows={10}
      minRows={3}
    ></TextareaAutosize>
  );
};

export default RecipeInputStep;
