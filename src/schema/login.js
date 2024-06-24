import * as Yup from "yup";

const { object, string } = Yup;

export const loginSchema = object().shape({
  email: string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: string().required("Please enter password"),
});
