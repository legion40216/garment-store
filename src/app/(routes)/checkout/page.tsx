import type { Metadata } from "next";

import HeadingState from "@/components/global-ui/heading-state";
import Client from "./_modules/client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your order and enter your delivery details.",
};

export default function CheckoutPage() {
  return (
    <section className="space-y-6">
      <HeadingState
        title="Checkout"
        subtitle="Enter your details and review your order."
      />

      <Client />
    </section>
  );
}
