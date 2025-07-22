const categories = [
  {
    title: "Rings",
    img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8291609%2F82916093000.jpg&type=f372_372",
  },
  {
    title: "Necklaces",
    img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fshop-phinf.pstatic.net%2F20250223_188%2F1740301598603Ln1ff_JPEG%2F91071571544438349_1758777392.jpg&type=a340",
  },
  {
    title: "Bracelets",
    img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_2212661%2F22126617438.7.jpg&type=f372_372",
  },
  {
    title: "Earrings",
    img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_2763408%2F27634082808.jpg&type=f372_372",
  },
];

export default function CategoryGrid() {
  return (
    <section className="grid grid-cols-2 gap-6 py-16 md:grid-cols-4">
      {categories.map((cat) => (
        <div key={cat.title} className="text-center space-y-2">
          <img
            src={cat.img}
            alt={cat.title}
            className="h-40 w-full rounded-lg object-contain bg-gray-100"
          />
          <h3 className="text-lg font-medium text-primary">{cat.title}</h3>
        </div>
      ))}
    </section>
  );
}
