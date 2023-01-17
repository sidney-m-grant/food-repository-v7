import React from "react";
import { useHookstate } from "@hookstate/core";
import { Ingredient, IngredientBlock, store } from "../util/store";

interface Props {
  editIngredientBlock: IngredientBlock;
  editIngredient: Ingredient;
}

const RecipeEditIngredient: React.FC<Props> = ({
  editIngredientBlock,
  editIngredient,
}) => {
  const state = useHookstate(store);

  const handleChangeEditedAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[
      editIngredientBlock.blockNumber
    ].ingredients[editIngredient.id - 1].amount.set(e.target.value);
  };

  const handleChangeEditedUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[
      editIngredientBlock.blockNumber
    ].ingredients[editIngredient.id - 1].unit.set(e.target.value);
  };

  const handleChangeEditedName = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[
      editIngredientBlock.blockNumber
    ].ingredients[editIngredient.id - 1].name.set(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleChangeEditedAmount}
        value={state.editedRecipe.ingredientList[
          editIngredientBlock.blockNumber
        ].ingredients[editIngredient.id - 1].amount.get()}
      ></input>
      <input
        onChange={handleChangeEditedUnit}
        value={state.editedRecipe.ingredientList[
          editIngredientBlock.blockNumber
        ].ingredients[editIngredient.id - 1].unit.get()}
      ></input>
      <input
        onChange={handleChangeEditedName}
        value={state.editedRecipe.ingredientList[
          editIngredientBlock.blockNumber
        ].ingredients[editIngredient.id - 1].name.get()}
      ></input>
    </div>
  );
};

export default RecipeEditIngredient;
