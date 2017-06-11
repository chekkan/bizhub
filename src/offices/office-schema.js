export default {
    properties: {
        addressLine1: {
            type: "string",
            title: "Address Line 1",
            required: true,
        },
        addressLine2: {
            type: "string",
            title: "Address Line 2",
        },
        townOrCity: {
            type: "string",
            title: "Town or City",
            required: true,
        },
        county: {
            type: "string",
            title: "County",
        },
        country: {
            type: "string",
            title: "Country",
            required: true,
        },
        postalCode: {
            type: "string",
            title: "Postal Code",
            required: true,
            pattern: "^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$",
        },
    },
}
