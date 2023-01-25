import React, { useState } from "react";
import { store, Tag } from "../../util/store";
import { useHookstate, none } from "@hookstate/core";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { db, storage } from "../../../config/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import Compressor from "compressorjs";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import styled from "styled-components";

const Tag_List_Container = styled.div`
  border: 1px solid;
  padding: 3px;
`;

const Main_Recipe_Edit_Tools = styled.div`
  border: 1px solid;
  padding: 3px;
`;

interface Props {
  tempImageFile: File | null;
  setTempImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const RecipeEditSidebarFunctions: React.FC<Props> = ({
  tempImageFile,
  setTempImageFile,
}) => {
  const state = useHookstate(store);
  const [tagAddInput, setTagAddInput] = useState<string>("");
  const { user } = useAuth();

  const addNewTag = () => {
    if (!tagAddInput) {
      return;
    }
    const length = state.editedRecipe.tags.get().length;
    for (let i = 0; i < length; i++) {
      if (tagAddInput === state.editedRecipe.tags[i].text.get()) {
        return;
      }
    }
    const tempObject: Tag = {
      text: tagAddInput,
      id: length,
    };
    state.editedRecipe.tags[length].set(tempObject);
    setTagAddInput("");
  };

  const deleteTag = (id: number) => {
    state.editedRecipe.tags[id].set(none);
    for (let i = id; i < state.editedRecipe.tags.get().length; i++) {
      state.editedRecipe.tags[i].id.set((p) => p - 1);
    }
  };

  const tagListMap = state.editedRecipe.tags.get().map((tag) => {
    return (
      <li key={tag.id}>
        {tag.text}
        <XCircle size={20} onClick={() => deleteTag(tag.id)}></XCircle>
      </li>
    );
  });

  const addNewStepBlock = () => {
    const length = state.editedRecipe.stepList.length;
    state.editedRecipe.stepList[length].set({
      for: "",
      blockNumber: length,
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
    });
  };

  const addNewIngredientBlock = () => {
    const length = state.editedRecipe.ingredientList.length;
    state.editedRecipe.ingredientList[length].set({
      for: "",
      blockNumber: length,
      ingredients: [
        {
          id: 1,
          amount: "",
          name: "",
          unit: "",
        },
      ],
    });
  };

  const deleteLastStepBlock = () => {
    const length = state.editedRecipe.stepList.length;
    state.editedRecipe.stepList[length - 1].set(none);
  };

  const deleteLastIngredientBlock = () => {
    const length = state.editedRecipe.ingredientList.length;
    state.editedRecipe.ingredientList[length - 1].set(none);
  };

  const handleImgPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setTempImageFile(null);
      state.editedImagePreview.set("");
      return;
    }
    setTempImageFile(e.target.files[0]);
    state.editedImagePreview.set(URL.createObjectURL(e.target.files[0]));
  };

  const uploadRecipe = async () => {
    if (
      state.editedRecipe.stepList.get().length > 0 &&
      state.editedRecipe.ingredientList.get().length > 0
    ) {
      if (confirm("Upload Recipe?")) {
        if (tempImageFile) {
          const imgToDelete = state.editedRecipe.imgPath.get();
          const imageRef = ref(
            storage,
            `${user?.email}/${tempImageFile.name + v4()}`
          );
          new Compressor(tempImageFile, {
            quality: 0.2,
            success(result) {
              uploadBytes(imageRef, result)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => state.editedRecipe.imgPath.set(url))
                .then(() =>
                  setDoc(
                    doc(
                      db,
                      `${user?.email}`,
                      "recipeCollection",
                      "recipes",
                      `${state.editedRecipe.docId.get()}`
                    ),
                    state.editedRecipe.get()
                  )
                );
            },
          });
          if (imgToDelete) {
            deleteImage(imgToDelete);
          }
        } else {
          await setDoc(
            doc(
              db,
              `${user?.email}`,
              "recipeCollection",
              "recipes",
              `${state.editedRecipe.docId.get()}`
            ),
            state.editedRecipe.get()
          );
        }
      }
    }
  };

  const deleteImage = async (imgPath: string | undefined) => {
    const deleteRef = ref(storage, imgPath);
    await deleteObject(deleteRef);
  };

  return (
    <div>
      <Main_Recipe_Edit_Tools>
        <h5>Recipe Tools:</h5>
        <button onClick={addNewStepBlock}>Add New Step Block</button>

        <button onClick={addNewIngredientBlock}>
          Add New Ingredient Block
        </button>

        <button onClick={deleteLastStepBlock}>Delete Last Step Block</button>

        <button onClick={deleteLastIngredientBlock}>
          Delete Last Ingredient Block
        </button>

        <button onClick={uploadRecipe}>Upload Recipe</button>

        <input type="file" onChange={handleImgPreview}></input>
      </Main_Recipe_Edit_Tools>
      <Tag_List_Container>
        <input
          onChange={(e) => setTagAddInput(e.target.value)}
          value={tagAddInput}
        ></input>
        <button onClick={addNewTag}>Add Tag</button>
        <h5>List of Current Tags:</h5>
        <ol>{tagListMap}</ol>
      </Tag_List_Container>
    </div>
  );
};

export default RecipeEditSidebarFunctions;
