export default function CategoryGrid() {
  const categories = [
    { name: 'Rings', img: '/rings.jpg' },
    { name: 'Necklaces', img: '/necklaces.jpg' },
    { name: 'Bullion', img: '/bullion.jpg' },
    { name: 'Bracelets', img: '/bracelets.jpg' },
    { name: 'Earrings', img: '/earrings.jpg' },
    { name: 'Others', img: '/others.jpg' },
  ]

  return (
    <section className="mt-16 md:mt-24 wrapper">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="relative overflow-hidden group">
            <img src={cat.img} alt={cat.name} className="w-full h-40 object-cover transition group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            <h3 className="absolute bottom-4 left-4 text-xl text-white">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
