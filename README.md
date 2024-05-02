# Mealify
2024 Hack(h)er Project
Members: Vi Doan, Allyson Trinh, Sarah Jang, Ashna Jain, Sagi Sonni
## Check out our project demo on Devpost!
https://devpost.com/software/mealify-zul102

# Project Description: 
Mealify is a meticulously hand-drawn website designed to assist users in discovering new recipe inspirations based on the ingredients they already have in their pantry. 

Leveraging cutting-edge generative AI technology for image recognition, users can effortlessly populate their virtual pantry by simply uploading images, with the web app intelligently identifying and adding food items. Once the pantry is stocked, users can search for recipes tailored to their available ingredients. If a recipe requires ingredients not in the user's pantry, Mealify provides suggestions for nearby stores where they can be purchased.

Every visual element on Mealify has been meticulously handcrafted with care and attention to detail. 

# Backend: 
The backend is developed using Node.js and Express, with a database connection to Google Firebase and Firestore. It features multiple endpoints for CRUD operations to manage the database. 

Additionally, the backend incorporates the logic for generative AI-based photo recognition and recipe generation, powered by Google Gemini. It also facilitates providing a curated list of prices and store names for any missing ingredients using the Google Store API.

# Frontend: 
The frontend is built with React and integrates Firebase authentication for user login. All visual components on the frontend have been lovingly hand-drawn by our teammate Allyson Trinh.

# API Endpoints:
- /foodRecipe: curates a recipe based on the foods in the users pantry
- /addFood: applys image recognition and adds foods from the input photo to the Firestore database
- /deleteFood: deletes a specific food from the pantry
- /foodAvaliable: returns a list of all the foods that are stored in the pantry

# To run the Mealify webapp: 
- Backend: Navigate to the Server folder and run "node index.js"
- Frontend: In a separate terminal, run "npm run start"
