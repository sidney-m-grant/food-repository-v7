import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecipeEditSidebarFunctions from "./RecipeEditSidebarFunctions";
import { store, Recipe } from "../../util/store";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { useHookstate } from "@hookstate/core";

export const Recipe_Edit_SideBar = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  top: 30px;
`;

const RecipeEditSidebar = () => {
  const { user } = useAuth();
  const state = useHookstate(store);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

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
          prepTime: recipe.prepTime,
          activeCookingTime: recipe.activeCookingTime,
          totalTime: recipe.totalTime,
          servesAmount: recipe.servesAmount,
          source: recipe.source,
          briefDescription: recipe.briefDescription,
        };
        recipeArray.push(temp);
      });
      setAllRecipes(recipeArray);
      state.allRecipes.set(recipeArray);
    };
    getRecipes();
  }, [user?.email]);

  return (
    <Recipe_Edit_SideBar>
      <RecipeEditSidebarFunctions />
    </Recipe_Edit_SideBar>
  );
};

export default RecipeEditSidebar;
