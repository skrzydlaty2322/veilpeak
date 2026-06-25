import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import ManifestoSection from "@/components/ManifestoSection";
import FullSetSection from "@/components/FullSetSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <ProductGrid />
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <ManifestoSection />
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <FullSetSection />
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <TestimonialsSection />
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <TrustBar />
      <Footer />
    </main>
  );
}
