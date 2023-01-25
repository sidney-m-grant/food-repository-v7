import React from "react";
import { store } from "../util/store";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";

export const Edit_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
  height: 150px;
  display: inline-flex;
  flex-wrap: wrap;
  row-gap: 0px;
  justify-content: center;
`;

const Edit_Image = styled.div`
  border: 1px;
  border-style: solid;
  display: inline-block;
  justify-content: right;
  width: 150px;
  height: 150px;
  vertical-align: top;
`;

const Edit_Brief_Description_Text_Area = styled.textarea`
  vertical-align: bottom;
  width: calc(100% - 150px);
`;

const RecipeEditHeader = () => {
  const state = useHookstate(store);

  const handleServesAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.servesAmount.set(e.target.value);
  };

  const handleBriefDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.briefDescription.set(e.target.value);
  };

  const handleSourceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.source.set(e.target.value);
  };

  const handleNewCookbookInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.cookBook.set(e.target.value);
  };

  return (
    <>
      <Edit_Header_Container>
        <span>{state.editedRecipe.recipeName.get()}</span>
        <input
          onChange={handleServesAmountChange}
          placeholder="serves..."
          value={state.editedRecipe.servesAmount.get()}
        ></input>
        <input
          onChange={handleSourceChange}
          placeholder="source..."
          value={state.editedRecipe.source.get()}
        ></input>
        <input
          onChange={handleNewCookbookInputChange}
          placeholder="cookbook..."
          value={state.editedRecipe.cookBook.get()}
        ></input>
        <br></br>
        <Edit_Brief_Description_Text_Area
          onChange={handleBriefDescriptionChange}
          placeholder="brief description..."
          value={state.editedRecipe.briefDescription.get()}
        ></Edit_Brief_Description_Text_Area>
      </Edit_Header_Container>
      <Edit_Image>
        {state.editedImagePreview.get() ? (
          <img
            src={state.editedImagePreview.get()}
            style={{ height: 150, width: 150 }}
          ></img>
        ) : null}
      </Edit_Image>
    </>
  );
};

export default RecipeEditHeader;
