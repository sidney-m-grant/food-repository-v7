import React, { useState } from "react";
import { getDocs, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";

interface Props {
  userFriendList: string[];
  setUserFriendList: React.Dispatch<React.SetStateAction<string[]>>;
  userFriendRequestList: string[];
  setUserFriendRequestList: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFriend: React.Dispatch<React.SetStateAction<string>>;
  setOpenSubMenu: React.Dispatch<React.SetStateAction<OpenSubMenu>>;
}

type OpenSubMenu = "social" | "search" | "cookBooks" | "";

const Social_Item_Container = styled.ul`
  border: 1px solid;
`;

const SocialSidebarFunctions: React.FC<Props> = ({
  userFriendList,
  setUserFriendList,
  userFriendRequestList,
  setUserFriendRequestList,
  setSelectedFriend,
  setOpenSubMenu,
}) => {
  const { user } = useAuth();
  const [friendRequestInput, setFriendRequestInput] = useState<string>("");

  const friendListMap = userFriendList.slice(1).map((friend) => {
    return (
      <li
        key={userFriendList.indexOf(friend)}
        onClick={() => {
          handleSelectedFriendClick(friend);
        }}
      >
        {friend}
      </li>
    );
  });

  const handleSelectedFriendClick = (friend: string) => {
    setSelectedFriend(friend);
    setOpenSubMenu("");
  };

  const friendRequestMap = userFriendRequestList.slice(1).map((request) => {
    return (
      <li key={userFriendRequestList.indexOf(request)}>
        {request}
        <button onClick={() => acceptFriendRequest(request)}>accept</button>
      </li>
    );
  });

  const sendFriendRequest = async (friendRequest: string) => {
    // could be a good time to validate whether its a valid email address
    if (!friendRequest) {
      alert("please input a valid email address");
      return;
    }
    const checkIfFriendExists = await getDocs(collection(db, friendRequest));
    if (!checkIfFriendExists.empty) {
      const friendsRequestObject = await getDoc(
        doc(db, friendRequest, "social", "socialItems", "friendRequestArray")
      );
      let friendRequestArray = friendsRequestObject.data()?.friendRequests;
      if (friendRequestArray.includes(user.email)) {
        alert("friend request sent previously");
        return;
      }
      if (userFriendList.includes(friendRequest)) {
        alert("already friends");
        return;
      } else {
        friendRequestArray.push(`${user.email}`);
        const objectToUpload = {
          friendRequests: friendRequestArray,
        };
        uploadFriendRequestUpdate(friendRequest, objectToUpload);
        alert("friend request sent");
      }
    } else {
      alert("user does not exist");
    }
  };

  const uploadFriendRequestUpdate = async (
    user: string,
    friendRequestArray: object
  ) => {
    await setDoc(
      doc(db, `${user}`, "social", "socialItems", "friendRequestArray"),
      friendRequestArray
    );
  };

  const uploadFriendListUpdate = async (
    user: string,
    friendListArray: object
  ) => {
    await setDoc(
      doc(db, `${user}`, "social", "socialItems", "friendListArray"),
      friendListArray
    );
  };

  const acceptFriendRequest = async (friend: string) => {
    try {
      const friendsRequestObject = await getDoc(
        doc(db, `${user.email}`, "social", "socialItems", "friendRequestArray")
      );
      let friendRequestArray: string[] = friendsRequestObject
        .data()
        ?.friendRequests.filter((request: string) => request !== friend);
      const friendsObject = await getDoc(
        doc(db, `${user.email}`, "social", "socialItems", "friendListArray")
      );
      let friendsArray: string[] = friendsObject.data()?.friendList;
      friendsArray.push(friend);
      const friendsFriendListObject = await getDoc(
        doc(db, `${friend}`, "social", "socialItems", "friendListArray")
      );
      let friendsFriendListArray: string[] =
        friendsFriendListObject.data()?.friendList;
      friendsFriendListArray.push(user.email);
      setUserFriendList(friendsArray);
      setUserFriendRequestList(friendRequestArray);
      uploadFriendRequestUpdate(user.email, {
        friendRequests: friendRequestArray,
      });
      uploadFriendListUpdate(friend, { friendList: friendsFriendListArray });
      uploadFriendListUpdate(user.email, { friendList: friendsArray });
      alert("friend request accepted");
    } catch {
      alert("something went wrong");
    }
  };

  const handleSendRequestClick = () => {
    sendFriendRequest(friendRequestInput);
  };

  return (
    <>
      <div>
        <input
          onChange={(e) => setFriendRequestInput(e.target.value)}
          value={friendRequestInput}
        ></input>
        <button onClick={handleSendRequestClick}>Send Request</button>
      </div>
      <Social_Item_Container>{friendListMap}</Social_Item_Container>
      <Social_Item_Container>{friendRequestMap}</Social_Item_Container>
    </>
  );
};

export default SocialSidebarFunctions;
