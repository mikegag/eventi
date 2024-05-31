import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label} from 'recharts';
import dataFile from "../Data.json"

interface GraphProps {
    useCase: string,
    description: (variable:string) =>void
}

export default function GraphVisualization({useCase, description}: GraphProps){
    //example data
    const data = [
        { name: 'Toronto', value: 3 },
        { name: 'Missisauga', value: 1 },
        { name: 'Markham', value: 4 },
        { name: 'Woodbridge', value: 2 },
    ]

    function getUseCaseInformation(givenCase:string){
        const formattedUseCase = givenCase.replace(/\s+/g, '').toLowerCase()
        if (formattedUseCase === 'location') {
            return dataFile.visualizations.pie
        } else if (formattedUseCase === 'time') {
            return dataFile.visualizations.line
        } else if (formattedUseCase === 'totalIdeas') {
            return dataFile.visualizations.bar
        }
        return dataFile.visualizations.bar
    }

    const graphData = getUseCaseInformation(useCase)
   
    useEffect(() => {
        // Call description function when the component mounts or when useCase changes
        description(graphData.caption);
    }, [description])

    const hi = ["d"]
    return (
        <ResponsiveContainer width="99%" height="99%">
            {useCase === "location" ? (
                <PieChart width={320} height={320}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name }) => `${name}`}
                        outerRadius={80}
                        dataKey="value"
                        aria-label={graphData.ariaLabel}
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={graphData.colorfill[index % graphData.colorfill.length]} />
                        ))}
                    </Pie>
                </PieChart>
                )   
                :
                (useCase === "totalIdeas" ?
                        <BarChart
                            width={320}
                            height={320}
                            data={data}
                            margin={{ top: 15, right: 20, left: 20, bottom: 30}}
                            aria-label={graphData.ariaLabel}
                        >
                            <XAxis>
                                <Label value="Last 12 Months" offset={-25} position="insideBottom" />
                            </XAxis>
                            <YAxis>
                                <Label value="# of Date Ideas Created" angle={-90} dx={-35} position="inside" />
                            </YAxis>
                            <Tooltip/>
                            <Bar dataKey="value" fill={`${graphData.colorfill}`}/>
                        </BarChart>
                    :
                    (
                        <LineChart
                            width={320}
                            height={320}
                            data={data}
                            margin={{ top: 15, right: 30, left: 20, bottom: 30}}
                            aria-label={graphData.ariaLabel}
                        >
                            <XAxis >
                                <Label value="Last 4 Weeks" offset={-25} position="insideBottom" />
                            </XAxis>
                            <YAxis>
                                <Label value="# of Dates" angle={-90} offset={-10} position="insideLeft" />
                            </YAxis>
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke={`${graphData.colorfill}`} />
                        </LineChart>
                    )
            )}
        </ResponsiveContainer>
    )
}