import dayjs from "dayjs";

export const getRefineDate = (date) => date && dayjs(date).format('YYYY-MM-DD HH:mm:ss');


