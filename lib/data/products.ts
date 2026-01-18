// lib\data\products.ts:
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: "bouquet" | "bunch" | "bag";
  flowerType: "rose" | "tulip" | "gerbera" | "hydrangea" | "mixed";
  color: string[];
  tags: string[];
  featured: boolean;
  image: string;
  stock: number;
  filename: string;
  packaging: "bouquet" | "bunch" | "bag";
  inStock: boolean;
}

export const products: Product[] = [
  // Bouquet Flowers
  {
    id: 1,
    filename: "rose-red-bouquet-white.jpg",
    name: "Mawar Merah Buket Putih",
    description:
      "Buket mawar merah segar dengan wrapping eksklusif mikic, cocok untuk ungkapan cinta terdalam.",
    price: 185000,
    rating: 4.8,
    category: "bouquet",
    flowerType: "rose",
    color: ["Merah", "Hijau"],
    tags: ["romantic", "anniversary", "love"],
    featured: true,
    image: "/images/flowers/bouquet/rose-red-bouquet-white.jpg",
    stock: 15,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 2,
    filename: "rose-white-bouquet-black.jpg",
    name: "Mawar Putih Buket Hitam",
    description:
      "Mawar putih elegan dengan wrapping hitam kontras, memberikan kesan misterius dan sophisticated.",
    price: 195000,
    rating: 4.9,
    category: "bouquet",
    flowerType: "rose",
    color: ["Putih", "Hitam"],
    tags: ["elegant", "luxury", "wedding"],
    featured: true,
    image: "/images/flowers/bouquet/rose-white-bouquet-black.jpg",
    stock: 10,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 3,
    filename: "rose-white-pink-bouquet-pink.jpg",
    name: "Mawar Putih Pink Buket Pink",
    description:
      "Perpaduan mawar putih dan pink lembut dengan wrapping pink matching, sangat romantis dan manis.",
    price: 175000,
    rating: 4.6,
    category: "bouquet",
    flowerType: "rose",
    color: ["Putih", "Pink"],
    tags: ["romantic", "sweet", "gift"],
    featured: false,
    image: "/images/flowers/bouquet/rose-white-pink-bouquet-pink.jpg",
    stock: 20,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 4,
    filename: "rose-white-red-bouquet-cream.jpg",
    name: "Mawar Putih Merah Buket Cream",
    description:
      "Kombinasi sempurna mawar putih dan merah dengan wrapping cream, untuk anniversary spesial.",
    price: 210000,
    rating: 4.8,
    category: "bouquet",
    flowerType: "rose",
    color: ["Putih", "Merah"],
    tags: ["anniversary", "special", "luxury"],
    featured: true,
    image: "/images/flowers/bouquet/rose-white-red-bouquet-cream.jpg",
    stock: 8,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 6,
    filename: "rose-peach-bouquet-brokenwhite.jpg",
    name: "Mawar Peach Buket Broken White",
    description:
      "Mawar warna peach soft dengan wrapping broken white textured, sangat aesthetic dan instagrammable.",
    price: 180000,
    rating: 4.6,
    category: "bouquet",
    flowerType: "rose",
    color: ["Peach", "Broken White", "Putih"],
    tags: ["aesthetic", "soft", "luxury"],
    featured: false,
    image: "/images/flowers/bouquet/rose-peach-bouquet-brokenwhite.jpg",
    stock: 12,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 7,
    filename: "rose-pinksoft-bouquet-brokenwhite.jpg",
    name: "Mawar Pink Soft Buket Broken White",
    description:
      "Mawar pink muda dengan wrapping broken white, kombinasi yang sangat feminine dan elegant.",
    price: 175000,
    rating: 4.6,
    category: "bouquet",
    flowerType: "rose",
    color: ["Pink Soft", "Broken White", "Putih"],
    tags: ["feminine", "elegant", "luxury"],
    featured: false,
    image: "/images/flowers/bouquet/rose-pinksoft-bouquet-brokenwhite.jpg",
    stock: 15,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 8,
    filename: "gerbera-pink-bouquet-brokenwhite.jpg",
    name: "Gerbera Pink Buket Broken White",
    description:
      "Gerbera pink muda dengan wrapping broken white, kombinasi yang sangat feminina dan elegant.",
    price: 155000,
    rating: 4.4,
    category: "bouquet",
    flowerType: "gerbera",
    color: ["Pink", "Broken White", "Putih"],
    tags: ["happy", "romantic", "gift"],
    featured: false,
    image: "/images/flowers/bouquet/gerbera-pink-bouquet-brokenwhite.jpg",
    stock: 18,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 9,
    filename: "mix-bouquet-cream.jpg",
    name: "Mixed Flowers Buket Cream",
    description:
      "Berbagai jenis bunga premium dengan wrapping cream lux, perfect untuk hadiah penting atau acara spesial.",
    price: 195000,
    rating: 4.9,
    category: "bouquet",
    flowerType: "mixed",
    color: ["Multi-color", "Cream"],
    tags: ["luxury", "premium", "gift"],
    featured: true,
    image: "/images/flowers/bouquet/mix-bouquet-cream.jpg",
    stock: 10,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 10,
    filename: "rose-gradient-white-pink-bouquet-cream.jpg",
    name: "Mawar Gradient Putih Pink Buket Cream",
    description:
      "Mawar dengan gradient putih ke pink yang memukau, dibungkus dengan wrapping cream yang elegant.",
    price: 195000,
    rating: 4.7,
    category: "bouquet",
    flowerType: "rose",
    color: ["Multi-color", "Cream", "Putih", "Pink"],
    tags: ["gradient", "unique", "artistic"],
    featured: false,
    image: "/images/flowers/bouquet/rose-gradient-white-pink-bouquet-cream.jpg",
    stock: 7,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 11,
    filename: "tulip-white-pink-bouquet-green.jpg",
    name: "Tulip Putih Pink Buket Hijau",
    description:
      "Perpaduan sempurna tulip putih dan pink dengan wrapping hijau, sempurna untuk acara spesial dan nuansa yang menyegarkan.",
    price: 165000,
    rating: 4.7,
    category: "bouquet",
    flowerType: "tulip",
    color: ["Putih", "Pink", "Hijau"],
    tags: ["spring", "fresh", "natural"],
    featured: false,
    image: "/images/flowers/bouquet/tulip-white-pink-bouquet-green.jpg",
    stock: 14,
    packaging: "bouquet",
    inStock: true,
  },
  {
    id: 12,
    filename: "tulip-white-pink-bouquet-newspaper.jpg",
    name: "Tulip Putih Pink Buket Newspaper",
    description:
      "Tulip dengan wrapping koran vintage style, sangat unique dan artistic untuk yang suka sesuatu berbeda.",
    price: 150000,
    rating: 4.5,
    category: "bouquet",
    flowerType: "tulip",
    color: ["Putih", "Pink"],
    tags: ["vintage", "unique", "artistic"],
    featured: true,
    image: "/images/flowers/bouquet/tulip-white-pink-bouquet-newspaper.jpg",
    stock: 22,
    packaging: "bouquet",
    inStock: true,
  },
  // Bunch Flowers
  {
    id: 13,
    filename: "gerbera-white-bunch-brown.jpg",
    name: "Gerbera Putih Bunch Brown",
    description:
      "Gerbera putih bersih dengan iketan tali coklat natural, simple namun tetap elegant.",
    price: 95000,
    rating: 4.3,
    category: "bunch",
    flowerType: "gerbera",
    color: ["Putih", "Brown"],
    tags: ["simple", "minimalist", "office"],
    featured: false,
    image: "/images/flowers/bunch/gerbera-white-bunch-brown.jpg",
    stock: 25,
    packaging: "bunch",
    inStock: true,
  },
  {
    id: 14,
    filename: "hydrangea-white-rose-yellow-bunch-green.jpg",
    name: "Hydrangea Putih & Mawar Kuning Bunch Hijau",
    description:
      "Perpaduan sempurna hydrangea putih dan mawar kuning dengan wrapping hijau, sempurna untuk acara spesial dan nuansa yang menyegarkan.",
    price: 185000,
    rating: 4.8,
    category: "bunch",
    flowerType: "mixed",
    color: ["Putih", "Kuning", "Hijau"],
    tags: ["luxury", "mixed", "gift"],
    featured: true,
    image: "/images/flowers/bunch/hydrangea-white-rose-yellow-bunch-green.jpg",
    stock: 6,
    packaging: "bunch",
    inStock: true,
  },
  {
    id: 15,
    filename: "rose-pink-bunch-pink.jpg",
    name: "Mawar Pink Bunch Pink",
    description:
      "Perpaduan mawar pink lembut dengan wrapping pink matching, sangat romantis dan manis.",
    price: 140000,
    rating: 4.4,
    category: "bunch",
    flowerType: "rose",
    color: ["Pink"],
    tags: ["sweet", "romantic", "gift"],
    featured: false,
    image: "/images/flowers/bunch/rose-pink-bunch-pink.jpg",
    stock: 18,
    packaging: "bunch",
    inStock: true,
  },
  {
    id: 16,
    filename: "rose-white-pink-bunch-pink.jpg",
    name: "Mawar Putih Pink Bunch Pink",
    description:
      "Perpaduan mawar putih dan pink lembut dengan wrapping pink matching, sangat romantis hadiah teman dekat.",
    price: 130000,
    rating: 4.5,
    category: "bunch",
    flowerType: "rose",
    color: ["Putih", "Pink"],
    tags: ["fresh", "daily", "surprise"],
    featured: false,
    image: "/images/flowers/bunch/rose-white-pink-bunch-pink.jpg",
    stock: 20,
    packaging: "bunch",
    inStock: true,
  },
  {
    id: 17,
    filename: "tulip-pink-bunch-pink.jpg",
    name: "Tulip Pink Bunch Pink",
    description:
      "Tulip pink segar dengan iketan simple, harga terjangkau dengan kualitas premium.",
    price: 115000,
    rating: 4.3,
    category: "bunch",
    flowerType: "tulip",
    color: ["Pink"],
    tags: ["fresh", "simple", "affordable"],
    featured: false,
    image: "/images/flowers/bunch/tulip-pink-bunch-pink.jpg",
    stock: 30,
    packaging: "bunch",
    inStock: true,
  },
  {
    id: 18,
    filename: "tulip-red-bunch-red.jpg",
    name: "Tulip Merah Bunch Merah",
    description:
      "Tulip merah passionate dengan iketan merah, penuh energi dan semangat untuk memulai hari.",
    price: 110000,
    rating: 4.6,
    category: "bunch",
    flowerType: "tulip",
    color: ["Merah"],
    tags: ["passionate", "energetic", "happy"],
    featured: true,
    image: "/images/flowers/bunch/tulip-red-bunch-red.jpg",
    stock: 25,
    packaging: "bunch",
    inStock: true,
  },
  // Bag Flowers
  {
    id: 19,
    filename: "rose-red-white-bag.jpg",
    name: "Mawar Merah & Putih Tas Transparan",
    description:
      "Kombinasi mawar merah dan putih dalam tas transparan, simbol persahabatan dan cinta sekaligus.",
    price: 90000,
    rating: 4.2,
    category: "bag",
    flowerType: "rose",
    color: ["Merah", "Putih"],
    tags: ["friendship", "love", "gift"],
    featured: false,
    image: "/images/flowers/bag/rose-red-white-bag.jpg",
    stock: 40,
    packaging: "bag",
    inStock: true,
  },
  {
    id: 20,
    filename: "rose-red-bag.jpg",
    name: "Mawar Merah Tas Transparan",
    description:
      "Mawar merah klasik dalam tas transparan kecil, solusi praktis untuk hadiah last minute.",
    price: 90000,
    rating: 4.4,
    category: "bag",
    flowerType: "rose",
    color: ["Merah"],
    tags: ["classic", "affordable", "gift"],
    featured: false,
    image: "/images/flowers/bag/rose-red-bag.jpg",
    stock: 35,
    packaging: "bag",
    inStock: true,
  },
  {
    id: 21,
    filename: "rose-pink-bag.jpg",
    name: "Mawar Pink Tas Transparan",
    description:
      "Mawar pink manis dalam tas transparan, cute dan affordable untuk berbagai kesempatan.",
    price: 90000,
    rating: 4.4,
    category: "bag",
    flowerType: "rose",
    color: ["Pink"],
    tags: ["cute", "affordable", "versatile"],
    featured: false,
    image: "/images/flowers/bag/rose-pink-bag.jpg",
    stock: 38,
    packaging: "bag",
    inStock: true,
  },
  {
    id: 22,
    filename: "rose-white-pink-bag.jpg",
    name: "Mawar Putih & Pink Tas Transparan",
    description:
      "Mawar putih dan pink dalam tas, perfect untuk ucapan selamat atau terima kasih sederhana.",
    price: 90000,
    rating: 4.3,
    category: "bag",
    flowerType: "rose",
    color: ["Putih", "Pink"],
    tags: ["thankful", "simple", "congrats"],
    featured: false,
    image: "/images/flowers/bag/rose-white-pink-bag.jpg",
    stock: 42,
    packaging: "bag",
    inStock: true,
  },
  {
    id: 23,
    filename: "rose-white-purple-bag.jpg",
    name: "Mawar Putih Ungu Tas Transparan",
    description:
      "Kombinasi unik mawar putih dan ungu dalam tas, berbeda dan eye-catching.",
    price: 90000,
    rating: 4.4,
    category: "bag",
    flowerType: "rose",
    color: ["Putih", "Ungu"],
    tags: ["unique", "eye-catching", "gift"],
    featured: true,
    image: "/images/flowers/bag/rose-white-purple-bag.jpg",
    stock: 28,
    packaging: "bag",
    inStock: true,
  },
  {
    id: 24,
    filename: "rose-white-bag.jpg",
    name: "Mawar Putih Tas Transparan",
    description:
      "Mawar putih segar dalam tas transparan, simple, elegant, dan terjangkau.",
    price: 90000,
    rating: 4.3,
    category: "bag",
    flowerType: "rose",
    color: ["Putih"],
    tags: ["simple", "elegant", "affordable"],
    featured: false,
    image: "/images/flowers/bag/rose-white-bag.jpg",
    stock: 45,
    packaging: "bag",
    inStock: true,
  },
  {
    id: 25,
    filename: "rose-yellow-bag.jpg",
    name: "Mawar Kuning Tas Transparan",
    description:
      "Mawar kuning cerah dalam tas, simbol persahabatan dan kebahagiaan dengan harga friendly.",
    price: 90000,
    rating: 4.3,
    category: "bag",
    flowerType: "rose",
    color: ["Kuning"],
    tags: ["friendship", "happy", "sunny"],
    featured: false,
    image: "/images/flowers/bag/rose-yellow-bag.jpg",
    stock: 32,
    packaging: "bag",
    inStock: true,
  },
];

// Helper functions
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId);
}

export function getProductsByPackaging(packagingType: string): Product[] {
  return products.filter((product) => product.packaging === packagingType);
}

export function getProductsByFlowerType(flowerType: string): Product[] {
  return products.filter((product) => product.flowerType === flowerType);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export const packagingTypes = [
  {
    id: "bouquet",
    name: "Buket",
    description: "Dengan wrapping kertas eksklusif",
  },
  {
    id: "bunch",
    name: "Iketan",
    description: "Sederhana tanpa wrapping",
  },
  {
    id: "bag",
    name: "Tas",
    description: "Dalam tas transparan praktis",
  },
];

export const priceRange = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
  average: Math.round(
    products.reduce((sum, p) => sum + p.price, 0) / products.length,
  ),
};
