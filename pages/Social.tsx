import React, { useState } from "react";
import styled from "styled-components";
import SocialSidebar from "../components/social/socialSidebar/SocialSidebar";
import SocialCurrentRecipeContainer from "../components/social/socialCurrentRecipe/SocialCurrentRecipeContainer";
import SocialCurrentRecipeHeader from "../components/social/socialCurrentRecipe/SocialCurrentRecipeHeader";
import SocialCurrentRecipeFooter from "../components/social/socialCurrentRecipe/SocialCurrentRecipeFooter";
import SocialCurrentRecipeAmountMultiplier from "../components/social/socialCurrentRecipe/SocialCurrentRecipeAmountMultiplier";

const Recipe_Container = styled.div`
  margin-top: 30px;
  margin-left: 250px;
`;

const Social = () => {
  const [multiplier, setMultiplier] = useState(1);
  return (
    <Recipe_Container>
      <SocialSidebar></SocialSidebar>
      <SocialCurrentRecipeHeader></SocialCurrentRecipeHeader>
      <SocialCurrentRecipeAmountMultiplier
        setMultiplier={setMultiplier}
      ></SocialCurrentRecipeAmountMultiplier>
      <SocialCurrentRecipeContainer
        multiplier={multiplier}
      ></SocialCurrentRecipeContainer>
      <SocialCurrentRecipeFooter></SocialCurrentRecipeFooter>
    </Recipe_Container>
  );
};

export default Social;
