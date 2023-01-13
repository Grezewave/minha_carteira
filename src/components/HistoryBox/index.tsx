import React from 'react'

import { Container, ChartContainer, Legend, LegendContainer ,Header } from './styles'

import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';

interface IHistoryBoxProps {
    data: {
        monthNumber: number
        month: string
        amountEntry: number
        amountOutput: number
    }[],
    lineColorEntry: string,
    lineColorOutput: string
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({data, lineColorEntry, lineColorOutput}) => (
    <Container>
        <Header>
            <h2>Histórico de Saldo</h2>
            <LegendContainer>
                <Legend color={lineColorEntry}>
                    <div></div>
                    <span>Entradas</span>
                </Legend>
                <Legend color={lineColorOutput}>
                    <div></div>
                    <span>Saídas</span>
                </Legend>
            </LegendContainer>
        </Header>
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                    <XAxis dataKey="month" stroke="#cecece" />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line 
                        type="monotone"                
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineColorEntry}
                        strokeWidth={5}
                        dot={{ r: 5}}
                        activeDot={{ r: 8}}
                    />
                    <Line 
                        type="monotone"                
                        dataKey="amountOutput"
                        name="Saídas"
                        stroke={lineColorOutput}
                        strokeWidth={5}
                        dot={{ r: 5}}
                        activeDot={{ r: 8}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>

    </Container>    
)  


export default HistoryBox