const categories = [
  { title: 'Rings', img: 'https://images.unsplash.com/photo-1600180758895-766bd583ed89?auto=format&fit=crop&w=400&q=60' },
  { title: 'Necklaces', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=60' },
  { title: 'Bracelets', img: 'https://images.unsplash.com/photo-1483356256511-b48749959172?auto=format&fit=crop&w=400&q=60' },
  { title: 'Earrings', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=60' },
];

export default function CategoryGrid() {
  return (
    <section className="grid grid-cols-2 gap-6 py-16 md:grid-cols-4">
      {categories.map(cat => (
        <div key={cat.title} className="text-center space-y-2">
          <img
            src={cat.img}
            alt={cat.title}
            className="h-40 w-full rounded-lg object-cover"
          />
          <h3 className="text-lg font-medium text-primary">{cat.title}</h3>
        </div>
      ))}
    </section>
  );
}
