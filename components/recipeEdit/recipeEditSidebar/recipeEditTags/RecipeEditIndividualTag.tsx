import React from "react";
import { Recipe } from "../../../util/store";
import RecipeEditListComponent from "../RecipeEditListComponent";

interface Props {
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  allRecipes: Recipe[];
  selectedTag: string;
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const RecipeEditIndividualTag: React.FC<Props> = ({
  setSelectedTag,
  tag,
  allRecipes,
  selectedTag,
  setTempImageFile,
}) => {
  const handleClick = () => {
    if (selectedTag === tag) {
      setSelectedTag("");
    } else {
      setSelectedTag(tag);
    }
  };

  const listOfRecipes = allRecipes.filter((recipe) =>
    recipe.tags.map((tag) => tag.text).includes(selectedTag)
  );

  return (
    <>
      <li onClick={handleClick}>{tag}</li>
      {selectedTag === tag ? (
        <RecipeEditListComponent
          setTempImageFile={setTempImageFile}
          recipes={listOfRecipes}
        ></RecipeEditListComponent>
      ) : null}
    </>
  );
};

export default RecipeEditIndividualTag;
