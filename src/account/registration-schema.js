export default {
    properties: {
        email: {
            type: "string",
            format: "email",
            title: "Email",
            required: true,
        },
        password: {
            type: "string",
            format: "password",
            title: "Password",
            required: true,
        },
        confirmPassword: {
            type: "string",
            format: "password",
            title: "Confirm Password",
            required: true,
        },
    },
}
