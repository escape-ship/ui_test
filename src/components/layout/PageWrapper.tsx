import NavBar from "@/components/header/NavBar";
import Footer from "@/components/footer/Footer";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}
