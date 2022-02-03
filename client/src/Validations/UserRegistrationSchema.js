import * as yup from "yup";

const UserRegistrationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    confirmEmail: yup
        .string()
        .required("Confirm email is required"),
    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "First name must be longer than 2 characters")
        .max(12, "First name must be no longer than 12 characters"),
    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Last name must be longer than 2 characters")
        .max(12, "Last name must be no longer than 12 characters"),
    residentialAddress: yup
        .string()
        .required("Last name is required")
        .min(2, "Residential address must be longer than 2 characters")
        .max(24, "Residential address must be no longer than 24 characters"),
    sex: yup
        .string()
        .required("Sex is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be longer than 8 characters")
        .max(16, "Password must be no longer than 16 characters"),
    confirmPassword: yup
        .string()
        .required("Password is required")

})

export default UserRegistrationSchema;