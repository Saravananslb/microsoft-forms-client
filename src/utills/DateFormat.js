const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getMonthName = (index) => {
    return months[index];
}

export const getDaysName = (index) => {
    return days[index];
}