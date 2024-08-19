import { useState } from "react";

const MetricDisplay = ({ title }) => {
    return (
      <h3 className="border border-dark rounded px-5 py-5 m-5 text-center pointer">{title ? title : "Metric Display"}</h3>
    );
  };
  
  export default MetricDisplay;