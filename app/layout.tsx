import type { Metadata } from "next";
import {
    Geist,
    Martian_Mono,
    Schibsted_Grotesk,
} from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import LightRays from "@/components/LightRays";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

const schibstedGrotesk = Schibsted_Grotesk({
    subsets: ["latin"],
    variable: "--font-schibsted-grotesk",
});

const martianMono = Martian_Mono({
    subsets: ["latin"],
    variable: "--font-martian-mono",
});

export const metadata: Metadata = {
    title: "DevExpress",
    description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "min-h-screen antialiased font-sans",
                geist.variable,
                schibstedGrotesk.variable,
                martianMono.variable
            )}
        >
        <body className="relative flex min-h-screen flex-col isolate">
        {/* Background Effects */}
        <div className="pointer-events-none fixed inset-0 -z-10">
            <LightRays
                raysOrigin="top-center-offset"
                raysColor="#5dfeca"
                raysSpeed={0.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.02}
                noiseAmount={0}
                distortion={0.01}
                className="custom-rays"
                pulsating={false}
                fadeDistance={1}
                saturation={1}
            />
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">
            {children}
        </main>
        </body>
        </html>
    );
}