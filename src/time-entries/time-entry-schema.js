export default {
    properties: {
        organization: {
            type: "object",
            title: "Organization",
            "x-form-options": "organizations",
            properties: {
                id: {
                    type: "string",
                },
            },
        },
        office: {
            type: "object",
            title: "Office",
            "x-form-options": "offices",
            "x-child-of": "organization",
            properties: {
                id: {
                    type: "string",
                },
            },
        },
        start: {
            type: "string",
            format: "date-time",
            title: "Start",
            required: true,
        },
        end: {
            type: "string",
            format: "date-time",
            title: "Finish",
            required: true,
        },
        break: {
            type: "integer",
            title: "Break",
            default: 0,
            minimum: 0,
            maximum: 1440,
        },
        ratePerHour: {
            type: "number",
            title: "Rate",
            required: true,
            minimum: 0,
            multipleOf: 0.01,
        },
    },
}
