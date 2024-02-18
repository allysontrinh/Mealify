# Mealify
2024 Hack(h)er Project
Members: Vi Doan, Allyson Trinh, Sarah Jang, Ashna Jain, Sagi Sonni

# Project Description: 
Mealify is an eniterly handrawn website that helps users find new recipe ideas based off of what they already have in their pantry. Users first add items into their virtual pantry using groundgreaking new generative ai based technology image recognition - from a just a simple picture webapp will do identify the food items and then automatically add visuals to our pantry. Then users search for reciepes, based on these foods. For and for any ingredients in the receipe they dont have, our website will return the closest near by stores that sell that item.

All the visuals are ENITRELY hand drawn, and have been made with a lot of thought and care. 

# Backend: 
The Backend is written in Nodejs + Express with database connection to Google Firebase + Firestore.
The backend has multiple CRUD operation endpoints to read & update the database. 

The backend also stores the logic for the generative ai based photo recognition and recipe generation - we used Google Gemini in order to accomplish this. 

The backend also has the code for providing a list of prices and store names for the food that the user does not have. 

# Frontend: 
The frontend is written in React. 
Frontend uses Firebase authentication for user login. All the frontend visuals were handrawn by our teammate Allyson Trinh.

# API Endpoints:
- /foodRecipe: returns a recipe based on the foods in the users pantry
- /addFood: applys image recognition and adds foods from the input photo to the Firestore database
- /deleteFood: deletes a specific food from the pantry
- /foodAvaliable: returns a list of all the foods that are stored in the pantry

# To run the Mealify webapp: 
- Backend: cd into Server folder and run "node index.js"
- Frontend: in a separate terminal run "npm run start"
