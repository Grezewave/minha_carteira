import React, {useMemo, useState} from 'react'

import {Container, Content} from './style';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';

import months from '../../utils/months';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'


const Dashboard: React.FC = () =>{

    const[monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()+1));
    const[yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        });
        
        setYearSelected(uniqueYears[uniqueYears.length - 1].toString())

        return uniqueYears.map(year => {
            return {
                value: year,
                label:year
            }
        })

    },[]);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth()+1;

            if (month.toString() === monthSelected && year.toString() === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total
    },[monthSelected, yearSelected])

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth()+1;

            if (month.toString() === monthSelected && year.toString() === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total
    },[monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        const total = totalGains - totalExpenses;
        return total;
    },[totalGains, totalExpenses])

    const message = useMemo(() => {
        if (totalBalance > 0){
            return {
                title:'Muito bem!',
                description:'Sua carteira está positiva',
                footerText:'Continue assim! Considere investir seu saldo',
                icon:happyImg
            }
        }else if (totalBalance < 0){
            return {
                title:'Que triste!',
                description:'Sua carteira está negativa.',
                footerText:'Verifique seus gastos e replaneje!',
                icon:sadImg
            }
        }else if (totalGains === 0 && totalExpenses === 0){
            return {
                title:'Ops!',
                description:'Neste mês não há registros.',
                footerText:'Parece que você não fez nenhuma transação no período selecionado!',
                icon:grinningImg
            }
        }else{
            return {
                title:'Ufaa!',
                description:'Sua carteira está zerada.',
                footerText:'Tenha cuidado com seus gastos! Tente poupar',
                icon:grinningImg
            }
        }

    }, [totalBalance, totalGains, totalExpenses])

    const relationExpensesVsGains = useMemo(() => {
        const total = totalGains + totalExpenses

        const gainsPercent = Number((100*totalGains/total).toFixed(1))
        const expensesPercent = Number((100*totalExpenses/total).toFixed(1))

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: gainsPercent ? gainsPercent : 0,
                color: '#F7931B'
            },{
                name: "Saídas",
                value: totalExpenses,
                percent: expensesPercent ? expensesPercent : 0,
                color: '#E44c4E'
            }
        ]

        return data

    }, [totalGains, totalExpenses])

    const relationExpensesRecVsEve = useMemo(() => {
        let aRecurrent = 0;
        let aEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === Number(monthSelected) && year === Number(yearSelected);
        }).forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return aRecurrent += Number(expense.amount)
            }
            if(expense.frequency === 'eventual'){
                return aEventual += Number(expense.amount)
            }
        })

        const total = aRecurrent + aEventual;

        const percentRecurrent = Number((100*aRecurrent/total).toFixed(1))

        const percentEventual = Number((100*aEventual/total).toFixed(1))

        return [{
            name: 'Recorrentes',
            amount: aRecurrent,
            percent: percentRecurrent ? percentRecurrent : 0,
            color: "#F7931B"
        },{
            name: 'Eventuais',
            amount: aEventual,
            percent: percentEventual ? percentEventual : 0,
            color: "#E44C4E"
        }]
    },[monthSelected, yearSelected])

    const relationGainsRecVsEve = useMemo(() => {
        let aRecurrent = 0;
        let aEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === Number(monthSelected) && year === Number(yearSelected);
        }).forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return aRecurrent += Number(gain.amount)
            }
            if(gain.frequency === 'eventual'){
                return aEventual += Number(gain.amount)
            }
        })

        const total = aRecurrent + aEventual;

        const percentRecurrent = Number((100*aRecurrent/total).toFixed(1))

        const percentEventual = Number((100*aEventual/total).toFixed(1))

        return [{
            name: 'Recorrentes',
            amount: aRecurrent,
            percent: percentRecurrent ? percentRecurrent : 0,
            color: "#F7931B"
        },{
            name: 'Eventuais',
            amount: aEventual,
            percent: percentEventual ? percentEventual : 0,
            color: "#E44C4E"
        }]
    },[monthSelected, yearSelected])

    const historyData = useMemo(() => {
        return months.map((month,_) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month.value && gainYear.toString() === yearSelected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error("amountEntry is invalid. amountEntry must be a valid number")
                    }
                }
            })

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month.value && expenseYear.toString() === yearSelected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error("amountOutput is invalid. amountOutput must be a valid number")
                    }
                }
            })

            return {
                monthNumber: month.value,
                month: month.label.substr(0,3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item =>{
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (Number(yearSelected) === currentYear && item.monthNumber <= currentMonth) ||
                   (Number(yearSelected) < currentYear)
        })

    }, [yearSelected])

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor='#ACD5E3'>
                <SelectInput options={months} onChange = {(e) => {setMonthSelected(e.target.value) }} defaultValue={monthSelected}/>
                <SelectInput options={years}  onChange = {(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>

            </ContentHeader>
            <Content>
                <WalletBox
                    title='Saldo'
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon='dolar'
                    color='#4e41F0'
                />
                <WalletBox
                    title='Entradas'
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas"
                    icon='arrowUp'
                    color='#F7931B'
                />
                <WalletBox
                    title='Saídas'
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas saídas"
                    icon='arrowDown'
                    color='#E44C4E'
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExpensesVsGains}/>

                <HistoryBox
                    data={historyData}
                    lineColorEntry="#F7931B"
                    lineColorOutput="#E44C4E"
                />

                <BarChartBox title="Saídas" data={relationExpensesRecVsEve}/>

                <BarChartBox title="Entradas" data={relationGainsRecVsEve}/>
                
            </Content>
        </Container>   
    )  

}


export default Dashboard