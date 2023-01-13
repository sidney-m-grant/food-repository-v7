import React from "react";
import styled from "styled-components";
import RecipeInputSidebarFunctions from "./RecipeInputSidebarFunctions";

export const Recipe_Input_SideBar = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  top: 30px;
`;

const RecipeInputSidebar = () => {
  return (
    <Recipe_Input_SideBar>
      <RecipeInputSidebarFunctions />
    </Recipe_Input_SideBar>
  );
};

export default RecipeInputSidebar;
