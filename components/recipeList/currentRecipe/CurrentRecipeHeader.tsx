import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";

export const Current_Recipe_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  height: 150px;
  display: inline-flexbox;
`;

const Current_Recipe_Image = styled.div`
  border: 1px;
  border-style: solid;
  display: inline-block;
  justify-content: right;
  width: 150px;
  height: 150px;
  vertical-align: top;
`;

const Current_Recipe_Header_Parent_Container = styled.div`
  border: 1px;
  border-style: solid;
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;

const CurrentRecipeHeader = () => {
  const state = useHookstate(store);
  return (
    <Current_Recipe_Header_Parent_Container>
      <Current_Recipe_Header_Container>
        <span>Name: {state.currentRecipe.recipeName.get()}</span>
        <span>Serves: {state.currentRecipe.servesAmount.get()}</span>
        <span>Source: {state.currentRecipe.source.get()}</span>
        <span>
          Brief Description: {state.currentRecipe.briefDescription.get()}
        </span>
      </Current_Recipe_Header_Container>
      <Current_Recipe_Image>
        <img
          src={state.currentRecipe.imgPath.get()}
          style={{ height: 150, width: 150 }}
        ></img>
      </Current_Recipe_Image>
    </Current_Recipe_Header_Parent_Container>
  );
};

export default CurrentRecipeHeader;
