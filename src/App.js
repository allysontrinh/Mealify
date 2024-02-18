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
      {/* <div>
        <AboutPage/>
        <SampleComponent/>
        <ImageUploader/>
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<AboutPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
