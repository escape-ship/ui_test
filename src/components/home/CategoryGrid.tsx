const categories = [
  { title: 'Rings', img: 'https://images.unsplash.com/photo-1600180758895-766bd583ed89?auto=format&fit=crop&w=400&q=60' },
  { title: 'Necklaces', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=60' },
  { title: 'Bracelets', img: 'https://images.unsplash.com/photo-1483356256511-b48749959172?auto=format&fit=crop&w=400&q=60' },
  { title: 'Earrings', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=60' },
];

export default function CategoryGrid() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12">
      {categories.map(cat => (
        <div key={cat.title} className="text-center">
          <img src={cat.img} alt={cat.title} className="rounded-lg mb-2 h-32 w-full object-cover" />
          <h3 className="font-semibold">{cat.title}</h3>
        </div>
      ))}
    </section>
  );
}
