import React from "react";
import RecipeInputHeader from "../components/recipeInput/RecipeInputHeader";
import RecipeInputSidebar from "../components/recipeInput/recipeInputSidebar/RecipeInputSidebar";
import styled from "styled-components";
import RecipeInputMainContainer from "../components/recipeInput/RecipeInputMainContainer";
import RecipeInputFooter from "../components/recipeInput/RecipeInputFooter";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const RecipeInput = () => {
  return (
    <Recipe_Container>
      <RecipeInputSidebar></RecipeInputSidebar>
      <RecipeInputHeader></RecipeInputHeader>
      <RecipeInputMainContainer></RecipeInputMainContainer>
      <RecipeInputFooter></RecipeInputFooter>
    </Recipe_Container>
  );
};

export default RecipeInput;
