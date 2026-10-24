import type { Metadata } from "next";
import { site } from "@/content/site";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Delivery from "@/components/Delivery";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: { absolute: site.seo.title },
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: site.seo.title, description: site.seo.description },
  twitter: { title: site.seo.title, description: site.seo.description },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Process />
      <Capabilities />
      <About />
      <Delivery />
      <Contact />
    </>
  );
}
