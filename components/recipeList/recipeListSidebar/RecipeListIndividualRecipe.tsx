import React from "react";
import { Recipe, store } from "../../util/store";
import { useHookstate } from "@hookstate/core";

interface Props {
  recipe: Recipe;
}

const RecipeListIndividualRecipe: React.FC<Props> = ({ recipe }) => {
  const state = useHookstate(store);

  const handleClick = () => {
    state.currentRecipe.set(recipe);
  };

  return (
    <h5 style={{ display: "inline" }} onClick={handleClick}>
      {recipe.recipeName}
    </h5>
  );
};

export default RecipeListIndividualRecipe;
