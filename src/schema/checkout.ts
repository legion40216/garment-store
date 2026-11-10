import { z } from "zod";

// Fields of the checkout form, in the order they appear on the page.
export const CHECKOUT_FIELDS = [
  "name",
  "email",
  "phone",
  "address",
  "city",
  "country",
] as const;

export type CheckoutField = (typeof CHECKOUT_FIELDS)[number];

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/, "Enter a valid phone number."),
  address: z.string().trim().min(5, "Enter your street address."),
  city: z.string().trim().min(2, "Enter your city."),
  country: z.string().trim().min(2, "Enter your country."),
});

export type CheckoutDetails = z.infer<typeof checkoutSchema>;
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

// Returns one message per invalid field (the first one zod found), or an empty
// object when everything is valid.
export function validateCheckout(
  values: Record<CheckoutField, string>,
): CheckoutErrors {
  const result = checkoutSchema.safeParse(values);
  if (result.success) return {};

  const errors: CheckoutErrors = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as CheckoutField;
    errors[field] ??= issue.message;
  }

  return errors;
}
