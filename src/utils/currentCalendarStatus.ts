import moment, { Moment } from "moment";

export function currentStatus(data: string | number, status: string, dateObject: Moment, selectedDate: Moment) {
    let result = false

    if (status == "date") {
        result = dateObject.year().toString() + data + dateObject.month().toString() == selectedDate.year().toString() + selectedDate.date().toString() + selectedDate.month().toString()
    }

    if (status == "month") {
        result = dateObject.year().toString() + moment.months().indexOf(`${data}`) == selectedDate.year().toString() + selectedDate.month().toString()
    }

    if (status == "year") {
        result = data.toString() == selectedDate.year().toString()
    }

    return result
}