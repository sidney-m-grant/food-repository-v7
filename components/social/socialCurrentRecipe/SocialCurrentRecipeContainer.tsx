import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";
import SocialCurrentRecipeIngredientBlock from "./SocialCurrentRecipeIngredientBlock";
import SocialCurrentRecipeStepBlock from "./SocialCurrentRecipeStepBlock";

export const Social_Current_Recipe_Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const SocialCurrentRecipeContainer = () => {
  const state = useHookstate(store);

  const listIngredients = state.socialRecipe.ingredientList
    .get()
    .map((ingredientBlock: any) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <SocialCurrentRecipeIngredientBlock
            key={ingredientBlock.blockNumber}
            ingredientBlock={ingredientBlock}
          />
        </li>
      );
    });

  const listSteps = state.socialRecipe.stepList.get().map((stepBlock: any) => {
    return (
      <li key={stepBlock.blockNumber}>
        <SocialCurrentRecipeStepBlock
          key={stepBlock.blockNumber}
          stepBlock={stepBlock}
        />
      </li>
    );
  });
  return (
    <Social_Current_Recipe_Container>
      <ul>{listIngredients}</ul>
      <ul>{listSteps}</ul>
    </Social_Current_Recipe_Container>
  );
};

export default SocialCurrentRecipeContainer;
