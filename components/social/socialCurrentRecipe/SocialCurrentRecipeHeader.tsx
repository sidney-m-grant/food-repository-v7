import { useHookstate } from "@hookstate/core";
import React from "react";
import styled from "styled-components";
import { store } from "../../util/store";

const Social_Recipe_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
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
  height: 50px;
  display: inline-block;
  border: 1px solid;
  width: 250px;
  overflow-x: auto;
`;

const Social_Recipe_Header_Brief_Description_Element = styled.div`
  border: 1px solid;
  width: 100%;
  height: calc(100% - 30px);
  overflow-x: scroll;
`;

const Social_Recipe_Header_Span = styled.span`
  font-size: 14px;
  padding: 1px;
`;

const Social_Recipe_Brief_Description_Paragraph = styled.p`
  font-size: 14px;
`;

const SocialCurrentRecipeHeader = () => {
  const state = useHookstate(store);
  return (
    <>
      <Social_Recipe_Header_Container>
        <div>
          <Social_Recipe_Header_Element>
            <Social_Recipe_Header_Span>
              <strong>Name:</strong> {state.socialRecipe.recipeName.get()}
            </Social_Recipe_Header_Span>
          </Social_Recipe_Header_Element>
          <Social_Recipe_Header_Element>
            <Social_Recipe_Header_Span>
              <strong>Serves:</strong> {state.socialRecipe.servesAmount.get()}
            </Social_Recipe_Header_Span>
          </Social_Recipe_Header_Element>
          <br></br>
          <Social_Recipe_Header_Element>
            <Social_Recipe_Header_Element>
              <strong>Source:</strong> {state.socialRecipe.source.get()}
            </Social_Recipe_Header_Element>
          </Social_Recipe_Header_Element>
          <Social_Recipe_Header_Element>
            <Social_Recipe_Header_Element>
              <strong>Cooking Time:</strong>{" "}
              {state.socialRecipe.cookingTime.get()}
            </Social_Recipe_Header_Element>
          </Social_Recipe_Header_Element>
        </div>
        <br></br>
        <Social_Recipe_Header_Brief_Description_Element>
          <Social_Recipe_Brief_Description_Paragraph>
            <strong>Brief Description:</strong>{" "}
            {state.socialRecipe.briefDescription.get()}
          </Social_Recipe_Brief_Description_Paragraph>
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
