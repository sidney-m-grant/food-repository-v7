import React, { useState } from "react";
import { store, StepBlock, IngredientBlock, Tag } from "../../util/store";
import { useHookstate, none } from "@hookstate/core";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { db, storage } from "../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

const Scraper_Container = styled.div`
  border: 1px solid;
  padding: 3px;
`;

const forStatementRegex = /^for\b/;
const unitList = [
  "teaspoons",
  "tablespoons",
  "tbsp",
  "tablespoon",
  "cup",
  "cups",
  "gram",
  "kilogram",
  "teaspoon",
  "tsp",
  "liter",
  "lb",
  "pound",
  "container",
  "gallon",
  "quart",
  "pint",
  "fl oz",
  "oz",
  "ounces",
  "handful",
  "dash",
  "milliters",
];
const unitRegex = new RegExp("\\b(" + unitList.join("|") + ")\\b", "g");

const RecipeInputSidebarFunctions = () => {
  const [urlToScrape, setUrlToScrape] = useState<string>("");
  const [tagAddInput, setTagAddInput] = useState<string>("");
  const state = useHookstate(store);
  const { user } = useAuth();

  const [tempImageFile, setTempImageFile] = useState<File | null>(null);

  const addNewTag = () => {
    if (!tagAddInput) {
      return;
    }
    const length = state.inputRecipe.tags.get().length;
    for (let i = 0; i < length; i++) {
      if (tagAddInput === state.inputRecipe.tags[i].text.get()) {
        return;
      }
    }
    const tempObject: Tag = {
      text: tagAddInput,
      id: length,
    };
    state.inputRecipe.tags[length].set(tempObject);
    setTagAddInput("");
  };

  const deleteTag = (id: number) => {
    state.inputRecipe.tags[id].set(none);
    for (let i = id; i < state.inputRecipe.tags.get().length; i++) {
      state.inputRecipe.tags[i].id.set((p) => p - 1);
    }
  };

  const tagListMap = state.inputRecipe.tags.get().map((tag) => {
    return (
      <li key={tag.id}>
        {tag.text}
        <XCircle size={15} onClick={() => deleteTag(tag.id)}></XCircle>
      </li>
    );
  });

  const addNewStepBlock = () => {
    const length = state.inputRecipe.stepList.length;
    state.inputRecipe.stepList[length].set({
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
    const length = state.inputRecipe.ingredientList.length;
    state.inputRecipe.ingredientList[length].set({
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
    const length = state.inputRecipe.stepList.length;
    if (length > 1) {
      state.inputRecipe.stepList[length - 1].set(none);
    }
  };

  const deleteLastIngredientBlock = () => {
    const length = state.inputRecipe.ingredientList.length;
    if (length > 1) {
      state.inputRecipe.ingredientList[length - 1].set(none);
    }
  };

  const handleImgPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setTempImageFile(null);
      state.inputImagePreview.set("");
      return;
    }
    setTempImageFile(e.target.files[0]);
    state.inputImagePreview.set(URL.createObjectURL(e.target.files[0]));
  };

  const checkIfNameAlreadyExists = (name: string) => {
    for (let i = 0; i < state.allRecipes.get().length; i++) {
      if (name === state.allRecipes[i].recipeName.get()) {
        return false;
      }
    }
    return true;
  };

  const uploadRecipe = async () => {
    if (
      state.inputRecipe.recipeName.get() &&
      state.inputRecipe.recipeName.get() !== "cookBooks" &&
      checkIfNameAlreadyExists(state.inputRecipe.recipeName.get())
    ) {
      if (confirm("Upload Recipe?")) {
        if (tempImageFile) {
          const imageRef = ref(
            storage,
            `${user?.email}/${tempImageFile.name + v4()}`
          );
          new Compressor(tempImageFile, {
            quality: 0.2,
            success(result) {
              uploadBytes(imageRef, result)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => state.inputRecipe.imgPath.set(url))
                .then(() =>
                  addDoc(
                    collection(
                      db,
                      `${user?.email}`,
                      "recipeCollection",
                      "recipes"
                    ),
                    state.inputRecipe.get()
                  )
                );
            },
          });
        } else {
          await addDoc(
            collection(db, `${user?.email}`, "recipeCollection", "recipes"),
            state.inputRecipe.get()
          );
        }
      }
    }
  };

  const jsonldInstructionParser = (json: any) => {
    const recipeInstructions: any = [];
    const recipeSteps: any = [];
    const recipeIngredients: any = [];

    const getRecipeInstructions = (json: any) => {
      if (Array.isArray(json)) {
        json.forEach((element) => getRecipeInstructions(element));
      } else if ("@graph" in json) {
        json["@graph"].forEach((element: Object) =>
          getRecipeInstructions(element)
        );
      } else if (json["@type"].includes("Recipe")) {
        json["recipeInstructions"].forEach((element: Object) =>
          recipeInstructions.push(element)
        );
      }
    };

    const getRecipeSteps = (recipeInstructions: any) => {
      recipeInstructions.forEach((element: any) => {
        if (element["@type"].includes("HowToSection")) {
          element.itemListElement.forEach((listItem: any) => {
            recipeSteps.push(listItem.text);
          });
        } else if (element["@type"].includes("HowToStep")) {
          recipeSteps.push(element.text);
        }
      });
    };

    const getRecipeIngredients = (json: any) => {
      if (Array.isArray(json)) {
        json.forEach((element) => getRecipeIngredients(element));
      } else if ("@graph" in json) {
        json["@graph"].forEach((element: Object) =>
          getRecipeIngredients(element)
        );
      } else if (json["@type"].includes("Recipe")) {
        json["recipeIngredient"].forEach((element: Object) =>
          recipeIngredients.push(element)
        );
      }
    };

    const getMiscInfo = (json: any) => {
      if (Array.isArray(json)) {
        json.forEach((element) => getMiscInfo(element));
      } else if ("@graph" in json) {
        json["@graph"].forEach((element: Object) => getMiscInfo(element));
      } else if (json["@type"].includes("Recipe")) {
        if (json["description"]) {
          state.inputRecipe.briefDescription.set(json["description"]);
        }
        if (json["name"]) {
          state.inputRecipe.recipeName.set(json["name"]);
        }
      }
    };

    getRecipeInstructions(json);
    getRecipeSteps(recipeInstructions);
    getMiscInfo(json);
    return recipeSteps;
  };

  const jsonldIngredientParser = (json: any) => {
    const recipeIngredients: any = [];

    const getRecipeIngredients = (json: any) => {
      if (Array.isArray(json)) {
        json.forEach((element) => getRecipeIngredients(element));
      } else if ("@graph" in json) {
        json["@graph"].forEach((element: Object) =>
          getRecipeIngredients(element)
        );
      } else if (json["@type"].includes("Recipe")) {
        json["recipeIngredient"].forEach((element: Object) =>
          recipeIngredients.push(element)
        );
      }
    };

    getRecipeIngredients(json);
    return recipeIngredients;
  };

  const runScrape = () => {
    fetch("/api/scraper", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url: urlToScrape }, undefined, 4),
    })
      .then((res) => res.json())
      .then((metaData) => {
        console.log(metaData);
        const object = JSON.parse(metaData);
        const recipeIngredients = jsonldIngredientParser(object);
        const recipeInstructions = jsonldInstructionParser(object);
        handleIngredientSplit(recipeIngredients);
        handleRecipeStepSplit(recipeInstructions);
      });
  };

  const handleRecipeStepSplit = (tempArray: string[]) => {
    // takes input in the recipe input, trims any whitespace at the ends, and then splits for every new line
    // initialize variables
    let firstStep = true;
    let firstBlock = true;
    let counter = 0;
    let tempRecipeStepSplitList: StepBlock[] = [
      {
        for: "",
        steps: [
          {
            stepNumber: 1,
            stepText: "",
          },
        ],
        blockNumber: 0,
      },
    ];
    // loop through the input, now seperated by page return
    for (var i = 0; i < tempArray.length; i++) {
      if (
        // if the first word of the current string is 'for' and it ends in a column...
        tempArray[i].toLowerCase().match(forStatementRegex) &&
        tempArray[i].match(/\:$/)
      ) {
        // if this is the first 'for', set the statement to the 'for' property of the first block
        if (firstBlock === true) {
          tempRecipeStepSplitList[0] = {
            for: tempArray[i],
            steps: [
              {
                stepNumber: 1,
                stepText: "",
              },
            ],
            blockNumber: 0,
          };
          firstBlock = false;
        } else {
          // otherwise, set the statement as the 'for property of the second block, and all further statements
          // untill the next for statement will be assigned to that block
          counter++;
          tempRecipeStepSplitList[counter] = {
            for: tempArray[i],
            steps: [
              {
                stepNumber: 1,
                stepText: "",
              },
            ],
            blockNumber: counter,
          };
          firstStep = true;
        }
      } else {
        // if its the first step after a for loop, set the first step
        if (firstStep === true) {
          tempRecipeStepSplitList[counter].steps[0] = {
            stepNumber: 1,
            stepText: tempArray[i],
          };
          firstStep = false;
        } else {
          // otherwise, continue to add to the current block
          tempRecipeStepSplitList[counter].steps[
            tempRecipeStepSplitList[counter].steps.length
          ] = {
            stepNumber: tempRecipeStepSplitList[counter].steps.length + 1,
            stepText: tempArray[i],
          };
        }
      }
    }
    state.inputRecipe.stepList.set(tempRecipeStepSplitList);
  };

  const handleIngredientSplit = (tempArray: string[]) => {
    let tempAmount = "";
    let tempUnit: any = "";
    let tempName = "";
    let firstIngredient = true;
    let firstBlock = true;
    let counter = 0;
    let tempIngredientSplitList: IngredientBlock[] = [
      {
        for: "",
        ingredients: [
          {
            amount: "",
            id: 1,
            name: "",
            unit: "",
          },
        ],
        blockNumber: 0,
      },
    ];
    for (var i = 0; i < tempArray.length; i++) {
      if (
        tempArray[i].toLowerCase().match(forStatementRegex) &&
        tempArray[i].match(/\:$/)
      ) {
        if (firstBlock === true) {
          tempIngredientSplitList[0] = {
            for: tempArray[i],
            ingredients: [
              {
                amount: "",
                id: 1,
                name: "",
                unit: "",
              },
            ],
            blockNumber: 0,
          };
          firstBlock = false;
        } else {
          counter++;
          tempIngredientSplitList[counter] = {
            for: tempArray[i],
            ingredients: [
              {
                amount: "",
                id: 1,
                name: "",
                unit: "",
              },
            ],
            blockNumber: counter,
          };
          firstIngredient = true;
        }
      } else {
        if (firstIngredient === true) {
          var match: any = tempArray[i].match(/[A-Za-z]/);
          var index = tempArray[i].indexOf(match[0]);
          tempAmount = tempArray[i].substring(0, index).trim();
          if (tempArray[i].match(unitRegex)) {
            const temp: any = tempArray[i].match(unitRegex);
            tempUnit = temp[0];
            index = index + tempUnit.length;
          } else {
            tempUnit = "";
          }
          tempName = tempArray[i].substring(index, tempArray[i].length).trim();
          tempIngredientSplitList[counter].ingredients[0] = {
            amount: tempAmount,
            unit: tempUnit,
            name: tempName,
            id: 1,
          };
          firstIngredient = false;
        } else {
          var match: any = tempArray[i].match(/[A-Za-z]/);
          var index = tempArray[i].indexOf(match[0]);
          tempAmount = tempArray[i].substring(0, index).trim();
          if (tempArray[i].match(unitRegex)) {
            const temp: any = tempArray[i].match(unitRegex);
            tempUnit = temp[0];
            index = index + tempUnit.length;
          } else {
            tempUnit = "";
          }
          tempName = tempArray[i].substring(index, tempArray[i].length).trim();
          tempIngredientSplitList[counter].ingredients[
            tempIngredientSplitList[counter].ingredients.length
          ] = {
            amount: tempAmount,
            unit: tempUnit,
            name: tempName,
            id: tempIngredientSplitList[counter].ingredients.length + 1,
          };
        }
      }
    }
    state.inputRecipe.ingredientList.set(tempIngredientSplitList);
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
      <Scraper_Container>
        <h5>Recipe Scraper:</h5>
        <textarea
          onChange={(e) => setUrlToScrape(e.target.value)}
          value={urlToScrape}
        />
        <button onClick={runScrape}>Run Scrape</button>
      </Scraper_Container>
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

export default RecipeInputSidebarFunctions;
