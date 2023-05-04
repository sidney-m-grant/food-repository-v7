import React from "react";
import { store } from "../util/store";
import { useHookstate } from "@hookstate/core";
import styled from "styled-components";

export const Input_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: calc(100% - 150px);
  height: 150px;
  display: inline-flex;
  flex-wrap: wrap;
  row-gap: 0px;
  justify-content: center;
`;

const Input_Image = styled.div`
  border: 1px;
  border-style: solid;
  display: inline-block;
  justify-content: right;
  width: 150px;
  height: 150px;
  vertical-align: top;
`;

const Input_Brief_Description_Text_Area = styled.textarea`
  vertical-align: bottom;
  width: calc(100% - 150px);
`;

const RecipeInputHeader = () => {
  const state = useHookstate(store);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.recipeName.set(e.target.value);
  };

  const handleServesAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.servesAmount.set(e.target.value);
  };

  const handleBriefDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.briefDescription.set(e.target.value);
  };

  const handleSourceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.source.set(e.target.value);
  };

  const handleNewCookbookInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.cookBook.set(e.target.value);
  };

  const handleCookingTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.cookingTime.set(e.target.value);
  };

  return (
    <>
      <Input_Header_Container>
        <input
          onChange={handleNameChange}
          placeholder="name..."
          value={state.inputRecipe.recipeName.get()}
        ></input>
        <input
          onChange={handleServesAmountChange}
          placeholder="serves..."
          value={state.inputRecipe.servesAmount.get()}
        ></input>
        <input
          onChange={handleSourceChange}
          placeholder="source..."
          value={state.inputRecipe.source.get()}
        ></input>
        <input
          onChange={handleNewCookbookInputChange}
          placeholder="cookbook..."
          value={state.inputRecipe.cookBook.get()}
        ></input>
        <input
          onChange={handleCookingTimeChange}
          placeholder="cooking time..."
          value={state.inputRecipe.cookingTime.get()}
        ></input>
        <br></br>
        <Input_Brief_Description_Text_Area
          onChange={handleBriefDescriptionChange}
          placeholder="brief description..."
          value={state.inputRecipe.briefDescription.get()}
        ></Input_Brief_Description_Text_Area>
      </Input_Header_Container>
      <Input_Image>
        {state.inputImagePreview.get() ? (
          <img
            src={state.inputImagePreview.get()}
            style={{ height: 150, width: 150 }}
          ></img>
        ) : null}
      </Input_Image>
    </>
  );
};

export default RecipeInputHeader;
