import React from "react";
import { useHookstate } from "@hookstate/core";
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

export const Input_Ingredient_List = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 1 / 2;
  padding: 20px;
`;

export const Input_Step_List = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 2;
  padding: 20px;
`;

const Input_Step_Block = styled.li`
  padding: 5px;
`;

const Input_Ingredient_Block = styled.li`
  padding: 5px;
`;

const RecipeInputMainContainer = () => {
  const state = useHookstate(store);
  const { user } = useAuth();

  const listInputStepBlocks = state.inputRecipe.stepList
    .get()
    .map((stepBlock) => {
      return (
        <Input_Step_Block key={stepBlock.blockNumber}>
          <RecipeInputStepBlock
            inputStepBlock={stepBlock}
            key={stepBlock.blockNumber}
          />
        </Input_Step_Block>
      );
    });
  const listInputIngredientBlocks = state.inputRecipe.ingredientList
    .get()
    .map((ingredientBlock) => {
      return (
        <Input_Ingredient_Block key={ingredientBlock.blockNumber}>
          <RecipeInputIngredientBlock
            inputIngredientBlock={ingredientBlock}
            key={ingredientBlock.blockNumber}
          />
        </Input_Ingredient_Block>
      );
    });

  return (
    <Main_Input_Component>
      <Input_Ingredient_List>{listInputIngredientBlocks}</Input_Ingredient_List>
      <Input_Step_List>{listInputStepBlocks}</Input_Step_List>
    </Main_Input_Component>
  );
};

export default RecipeInputMainContainer;
