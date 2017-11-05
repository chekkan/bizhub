import numeral from "numeral"
import numeralen from "numeral/locales/en-gb"

export class NumberFormatValueConverter {
    toView(value, format) {
        numeral.locale("en-gb")
        return numeral(value).format(format)
    }
}
