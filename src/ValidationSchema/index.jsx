import * as Yup from "yup";

export const AdminLoginSchema = Yup.object({
    username: Yup.string().max(15,"Username must not be greater than 15 characters.").required("Username field is required."),
    password: Yup.string().max(15,"Password must not be greater than 15 characters.").required("Password field is required."),
});