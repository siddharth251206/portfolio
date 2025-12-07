export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-[hsl(var(--accent))] mb-4">
        404
      </h1>

      <p className="text-xl sm:text-2xl font-semibold mb-3">
        Bruh… this page doesn’t exist.
      </p>

      <p className="text-[hsl(var(--muted-foreground))] max-w-md mb-6">
        Either you typed something cursed, or I messed up the routing.
        Both are believable tbh.
      </p>

      <a
        href="/"
        className="px-6 py-3 rounded-xl btn font-medium hover:opacity-90 transition-all"
      >
        Take Me Home
      </a>
    </div>
  );
}
