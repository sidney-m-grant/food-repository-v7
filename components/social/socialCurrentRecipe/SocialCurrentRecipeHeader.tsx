import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";

const Social_Recipe_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  height: 150px;
  display: inline-flexbox;
`;

const Social_Recipe_Image = styled.div`
  border: 1px;
  border-style: solid;
  display: inline-block;
  justify-content: right;
  width: 150px;
  height: 150px;
  vertical-align: top;
`;

const Social_Recipe_Header_Parent_Container = styled.div`
  border: 1px;
  border-style: solid;
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;

const SocialCurrentRecipeHeader = () => {
  const state = useHookstate(store);
  return (
    <Social_Recipe_Header_Parent_Container>
      <Social_Recipe_Header_Container>
        <span>Name: {state.socialRecipe.recipeName.get()}</span>
        <span>Serves: {state.socialRecipe.servesAmount.get()}</span>
        <span>Source: {state.socialRecipe.source.get()}</span>
        <span>
          Brief Description: {state.socialRecipe.briefDescription.get()}
        </span>
      </Social_Recipe_Header_Container>
      <Social_Recipe_Image>
        <img
          src={state.socialRecipe.imgPath.get()}
          style={{ height: 150, width: 150 }}
        ></img>
      </Social_Recipe_Image>
    </Social_Recipe_Header_Parent_Container>
  );
};

export default SocialCurrentRecipeHeader;
