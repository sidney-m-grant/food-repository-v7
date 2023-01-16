import React, { useState } from "react";
import Fuse from "fuse.js";
import { Recipe } from "../../util/store";
import RecipeListComponent from "./RecipeListComponent";

interface Props {
  allRecipes: Recipe[];
}

const RecipeListSearchComponent: React.FC<Props> = ({ allRecipes }) => {
  const [searchInput, setSearchInput] = useState("");

  const fuse = new Fuse(allRecipes, { keys: ["recipeName"] });
  const results = fuse.search(searchInput);
  const recipeResults = searchInput
    ? results.map((result) => result.item)
    : allRecipes;

  return (
    <div>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      ></input>
      <RecipeListComponent recipes={recipeResults} />
    </div>
  );
};

export default RecipeListSearchComponent;
