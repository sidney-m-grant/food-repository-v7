import React from "react";
import { Recipe } from "../../util/store";
import RecipeEditIndividualRecipe from "./RecipeEditIndividualRecipe";
import styled from "styled-components";

interface Props {
  recipes: Recipe[];
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const Recipe_List = styled.ul`
  border: 1px;
  border-style: solid;
`;
const RecipeEditListComponent: React.FC<Props> = ({
  recipes,
  setTempImageFile,
}) => {
  const listRecipes = recipes.map((recipe) => {
    return (
      <li key={recipes.indexOf(recipe)}>
        <RecipeEditIndividualRecipe
          key={recipes.indexOf(recipe)}
          recipe={recipe}
          setTempImageFile={setTempImageFile}
        />
      </li>
    );
  });

  return <Recipe_List>{listRecipes}</Recipe_List>;
};

export default RecipeEditListComponent;
