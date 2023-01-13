import React, { useState } from "react";
import { store } from "../../util/store";
import { useHookstate, none } from "@hookstate/core";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
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

interface Props {}

const RecipeEditSidebarFunctions: React.FC<Props> = ({}) => {
  const state = useHookstate(store);
  const { user } = useAuth();

  const [tempImageFile, setTempImageFile] = useState<File | null>(null);

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
      <button onClick={addNewStepBlock}>Add New Step Block</button>

      <button onClick={addNewIngredientBlock}>Add New Ingredient Block</button>

      <button onClick={deleteLastStepBlock}>Delete Last Step Block</button>

      <button onClick={deleteLastIngredientBlock}>
        Delete Last Ingredient Block
      </button>

      <button onClick={uploadRecipe}>Upload Recipe</button>

      <input type="file" onChange={handleImgPreview}></input>
    </div>
  );
};

export default RecipeEditSidebarFunctions;
