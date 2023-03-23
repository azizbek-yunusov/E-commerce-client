import moment from "moment";

export const datePicker = (date) =>
  moment(date).locale('uz-latn').format("LLLL")