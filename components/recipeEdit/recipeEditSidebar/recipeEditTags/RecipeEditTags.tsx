import React from "react";
import { Recipe } from "../../../util/store";
import RecipeEditIndividualTag from "./RecipeEditIndividualTag";
import styled from "styled-components";

interface Props {
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
  selectedTag: string;
  tagList: string[];
  allRecipes: Recipe[];
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const Tag_List = styled.ul`
  border: 1px;
  border-style: solid;
`;

const RecipeEditTags: React.FC<Props> = ({
  setSelectedTag,
  selectedTag,
  tagList,
  allRecipes,
  setTempImageFile,
}) => {
  const listOfCookbooks = tagList.map((tag) => {
    return (
      <RecipeEditIndividualTag
        key={tagList.indexOf(tag)}
        tag={tag}
        setSelectedTag={setSelectedTag}
        allRecipes={allRecipes}
        selectedTag={selectedTag}
        setTempImageFile={setTempImageFile}
      ></RecipeEditIndividualTag>
    );
  });

  return <Tag_List>{listOfCookbooks}</Tag_List>;
};

export default RecipeEditTags;
