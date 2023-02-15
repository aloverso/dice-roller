import dayjs from "dayjs";

export const getCurrentTimestamp = (): string => {
  return dayjs().format();
};
