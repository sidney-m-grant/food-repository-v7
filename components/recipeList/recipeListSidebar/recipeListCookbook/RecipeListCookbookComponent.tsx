import React from "react";
import { Recipe } from "../../../util/store";
import RecipeListIndividualCookbook from "./RecipeListIndividualCookbook";
import styled from "styled-components";

interface Props {
  setSelectedCookbook: React.Dispatch<React.SetStateAction<string>>;
  selectedCookbook: string;
  cookbookList: string[];
  allRecipes: Recipe[];
}

const Cookbook_List = styled.ul`
  border: 1px;
  border-style: solid;
`;

const RecipeListCookbookComponent: React.FC<Props> = ({
  selectedCookbook,
  setSelectedCookbook,
  cookbookList,
  allRecipes,
}) => {
  const listOfCookbooks = cookbookList.map((cookbook) => {
    return (
      <RecipeListIndividualCookbook
        key={cookbookList.indexOf(cookbook)}
        cookbook={cookbook}
        setSelectedCookbook={setSelectedCookbook}
        allRecipes={allRecipes}
        selectedCookbook={selectedCookbook}
      ></RecipeListIndividualCookbook>
    );
  });



  return <Cookbook_List>{listOfCookbooks}</Cookbook_List>;
};

export default RecipeListCookbookComponent;
