import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";

export const Current_Recipe_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
  height: 150px;
  display: inline-flex;
  flex-wrap: wrap;
  row-gap: 0px;
  justify-content: center;
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

const Current_Recipe_Header_Element = styled.div`
  height: 30px;
  display: inline-block;
  border: 1px solid;
  min-width: 250px;
`;

const Current_Recipe_Header_Brief_Description_Element = styled.div`
  border: 1px solid;
  width: 100%;
  height: calc(100% - 30px);
`;

const CurrentRecipeHeader = () => {
  const state = useHookstate(store);
  return (
    <>
      <Current_Recipe_Header_Container>
        <div>
          <Current_Recipe_Header_Element>
            <span>Name: {state.currentRecipe.recipeName.get()}</span>
          </Current_Recipe_Header_Element>
          <Current_Recipe_Header_Element>
            <span>Serves: {state.currentRecipe.servesAmount.get()}</span>
          </Current_Recipe_Header_Element>
          <Current_Recipe_Header_Element>
            <span>Source: {state.currentRecipe.source.get()}</span>
          </Current_Recipe_Header_Element>
        </div>
        <br></br>
        <Current_Recipe_Header_Brief_Description_Element>
          <p>Brief Description: {state.currentRecipe.briefDescription.get()}</p>
        </Current_Recipe_Header_Brief_Description_Element>
      </Current_Recipe_Header_Container>
      <Current_Recipe_Image>
        <img
          src={state.currentRecipe.imgPath.get()}
          style={{ height: 150, width: 150 }}
        ></img>
      </Current_Recipe_Image>
    </>
  );
};

export default CurrentRecipeHeader;
