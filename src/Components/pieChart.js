import { useEffect, useState } from 'react';
import { getAllStudents } from '../API/Admin';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Male', value: 400, fill: "#1f77b4" },
  { name: 'Female', value: 250, fill: "#82ca9d" },
  { name: 'Not Disclosed', value: 50, fill: "#ffc658" }
];

const PieMetric = ({ userData }) => {
  
  const [gender, setGender] = useState([])

  useEffect(() => {

    if(userData.length){
      const genderCounts = userData.reduce((acc, student) => {
        const gender = student.gender || 'Not Disclosed';
        if (!acc[gender]) {
            acc[gender] = 0;
        }
        acc[gender]++;
        return acc;
      }, {});
  
      const data01 = Object.entries(genderCounts).map(([gender, value]) => {
        let fill;
        switch (gender) {
            case 'Male':
                fill = "#1f77b4";
                break;
            case 'Female':
                fill = "#82ca9d";
                break;
            default:
                fill = "#ffc658";
                break;
        }
        return { name: gender, value, fill };
      });
      setGender(data01)
    }
    
  }, [userData])

  return (
    <PieChart width={300} height={300}>
      {gender.length ? 
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={gender}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        />
        :
        null
      }
      <Tooltip />
      <Legend 
        layout="horizontal" 
        align="center" 
        verticalAlign="top"
      />
    </PieChart>
  );
};
  
  export default PieMetric;