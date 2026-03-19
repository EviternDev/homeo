"use client";

import { motion } from "framer-motion";

const points = [
  { title: "Quality Checked", value: "100%", text: "Lab-verified quality process" },
  { title: "Orders Delivered", value: "10k+", text: "Trusted by returning customers" },
  { title: "Formats Available", value: "2", text: "Bottled and pill medicines" },
];

export function Benefits() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-shell">
        <div className="rounded-4xl border border-border bg-white/70 p-6 sm:p-8">
          <h2 className="text-3xl">Why customers prefer Homeo</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{point.title}</p>
                <p className="mt-2 text-3xl font-semibold text-primary">{point.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
