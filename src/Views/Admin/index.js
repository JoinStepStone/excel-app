import { useState, useEffect } from "react";
import MetricDisplay from "../../Components/metric";
import PieMetric from "../../Components/pieChart";
import BarMetric from "../../Components/barChart";
import { getAllStudents } from '../../API/Admin';



const Dashboard = () => {
  const [userData, setUserData] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      const response = await getAllStudents()
      setUserData(response.data)
    }

    fetchData()
  }, [])

  return (
    <div className="pt-5 ">
      <div className="d-flex justify-content-center">
        <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="row align-items-end" style={{ height: "100%"}}>
        <div className="col-6 mt-2 d-flex justify-content-center">
          <PieMetric userData = {userData}/>
        </div>
        <div className="col-6 mt-2 d-flex justify-content-center">
          <BarMetric userData = {userData}/>
        </div>
        {/* <div className="col-12 mt-2 d-flex justify-content-center">
          <MetricDisplay title={"Google Metric"}/>
        </div> */}
      </div>
    </div>
  );
};
  
export default Dashboard;