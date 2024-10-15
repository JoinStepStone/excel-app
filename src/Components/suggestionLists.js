import { useState, useEffect } from "react";

const SuggestionLists = ({ name, list, handleSuggestionClick, width }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track which suggestion is highlighted

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Move highlight down
      setHighlightedIndex((prevIndex) => 
        prevIndex < list.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // Move highlight up
      setHighlightedIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Handle the Enter key to select the highlighted item
      handleSuggestionClick(name, list[highlightedIndex]);
      setHighlightedIndex(-1); // Reset after selection
    }
  };

  useEffect(() => {
    // Add keydown event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedIndex, list]); // Re-run when highlightedIndex or list changes

  return (
    <ul
      style={{
        zIndex: 1,
        width: width ? width : "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#F0F0F0",
        border: "1px solid #ccc",
        marginTop: 0,
        position: "absolute",
        top: 0,
        maxHeight: "150px",
        overflowY: "auto",
      }}
    >
      {list.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleSuggestionClick(name, suggestion)}
          style={{
            cursor: "pointer",
            padding: "5px 10px",
            backgroundColor:
              index === highlightedIndex ? "#b3d4fc" : index % 2 === 0 ? "#f9f9f9" : "#fff", // Highlight the selected suggestion
          }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionLists;