export const toDateTime = (timestamp: number): string => {
    const d = new Date(timestamp / 1000000),
        dd = d.getDate(),
        m = d.getMonth() + 1,
        y = d.getFullYear(),
        h = d.getHours(),
        mi = d.getMinutes()
    return (dd < 10 ? '0' : '') + dd + '.' + (m < 10 ? '0' : '') + m + '.' + y + ' - ' + (h < 10 ? '0' : '') + h + ':' + (mi < 10 ? '0' : '') + mi;
};

export const toTimestamp = (date: string, time: string): number => {
    const d = date.split('-');
    const t = time.split(':');
    const dt = new Date(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]), parseInt(t[0]), parseInt(t[1]), parseInt(t[2]));
    return dt.getTime();
};