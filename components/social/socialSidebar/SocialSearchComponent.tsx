import React, { useState } from "react";
import Fuse from "fuse.js";
import { Recipe } from "../../util/store";
import SocialRecipeListComponent from "./SocialRecipeListComponent";

interface Props {
  allRecipes: Recipe[];
}

const SocialSearchComponent: React.FC<Props> = ({ allRecipes }) => {
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
      <SocialRecipeListComponent recipes={recipeResults} />
    </div>
  );
};

export default SocialSearchComponent;
