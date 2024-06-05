import React from "react";
import Recipe from "./Recipe.js";
import "./RecipeList.css";

export default function RecipeList({ urlParams }) {
  const [recipeList, setRecipeList] = React.useState([]);

  React.useEffect(() => {
    fetchRecipes();
  }, [urlParams]);

  function fetchRecipes() {
    async function apiCall() {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=0215d19b&app_key=fe6586390516daadda5c2b6f7ddb72dc${urlParams.join(
        ""
      )}`;
      const response = await fetch(url);
      return response.json();
    }

    apiCall()
      .then((data) => {
        createRecipeObjects(data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createRecipeObjects(recipeArr) {
    const recipes = recipeArr.map((recipe) => {
      const recipeProperties = recipe.recipe;
      return {
        title: recipeProperties.label,
        ingredients: recipeProperties.ingredientLines,
        healthLabels: recipeProperties.healthLabels,
        dishType: recipeProperties.dishType,
        dietLabels: recipeProperties.dietLabels,
        cuisineType: recipeProperties.cuisineType,
        allergens: recipeProperties.cautions,
        calories: recipeProperties.calories,
        mealType: recipeProperties.mealType,
        image: recipeProperties.image,
        url: recipeProperties.url,
        totalTime: recipeProperties.totalTime,
        yield: recipeProperties.yield,
        tags: recipeProperties.tags,
      };
    });
    setRecipeList(recipes);
  }

  function mapRecipeList() {
    if (recipeList !== undefined) {
      return recipeList.map((recipe, index) => {
        return <Recipe key={index} recipe={recipe} />;
      });
    }
  }

  return (
    <div className="recipe-list">
      <div className="recipes">{mapRecipeList()}</div>
    </div>
  );
}
