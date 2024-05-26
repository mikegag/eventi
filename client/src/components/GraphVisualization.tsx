import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, BarChart, Bar, Rectangle, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GraphProps {
    useCase: string
}

interface PieChart {
    cx :number, 
    cy :number, 
    midAngle :number, 
    innerRadius :number, 
    outerRadius :number, 
    percent :number, 
    index :number
}

//example data for line and bar charts
// const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
// }

//pie chart calculations
const data = [
    { name: 'Group A', value: 480 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  function renderCustomizedLabel ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: PieChart) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

export default function GraphVisualization({useCase}: GraphProps){

    function getUseCaseInformation(givenCase:string){
        const formattedUseCase = givenCase.replace(/\s+/g, '').toLowerCase()
        if (formattedUseCase === 'pie') {
            return "data.dashboardData.generate"
        } else if (formattedUseCase === 'line') {
            return "data.dashboardData.add"
        } else if (formattedUseCase === 'bar') {
            return "data.dashboardData.list"
        }
        return "data.dashboardData.list"
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            {/* <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart> */}

            {/* <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart> */}
        </ResponsiveContainer>
    )
}