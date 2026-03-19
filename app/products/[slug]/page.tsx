import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductActionsPanel } from "@/components/products/ProductActionsPanel";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/lib/api/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 3);

  return (
    <section className="py-8 sm:py-12">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article>
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {product.category} / {product.subcategory}
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-snug">{product.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>

            <div className="mt-8 grid gap-8 rounded-3xl border border-border/60 bg-card/30 p-6">
              <div>
                <h2 className="text-2xl font-semibold">Benefits</h2>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="rounded-full border border-border/70 px-4 py-2 text-foreground">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold">Dosage</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{product.dosage}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Ingredients</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                    {product.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <dl className="grid gap-4 rounded-2xl border border-border/50 bg-background/40 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Rating</dt>
                  <dd className="font-semibold text-primary">{product.rating.toFixed(1)} / 5</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Reviews</dt>
                  <dd className="font-semibold">{product.reviews}</dd>
                </div>
              </dl>
            </div>
          </article>

          <ProductActionsPanel product={product} />
        </div>

        {related.length > 0 ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Related products</h2>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
