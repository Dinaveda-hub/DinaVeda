export interface Plan {
    id: "monthly" | "yearly";
    name: string;
    price: number;
    interval: "month" | "year";
    features: string[];
    highlight?: boolean;
}

export const plans: Plan[] = [
    {
      id: "monthly",
      name: "Monthly Premium",
      price: 399,
      interval: "month",
      features: [
        "AI Health Coach",
        "Advanced Biological Analytics",
        "Personalized Protocol Insights"
      ]
    },
    {
      id: "yearly",
      name: "Yearly Premium",
      price: 2999,
      interval: "year",
      highlight: true,
      features: [
        "AI Health Coach",
        "Advanced Biological Analytics",
        "Priority Protocol Updates",
        "Save 37% Annually"
      ]
    }
];
