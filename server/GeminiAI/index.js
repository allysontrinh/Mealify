import {GoogleGenerativeAI} from "@google/generative-ai";
import {getJson} from 'serpapi';
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

async function getPricesForFoodItems(foodItems) {
    console.log("foodItems: ", foodItems)
    let pricesDict = {};
    const apiCalls = foodItems.map(foodItem => {
        return new Promise((resolve, reject) => {
            getJson({
                api_key: "037b30a225ba8d1f4d7b8da1a6fb42afcbf90b5cc874f875d3568ebc91f58129",
                engine: "google_shopping",
                q: foodItem,
                google_domain: "google.com",
                type: "search"
            }, (results) => {
                results.shopping_results.forEach(result => {
                    if (result.position <= 3) {
                        if (!(foodItem in pricesDict)) {
                            pricesDict[foodItem] = [[result.source, result.price]];
                        } else {
                            pricesDict[foodItem].push([result.source, result.price]);
                        }

                        console.log(`${foodItem} | ${result.source} | ${result.price}`);
                    }
                });
                resolve();
            });
        });
    });

    await Promise.all(apiCalls);
    console.log("pricesDict: ". pricesDict);
    return pricesDict;
}

async function generateContent(image){
    try {
        // const imagePath = image;
        // const imageData = await fs.readFile(imagePath);
        // const imageBase64 = imageData.toString('base64');

        const ingredientList = await getIngredients(image);
        const recipe = await getRecipe(filter, ingredientList);
        //Have to put in user's chosen filter
        const filter = "";
        const missingIngredients = await getMissingIngredients(ingredientList, recipe);
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
    let prompt = `Give me one recipe that uses ${ingredientList.toString()}`;
    // if (filter === ""){
    //     prompt = `Give me one recipe that uses ${ingredientList.toString()}`;
    // }
    // else {
    //     prompt = `Give me one ${filter.toString()} recipe that uses ${ingredientList.toString()}`;
    // }
    
    let result = await text.generateContent(prompt);
    let response = await result.response;
    const recipe = response.text();

    return recipe;
}



async function getMissingIngredients(ingredients, recipe){
    let prompt = "Given the recipe: "+ recipe + ". Tell me what items are in the recipe separated with only commas"
    let result = await text.generateContent(prompt);
    let response = await result.response;
    let list = response.text().toLowerCase().split(",");
    console.log("We need" + list + "\n");
    let missingList = [];

    list.forEach(food => {
        if (!ingredients.includes(food)){
            missingList.push(food);
        }
    });

    console.log("missing food: " + missingList);
    
    // prompt = `List 1 contains ${list} and list 2 ${ingredients.toString()}. What in list 1 is missing from list 2?`
    // result = await text.generateContent(prompt);
    // response = await result.response.candidates[0].content;
    // list = response;
    // console.log(list);

    return [missingList[0]];
}

app.post('/getRecipe', async (req, res) => {

    try {
        // const imagePath = 'apple.jpeg';
        // const imageData = await fs.readFile(imagePath);
        // const imageBase64 = imageData.toString('base64');
        const ingredients = req.body.items;
        const recipe = await getRecipe(ingredients);
        console.log("HELLO");
        const missingIngredients = await getMissingIngredients(ingredients, recipe)
        const prices = await getPricesForFoodItems(missingIngredients)
        console.log("prices: ", prices)
        res.json({recipe, prices});

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
