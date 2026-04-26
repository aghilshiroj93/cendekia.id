'use client';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import FloatingWA from "@/components/FloatingWA";

export default function ConditionalUI({ children }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      {children}
      {!isAdminPath && <FloatingWA />}
    </>
  );
}
