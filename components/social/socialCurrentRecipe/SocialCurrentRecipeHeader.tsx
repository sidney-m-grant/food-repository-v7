import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";

const Social_Recipe_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
  height: 150px;
  display: inline-flex;
  flex-wrap: wrap;
  row-gap: 0px;
  justify-content: center;
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

const Social_Recipe_Header_Element = styled.div`
  height: 30px;
  display: inline-block;
  border: 1px solid;
  min-width: 250px;
`;

const Social_Recipe_Header_Brief_Description_Element = styled.div`
  border: 1px solid;
  width: 100%;
  height: calc(100% - 30px);
`;

const SocialCurrentRecipeHeader = () => {
  const state = useHookstate(store);
  return (
    <>
      <Social_Recipe_Header_Container>
        <div>
          <Social_Recipe_Header_Element>
            <span>Name: {state.socialRecipe.recipeName.get()}</span>
          </Social_Recipe_Header_Element>
          <Social_Recipe_Header_Element>
            <span>Serves: {state.socialRecipe.servesAmount.get()}</span>
          </Social_Recipe_Header_Element>
          <Social_Recipe_Header_Element>
            <span>Source: {state.socialRecipe.source.get()}</span>
          </Social_Recipe_Header_Element>
        </div>
        <br></br>
        <Social_Recipe_Header_Brief_Description_Element>
          <p>Brief Description: {state.socialRecipe.briefDescription.get()}</p>
        </Social_Recipe_Header_Brief_Description_Element>
      </Social_Recipe_Header_Container>
      <Social_Recipe_Image>
        <img
          src={state.socialRecipe.imgPath.get()}
          style={{ height: 150, width: 150 }}
        ></img>
      </Social_Recipe_Image>
    </>
  );
};

export default SocialCurrentRecipeHeader;
