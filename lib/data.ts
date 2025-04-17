import type { Product, Order } from "@/types"

// Mock data for products
const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium Ceiling Fan",
    description: "Energy-efficient ceiling fan with remote control",
    fullDescription:
      "This premium ceiling fan features energy-efficient operation, multiple speed settings, and comes with a convenient remote control. Perfect for any room in your home.",
    price: 129.99,
    originalPrice: 149.99,
    discount: 13,
    rating: 4.5,
    reviewCount: 128,
    category: "fans",
    subcategory: "ceiling-fans",
    isNew: false,
    isFeatured: true,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Silver", value: "#c0c0c0" },
    ],
    sizes: [
      { label: "S", value: "small" },
      { label: "M", value: "medium" },
      { label: "L", value: "large" },
    ],
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/fan/z/q/q/renesa-prime-remote-gloss-white-35-1-ceiling-fan-1200-atomberg-original-imahfg5yvy85efme.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/fan/w/b/z/renesa-prime-remote-gloss-white-35-1-ceiling-fan-1200-atomberg-original-imahfg5ycfesek4c.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/fan/t/w/a/-original-imah3wtsm4svx6zc.jpeg?q=70&crop=false",
    ],
    specifications: [
      { name: "Diameter", value: "52 inches" },
      { name: "Speeds", value: "3" },
      { name: "Power", value: "60W" },
      { name: "Warranty", value: "2 years" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "John D.",
        rating: 5,
        title: "Great fan!",
        content: "This fan is perfect for my living room. It's quiet and moves a lot of air.",
        date: "2023-05-15",
      },
      {
        id: "rev-2",
        author: "Sarah M.",
        rating: 4,
        title: "Good value",
        content: "Good quality fan for the price. Installation was easy.",
        date: "2023-04-22",
      },
    ],
  },
  {
    id: "prod-2",
    name: "Smart Air Conditioner",
    description: "Wi-Fi enabled air conditioner with smartphone control",
    fullDescription:
      "This smart air conditioner can be controlled from anywhere using your smartphone. It features energy-efficient cooling, multiple modes, and smart home integration.",
    price: 349.99,
    originalPrice: 399.99,
    discount: 12,
    rating: 4.7,
    reviewCount: 95,
    category: "air-conditioners",
    subcategory: "split-ac",
    isNew: true,
    isFeatured: true,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Silver", value: "#c0c0c0" },
    ],
    sizes: [
      { label: "S", value: "small" },
      { label: "M", value: "medium" },
      { label: "L", value: "large" },
    ],
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/air-conditioner-new/n/0/1/-original-imah8cr2phdmnb4p.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/air-conditioner-new/p/y/v/-original-imagt5vj8dfpjja2.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/air-conditioner-new/b/e/o/-original-imaha53ynzvexhde.jpeg?q=70&crop=false",
    ],
    specifications: [
      { name: "Cooling Capacity", value: "12,000 BTU" },
      { name: "Coverage Area", value: "550 sq. ft." },
      { name: "Energy Rating", value: "4-Star" },
      { name: "Warranty", value: "3 years" },
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Michael T.",
        rating: 5,
        title: "Amazing cooling!",
        content: "This AC cools my room in minutes. The app control is very convenient.",
        date: "2023-06-10",
      },
      {
        id: "rev-4",
        author: "Lisa R.",
        rating: 4,
        title: "Great features",
        content: "Love the smart features. It's a bit louder than expected but works great.",
        date: "2023-05-28",
      },
    ],
  },
  {
    id: "prod-3",
    name: "Portable Table Fan",
    description: "Compact and powerful table fan with USB charging",
    fullDescription:
      "This portable table fan is perfect for your desk or bedside table. It features USB charging, adjustable speed settings, and a compact design that fits anywhere.",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.2,
    reviewCount: 210,
    category: "fans",
    subcategory: "table-fans",
    isNew: false,
    isFeatured: true,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Blue", value: "#0000ff" },
    ],
    sizes: [
      { label: "S", value: "small" },
      { label: "M", value: "medium" },
    ],
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/fan/r/1/r/cordless-rotating-portable-rechargeable-with-led-lights-3-speed-original-imah2qhf9zhbzydd.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/416/416/xif0q/fan/h/y/s/oscillating-led-light-quiet-fan-3-speeds-strong-airflow-auto-100-original-imahfygztpzs82mz.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/416/416/xif0q/fan/n/e/k/oscillating-led-light-quiet-fan-3-speeds-strong-airflow-auto-100-original-imah29xghh6e8gsd.jpeg?q=70&crop=false",
    ],
    specifications: [
      { name: "Diameter", value: "8 inches" },
      { name: "Speeds", value: "3" },
      { name: "Power", value: "5W" },
      { name: "Battery Life", value: "6 hours" },
    ],
    reviews: [
      {
        id: "rev-5",
        author: "David K.",
        rating: 5,
        title: "Perfect desk fan",
        content: "This fan is quiet and powerful. Perfect for my desk at work.",
        date: "2023-04-05",
      },
      {
        id: "rev-6",
        author: "Emily W.",
        rating: 3,
        title: "Good but battery drains quickly",
        content: "The fan works well but the battery doesn't last as long as advertised.",
        date: "2023-03-18",
      },
    ],
  },
  {
    id: "prod-4",
    name: "Window Air Conditioner",
    description: "Easy-to-install window AC unit for small rooms",
    fullDescription:
      "This window air conditioner is perfect for small rooms up to 350 sq. ft. It's easy to install and features multiple cooling modes and a programmable timer.",
    price: 199.99,
    originalPrice: 229.99,
    discount: 13,
    rating: 4.0,
    reviewCount: 78,
    category: "air-conditioners",
    subcategory: "window-ac",
    isNew: false,
    isFeatured: false,
    colors: [{ name: "White", value: "#ffffff" }],
    sizes: [
      { label: "S", value: "small" },
      { label: "M", value: "medium" },
    ],
    images: [
      "https://rukminim2.flixcart.com/image/416/416/xif0q/air-conditioner-new/q/k/2/-original-imaha45tvpwgeg2r.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/416/416/xif0q/air-conditioner-new/2/p/d/-original-imaha58fy4qsg3e2.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/416/416/xif0q/air-conditioner-new/p/s/j/-original-imaha58fxvb9hzyu.jpeg?q=70&crop=false",
    ],
    specifications: [
      { name: "Cooling Capacity", value: "8,000 BTU" },
      { name: "Coverage Area", value: "350 sq. ft." },
      { name: "Energy Rating", value: "3-Star" },
      { name: "Warranty", value: "1 year" },
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Robert J.",
        rating: 4,
        title: "Good for the price",
        content: "Easy to install and cools my bedroom well. A bit noisy on high setting.",
        date: "2023-05-02",
      },
      {
        id: "rev-8",
        author: "Amanda L.",
        rating: 4,
        title: "Works as expected",
        content: "Does the job well. Installation was straightforward with the included instructions.",
        date: "2023-04-15",
      },
    ],
  },
  {
    id: "prod-5",
    name: "Tower Fan with Remote",
    description: "Slim tower fan with oscillation and timer functions",
    fullDescription:
      "This slim tower fan is perfect for spaces where floor space is limited. It features oscillation, multiple speed settings, and a programmable timer for convenience.",
    price: 89.99,
    originalPrice: 99.99,
    discount: 10,
    rating: 4.4,
    reviewCount: 156,
    category: "fans",
    subcategory: "tower-fans",
    isNew: true,
    isFeatured: true,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
    ],
    sizes: [
      { label: "M", value: "medium" },
      { label: "L", value: "large" },
    ],
    images: [
      "https://rukminim2.flixcart.com/image/416/416/xif0q/fan/p/0/p/-original-imagzuvgsfarqxyr.jpeg?height=400&width=400",
      "https://rukminim2.flixcart.com/image/416/416/xif0q/fan/z/z/o/-original-imagzuvgggjkamzu.jpeg?q=70&crop=false",
      "https://rukminim2.flixcart.com/image/416/416/xif0q/fan/r/r/9/2121603111710-53-1-pedestal-fan-400-orient-electric-original-imagt2skwun6xyfz.jpeg?q=70&crop=false",
    ],
    specifications: [
      { name: "Height", value: "42 inches" },
      { name: "Speeds", value: "3" },
      { name: "Power", value: "45W" },
      { name: "Timer", value: "Up to 8 hours" },
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Thomas B.",
        rating: 5,
        title: "Great tower fan",
        content: "This fan is perfect for my apartment. It's quiet and the remote is very convenient.",
        date: "2023-06-05",
      },
      {
        id: "rev-10",
        author: "Jessica M.",
        rating: 4,
        title: "Good airflow",
        content: "The fan provides good airflow and the oscillation covers a wide area.",
        date: "2023-05-20",
      },
    ],
  },
]

// Function to get all products with optional filtering
export async function getProducts(filters?: {
  category?: string
  color?: string
  size?: string
  sort?: string
  page?: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProducts = [...products]

  // Apply category filter
  if (filters?.category) {
    const categories = filters.category.split(",")
    filteredProducts = filteredProducts.filter(
      (product) => categories.includes(product.category) || categories.includes(product.subcategory),
    )
  }

  // Apply color filter
  if (filters?.color) {
    const colors = filters.color.split(",")
    filteredProducts = filteredProducts.filter((product) =>
      product.colors?.some((color) => colors.includes(color.name.toLowerCase())),
    )
  }

  // Apply size filter
  if (filters?.size) {
    const sizes = filters.size.split(",")
    filteredProducts = filteredProducts.filter((product) => product.sizes?.some((size) => sizes.includes(size.value)))
  }

  // Apply sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        filteredProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
    }
  }

  // Apply pagination
  if (filters?.page) {
    const page = Number.parseInt(filters.page) || 1
    const perPage = 9
    const start = (page - 1) * perPage
    const end = start + perPage
    filteredProducts = filteredProducts.slice(start, end)
  }

  return filteredProducts
}

// Function to get a single product by ID
export async function getProductById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return products.find((product) => product.id === id) || null
}

// Function to get related products
export async function getRelatedProducts(productId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const product = products.find((p) => p.id === productId)

  if (!product) {
    return []
  }

  // Get products in the same category, excluding the current product
  return products.filter((p) => p.id !== productId && p.category === product.category).slice(0, 4)
}

// Function to get featured products
export async function getFeaturedProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return products.filter((product) => product.isFeatured).slice(0, 4)
}

// Function to get orders
export async function getOrders(filters?: {
  userId?: string
  role?: string
  status?: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would fetch from a database
  // For demo purposes, we'll return mock data
  const mockOrders: Order[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `ORD-${100000 + index}`,
      userId: `user-${index % 3}`,
      customerName: `Customer ${index + 1}`,
      customerEmail: `customer${index + 1}@example.com`,
      customerPhone: `+1 555-${100 + index}`,
      items: [
        {
          id: `prod-${(index % 5) + 1}`,
          name: products[index % 5].name,
          price: products[index % 5].price,
          quantity: Math.floor(Math.random() * 3) + 1,
          selectedColor: products[index % 5].colors?.[0]?.value || "",
          selectedSize: products[index % 5].sizes?.[0]?.value || "",
          image: products[index % 5].images[0],
        },
      ],
      total: products[index % 5].price * (Math.floor(Math.random() * 3) + 1),
      status: ["Paid", "Shipped", "Delivered", "Undelivered"][Math.floor(Math.random() * 4)] as Order["status"],
      shippingAddress: {
        street: `${1000 + index} Main St`,
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "USA",
      },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      riderId: Math.random() > 0.5 ? `rider-${Math.floor(Math.random() * 3)}` : null,
    }))

  let filteredOrders = [...mockOrders]

  // Apply filters based on user role and status
  if (filters) {
    if (filters.role === "customer" && filters.userId) {
      // Customers can only see their own orders
      filteredOrders = filteredOrders.filter((order) => order.userId === filters.userId)
    } else if (filters.role === "rider" && filters.userId) {
      // Riders can only see orders assigned to them
      filteredOrders = filteredOrders.filter((order) => order.riderId === filters.userId)
    }

    // Filter by status if provided
    if (filters.status) {
      filteredOrders = filteredOrders.filter((order) => order.status === filters.status)
    }
  }

  return filteredOrders
}

// Function to get a single order by ID
export async function getOrderById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // In a real app, this would fetch from a database
  // For demo purposes, we'll generate a mock order
  const index = Number.parseInt(id.split("-")[1]) - 100000

  if (isNaN(index) || index < 0 || index >= 10) {
    return null
  }

  const mockOrder: Order = {
    id,
    userId: `user-${index % 3}`,
    customerName: `Customer ${index + 1}`,
    customerEmail: `customer${index + 1}@example.com`,
    customerPhone: `+1 555-${100 + index}`,
    items: [
      {
        id: `prod-${(index % 5) + 1}`,
        name: products[index % 5].name,
        price: products[index % 5].price,
        quantity: Math.floor(Math.random() * 3) + 1,
        selectedColor: products[index % 5].colors?.[0]?.value || "",
        selectedSize: products[index % 5].sizes?.[0]?.value || "",
        image: products[index % 5].images[0],
      },
    ],
    total: products[index % 5].price * (Math.floor(Math.random() * 3) + 1),
    status: ["Paid", "Shipped", "Delivered", "Undelivered"][Math.floor(Math.random() * 4)] as Order["status"],
    shippingAddress: {
      street: `${1000 + index} Main St`,
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    riderId: Math.random() > 0.5 ? `rider-${Math.floor(Math.random() * 3)}` : null,
  }

  return mockOrder
}

// Function to create a new order
export async function createOrder(orderData: {
  userId: string
  items: any[]
  shippingAddress: any
  paymentMethod: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would create an order in the database
  // For demo purposes, we'll return a mock order
  const newOrder: Order = {
    id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: orderData.userId,
    customerName: "John Doe", // In a real app, this would come from the user profile
    customerEmail: "john@example.com",
    customerPhone: "+1 555-1234",
    items: orderData.items,
    total: orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: "Paid",
    shippingAddress: orderData.shippingAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    riderId: null,
  }

  return newOrder
}

// Function to update order status
export async function updateOrderStatus(orderId: string, status: Order["status"], riderId?: string | null) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would update the order in the database
  // For demo purposes, we'll return a mock updated order
  const order = await getOrderById(orderId)

  if (!order) {
    throw new Error("Order not found")
  }

  const updatedOrder: Order = {
    ...order,
    status,
    updatedAt: new Date().toISOString(),
    riderId: riderId !== undefined ? riderId : order.riderId,
  }

  return updatedOrder
}
