import React from "react";
import { Recipe } from "../../../util/store";
import SocialIndividualCookbook from "./SocialIndividualCookbook";
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

const SocialCookbookComponent: React.FC<Props> = ({
  setSelectedCookbook,
  selectedCookbook,
  cookbookList,
  allRecipes,
}) => {
  const listOfCookbooks = cookbookList.map((cookbook) => {
    return (
      <SocialIndividualCookbook
        key={cookbookList.indexOf(cookbook)}
        cookbook={cookbook}
        setSelectedCookbook={setSelectedCookbook}
        allRecipes={allRecipes}
        selectedCookbook={selectedCookbook}
      ></SocialIndividualCookbook>
    );
  });

  return <Cookbook_List>{listOfCookbooks}</Cookbook_List>;
};

export default SocialCookbookComponent;
