export class IntegerValueConverter {
    fromView(value) {
        const result = parseInt(value, 10)
        if (isNaN(result)) {
            return 0
        }
        return result
    }
}
