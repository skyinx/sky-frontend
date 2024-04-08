import * as Yup from "yup";

const { object, string, number } = Yup;

export const inkSchema = object().shape({
  name: string().required("Please enter ink name."),
  // price: number()
  //   .min(0, "Price cannot be less than 0.")
  //   .transform((value) => (isNaN(value) ? undefined : value))
  //   .required("Please enter product price."),
});
