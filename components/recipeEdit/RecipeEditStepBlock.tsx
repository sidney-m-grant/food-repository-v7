import React from "react";
import { store } from "../util/store";
import { useHookstate, none } from "@hookstate/core";
import RecipeEditStep from "./RecipeEditStep";

interface Props {
  editStepBlock: any;
}

const RecipeEditStepBlock: React.FC<Props> = ({ editStepBlock }) => {
  const state = useHookstate(store);

  const listOfRecipeSteps = editStepBlock.steps.map((recipeStep: any) => {
    return (
      <li key={recipeStep.stepNumber}>
        <RecipeEditStep
          editStep={recipeStep}
          editStepBlock={editStepBlock}
          key={recipeStep.stepNumber}
        />
      </li>
    );
  });

  const handleAddStep = () => {
    const length =
      state.editedRecipe.stepList[editStepBlock.blockNumber].steps.length;
    state.editedRecipe.stepList[editStepBlock.blockNumber].steps[length].set({
      stepNumber: length + 1,
      stepText: "",
    });
  };

  const handleDeleteLastStep = () => {
    const length =
      state.editedRecipe.stepList[editStepBlock.blockNumber].steps.length - 1;
    if (length === 0) {
      return;
    }
    state.editedRecipe.stepList[editStepBlock.blockNumber].steps[length].set(
      none
    );
  };

  const handleEditForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.stepList[editStepBlock.blockNumber].for.set(
      e.target.value
    );
  };

  return (
    <div>
      <input
        onChange={handleEditForChange}
        value={state.editedRecipe.stepList[editStepBlock.blockNumber].for.get()}
      ></input>
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={handleDeleteLastStep}>Delete Step</button>
      <ol>{listOfRecipeSteps}</ol>
    </div>
  );
};

export default RecipeEditStepBlock;
