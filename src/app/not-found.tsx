import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl tracking-tighter text-primary sm:text-9xl">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">Page not found.</h1>
      <p className="mt-3 text-muted-foreground">The page you wanted does not exist, or has moved.</p>
      <Link href="/" className="mt-8 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">
        Back home
      </Link>
    </section>
  );
}
