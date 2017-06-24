export class FloatValueConverter {
    fromView(value) {
        const result = parseFloat(value)
        if (isNaN(result)) {
            return 0
        }
        return result
    }
}
