import React from "react";
import { store } from "../util/store";
import { useHookstate, none } from "@hookstate/core";
import RecipeEditIngredient from "./RecipeEditIngredient";

interface Props {
  editIngredientBlock: any;
}

const RecipeEditIngredientBlock: React.FC<Props> = ({
  editIngredientBlock,
}) => {
  const state = useHookstate(store);

  const listOfIngredients = editIngredientBlock.ingredients.map(
    (ingredient: any) => {
      return (
        <li key={ingredient.id}>
          <RecipeEditIngredient
            editIngredient={ingredient}
            editIngredientBlock={editIngredientBlock}
            key={ingredient.id}
          />
        </li>
      );
    }
  );

  const handleAddIngredient = () => {
    const length =
      state.editedRecipe.ingredientList[editIngredientBlock.blockNumber]
        .ingredients.length;
    state.editedRecipe.ingredientList[
      editIngredientBlock.blockNumber
    ].ingredients[length].set({
      amount: "",
      name: "",
      unit: "",
      id: length + 1,
    });
  };

  const handleDeleteLastIngredient = () => {
    const length =
      state.editedRecipe.ingredientList[editIngredientBlock.blockNumber]
        .ingredients.length - 1;
    if (length === 0) {
      return;
    }
    state.editedRecipe.ingredientList[
      editIngredientBlock.blockNumber
    ].ingredients[length].set(none);
  };

  const handleEditedForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[editIngredientBlock.blockNumber].for.set(
      e.target.value
    );
  };
  return (
    <div>
      <div>
        <input
          onChange={handleEditedForChange}
          value={state.editedRecipe.ingredientList[
            editIngredientBlock.blockNumber
          ].for.get()}
        ></input>
      </div>
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleDeleteLastIngredient}>Delete Ingredient</button>
      <ol>{listOfIngredients}</ol>
    </div>
  );
};

export default RecipeEditIngredientBlock;
