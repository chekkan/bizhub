import numeral from "numeral"
import "numeral/locales/en-gb"

export class NumberFormatValueConverter {
    toView(value, format) {
        numeral.locale("en-gb")
        return numeral(value).format(format)
    }
}
