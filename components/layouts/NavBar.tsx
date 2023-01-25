import React from "react";
import styled from "styled-components";

export const Nav_Bar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 5px;
  display: flex;
  height: 30px;
  border: 1px;
  border-style: solid;
  z-index: 1;
  background-color: aliceblue;
  justify-content: center;
  column-gap: 10px;
`;

import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  const handleRecipeListClick = () => {
    router.push("/RecipeList");
  };

  const handleRecipeInputClick = () => {
    router.push("/RecipeInput");
  };

  const handleLoginClick = () => {
    router.push("/Login");
  };

  const handleRecipeEditClick = () => {
    router.push("/RecipeEdit");
  };

  const handleSocialClick = () => {
    router.push("/Social");
  };

  return (
    <Nav_Bar>
      <button onClick={handleRecipeListClick}>To Recipe List</button>
      <button onClick={handleRecipeInputClick}>To Recipe Input</button>
      <button onClick={handleSocialClick}>To Social</button>
      <button onClick={handleLoginClick}>To Sign In</button>
      <button onClick={handleRecipeEditClick}>To Edit Recipe</button>
    </Nav_Bar>
  );
};

export default NavBar;
