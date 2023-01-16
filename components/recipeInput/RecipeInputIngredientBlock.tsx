import React from "react";
import { IngredientBlock, store } from "../util/store";
import { useHookstate, none } from "@hookstate/core";
import RecipeInputIngredient from "./RecipeInputIngredient";

interface Props {
  inputIngredientBlock: any;
}

const RecipeInputIngredientBlock: React.FC<Props> = ({
  inputIngredientBlock,
}) => {
  const state = useHookstate(store);

  const listOfIngredients = inputIngredientBlock.ingredients.map(
    (ingredient: any) => {
      return (
        <li key={ingredient.id}>
          <RecipeInputIngredient
            inputIngredient={ingredient}
            inputIngredientBlock={inputIngredientBlock}
            key={ingredient.id}
          />
        </li>
      );
    }
  );

  const handleAddIngredient = () => {
    const length =
      state.inputRecipe.ingredientList[inputIngredientBlock.blockNumber]
        .ingredients.length;
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[length].set({
      amount: "",
      name: "",
      unit: "",
      id: length + 1,
    });
  };

  const handleDeleteLastIngredient = () => {
    const length =
      state.inputRecipe.ingredientList[inputIngredientBlock.blockNumber]
        .ingredients.length - 1;
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[length].set(none);
  };

  const handleInputForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[inputIngredientBlock.blockNumber].for.set(
      e.target.value
    );
  };

  return (
    <div>
      <div>
        <input
          onChange={handleInputForChange}
          value={state.inputRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].for.get()}
        ></input>
      </div>
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleDeleteLastIngredient}>Delete Ingredient</button>
      <ol>{listOfIngredients}</ol>
    </div>
  );
};

export default RecipeInputIngredientBlock;
