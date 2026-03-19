"use client";

import { ProductCategory, SortOption } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductFiltersProps = {
  category: ProductCategory | "all";
  setCategory: (value: ProductCategory | "all") => void;
  search: string;
  setSearch: (value: string) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
};

export function ProductFilters({
  category,
  setCategory,
  search,
  setSearch,
  sortBy,
  setSortBy,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 rounded-3xl border border-border bg-white/80 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={category === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory("all")}
          >
            All
          </Button>
          <Button
            variant={category === "bottled" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory("bottled")}
          >
            Bottled
          </Button>
          <Button
            variant={category === "pills" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setCategory("pills")}
          >
            Pills
          </Button>
        </div>

        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search medicine..."
          className="md:max-w-xs"
        />

        <div className="md:ml-auto md:w-52">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price low to high</SelectItem>
              <SelectItem value="price-high">Price high to low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
