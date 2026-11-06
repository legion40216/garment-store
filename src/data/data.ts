import type { ProductsType } from "@/types/types";

// Placeholder catalogue. Names, prices and stock are made up, so edit freely.
// Only the photos are real: each one lives in /public/assets/products.
//
// Rules the rest of the app relies on:
//  - `slug` is unique (it is the URL) and `id` is unique (it keys the cart)
//  - `category` is one of the slugs in data/categories.ts
//  - `discount` is a percentage (0-100), not an amount
//  - `sizes` lists every size the product is made in; stock 0 = sold out
export const products: ProductsType = [
  {
    id: "1",
    slug: "red-puffer-coat",
    name: "Red Puffer Coat",
    description:
      "A warm, quilted puffer coat with a faux-fur trimmed hood and zip pockets.",
    category: "winter",
    image: "/assets/products/Redjacket.jpeg",
    price: 129.99,
    discount: 20,
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 8 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 0 },
    ],
    isNew: false,
    isFeatured: true,
    createdAt: "2026-09-12T10:00:00Z",
  },
  {
    id: "2",
    slug: "plaid-flannel-jacket",
    name: "Plaid Flannel Jacket",
    description:
      "A relaxed plaid jacket in brushed flannel, easy to layer over a hoodie.",
    category: "winter",
    image: "/assets/products/wintercomrade.jpg",
    price: 69.99,
    discount: 10,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 10 },
      { size: "L", stock: 7 },
      { size: "XL", stock: 3 },
    ],
    isNew: true,
    isFeatured: true,
    createdAt: "2026-10-20T09:30:00Z",
  },
  {
    id: "3",
    slug: "burgundy-wool-coat",
    name: "Burgundy Wool Coat",
    description:
      "A long, tailored coat in a soft wool blend. Dressy enough for the office, warm enough for the walk there.",
    category: "winter",
    image: "/assets/products/wintercutegirl.jpg",
    price: 149.99,
    discount: 0,
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 6 },
      { size: "L", stock: 4 },
      { size: "XL", stock: 2 },
    ],
    isNew: true,
    isFeatured: false,
    createdAt: "2026-10-28T14:20:00Z",
  },
  {
    id: "4",
    slug: "winter-layering-set",
    name: "Winter Layering Set",
    description:
      "A jacket, knit scarf and midi skirt that are made to be worn together. Pair with boots.",
    category: "winter",
    image: "/assets/products/winterfootballergirl.jpg",
    price: 79.99,
    discount: 25,
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 9 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
    isNew: false,
    isFeatured: false,
    createdAt: "2026-08-30T12:00:00Z",
  },
  {
    id: "5",
    slug: "kids-red-snow-jacket",
    name: "Kids Red Snow Jacket",
    description:
      "A padded, waterproof snow jacket with a fleece-lined hood for cold-weather play.",
    category: "winter",
    image: "/assets/products/winterredboy.jpg",
    price: 59.99,
    discount: 0,
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 5 },
      { size: "L", stock: 2 },
    ],
    isNew: false,
    isFeatured: true,
    createdAt: "2026-09-05T08:00:00Z",
  },
  {
    id: "6",
    slug: "kids-autumn-outfit",
    name: "Kids Autumn Outfit",
    description:
      "Soft layers for crisp afternoons: a denim vest over a cotton top, made to be played in.",
    category: "fall",
    image: "/assets/products/autmnchild.jpg",
    price: 34.99,
    discount: 0,
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 12 },
      { size: "L", stock: 9 },
    ],
    isNew: false,
    isFeatured: false,
    createdAt: "2026-07-18T11:00:00Z",
  },
  {
    id: "7",
    slug: "light-blue-trench-coat",
    name: "Light Blue Trench Coat",
    description:
      "A lightweight, belted trench in pale blue for breezy spring days.",
    category: "spring",
    image: "/assets/products/springwomen.jpg",
    price: 89.99,
    discount: 15,
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 7 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 1 },
    ],
    isNew: false,
    isFeatured: true,
    createdAt: "2026-03-10T10:30:00Z",
  },
  {
    id: "8",
    slug: "light-blue-button-up-shirt",
    name: "Light Blue Button-Up Shirt",
    description:
      "A crisp cotton shirt with a soft collar. Wear it tucked in or open over a tee.",
    category: "spring",
    image: "/assets/products/springmen.jpg",
    price: 39.99,
    discount: 0,
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 14 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 6 },
    ],
    isNew: false,
    isFeatured: false,
    createdAt: "2026-02-22T15:00:00Z",
  },
];
