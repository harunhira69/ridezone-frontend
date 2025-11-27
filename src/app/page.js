import Feature from "@/component/Feature";
import Hero from "@/component/Hero";
import PopularProducts from "@/component/PopularProducts";
import Testimonial from "@/component/Testimonial";



export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto pt-20">

      <Hero />

      <section className="my-24">
        <Feature/>
      </section>

      <section className="my-24">
        <PopularProducts />
      </section>

      <section className="my-24">
        <Testimonial/>
      </section>

    </main>
  );
}
