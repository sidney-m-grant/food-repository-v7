import React from "react";
import { Recipe, store } from "../../util/store";
import { useHookstate } from "@hookstate/core";

interface Props {
  recipe: Recipe;
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const RecipeEditIndividualRecipe: React.FC<Props> = ({
  recipe,
  setTempImageFile,
}) => {
  const state = useHookstate(store);

  const handleClick = () => {
    state.editedRecipe.set(recipe);
    state.editedImagePreview.set(recipe.imgPath);
    setTempImageFile(null);
  };

  return (
    <h5 style={{ display: "inline" }} onClick={handleClick}>
      {recipe.recipeName}
    </h5>
  );
};

export default RecipeEditIndividualRecipe;
