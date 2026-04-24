import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jasa Pembuatan Website & Digital Solutions",
  description: "Penyedia jasa pembuatan website, aplikasi android, data science, dan layanan akademik profesional.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
