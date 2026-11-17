import { AppLink as Link } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex shrink-0 items-center rounded-md", variant === "light" && "bg-background p-2", className)} aria-label="Safe HR Consultants home">
      <img src="/logo.svg" alt="Safe HR Consultants" width={2026} height={627} className={cn("w-auto object-contain", variant === "light" ? "h-10" : "h-10 md:h-12")} />
    </Link>
  );
}
