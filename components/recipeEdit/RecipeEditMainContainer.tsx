import React from "react";
import { useHookstate } from "@hookstate/core";
import { store } from "../util/store";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import RecipeEditIngredientBlock from "./RecipeEditIngredientBlock";
import RecipeEditStepBlock from "./RecipeEditStepBlock";

export const Main_Edit_Component = styled.div`
  border: 1px;
  border-style: solid;
  display: grid;
  grid-template-columns: 1 fr 2fr;
`;

export const Edit_Ingredient_Block = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 1 / 2;
`;

export const Edit_Step_Block = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 2;
`;

const RecipeEditMainContainer = () => {
  const state = useHookstate(store);
  const { user } = useAuth();

  const listEditStepBlocks = state.editedRecipe.stepList
    .get()
    .map((stepBlock) => {
      return (
        <li key={stepBlock.blockNumber}>
          <RecipeEditStepBlock
            editStepBlock={stepBlock}
            key={stepBlock.blockNumber}
          />
        </li>
      );
    });

  const listEditIngredientBlocks = state.editedRecipe.ingredientList
    .get()
    .map((ingredientBlock) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <RecipeEditIngredientBlock
            editIngredientBlock={ingredientBlock}
            key={ingredientBlock.blockNumber}
          />
        </li>
      );
    });

  return (
    <Main_Edit_Component>
      <Edit_Ingredient_Block>{listEditIngredientBlocks}</Edit_Ingredient_Block>
      <Edit_Step_Block>{listEditStepBlocks}</Edit_Step_Block>
    </Main_Edit_Component>
  );
};

export default RecipeEditMainContainer;
