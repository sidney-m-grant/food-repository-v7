import React from "react";
import { useHookstate, none } from "@hookstate/core";
import { store } from "../util/store";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import RecipeInputStepBlock from "./RecipeInputStepBlock";
import RecipeInputIngredientBlock from "./RecipeInputIngredientBlock";

export const Main_Input_Component = styled.div`
  border: 1px;
  border-style: solid;
  display: grid;
  grid-template-columns: 1 fr 2fr;
`;

export const Input_Ingredient_Block = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 1 / 2;
`;

export const Input_Step_Block = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 2;
`;

const RecipeInputMainContainer = () => {
  const state = useHookstate(store);
  const { user } = useAuth();

  const listInputStepBlocks = state.inputRecipe.stepList
    .get()
    .map((stepBlock) => {
      return (
        <li key={stepBlock.blockNumber}>
          <RecipeInputStepBlock
            inputStepBlock={stepBlock}
            key={stepBlock.blockNumber}
          />
        </li>
      );
    });
  const listInputIngredientBlocks = state.inputRecipe.ingredientList
    .get()
    .map((ingredientBlock) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <RecipeInputIngredientBlock
            inputIngredientBlock={ingredientBlock}
            key={ingredientBlock.blockNumber}
          />
        </li>
      );
    });

  return (
    <Main_Input_Component>
      <Input_Ingredient_Block>
        {listInputIngredientBlocks}
      </Input_Ingredient_Block>
      <Input_Step_Block>{listInputStepBlocks}</Input_Step_Block>
    </Main_Input_Component>
  );
};

export default RecipeInputMainContainer;
