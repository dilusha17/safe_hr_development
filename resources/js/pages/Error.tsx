import { Head } from "@inertiajs/react";
import { NotFoundView } from "@/components/NotFoundView";

/** Rendered by Laravel's exception handler for 403, 404, 500 and 503 responses. */
export default function ErrorPage({ status }: { status: number }) {
  if (status === 404) {
    return (
      <>
        <Head title="Page not found | Safe HR Consultants"><meta head-key="robots" name="robots" content="noindex" /></Head>
        <NotFoundView />
      </>
    );
  }
  const title = status === 503 ? "We'll be right back" : status === 403 ? "Access denied" : "This page didn't load";
  const body = status === 503
    ? "The site is down for a short maintenance break. Please try again in a few minutes."
    : status === 403
      ? "You don't have permission to view this page."
      : "Something went wrong on our end. You can try refreshing or head back home.";
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Head title={`${title} | Safe HR Consultants`}><meta head-key="robots" name="robots" content="noindex" /></Head>
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
