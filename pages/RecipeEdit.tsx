import React from "react";
import RecipeEditHeader from "../components/recipeEdit/RecipeEditHeader";
import RecipeEditSidebar from "../components/recipeEdit/recipeEditSidebar/RecipeEditSidebar";
import styled from "styled-components";
import RecipeEditMainContainer from "../components/recipeEdit/RecipeEditMainContainer";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const RecipeEdit = () => {
  return (
    <Recipe_Container>
      <RecipeEditSidebar></RecipeEditSidebar>
      <RecipeEditHeader></RecipeEditHeader>
      <RecipeEditMainContainer></RecipeEditMainContainer>
    </Recipe_Container>
  );
};

export default RecipeEdit;
