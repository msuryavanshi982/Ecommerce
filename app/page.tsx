import { Button } from "@/components/ui/button"
import { ArrowRight, Fan, Snowflake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Stay Cool & Comfortable All Year Round
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Premium fans and air conditioners for every space. Energy-efficient cooling solutions with modern
                  designs.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products?category=new-arrivals">
                  <Button variant="outline" size="lg">
                    New Arrivals
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://rukminim2.flixcart.com/image/832/832/xif0q/fan/j/d/p/renesa-table-fan-midnight-black-35-1-table-fan-400-atomberg-original-imah9sx3ezuussub.jpeg?q=70&crop=false"
                width={550}
                height={550}
                alt="Modern air conditioner"
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Categories</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our range of cooling solutions for every need
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Link href="/products?category=fans" className="group relative overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="https://media.atomberg.com/cdn-cgi/image/width=1132,format=auto,quality=80/media/aplusimages/Renesa_Prime_Remote_A_1.jpeg"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="Fans collection"
                  className="object-cover object-center transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <Fan className="h-12 w-12 text-white mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">Fans</h3>
                  <p className="text-white/90">Ceiling, Table & Stand Fans</p>
                </div>
              </div>
            </Link>
            <Link
              href="/products?category=air-conditioners"
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="https://www.theacwala.com/wp-content/uploads/2025/03/4503469_1-600x600.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="Air conditioners collection"
                  className="object-cover object-center transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <Snowflake className="h-12 w-12 text-white mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">Air Conditioners</h3>
                  <p className="text-white/90">Split, Window & Portable ACs</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most popular cooling solutions
              </p>
            </div>
          </div>
          <div className="mt-8">
            <FeaturedProducts />
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/products">
              <Button size="lg">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="https://rukminim2.flixcart.com/image/832/832/xif0q/fan/z/q/q/renesa-prime-remote-gloss-white-35-1-ceiling-fan-1200-atomberg-original-imahfg5yvy85efme.jpeg?q=70&crop=false"
                width={550}
                height={550}
                alt="Energy efficient cooling"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose CoolBreeze?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We offer premium cooling solutions with a focus on energy efficiency, durability, and modern design.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Energy Efficient</h3>
                    <p className="text-muted-foreground">
                      Our products are designed to provide maximum cooling with minimal energy consumption.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Smart Controls</h3>
                    <p className="text-muted-foreground">
                      Control your cooling devices from anywhere with our smart connectivity options.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-medium">Premium Quality</h3>
                    <p className="text-muted-foreground">
                      Built with high-quality materials for durability and long-lasting performance.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
