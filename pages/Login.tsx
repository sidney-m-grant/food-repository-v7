import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import styled from "styled-components";

export const Login_Container = styled.div`
  width: 450px;
  height: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Login = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const { user, signUp, logIn, logOut } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUp(signUpEmail, signUpPassword);
      const socialCollection = {
        name: "social",
      };
      const recipeCollection = {
        name: "recipe",
      };
      const friendRequestArray = {
        friendRequests: [""],
      };
      const friendListArray = {
        friendList: [""],
      };
      await setDoc(doc(db, signUpEmail, "social"), socialCollection);
      await setDoc(
        doc(db, signUpEmail, "social", "socialItems", "friendRequestArray"),
        friendRequestArray
      );
      await setDoc(
        doc(db, signUpEmail, "social", "socialItems", "friendListArray"),
        friendListArray
      );
      await setDoc(doc(db, signUpEmail, "recipeCollection"), recipeCollection);
      router.push("/RecipeInput");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async () => {
    try {
      await logIn(signInEmail, signInPassword);
      router.push("/RecipeList");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlreadySignedIn = () => {
    router.push("/RecipeList");
  };

  return (
    <Login_Container>
      <div>{user?.email ? user.email : "no one logged in"}</div>
      <div>
        <input
          onChange={(e) => {
            setSignInEmail(e.target.value);
          }}
          value={signInEmail}
          placeholder="Sign In Email"
          type="email"
        />

        <input
          onChange={(e) => {
            setSignInPassword(e.target.value);
          }}
          value={signInPassword}
          placeholder="Sign In Password"
          type="password"
        />

        <button onClick={handleSignIn}>Sign In</button>
      </div>
      <div>
        <input
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
          value={signUpEmail}
          placeholder="Sign Up Email"
          type="email"
        />

        <input
          onChange={(e) => {
            setSignUpPassword(e.target.value);
          }}
          value={signUpPassword}
          placeholder="Sign Up Password"
          type="password"
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

      <div>
        <button onClick={logOut}>Log Out</button>
        <button onClick={handleAlreadySignedIn}>Already Signed In</button>
      </div>
    </Login_Container>
  );
};

export default Login;
