// import React from "react";

// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export default function CustomChart() {
//   return (
//     <div>

//       <ResponsiveContainer
//         width="100%"
//         height="100%">
//         <BarChart
//           width={150}
//           height={40}
//           data={data}>
//           <Bar
//             dataKey="uv"
//             fill="#8884d8"
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// src/components/LineGraph.tsx

"use client";
import React from "react";
import { BarChart, Bar, ResponsiveContainer, YAxis, Tooltip, Legend, XAxis } from "recharts";

const data = [
  {
    name: "Baishekh",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Jesth",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Ashad",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Shrawan",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Bhadra",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Ashoj",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Kartik",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: "Mangsir",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },


  {
    name: "Push",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },



  {
    name: "Magh",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },


  {
    name: "Falgun",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },


  {
    name: "Chaitra",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

];

export default function CustomChart() {
  return (
    // <div className=" w-6/12 h-56">
    <ResponsiveContainer
      width="100%"
      height="100%">
      <BarChart
        width={150}
        height={40}
        data={data}>
        <Bar
          dataKey="uv"
          // fill="#8884d8"
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
    // </div>
  );
}
