import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalUI from "@/components/ConditionalUI";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CENDEKIA.ID - Digital Solutions & Academic Support",
  description: "Solusi cerdas untuk Website, Android, Data Science, dan Bantuan Akademik.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ConditionalUI>
          {children}
        </ConditionalUI>
      </body>
    </html>
  );
}
