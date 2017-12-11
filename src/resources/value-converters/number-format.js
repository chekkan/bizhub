import numeral from "numeral"

export class NumberFormatValueConverter {
    toView(value, format) {
        numeral.locale("en-gb")
        return numeral(value).format(format)
    }
}
