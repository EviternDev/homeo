import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border/70 bg-card/70">
      <div className="container-shell flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>Homeo Care - modern homeopathic store experience.</p>
        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:text-primary">
            Medicines
          </Link>
          <Link href="/cart" className="hover:text-primary">
            Cart
          </Link>
          <Link href="/login" className="hover:text-primary">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
