import React from "react";
import { store, StepBlock } from "../util/store";
import { useHookstate, none } from "@hookstate/core";
import RecipeInputStep from "./RecipeInputStep";

interface Props {
  inputStepBlock: any;
}

const RecipeInputStepBlock: React.FC<Props> = ({ inputStepBlock }) => {
  const state = useHookstate(store);

  const listOfRecipeSteps = inputStepBlock.steps.map((recipeStep: any) => {
    return (
      <li key={recipeStep.stepNumber}>
        <RecipeInputStep
          inputStep={recipeStep}
          inputStepBlock={inputStepBlock}
          key={recipeStep.stepNumber}
        />
      </li>
    );
  });

  const handleAddStep = () => {
    const length =
      state.inputRecipe.stepList[inputStepBlock.blockNumber].steps.length;
    state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[length].set({
      stepNumber: length + 1,
      stepText: "",
    });
  };

  const handleDeleteLastStep = () => {
    const length =
      state.inputRecipe.stepList[inputStepBlock.blockNumber].steps.length - 1;
    state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[length].set(
      none
    );
  };

  const handleInputForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.stepList[inputStepBlock.blockNumber].for.set(
      e.target.value
    );
  };

  return (
    <div>
      <input
        onChange={handleInputForChange}
        value={state.inputRecipe.stepList[inputStepBlock.blockNumber].for.get()}
      ></input>
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={handleDeleteLastStep}>Delete Step</button>
      <ol>{listOfRecipeSteps}</ol>
    </div>
  );
};

export default RecipeInputStepBlock;
