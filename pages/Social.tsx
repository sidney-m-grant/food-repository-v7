import React from "react";
import styled from "styled-components";
import SocialSidebar from "../components/social/socialSidebar/SocialSidebar";
import SocialCurrentRecipeContainer from "../components/social/socialCurrentRecipe/SocialCurrentRecipeContainer";
import SocialCurrentRecipeHeader from "../components/social/socialCurrentRecipe/SocialCurrentRecipeHeader";
import SocialCurrentRecipeFooter from "../components/social/socialCurrentRecipe/SocialCurrentRecipeFooter";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const Social = () => {
  return (
    <Recipe_Container>
      <SocialSidebar></SocialSidebar>
      <SocialCurrentRecipeHeader></SocialCurrentRecipeHeader>
      <SocialCurrentRecipeContainer></SocialCurrentRecipeContainer>
      <SocialCurrentRecipeFooter></SocialCurrentRecipeFooter>
    </Recipe_Container>
  );
};

export default Social;
