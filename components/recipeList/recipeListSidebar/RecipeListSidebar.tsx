import React, { useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import { store, Recipe } from "../../util/store";
import { useAuth } from "../../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import styled from "styled-components";
import RecipeListCookbookComponent from "./recipeListCookbook/RecipeListCookbookComponent";
import RecipeListSearchComponent from "./RecipeListSearchComponent";

type OpenSubMenu = "search" | "cookBooks" | "";

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
  const [cookbookList, setCookbookList] = useState([]);
  const [selectedCookbook, setSelectedCookbook] = useState<string>("");
  const { user } = useAuth();
  const state = useHookstate(store);

  useEffect(() => {
    const getRecipes = async () => {
      const cookbookList: any = [];
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
    </Recipe_List_Sidebar_Container>
  );
};

export default RecipeListSidebar;
