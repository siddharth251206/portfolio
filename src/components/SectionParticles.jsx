import FloatingParticle from "./FloatingParticle";

export default function SectionParticles({ count = 10 }) {
  const shapes = ["circle", "diamond", "triangle", "square", "blob"];

  const particles = Array.from({ length: count }, (_, i) => {
    const size = 6 + Math.random() * 26;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    const colors = [
      "rgba(0,150,255,0.25)",
      "rgba(0,130,220,0.22)",
      "rgba(0,180,255,0.20)",
      "rgba(0,200,255,0.18)",
      "rgba(0,100,220,0.15)",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const top = Math.random() * 100 + "%";
    const left = Math.random() * 100 + "%";

    return { id: i, size, shape, color, top, left };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <FloatingParticle
          key={p.id}
          size={p.size}
          shape={p.shape}
          color={p.color}
          top={p.top}
          left={p.left}
        />
      ))}
    </div>
  );
}
