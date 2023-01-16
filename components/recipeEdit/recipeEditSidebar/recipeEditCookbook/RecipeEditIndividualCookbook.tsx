import React from "react";
import { Recipe } from "../../../util/store";
import RecipeEditListComponent from "../RecipeEditListComponent";

interface Props {
  setSelectedCookbook: React.Dispatch<React.SetStateAction<string>>;
  cookbook: string;
  allRecipes: Recipe[];
  selectedCookbook: string;
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const RecipeEditIndividualCookbook: React.FC<Props> = ({
  setSelectedCookbook,
  cookbook,
  allRecipes,
  selectedCookbook,
  setTempImageFile,
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
        <RecipeEditListComponent
          recipes={listOfRecipes}
          setTempImageFile={setTempImageFile}
        ></RecipeEditListComponent>
      ) : null}
    </>
  );
};

export default RecipeEditIndividualCookbook;
