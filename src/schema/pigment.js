import * as Yup from "yup";

const { object, string, number } = Yup;

export const pigmentSchema = object().shape({
  name: string().required("Please enter pigment name."),
  price: number()
    .min(0, "Price cannot be less than 0.")
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Please enter pigment price."),
});
