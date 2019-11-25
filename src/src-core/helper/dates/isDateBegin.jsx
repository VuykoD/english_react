export default function isDateBegin(date) {
    const d = new Date();
    const currentDay = d.getDate();
    const currentMonth = d.getMonth() + 1;
    const currentYear = d.getFullYear();
    const dateArr=date.split('.');

    const day = +dateArr[0];
    const month = +dateArr[1];
    const year = +dateArr[2];
    if (currentYear>year ||
        (currentYear===year && currentMonth>month) ||
        (currentYear===year && currentMonth===month && currentDay>=day)
    )return true;
    return false;
}