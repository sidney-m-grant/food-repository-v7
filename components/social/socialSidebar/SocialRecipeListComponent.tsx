import React from "react";
import { Recipe } from "../../util/store";
import SocialIndividualRecipe from "./SocialIndividualRecipe";
import styled from "styled-components";

interface Props {
  recipes: Recipe[];
}

const Recipe_List = styled.ul`
  border: 1px;
  border-style: solid;
`;
const SocialRecipeListComponent: React.FC<Props> = ({ recipes }) => {
  const listRecipes = recipes.map((recipe) => {
    return (
      <li key={recipes.indexOf(recipe)}>
        <SocialIndividualRecipe key={recipes.indexOf(recipe)} recipe={recipe} />
      </li>
    );
  });

  return <Recipe_List>{listRecipes}</Recipe_List>;
};

export default SocialRecipeListComponent;
