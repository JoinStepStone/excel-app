import { useState } from "react";

const SuggestionLists = ({ name, list, handleSuggestionClick }) => {
    return (
      <ul style={{ 
          zIndex: 1,
          width: "100%", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", 
          backgroundColor: "#F0F0F0", 
          border: "1px solid #ccc", 
          marginTop: 0, position: "absolute" 
          }}
        >
        {list.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(name,suggestion)}
            style={{
              cursor: "pointer",
              padding: "5px 10px",
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };
  
  export default SuggestionLists;