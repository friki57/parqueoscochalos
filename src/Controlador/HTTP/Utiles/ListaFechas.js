module.exports = (ini, fin) =>
{
    function getDates(startDate, stopDate) {
        let dateArray = new Array();
        stopDate = addDay(stopDate)
        while (startDate!=stopDate) {
            dateArray.push(startDate);
            startDate = addDay(startDate);
        }
        console.log(dateArray)
        return dateArray;
    }
    return getDates((ini), (fin))
}
function addDay (dateOr) {
    let date = new Date(dateOr);
    let next_date = new Date(date.setDate(date.getDate() + 1));
    return next_date.toISOString().substring(0, 10);
}