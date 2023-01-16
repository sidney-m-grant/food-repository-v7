import React from "react";
import { useHookstate } from "@hookstate/core";
import { store, Ingredient, IngredientBlock } from "../util/store";

interface Props {
  inputIngredient: Ingredient;
  inputIngredientBlock: IngredientBlock;
}

const RecipeInputIngredient: React.FC<Props> = ({
  inputIngredient,
  inputIngredientBlock,
}) => {
  const state = useHookstate(store);

  const handleChangeInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].amount.set(e.target.value);
  };

  const handleChangeInputUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].unit.set(e.target.value);
  };

  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].name.set(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleChangeInputAmount}
        value={state.inputRecipe.ingredientList[
          inputIngredientBlock.blockNumber
        ].ingredients[inputIngredient.id - 1].amount.get()}
      ></input>
      <input
        onChange={handleChangeInputUnit}
        value={state.inputRecipe.ingredientList[
          inputIngredientBlock.blockNumber
        ].ingredients[inputIngredient.id - 1].unit.get()}
      ></input>
      <input
        onChange={handleChangeInputName}
        value={state.inputRecipe.ingredientList[
          inputIngredientBlock.blockNumber
        ].ingredients[inputIngredient.id - 1].name.get()}
      ></input>
    </div>
  );
};

export default RecipeInputIngredient;
