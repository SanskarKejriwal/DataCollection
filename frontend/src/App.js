import "./App.css";
import Home from "./Home/Home.js";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThankYou from "./ThankYou/ThankYou.js";
import Form from "./Form/Form.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
       
        
          {/* <Route path="*" element={<NoPage />} /> */}
        
        <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
