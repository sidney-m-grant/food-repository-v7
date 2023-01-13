import React, { useState, useEffect } from "react";
import { store } from "../util/store";
import { useHookstate } from "@hookstate/core";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

export const Input_Header_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: auto;
  display: flexbox;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const RecipeInputHeader = () => {
  const { user } = useAuth();
  const state = useHookstate(store);
  const [selectedCookBook, setSelectedCookBook] = useState("");
  const [cookBookList, setCookBookList] = useState<string[]>([]);
  const [newCookbookInput, setNewCookbookInput] = useState<string>("");

  useEffect(() => {
    const getCookBooks = async () => {
      const snapshot = await getDoc(
        doc(db, user.email, "recipeCollection", "miscItems", "cookBookArray")
      );
      const cookBooks = snapshot.data()?.cookBooks;
      state.cookBookList.set(cookBooks);
      setCookBookList(cookBooks);
    };
    getCookBooks();
  }, [user.email]);

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
    setNewCookbookInput(e.target.value);
  };

  return (
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
      <textarea
        onChange={handleBriefDescriptionChange}
        placeholder="brief description..."
        value={state.inputRecipe.briefDescription.get()}
      ></textarea>
      <input
        onChange={handleNewCookbookInputChange}
        placeholder="cookbook..."
        value={newCookbookInput}
      ></input>
    </Input_Header_Container>
  );
};

export default RecipeInputHeader;
