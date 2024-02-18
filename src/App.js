import './App.css';
import AboutPage from './components/AboutPage';
import ImageUploader from './components/ImageUploader';
import { NavbarComp } from './components/NavbarComp';
import SampleComponent from './components/SampleComponent';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <NavbarComp/>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<AboutPage/>}/>
            <Route path="/home" element={<SampleComponent/>}/>
            <Route path="/pantry" element={<ImageUploader/>}/>
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
