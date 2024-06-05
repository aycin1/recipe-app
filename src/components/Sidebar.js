import React from "react";
import Parameter from "./Parameter.js";
import "./Sidebar.js";

export default function Sidebar({ formData, setFormData, setUrlParams }) {
  const [showRecipeParameters, setShowRecipeParameters] = React.useState(false);
  const [parameterArr, setParameterArr] = React.useState();

  function setRefineOptions() {
    if (showRecipeParameters === false) {
      async function apiCall() {
        const url = "https://api.edamam.com/doc/open-api/recipe-search-v2.json";
        const response = await fetch(url);
        return response.json();
      }

      apiCall()
        .then((data) => {
          refineParameters(data.paths["/api/recipes/v2"].get.parameters);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(setShowRecipeParameters(true));
    }
  }

  function refineParameters(parameters) {
    const filteredParams = parameters.filter(
      (parameter) => parameter.type === "array"
    );
    const parameterArr = filteredParams.map((parameter, index) => {
      return {
        key: index,
        name: parameter.name,
        description: parameter.description,
        type: parameter.type,
        options: parameter.items.enum,
      };
    });
    setParameterArr(parameterArr.splice(0, 5));
  }

  return (
    <div className="sidebar">
      <div>{setRefineOptions()}</div>
      <div className="parameter">
        {parameterArr !== undefined && (
          <Parameter
            parameterArr={parameterArr}
            formData={formData}
            setFormData={setFormData}
            setUrlParams={setUrlParams}
          />
        )}
      </div>
    </div>
  );
}
