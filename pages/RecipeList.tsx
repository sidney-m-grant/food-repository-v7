import React from "react";
import CurrentRecipeContainer from "../components/recipeList/currentRecipe/CurrentRecipeContainer";
import CurrentRecipeHeader from "../components/recipeList/currentRecipe/CurrentRecipeHeader";
import RecipeListSidebar from "../components/recipeList/recipeListSidebar/RecipeListSidebar";
import styled from "styled-components";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const RecipeList = () => {
  return (
    <Recipe_Container>
      <RecipeListSidebar></RecipeListSidebar>
      <CurrentRecipeHeader></CurrentRecipeHeader>
      <CurrentRecipeContainer></CurrentRecipeContainer>
    </Recipe_Container>
  );
};

export default RecipeList;
