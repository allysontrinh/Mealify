import React, { useState } from "react";
import fetch from 'node-fetch';
import Markdown from 'react-markdown'
import notepad from '../assets/notepad.png'
import getrecipe from '../assets/getrecipe.png'
import cooking from '../assets/cooking.png'

export default function Modal({ items }) {
    const [showModal, setShowModal] = React.useState(false);
    const [recipe, setRecipe] = useState('');
    const [prices, setPrices] = useState('');

    const getRecipe = () => {
        const url = "http://localhost:4004/getRecipe";
        const dataToSend = {
            items: items
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Recipe is: ",data);
                setRecipe(data);
                // setPrices(data.prices);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setShowModal(true);
    }
    return (
        <div className="absolute modal">
            <img onClick={getRecipe} className="skew-shake-x w-52 mr-4 mb-2 cursor-pointer" src={getrecipe} alt="getrecipe"></img>
            {/* <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={getRecipe}
            >
                Open regular modal
            </button> */}
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {/*content*/}
                            <div className="p-1 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div style={{ fontFamily: "Reenie Beanie" }} className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Recipe
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {(items.length === 0) ? <div>
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                Please upload ingredients first to get your recipe!
                                            </p>
                                        </div> : 
                                    (recipe.length === 0) ?
                                        <div className="flex">
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed mr-2">
                                                Just a second... Recipe is on the way ^^
                                            </p>
                                            <img className="animate-bounce w-14" src={cooking} alt="" />
                                        </div> : <div >
                                            <Markdown>{recipe}</Markdown>
                                            {/* <h3 className="text-xl font-semibold mt-4">Prices:</h3>
                                            {Object.keys(prices).map(foodItem => (
                                                <div key={foodItem}>
                                                    <p className="font-semibold">{foodItem}:</p>
                                                    <ul>
                                                        {prices[foodItem].map(([storeName, price]) => (
                                                            <li key={storeName}>{`${storeName}: $${price}`}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))} */}
                                        </div>}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { setShowModal(false); setRecipe('') }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
}