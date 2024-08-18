import { useState } from "react";
import { Table } from 'react-bootstrap';

import MetricDisplay from "../../../Components/metric";

const Student = () => {
    return (
      <div className="pt-5 ">
        <div className="d-flex justify-content-center">
          <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
            <h1>All Students</h1>
          </div>
        </div>
        <div className="mt-5 px-5">
          <Table striped bordered responsive hover style={{ width: "150%" }}>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Exams Taken</th>
                <th className="text-center">Average Score</th>
                <th className="text-center">University</th>
                <th className="text-center">Graduation Year</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Race</th>
                <th className="text-center">Ethnicity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">John</td>
                <td className="text-center">3</td>
                <td className="text-center">97.0</td>
                <td className="text-center">Harvard University</td>
                <td className="text-center">2026</td>
                <td className="text-center">Female</td>
                <td className="text-center">White</td>
                <td className="text-center">Hispanic</td>
              </tr>
              <tr>
                <td className="text-center">John</td>
                <td className="text-center">3</td>
                <td className="text-center">97.0</td>
                <td className="text-center">Harvard University</td>
                <td className="text-center">2026</td>
                <td className="text-center">Female</td>
                <td className="text-center">White</td>
                <td className="text-center">Hispanic</td>
              </tr>
              <tr>
                <td className="text-center">John</td>
                <td className="text-center">3</td>
                <td className="text-center">97.0</td>
                <td className="text-center">Harvard University</td>
                <td className="text-center">2026</td>
                <td className="text-center">Female</td>
                <td className="text-center">White</td>
                <td className="text-center">Hispanic</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  };
  
  export default Student;