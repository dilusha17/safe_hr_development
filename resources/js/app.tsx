import "../css/app.css";

import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import StoreLayout from "@/layouts/StoreLayout";

type PageModule = { default: { layout?: (page: ReactNode) => ReactNode } };

// One stable layout function: Header, cart drawer and Footer stay mounted while navigating.
const storeLayout = (page: ReactNode) => <StoreLayout>{page}</StoreLayout>;

const pages = import.meta.glob<PageModule>("./pages/**/*.tsx");

createInertiaApp({
  resolve: async (name) => {
    const loader = pages[`./pages/${name}.tsx`];
    if (!loader) throw new Error(`Inertia page not found: ${name}`);
    const page = await loader();
    page.default.layout ??= storeLayout;
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  progress: { color: "#F5B027" },
});
