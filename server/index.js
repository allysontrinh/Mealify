const admin = require("firebase-admin");
// import {GoogleGenerativeAI} from "@google/generative-ai";
// import {promises as fs} from 'fs';
// import dotenv from 'dotenv';

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// dotenv.config();
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const genAI2 = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});
// const text = genAI2.getGenerativeModel({model: "gemini-pro"});


const db = admin.firestore()

let User = db.collection("Users")
let Kitchen = db.collection("Kitchen")

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

async function generateContent(image){
    try {
        // const imagePath = image;
        // const imageData = await fs.readFile(imagePath);
        // const imageBase64 = imageData.toString('base64');

        const ingredientList = await getIngredients(imageBase64);
        const recipe = await getRecipe(ingredientList);
        console.log(recipe);
    }
    catch(error){
        console.error("Error generating content:", error);
    }
}

//function with array of strings ingredients
//assuming that image is already converted to base64
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

//takes in array of strings of ingredients and generates recipes 
async function getRecipe(ingredientList){
    let prompt = "Give me 1 recipe that uses ";
    ingredientList = ingredientList.toString();
    prompt = prompt + ingredientList;

    const result = await text.generateContent(prompt);
    const response = await result.response;
    const recipe = response.text();
    return recipe;
}

app.get("/foodRecipe", async (req, res) => {
    // based on the ingredients in the stuff in the pantry
    const snapshot = await Kitchen.get();
    const names = snapshot.docs.map(doc => doc.id);
    const recipe = getRecipe(names)
    res.send({ recipe: recipe });
});


app.post("/addFood", async (req, res) => {
    const image = req.body.image
    foodNames = generateContent(image)
    // const { foodNames } = req.body;
    for (const foodName of foodNames) {
        await Kitchen.doc(foodName.toLowerCase()).set({ exists: true });
      }
    res.send({ foodNames: foodNames });
});

app.delete("/deleteFood", async (req, res) => {
    const foodName = req.body.foodName.toLowerCase();
    try{
        await Kitchen.doc(foodName).delete();
        res.send({ msg: "Food deleted from kitchen" });
    }
    catch{
        res.send({ msg: "Fail to delete food" });
    }
});

app.get("/foodAvaliable", async (req, res) => {
    try {
      const snapshot = await Kitchen.get();
      const names = snapshot.docs.map(doc => doc.id);
      res.send(names);
    } catch (error) {
      console.error("Error fetching kitchen names:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

app.get("/allUsers", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/addUser", async (req, res) => {
  console.log(req.body)
  const data = req.body;
  await User.add(data);
  res.send({ msg: "User Added" });
});

app.put("/updateUser", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  await User.doc(id).update({name});
  res.send({ msg: "Updated" });
});

app.delete("/deleteUser", async (req, res) => {
  const id = req.body.id;
  console.log("id: ", id)
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});

app.listen(4000, () => console.log("Running on port 4000.."));

// let customersTable = db.collection("Customers")
// customersTable.get().then((querySnapshot) => {
//     querySnapshot.forEach(doc => {
//         console.log(doc.data());
//     })
// })