import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";

export const Current_Recipe_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
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
  height: 50px;
  display: inline-block;
  border: 1px solid;
  width: 250px;
  overflow-x: auto;
`;

const Current_Recipe_Header_Brief_Description_Element = styled.div`
  border: 1px solid;
  width: 100%;
  height: calc(100% - 30px);
  overflow-x: scroll;
`;

const Current_Recipe_Header_Span = styled.span`
  font-size: 14px;
  padding: 1px;
`;

const Current_Recipe_Brief_Description_Paragraph = styled.p`
  font-size: 14px;
`;

const CurrentRecipeHeader = () => {
  const state = useHookstate(store);
  return (
    <>
      <Current_Recipe_Header_Container>
        <div>
          <Current_Recipe_Header_Element>
            <Current_Recipe_Header_Span>
              <strong>Name:</strong> {state.currentRecipe.recipeName.get()}
            </Current_Recipe_Header_Span>
          </Current_Recipe_Header_Element>
          <Current_Recipe_Header_Element>
            <Current_Recipe_Header_Span>
              <strong>Serves:</strong> {state.currentRecipe.servesAmount.get()}
            </Current_Recipe_Header_Span>
          </Current_Recipe_Header_Element>
          <br></br>
          <Current_Recipe_Header_Element>
            <Current_Recipe_Header_Span>
              <strong>Source:</strong> {state.currentRecipe.source.get()}
            </Current_Recipe_Header_Span>
          </Current_Recipe_Header_Element>
          <Current_Recipe_Header_Element>
            <Current_Recipe_Header_Span>
              <strong>Cooking Time:</strong>{" "}
              {state.currentRecipe.cookingTime.get()}
            </Current_Recipe_Header_Span>
          </Current_Recipe_Header_Element>
        </div>
        <br></br>
        <Current_Recipe_Header_Brief_Description_Element>
          <Current_Recipe_Brief_Description_Paragraph>
            <strong>Brief Description:</strong>{" "}
            {state.currentRecipe.briefDescription.get()}
          </Current_Recipe_Brief_Description_Paragraph>
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
