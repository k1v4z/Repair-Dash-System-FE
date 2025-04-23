export type PlanFeature = {
  text: string;
  included: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string | null;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
  badge?: string;
  annualDiscount?: string;
  type: "FREE" | "MONTHLY" | "YEARLY";
};
