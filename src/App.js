import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import Header from "./components/Header.js";
import RecipeList from "./components/RecipeList.js";
import Sidebar from "./components/Sidebar.js";

function App() {
  const [urlParams, setUrlParams] = React.useState();
  const [formData, setFormData] = React.useState({
    diet: [],
    health: [],
    cuisineType: [],
    mealType: [],
    dishType: [],
  });
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Sidebar
          formData={formData}
          setFormData={setFormData}
          setUrlParams={setUrlParams}
        />
        <RecipeList urlParams={urlParams} />
      </div>
    </BrowserRouter>
  );
}

export default App;
