import React from "react";
import { Recipe } from "../../../util/store";
import RecipeListIndividualTag from "./RecipeListIndividualTag";
import styled from "styled-components";

interface Props {
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  selectedTag: string;
  tagList: string[];
  allRecipes: Recipe[];
}

const Tag_List = styled.ul`
  border: 1px;
  border-style: solid;
`;

const RecipeListTags: React.FC<Props> = ({
  setSelectedTag,
  selectedTag,
  tagList,
  allRecipes,
}) => {
  const listOfCookbooks = tagList.map((tag) => {
    return (
      <RecipeListIndividualTag
        key={tagList.indexOf(tag)}
        tag={tag}
        setSelectedTag={setSelectedTag}
        allRecipes={allRecipes}
        selectedTag={selectedTag}
      ></RecipeListIndividualTag>
    );
  });

  return <Tag_List>{listOfCookbooks}</Tag_List>;
};

export default RecipeListTags;
