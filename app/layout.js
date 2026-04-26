import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import FloatingWA from "@/components/FloatingWA";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CENDEKIA.ID - Digital Solutions & Academic Support",
  description: "Solusi cerdas untuk Website, Android, Data Science, dan Bantuan Akademik.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navbar />
        {children}
        <FloatingWA />
      </body>
    </html>
  );
}
