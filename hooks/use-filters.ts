/* 
  hooks/useFilters.ts
  Organized by: raiyayusuf
*/

"use client";

import { FilterState } from "@/lib/types/filter";
import { SortOption } from "@/lib/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

/* ============================================
   MAIN HOOK
   ============================================ */
export function useFilters() {
  /* ============================================
     HOOKS & STATE
     ============================================ */
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FilterState>({
    category: [],
    flowerType: [],
    priceRange: null,
    colors: [],
    tags: [],
    featuredOnly: false,
    inStockOnly: true,
    searchKeyword: "",
  });

  const [sortBy, setSortBy] = useState<SortOption>("featured");

  /* ============================================
     URL PARSING EFFECT
     ============================================ */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newFilters: Partial<FilterState> = {};

    // Parse category
    const category = params.get("category");
    if (category) {
      newFilters.category = category.split(",");
    }

    // Parse flowerType
    const flowerType = params.get("flowerType");
    if (flowerType) {
      newFilters.flowerType = flowerType.split(",");
    }

    // Parse priceRange
    const priceRange = params.get("priceRange");
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        newFilters.priceRange = { min, max };
      }
    }

    // Parse colors
    const colors = params.get("colors");
    if (colors) {
      newFilters.colors = colors.split(",");
    }

    // Parse tags
    const tags = params.get("tags");
    if (tags) {
      newFilters.tags = tags.split(",");
    }

    // Parse featured
    const featured = params.get("featured");
    if (featured === "true") newFilters.featuredOnly = true;

    // Parse inStock
    const inStock = params.get("inStock");
    if (inStock === "false") newFilters.inStockOnly = false;

    // Parse search
    const search = params.get("search");
    if (search) newFilters.searchKeyword = search;

    // Parse sort
    const sort = params.get("sort") as SortOption;
    if (
      sort &&
      [
        "price-asc",
        "price-desc",
        "rating-desc",
        "name-asc",
        "name-desc",
        "featured",
      ].includes(sort)
    ) {
      setSortBy(sort);
    }

    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, [searchParams]);

  /* ============================================
     URL UPDATE FUNCTION
     ============================================ */
  const updateURL = useCallback(
    (newFilters: FilterState, newSort: SortOption) => {
      const params = new URLSearchParams();

      if (newFilters.category.length > 0)
        params.set("category", newFilters.category.join(","));
      if (newFilters.flowerType.length > 0)
        params.set("flowerType", newFilters.flowerType.join(","));
      if (newFilters.priceRange)
        params.set(
          "priceRange",
          `${newFilters.priceRange.min}-${newFilters.priceRange.max}`,
        );
      if (newFilters.colors.length > 0)
        params.set("colors", newFilters.colors.join(","));
      if (newFilters.tags.length > 0)
        params.set("tags", newFilters.tags.join(","));
      if (newFilters.featuredOnly) params.set("featured", "true");
      if (!newFilters.inStockOnly) params.set("inStock", "false");
      if (newFilters.searchKeyword)
        params.set("search", newFilters.searchKeyword);
      if (newSort !== "featured") params.set("sort", newSort);

      const queryString = params.toString();
      const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;

      router.push(newUrl, { scroll: false });
    },
    [router, pathname],
  );

  /* ============================================
     FILTER ACTIONS
     ============================================ */
  const updateFilter = useCallback(
    (key: keyof FilterState, value: any) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        updateURL(newFilters, sortBy);
        return newFilters;
      });
    },
    [sortBy, updateURL],
  );

  const updateSort = useCallback(
    (newSort: SortOption) => {
      setSortBy(newSort);
      updateURL(filters, newSort);
    },
    [filters, updateURL],
  );

  const resetFilters = useCallback(() => {
    const defaultFilters: FilterState = {
      category: [],
      flowerType: [],
      priceRange: null,
      colors: [],
      tags: [],
      featuredOnly: false,
      inStockOnly: true,
      searchKeyword: "",
    };
    setFilters(defaultFilters);
    setSortBy("featured");

    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  /* ============================================
     ACTIVE FILTERS COUNT
     ============================================ */
  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === "inStockOnly" && value === true) return count;
      if (Array.isArray(value) && value.length > 0) return count + value.length;
      if (value && !Array.isArray(value)) {
        if (key === "priceRange") return count + 1;
        if (key === "featuredOnly" && value === true) return count + 1;
        if (key === "searchKeyword" && value.trim() !== "") return count + 1;
      }
      return count;
    }, 0);
  }, [filters]);

  /* ============================================
     RETURN VALUES
     ============================================ */
  return {
    filters,
    sortBy,
    updateFilter,
    updateSort,
    resetFilters,
    activeFilterCount,
  };
}
