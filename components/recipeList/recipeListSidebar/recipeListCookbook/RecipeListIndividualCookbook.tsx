import React from "react";
import { Recipe } from "../../../util/store";
import RecipeListComponent from "../RecipeListComponent";

interface Props {
  setSelectedCookbook: React.Dispatch<React.SetStateAction<string>>;
  cookbook: string;
  allRecipes: Recipe[];
  selectedCookbook: string;
}

const RecipeListIndividualCookbook: React.FC<Props> = ({
  setSelectedCookbook,
  cookbook,
  allRecipes,
  selectedCookbook,
}) => {
  const handleClick = () => {
    if (selectedCookbook === cookbook) {
      setSelectedCookbook("");
    } else {
      setSelectedCookbook(cookbook);
    }
  };

  const listOfRecipes = allRecipes.filter(
    (recipe) => recipe.cookBook === selectedCookbook
  );

  return (
    <>
      <li onClick={handleClick}>{cookbook}</li>
      {selectedCookbook === cookbook ? (
        <RecipeListComponent recipes={listOfRecipes}></RecipeListComponent>
      ) : null}
    </>
  );
};

export default RecipeListIndividualCookbook;
