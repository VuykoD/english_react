export default function getNewDate(quantity, isMistake) {
    const newQuantity= isMistake? quantity: quantity +1;
    let addDay = 1;
    if(newQuantity===1) addDay = 2;
    if(newQuantity===2) addDay = 5;
    if(newQuantity===3) addDay = 10;

    const today = new Date();
    const newDate = new Date();
    newDate.setDate(today.getDate()+addDay);
    const dd = newDate.getDate();
    const mm = newDate.getMonth() + 1;
    const yyyy = newDate.getFullYear();

    return {newQuantity, newDate:`${dd}.${mm}.${yyyy}`};
}