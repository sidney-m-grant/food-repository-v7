import React, { useState } from "react";
import CurrentRecipeContainer from "../components/recipeList/currentRecipe/CurrentRecipeContainer";
import CurrentRecipeHeader from "../components/recipeList/currentRecipe/CurrentRecipeHeader";
import RecipeListSidebar from "../components/recipeList/recipeListSidebar/RecipeListSidebar";
import styled from "styled-components";
import CurrentRecipeFooter from "../components/recipeList/currentRecipe/CurrentRecipeFooter";
import CurrentRecipeAmountMultiplier from "../components/recipeList/currentRecipe/CurrentRecipeAmountMultiplier";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const RecipeList = () => {
  const [multiplier, setMultiplier] = useState(1);

  return (
    <Recipe_Container>
      <RecipeListSidebar></RecipeListSidebar>
      <CurrentRecipeHeader></CurrentRecipeHeader>
      <CurrentRecipeAmountMultiplier
        setMultiplier={setMultiplier}
      ></CurrentRecipeAmountMultiplier>
      <CurrentRecipeContainer multiplier={multiplier}></CurrentRecipeContainer>
      <CurrentRecipeFooter></CurrentRecipeFooter>
    </Recipe_Container>
  );
};

export default RecipeList;
