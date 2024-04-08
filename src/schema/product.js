import * as Yup from "yup";

const { object, string, number } = Yup;

export const productSchema = object().shape({
  name: string().required("Please enter product name."),
  price: number()
    .min(0, "Price cannot be less than 0.")
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Please enter product price."),
});
