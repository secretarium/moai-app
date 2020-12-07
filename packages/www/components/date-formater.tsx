import React from 'react';
import { parseISO, format } from 'date-fns';

type DateFormaterProps = {
    dateString: string
};

const DateFormater: React.FC<DateFormaterProps> = ({ dateString }) => {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

export default DateFormater;
