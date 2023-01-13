import React, {useMemo, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import { Container, Content, Filters } from './style'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import months from '../../utils/months';


interface IData{
    id: string,
    description: string,
    amountFormatted: string,
    dateFormatted: string,
    frequency: string,
    tagColor: string


}

const List: React.FC = () =>{
    const [data, setData] = useState<IData[]>([]);

    const[monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()+1));
    const[yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
    const[selectedFrequency, setSelectedFrequency] = useState<string[]>(['recorrente', 'eventual'])

    const {type} = useParams();

    const info = useMemo(() => {
        return type === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#F7931B',
            file: gains
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            file: expenses
        }
    }, [type]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        info.file.forEach(item => {
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

    },[info]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if (alreadySelected >= 0){
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        }else{
            setSelectedFrequency((prev) => [...prev, frequency]);
        }
    }

    useEffect(() => {
        const filteredData = info.file.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            
            return month.toString() === monthSelected && year.toString() === yearSelected && selectedFrequency.includes(item.frequency);
        });
        console.log(filteredData)
        const formattedData = filteredData.map(item =>{
            var i = String(new Date().getTime() + Math.random()*10000);
            const aux = {
                id: i.toString(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                dateFormatted: formatDate(item.date),
                frequency: item.frequency,
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            };
            i = i+1;
            return aux;

        })

        setData(formattedData); 

    }, [info.file, monthSelected, yearSelected, selectedFrequency]);

    return (
        <Container>
            <ContentHeader title={info.title} lineColor={info.lineColor}>
                <SelectInput options={months} onChange = {(e) => {setMonthSelected(e.target.value) }} defaultValue={monthSelected}/>
                <SelectInput options={years}  onChange = {(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>

            </ContentHeader>

            <Filters>
                <button 
                    type='button'
                    className={`tag-filter tag-filter-recurrent
                        ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >Recorrentes</button>

                <button 
                    type='button'
                    className={`tag-filter tag-filter-eventual
                        ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >Eventuais</button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }

            </Content>
        </Container>
    )  

}


export default List