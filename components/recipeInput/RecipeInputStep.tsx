import React from "react";
import { useHookstate } from "@hookstate/core";
import { StepBlock, store, RecipeStep } from "../util/store";
import styled from "styled-components";

const Step_Text_Area = styled.textarea`
  vertical-align: bottom;
`;

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
    <Step_Text_Area
      onChange={handleChange}
      value={state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
        inputStep.stepNumber - 1
      ].stepText.get()}
    ></Step_Text_Area>
  );
};

export default RecipeInputStep;
