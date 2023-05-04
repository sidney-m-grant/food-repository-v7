import React from "react";
import { IngredientBlock, store } from "../../util/store";
import { useHookstate } from "@hookstate/core";

interface Props {
  ingredientBlock: IngredientBlock;
  multiplier: number;
}

const SocialCurrentRecipeIngredientBlock: React.FC<Props> = ({
  ingredientBlock,
  multiplier,
}) => {
  const state = useHookstate(store);

  const checkIngredientAmountsForNumbers = () => {
    for (let i = 0; i < state.currentRecipe.ingredientList.length; i++) {
      for (
        let j = 0;
        j < state.currentRecipe.ingredientList[i].ingredients.length;
        j++
      ) {
        if (
          !Number(
            state.currentRecipe.ingredientList[i].ingredients[j].amount.get()
          ) &&
          state.currentRecipe.ingredientList[i].ingredients[j].amount.get()
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const listIngredients = ingredientBlock.ingredients.map((ingredient) => {
    return (
      <li key={ingredient.id}>
        <h5>
          {!checkIngredientAmountsForNumbers()
            ? ingredient.amount
            : Number(ingredient.amount) * multiplier != 0
            ? Number(ingredient.amount) * multiplier
            : null}{" "}
          {ingredient.unit} {ingredient.name}
        </h5>
      </li>
    );
  });

  return (
    <ol>
      <h5>{ingredientBlock.for}</h5>
      {listIngredients}
    </ol>
  );
};

export default SocialCurrentRecipeIngredientBlock;
