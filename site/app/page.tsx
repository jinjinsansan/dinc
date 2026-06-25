import { GradientDefs } from '@/components/Logo';
import { ToastProvider } from '@/components/Toast';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Mission } from '@/components/Mission';
import { Products } from '@/components/Products';
import { WhyD } from '@/components/WhyD';
import { Company } from '@/components/Company';
import { News } from '@/components/News';
import { Recruit } from '@/components/Recruit';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <ToastProvider>
      <GradientDefs />
      <Header />
      <main>
        <Hero />
        <Mission />
        <Products />
        <WhyD />
        <Company />
        <News />
        <Recruit />
        <Contact />
      </main>
      <Footer />
    </ToastProvider>
  );
}
