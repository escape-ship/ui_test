export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden rounded-lg bg-neutral-200 py-24 text-center"
    >
      <img
        src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80"
        alt="Gold jewelry"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
      />
      <h1 className="mb-4 text-6xl font-semibold tracking-tight text-primary">
        Timeless Elegance
      </h1>
      <p className="text-lg text-foreground/80">
        Discover exquisite gold jewelry crafted to perfection.
      </p>
    </section>
  );
}
