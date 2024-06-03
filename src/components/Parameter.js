import React from "react";

export default function Parameter({
  parameterArr,
  formData,
  setFormData,
  setUrlParams,
}) {
  function mapParameters() {
    return parameterArr.map((parameter, index) => {
      function mapParameterOptions() {
        return parameter.options.map((option, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={option}
                name={parameter.name}
                onChange={handleChange}
              ></input>
              <label htmlFor={option}>{option}</label>
            </div>
          );
        });
      }
      return (
        <div key={index}>
          <h6>{parameter.name}</h6>
          <div>{mapParameterOptions()}</div>
        </div>
      );
    });
  }

  function handleChange(e) {
    if (e.target.checked === true) {
      setFormData((oldData) => {
        const index = oldData[e.target.name].length;
        oldData[e.target.name][index] = e.target.id;
        return oldData;
      });
    } else if (e.target.checked === false) {
      setFormData((oldData) => {
        const index = oldData[e.target.name].indexOf(e.target.id);
        oldData[e.target.name].splice(index, 1);
        return oldData;
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newArr = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (value.length === 1) {
        newArr.push(`&${key}=${value}`);
      } else if (value.length > 1) {
        value.map((val) => newArr.push(`&${key}=${val}`));
      }
      return newArr;
    });
    setUrlParams(newArr);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {mapParameters()}
        <button>Refine Search</button>
      </form>
    </div>
  );
}
