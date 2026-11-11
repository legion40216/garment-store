"use client";

import { type ComponentProps, type FormEvent, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CHECKOUT_FIELDS,
  type CheckoutErrors,
  type CheckoutField,
  validateCheckout,
} from "@/schema/checkout";

// The submit button lives in the order summary, so it points at this id.
export const CHECKOUT_FORM_ID = "checkout-form";

function readValues(form: HTMLFormElement) {
  const data = new FormData(form);

  return Object.fromEntries(
    CHECKOUT_FIELDS.map((field) => [field, String(data.get(field) ?? "")]),
  ) as Record<CheckoutField, string>;
}

function Field({
  label,
  name,
  error,
  ...inputProps
}: {
  label: string;
  name: CheckoutField;
  error?: string;
} & Omit<ComponentProps<typeof Input>, "name">) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutForm({ onValid }: { onValid: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    const found = validateCheckout(readValues(event.currentTarget));
    setErrors(found);

    const firstInvalid = CHECKOUT_FIELDS.find((field) => found[field]);

    if (firstInvalid) {
      // Take the customer straight to the first thing they need to fix.
      const input = event.currentTarget.elements.namedItem(firstInvalid);
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    onValid();
  };

  // Once the customer has tried to submit, errors clear as they fix each field.
  const handleChange = () => {
    if (!hasSubmitted || !formRef.current) return;
    setErrors(validateCheckout(readValues(formRef.current)));
  };

  return (
    <form
      ref={formRef}
      id={CHECKOUT_FORM_ID}
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="space-y-8"
    >
      <fieldset className="space-y-4">
        <legend className="mb-4 text-lg font-medium">Billing details</legend>

        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Alexa Ward"
          error={errors.name}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alexa@example.com"
            error={errors.email}
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 1234567"
            error={errors.phone}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-4 text-lg font-medium">Shipping info</legend>

        <Field
          label="Address"
          name="address"
          autoComplete="street-address"
          placeholder="12 William Avenue"
          error={errors.address}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="City"
            name="city"
            autoComplete="address-level2"
            placeholder="Hyderabad"
            error={errors.city}
          />
          <Field
            label="Country"
            name="country"
            autoComplete="country-name"
            placeholder="Pakistan"
            error={errors.country}
          />
        </div>
      </fieldset>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Payment method</h2>
        <p className="rounded-lg border p-3 text-sm">
          Cash on delivery. You pay when your order arrives.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        This is a demo store. Your details are only checked in your browser;
        they are not sent or saved anywhere.
      </p>
    </form>
  );
}
