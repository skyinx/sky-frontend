import * as Yup from "yup";

const { object, number } = Yup;

export const labelSchema = object().shape({
  percentage: number()
    .min(1, "Percentage cannot be less than 1.")
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Please enter percentage."),
});
