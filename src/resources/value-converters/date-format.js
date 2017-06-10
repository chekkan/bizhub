import moment from "moment"

export class DateFormatValueConverter {
    static toView(value, format) {
        return moment(value).format(format)
    }
}
