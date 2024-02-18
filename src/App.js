import './App.css';
import AboutPage from './components/AboutPage';
import ImageUploader from './components/ImageUploader';
import { NavbarComp } from './components/NavbarComp';
import RecipeCollection from './components/RecipeCollection';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import Signup from './components/Signup';

function App() {

  return (
    <div>
      <NavbarComp/>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<AboutPage/>}/>
            <Route path="/home" element={<RecipeCollection /> }/>
            <Route path="/pantry" element={<ImageUploader/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      {/* <div>
        <AboutPage/>
        <SampleComponent/>
        <ImageUploader/>
      </div> */}
    </div>
  );
}

export default App;
