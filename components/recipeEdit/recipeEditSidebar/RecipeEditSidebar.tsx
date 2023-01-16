import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecipeEditSidebarFunctions from "./RecipeEditSidebarFunctions";
import { store, Recipe } from "../../util/store";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { useHookstate } from "@hookstate/core";
import RecipeEditCookbookComponent from "./recipeEditCookbook/RecipeEditCookbookComponent";
import RecipeEditSearchComponent from "./RecipeEditSearchComponent";

type OpenSubMenu = "search" | "cookBooks" | "editTools" | "";

const Recipe_Edit_Sidebar_Container = styled.div`
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  overflow-y: scroll;
  top: 30px;
  bottom: 0px;
`;

const Recipe_Edit_Sidebar_Label = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  padding: 5px;
  margin: 5px;
`;

const RecipeEditSidebar = () => {
  const { user } = useAuth();
  const state = useHookstate(store);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [cookbookList, setCookbookList] = useState<string[]>([]);
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenu>("");
  const [selectedCookbook, setSelectedCookbook] = useState<string>("");
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getDocs(
        collection(db, user?.email, "recipeCollection", "recipes")
      );
      const tempArray: any = recipes.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const recipeArray: Recipe[] = [];
      tempArray.forEach((recipe: Recipe) => {
        const temp: Recipe = {
          recipeName: recipe.recipeName,
          stepList: recipe.stepList,
          ingredientList: recipe.ingredientList,
          docId: recipe.docId,
          imgPath: recipe.imgPath,
          servesAmount: recipe.servesAmount,
          source: recipe.source,
          briefDescription: recipe.briefDescription,
          cookBook: recipe.cookBook,
        };
        recipeArray.push(temp);
        if (!cookbookList.includes(recipe.cookBook)) {
          cookbookList.push(recipe.cookBook);
        }
      });
      setAllRecipes(recipeArray);
      state.allRecipes.set(recipeArray);
      setCookbookList(cookbookList);
    };
    getRecipes();
  }, [user?.email]);

  const handleSearchClick = () => {
    if (openSubMenu !== "search") {
      setOpenSubMenu("search");
      setSelectedCookbook("");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleCookbooksClick = () => {
    if (openSubMenu !== "cookBooks") {
      setOpenSubMenu("cookBooks");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleEditToolsClick = () => {
    if (openSubMenu !== "editTools") {
      setOpenSubMenu("editTools");
    } else {
      setOpenSubMenu("");
    }
  };

  return (
    <Recipe_Edit_Sidebar_Container>
      <Recipe_Edit_Sidebar_Label onClick={handleEditToolsClick}>
        Edit Tools
      </Recipe_Edit_Sidebar_Label>
      {openSubMenu === "editTools" ? (
        <RecipeEditSidebarFunctions
          tempImageFile={tempImageFile}
          setTempImageFile={setTempImageFile}
        ></RecipeEditSidebarFunctions>
      ) : null}
      <br></br>
      <Recipe_Edit_Sidebar_Label onClick={handleSearchClick}>
        Search
      </Recipe_Edit_Sidebar_Label>
      {openSubMenu === "search" ? (
        <RecipeEditSearchComponent
          allRecipes={allRecipes}
          setTempImageFile={setTempImageFile}
        />
      ) : null}
      <br></br>
      <Recipe_Edit_Sidebar_Label onClick={handleCookbooksClick}>
        Cook Books
      </Recipe_Edit_Sidebar_Label>
      {openSubMenu === "cookBooks" ? (
        <RecipeEditCookbookComponent
          allRecipes={allRecipes}
          setSelectedCookbook={setSelectedCookbook}
          selectedCookbook={selectedCookbook}
          cookbookList={cookbookList}
          setTempImageFile={setTempImageFile}
        />
      ) : null}
    </Recipe_Edit_Sidebar_Container>
  );
};

export default RecipeEditSidebar;
