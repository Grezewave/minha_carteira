import React from 'react'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { Container, SideLeft, Legend,LegendContainer, SideRight } from './styles'

interface IPieChartProps {
    data: {
        name: string
        value: number
        percent: number
        color: string
    }[]
}

const PieChartBox: React.FC<IPieChartProps> = ({data}) => (
    <Container>
        <SideLeft>
            <LegendContainer>
                {
                    data.map(indicator => (
                        <Legend key={indicator.name} color={indicator.color}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>        
        </SideLeft>
        
        <SideRight>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="percent"
                    >
                        {
                            data.map(indicator => (
                                <Cell key={indicator.name} fill={indicator.color} />                                
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>    
);  



export default PieChartBox