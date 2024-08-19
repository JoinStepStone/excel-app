import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'University A',
    uv: 4000
  },
  {
    name: 'University B',
    uv: 3000
  },
  {
    name: 'University C',
    uv: 2000
  },
  {
    name: 'University D',
    uv: 2780
  },
  {
    name: 'University E',
    uv: 1890
  },
  {
    name: 'University F',
    uv: 2390
  },
  {
    name: 'University G',
    uv: 3490
  },
];

const BarMetric = ({ userData }) => {
 
  const [university, setUniversity] = useState([])
  
  useEffect(() => {

    if(userData.length){
      const universityCounts = userData.reduce((acc, student) => {
        const university = student.university;
        if (!acc[university]) {
            acc[university] = 0;
        }
        acc[university]++;
        return acc;
      }, {});
  
      // Step 2: Map the results to the desired format
      const data01 = Object.entries(universityCounts).map(([university, uv]) => {
        return { name: university, uv };
      });
      
      setUniversity(data01)
    }
    
  }, [userData])

  return (
    <div>
      {university.length ?
        <BarChart
        width={600}
        height={300}
        data={university}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="uv" fill="#8884d8"  />
      </BarChart>
      :null
      }
  </div>
  );
};
  
  export default BarMetric;