const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);

    const day = (dateFormatted.getDate()+1).toString().padStart(2, '0');
    const month = (dateFormatted.getMonth()+1).toString().padStart(2, '0');
    const year = dateFormatted.getFullYear().toString();

    return `${day}/${month}/${year}`; 

};

export default formatDate;