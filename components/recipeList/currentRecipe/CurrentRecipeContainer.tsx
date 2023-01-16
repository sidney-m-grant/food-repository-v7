import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";
import CurrentRecipeIngredientBlock from "./CurrentRecipeIngredientBlock";
import CurrentRecipeStepBlock from "./CurrentRecipeStepBlock";

export const Current_Recipe_Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const CurrentRecipeContainer = () => {
  const state = useHookstate(store);

  const listIngredients = state.currentRecipe.ingredientList
    .get()
    .map((ingredientBlock: any) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <CurrentRecipeIngredientBlock
            key={ingredientBlock.blockNumber}
            ingredientBlock={ingredientBlock}
          />
        </li>
      );
    });

  const listSteps = state.currentRecipe.stepList.get().map((stepBlock: any) => {
    return (
      <li key={stepBlock.blockNumber}>
        <CurrentRecipeStepBlock
          key={stepBlock.blockNumber}
          stepBlock={stepBlock}
        />
      </li>
    );
  });
  return (
    <Current_Recipe_Container>
      <ul>{listIngredients}</ul>
      <ul>{listSteps}</ul>
    </Current_Recipe_Container>
  );
};

export default CurrentRecipeContainer;
