import React, { useState } from "react";
import Fuse from "fuse.js";
import { Recipe } from "../../util/store";
import RecipeEditListComponent from "./RecipeEditListComponent";

interface Props {
  allRecipes: Recipe[];
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const RecipeEditSearchComponent: React.FC<Props> = ({
  allRecipes,
  setTempImageFile,
}) => {
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
      <RecipeEditListComponent
        setTempImageFile={setTempImageFile}
        recipes={recipeResults}
      />
    </div>
  );
};

export default RecipeEditSearchComponent;
