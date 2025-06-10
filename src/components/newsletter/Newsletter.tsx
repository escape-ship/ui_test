export default function Newsletter() {
  return (
    <section className="mt-16 md:mt-24 wrapper flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold">Subscribe to our newsletter</h3>
      <div className="flex gap-2 w-full max-w-md">
        <input type="email" className="flex-1 border px-3 py-2 rounded-md" placeholder="Your email" />
        <button className="btn-primary">Subscribe</button>
      </div>
    </section>
  )
}
