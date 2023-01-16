import React from "react";
import { Recipe } from "../../../util/store";
import RecipeEditIndividualCookbook from "./RecipeEditIndividualCookbook";
import styled from "styled-components";

interface Props {
  setSelectedCookbook: React.Dispatch<React.SetStateAction<string>>;
  selectedCookbook: string;
  cookbookList: string[];
  allRecipes: Recipe[];
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const Cookbook_List = styled.ul`
  border: 1px;
  border-style: solid;
`;

const RecipeEditCookbookComponent: React.FC<Props> = ({
  setSelectedCookbook,
  selectedCookbook,
  cookbookList,
  allRecipes,
  setTempImageFile,
}) => {
  const listOfCookbooks = cookbookList.map((cookbook) => {
    return (
      <RecipeEditIndividualCookbook
        key={cookbookList.indexOf(cookbook)}
        cookbook={cookbook}
        setSelectedCookbook={setSelectedCookbook}
        allRecipes={allRecipes}
        selectedCookbook={selectedCookbook}
        setTempImageFile={setTempImageFile}
      ></RecipeEditIndividualCookbook>
    );
  });

  return <Cookbook_List>{listOfCookbooks}</Cookbook_List>;
};

export default RecipeEditCookbookComponent;
