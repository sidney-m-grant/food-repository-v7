import React, { useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import { store, Recipe } from "../../util/store";
import { useAuth } from "../../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import styled from "styled-components";
import RecipeListCookbookComponent from "./recipeListCookbook/RecipeListCookbookComponent";
import RecipeListSearchComponent from "./RecipeListSearchComponent";
import RecipeListTags from "./recipeListTags/RecipeListTags";

type OpenSubMenu = "search" | "cookBooks" | "tags" | "";

const Recipe_List_Sidebar_Container = styled.div`
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  overflow-y: scroll;
  top: 30px;
  bottom: 0px;
`;

const Recipe_List_Sidebar_Label = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  padding: 5px;
  margin: 5px;
`;

const RecipeListSidebar = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenu>("");
  const [cookbookList, setCookbookList] = useState<string[]>([]);
  const [selectedCookbook, setSelectedCookbook] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const { user } = useAuth();
  const state = useHookstate(store);

  useEffect(() => {
    const getRecipes = async () => {
      const tempCookbookList: any = [];
      const tempTagList: any = [];
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
          tags: recipe.tags,
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

  const handleTagsClick = () => {
    if (openSubMenu !== "tags") {
      setOpenSubMenu("tags");
    } else {
      setOpenSubMenu("");
    }
  };

  return (
    <Recipe_List_Sidebar_Container>
      <Recipe_List_Sidebar_Label onClick={handleSearchClick}>
        Search
      </Recipe_List_Sidebar_Label>
      {openSubMenu === "search" ? (
        <RecipeListSearchComponent allRecipes={allRecipes} />
      ) : null}
      <br></br>
      <Recipe_List_Sidebar_Label onClick={handleCookbooksClick}>
        Cook Books
      </Recipe_List_Sidebar_Label>
      {openSubMenu === "cookBooks" ? (
        <RecipeListCookbookComponent
          allRecipes={allRecipes}
          setSelectedCookbook={setSelectedCookbook}
          selectedCookbook={selectedCookbook}
          cookbookList={cookbookList}
        />
      ) : null}
      <br></br>
      <Recipe_List_Sidebar_Label onClick={handleTagsClick}>
        Tags
      </Recipe_List_Sidebar_Label>
      {openSubMenu === "tags" ? (
        <RecipeListTags
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          tagList={tagList}
          allRecipes={allRecipes}
        ></RecipeListTags>
      ) : null}
    </Recipe_List_Sidebar_Container>
  );
};

export default RecipeListSidebar;
