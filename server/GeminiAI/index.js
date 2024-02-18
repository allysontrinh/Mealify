import {GoogleGenerativeAI} from "@google/generative-ai";
import express from 'express';
import cors from 'cors';

const GOOGLE_API_KEY = "AIzaSyAReNUhPSFUsB602ryP5wYs94bbjnf8fME";
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const genAI2 = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});
const text = genAI2.getGenerativeModel({model: "gemini-pro"});

const app = express();
app.use(express.json());
app.use(cors());

async function generateContent(image){
    try {
        // const imagePath = image;
        // const imageData = await fs.readFile(imagePath);
        // const imageBase64 = imageData.toString('base64');

        const ingredientList = await getIngredients(image);
        const recipe = await getRecipe(ingredientList);
        console.log(recipe);
    }
    catch(error){
        console.error("Error generating content:", error);
    }
}

// function with array of strings ingredients
// assuming that image is already converted to base64
async function getIngredients(image){
    const parts = [
        {text: "Tell me what items separated with only commas"},
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: image
            }
        },
    ];
    const result = await model.generateContent({contents: [{role: "user", parts}]});
    const response = await result.response;
    const text = response.text();

    //Returns the response into an array of strings
    const list = text.toLowerCase().split(",");
    return list;
}

// takes in array of strings of ingredients and generates recipes 
async function getRecipe(ingredientList){
    let prompt = "Give me 1 recipe that uses ";
    ingredientList = ingredientList.toString();
    prompt = prompt + ingredientList;

    const result = await text.generateContent(prompt);
    const response = await result.response;
    const recipe = response.text();
    return recipe;
}

app.post('/getRecipe', async (req, res) => {

    try {
        // const imagePath = 'apple.jpeg';
        // const imageData = await fs.readFile(imagePath);
        // const imageBase64 = imageData.toString('base64');
        const items = req.body.items;
        const response = await getRecipe(items);
        console.log(response);
        console.log("HELLO");
        res.json(response);

        // const list = getIngredients(imageBase64);
        // console.log(list);
    }
    catch(error){
        console.error("Error generating content:", error);
    }
});

app.post('/getIngredients', async (req, res) => {

    try {
        // const imagePath = 'apple.jpeg';
        // const imageData = await fs.readFile(imagePath);
        // const imageBase64 = imageData.toString('base64');
        const imageBase64 = req.body.image;

        const parts = [
        {text: "Give me items name stored in this format {\"items\":[food_item_1,food_item_2,etc.]}. The names of the items has to be a string. If there is one item, give me this object{\"items\":[food_item_name]}}. The response should only be the object."},
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64
            }
        },
    ];
    const result = await model.generateContent({contents: [{role: "user", parts}]});
    const response = await result.response;
    const text = response.text();
    console.log(text);
    console.log("HELLO");
    res.json(text);
    }
    catch(error){
        console.error("Error generating content:", error);
    }
});


app.listen(4004, () => console.log("Running on port 4004.."));
