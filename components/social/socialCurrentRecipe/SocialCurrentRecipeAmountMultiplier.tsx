import React from "react";
import { useHookstate } from "@hookstate/core";
import { store } from "../../util/store";

interface Props {
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
}

const SocialCurrentRecipeAmountMultiplier: React.FC<Props> = ({
  setMultiplier,
}) => {
  const state = useHookstate(store);

  const checkIngredientAmountsForNumbers = () => {
    for (let i = 0; i < state.socialRecipe.ingredientList.length; i++) {
      for (
        let j = 0;
        j < state.socialRecipe.ingredientList[i].ingredients.length;
        j++
      ) {
        if (
          !Number(
            state.socialRecipe.ingredientList[i].ingredients[j].amount.get()
          ) &&
          state.socialRecipe.ingredientList[i].ingredients[j].amount.get()
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const handle1xClick = () => {
    setMultiplier(1);
  };

  const handle2xClick = () => {
    setMultiplier(2);
  };

  const handle3xClick = () => {
    setMultiplier(3);
  };

  if (checkIngredientAmountsForNumbers()) {
    return (
      <div>
        <button onClick={handle1xClick}>1x</button>
        <button onClick={handle2xClick}>2x</button>
        <button onClick={handle3xClick}>3x</button>
      </div>
    );
  }
  return (
    <div>All ingredient amounts must be numbers to use batch multipliers</div>
  );
};

export default SocialCurrentRecipeAmountMultiplier;
