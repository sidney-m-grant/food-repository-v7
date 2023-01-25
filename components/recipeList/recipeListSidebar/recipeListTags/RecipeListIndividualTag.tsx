import React from "react";
import { Recipe } from "../../../util/store";
import RecipeListComponent from "../RecipeListComponent";

interface Props {
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  allRecipes: Recipe[];
  selectedTag: string;
}

const RecipeListIndividualTag: React.FC<Props> = ({
  setSelectedTag,
  tag,
  allRecipes,
  selectedTag,
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
        <RecipeListComponent recipes={listOfRecipes}></RecipeListComponent>
      ) : null}
    </>
  );
};

export default RecipeListIndividualTag;
