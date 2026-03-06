import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dinaveda Premium | Personalized Ayurvedic Guidance",
    description: "Unlock deep health intelligence. Dinaveda Premium provides personalized diet, sleep, and movement protocols tailored to your body's daily balance.",
    openGraph: {
        title: "Dinaveda Premium | Personalized Ayurvedic Guidance",
        description: "Unlock deep health intelligence with personalized Ayurvedic routines.",
        images: ["/og-premium.png"], // Suggesting an OG image path
    },
};

export default function PremiumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
