export class FilterValueConverter {
    toView(array, property, query) {
        if (query === undefined || query === null || query === "" || !Array.isArray(array)) {
            return array
        }

        const properties = (Array.isArray(property) ? property : [property])
        const term = String(query).toLowerCase()

        return array.filter(entry =>
      properties.some(prop =>
        String(entry[prop]).toLowerCase().indexOf(term) >= 0))
    }
}
