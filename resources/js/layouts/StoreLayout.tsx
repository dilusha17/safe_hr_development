import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useAos } from "@/hooks/useAos";

/** Persistent shell (replaces the TanStack root route component). Header, cart and footer stay mounted between pages. */
export default function StoreLayout({ children }: { children: ReactNode }) {
  useAos();
  return (
    <CartProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:p-3">Skip to content</a>
      <Header />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <Toaster position="bottom-right" richColors closeButton />
    </CartProvider>
  );
}
