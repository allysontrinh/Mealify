import {getJson} from 'serpapi';
import * as util from 'util';

import dotenv from 'dotenv'
dotenv.config()

const API_KEY = "037b30a225ba8d1f4d7b8da1a6fb42afcbf90b5cc874f875d3568ebc91f58129";



getJson({
    api_key: API_KEY,
    engine: "google_shopping",
    q: "randomFoodName",
    google_domain: "google.com",
    type: "search"
}, (results) => {
    results.shopping_results.forEach(result =>{
        if (result.position <= 3){
            console.log(`${result.source} | ${result.price}`);
        }
    })
});

