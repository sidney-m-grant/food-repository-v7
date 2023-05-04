import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import SocialSidebarFunctions from "./SocialSidebarFunctions";
import SocialCookbookComponent from "./socialCookbook/SocialCookbookComponent";
import { Recipe } from "../../util/store";
import SocialSearchComponent from "./SocialSearchComponent";
import SocialTags from "./socialTags/SocialTags";

type OpenSubMenu = "social" | "search" | "cookBooks" | "tags" | "";

const Social_Sidebar_Container = styled.div`
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  overflow-y: scroll;
  top: 30px;
  bottom: 0px;
`;

const Social_Sidebar_Label = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  padding: 5px;
  margin: 5px;
`;

const SocialSidebar = () => {
  const { user } = useAuth();
  const [userFriendList, setUserFriendList] = useState<string[]>([]);
  const [userFriendRequestList, setUserFriendRequestList] = useState<string[]>(
    []
  );
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenu>("");
  const [cookbookList, setCookbookList] = useState([]);
  const [selectedCookbook, setSelectedCookbook] = useState<string>("");
  const [friendsRecipes, setFriendsRecipes] = useState<Recipe[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string>("");

  useEffect(() => {
    const getFriendList = async () => {
      const friendListObject = await getDoc(
        doc(db, user.email, "social", "socialItems", "friendListArray")
      );
      const friendListArray = friendListObject.data()?.friendList;
      setUserFriendList(friendListArray);
    };
    getFriendList();
  }, [user.email]);

  useEffect(() => {
    const getFriendRequestList = async () => {
      const friendRequestRecievedObject = await getDoc(
        doc(db, user.email, "social", "socialItems", "friendRequestArray")
      );
      const friendRequestRecievedArray =
        friendRequestRecievedObject.data()?.friendRequests;
      setUserFriendRequestList(friendRequestRecievedArray);
    };
    getFriendRequestList();
  }, [user.email]);

  const handleSocialClick = () => {
    if (openSubMenu !== "social") {
      setOpenSubMenu("social");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleCookbookClick = () => {
    if (openSubMenu !== "cookBooks") {
      setOpenSubMenu("cookBooks");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleSearchClick = () => {
    if (openSubMenu !== "search") {
      setOpenSubMenu("search");
    } else {
      setOpenSubMenu("");
    }
  };

  useEffect(() => {
    const getRecipes = async () => {
      const tempCookbookList: any = [];
      const tempTagList: any = [];
      const recipes = await getDocs(
        collection(db, selectedFriend, "recipeCollection", "recipes")
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
          cookingTime: recipe.cookingTime,
          briefDescription: recipe.briefDescription,
          cookBook: recipe.cookBook,
          tags: recipe.tags,
          notes: recipe.notes,
        };
        recipeArray.push(temp);
        if (!tempCookbookList.includes(recipe.cookBook) && recipe.cookBook) {
          tempCookbookList.push(recipe.cookBook);
        }
        if (recipe.tags) {
          for (let i = 0; i < recipe.tags.length; i++) {
            if (!tempTagList.includes(recipe.tags[i].text)) {
              tempTagList.push(recipe.tags[i].text);
            }
          }
        }
      });
      setFriendsRecipes(recipeArray);
      setCookbookList(tempCookbookList);
      setTagList(tempTagList);
    };
    if (selectedFriend) {
      getRecipes();
    }
  }, [selectedFriend]);

  const handleTagsClick = () => {
    if (openSubMenu !== "tags") {
      setOpenSubMenu("tags");
    } else {
      setOpenSubMenu("");
    }
  };

  return (
    <Social_Sidebar_Container>
      <Social_Sidebar_Label onClick={handleSocialClick}>
        Social
      </Social_Sidebar_Label>
      {openSubMenu === "social" ? (
        <SocialSidebarFunctions
          userFriendList={userFriendList}
          setUserFriendList={setUserFriendList}
          userFriendRequestList={userFriendRequestList}
          setUserFriendRequestList={setUserFriendRequestList}
          setSelectedFriend={setSelectedFriend}
          setOpenSubMenu={setOpenSubMenu}
        ></SocialSidebarFunctions>
      ) : null}
      <br></br>
      {selectedFriend ? (
        <Social_Sidebar_Label onClick={handleCookbookClick}>
          Cookbooks
        </Social_Sidebar_Label>
      ) : null}
      {openSubMenu === "cookBooks" && cookbookList ? (
        <SocialCookbookComponent
          setSelectedCookbook={setSelectedCookbook}
          selectedCookbook={selectedCookbook}
          cookbookList={cookbookList}
          allRecipes={friendsRecipes}
        ></SocialCookbookComponent>
      ) : null}
      <br></br>
      {selectedFriend ? (
        <Social_Sidebar_Label onClick={handleSearchClick}>
          Search
        </Social_Sidebar_Label>
      ) : null}
      {openSubMenu === "search" ? (
        <SocialSearchComponent
          allRecipes={friendsRecipes}
        ></SocialSearchComponent>
      ) : null}
      <br></br>
      {selectedFriend ? (
        <Social_Sidebar_Label onClick={handleTagsClick}>
          Tags
        </Social_Sidebar_Label>
      ) : null}
      {openSubMenu === "tags" ? (
        <SocialTags
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          tagList={tagList}
          allRecipes={friendsRecipes}
        ></SocialTags>
      ) : null}
    </Social_Sidebar_Container>
  );
};

export default SocialSidebar;
