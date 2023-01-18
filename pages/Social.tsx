import React from "react";
import SocialMainComponent from "../components/social/socialCurrentRecipe/SocialCurrentRecipeContainer";
import styled from "styled-components";
import SocialSidebar from "../components/social/socialSidebar/SocialSidebar";
import SocialCurrentRecipeContainer from "../components/social/socialCurrentRecipe/SocialCurrentRecipeContainer";
import SocialCurrentRecipeHeader from "../components/social/socialCurrentRecipe/SocialCurrentRecipeHeader";

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
    </Recipe_Container>
  );
};

export default Social;
