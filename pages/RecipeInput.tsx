import React from "react";
import RecipeInputHeader from "../components/recipeInput/RecipeInputHeader";
import RecipeInputSidebar from "../components/recipeInput/recipeInputSidebar/RecipeInputSidebar";
import styled from "styled-components";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const RecipeInput = () => {
  return (
    <Recipe_Container>
      <RecipeInputSidebar></RecipeInputSidebar>
      <RecipeInputHeader></RecipeInputHeader>
    </Recipe_Container>
  );
};

export default RecipeInput;
