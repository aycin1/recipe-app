import React from "react";
import { Link } from "react-router-dom";
import "./Recipe.css";

export default function Recipe({ recipe }) {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Link to={recipe.url} target="_blank">
      <div
        className="recipe-card"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          boxShadow: isHovering === true ? "10px 10px #577d5bb2" : "",
        }}
      >
        <div className="img">
          <img src={recipe.image} alt="recipe-icons" />
          <p>{recipe.title}</p>
        </div>
      </div>
    </Link>
  );
}
