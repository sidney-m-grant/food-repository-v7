import React from "react";
import { Recipe } from "../../../util/store";
import SocialRecipeListComponent from "../SocialRecipeListComponent";

interface Props {
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  allRecipes: Recipe[];
  selectedTag: string;
}

const SocialIndividualTag: React.FC<Props> = ({
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
        <SocialRecipeListComponent
          recipes={listOfRecipes}
        ></SocialRecipeListComponent>
      ) : null}
    </>
  );
};

export default SocialIndividualTag;
