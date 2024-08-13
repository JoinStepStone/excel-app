import { useState } from "react";
import MetricDisplay from "../Components/metric";

const Dashboard = () => {
    return (
      <div className="pt-5 ">
        <div className="d-flex justify-content-center">
          <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <MetricDisplay/>
          </div>
          <div className="col-6">
            <MetricDisplay/>
          </div>
          <div className="col-6">
            <MetricDisplay/>
          </div>
          <div className="col-6">
            <MetricDisplay/>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;