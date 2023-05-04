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
import RecipeEditTags from "./recipeEditTags/RecipeEditTags";

type OpenSubMenu = "search" | "cookBooks" | "editTools" | "tags" | "";

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
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
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
      const tempCookbookList: string[] = [];
      const tempTagList: string[] = [];
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
          tags: recipe.tags,
          notes: recipe.notes,
          cookingTime: recipe.cookingTime,
        };
        recipeArray.push(temp);
        if (!tempCookbookList.includes(recipe.cookBook) && recipe.cookBook) {
          tempCookbookList.push(recipe.cookBook);
        }
        if (recipe.tags) {
          for (let i = 0; i < recipe.tags.length; i++) {
            if (!tempTagList.includes(recipe.tags[i].text)) {
              tempTagList.push(recipe.tags[i].text);
            }
          }
        }
      });
      setAllRecipes(recipeArray);
      state.allRecipes.set(recipeArray);
      setCookbookList(tempCookbookList);
      setTagList(tempTagList);
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

  const handleTagsClick = () => {
    if (openSubMenu !== "tags") {
      setOpenSubMenu("tags");
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
      <br></br>
      <Recipe_Edit_Sidebar_Label onClick={handleTagsClick}>
        Tags
      </Recipe_Edit_Sidebar_Label>
      {openSubMenu === "tags" ? (
        <RecipeEditTags
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          tagList={tagList}
          allRecipes={allRecipes}
          setTempImageFile={setTempImageFile}
        ></RecipeEditTags>
      ) : null}
    </Recipe_Edit_Sidebar_Container>
  );
};

export default RecipeEditSidebar;
