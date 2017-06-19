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
            title: "Start",
            required: true,
        },
        end: {
            type: "string",
            title: "Finish",
            required: true,
        },
        break: {
            type: "number",
            title: "Break",
        },
        ratePerHour: {
            type: "number",
            title: "Rate",
            required: true,
        },
    },
}
