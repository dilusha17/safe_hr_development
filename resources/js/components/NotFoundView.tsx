import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { AppLink as Link } from "@/lib/nav";

export function NotFoundView() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <Logo className="mb-6" />
        <p className="font-display text-7xl font-bold text-safety-700">404</p>
        <h1 className="mt-4 text-3xl text-navy-900">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn't find that page. Try the shop or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline"><Link to="/blog">Blog</Link></Button>
          <Link to="/shop" className="inline-flex h-11 items-center rounded-md bg-safety-500 px-5 font-semibold text-navy-900 hover:bg-safety-600">Shop</Link>
          <Link to="/" className="inline-flex h-11 items-center rounded-md border-2 border-navy-900 px-5 font-semibold text-navy-900">Home</Link>
        </div>
      </div>
    </div>
  );
}
