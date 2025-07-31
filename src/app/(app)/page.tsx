"use client";

import { Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/src/messages.json";

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-[#0b1120] px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between border-b border-white/10 fixed top-0 z-50">
        <div className="text-xl font-bold text-white">Fidelio</div>
        <Button className="rounded-md px-4 py-2 bg-white text-black hover:bg-gray-100 transition text-sm">
          Login
        </Button>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-28 min-h-screen flex flex-col items-center justify-start px-4 pb-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white">
        {/* HERO SECTION */}
        <section className="text-center max-w-2xl w-full px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 to-purple-500 text-transparent bg-clip-text mb-6">
            Dive into Anonymous Feedback
          </h1>
        </section>

        {/* CAROUSEL SECTION */}
        <section className="mt-16 w-full max-w-6xl px-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            What People Are Saying
          </h2>

          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 4000 })]}
            className="overflow-hidden"
          >
            <CarouselContent className="-ml-2">
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-base font-semibold mb-1">
                          {message.title || "Anonymous"}
                        </h3>
                        <p className="text-sm text-gray-300 leading-snug">
                          {message.content}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-right text-gray-400 mt-4">
                      {message.received}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b1120] w-full border-t border-white/10 py-6 px-4 text-center text-sm text-gray-400">
        © 2024 <span className="text-white font-semibold">Fidelio</span>. All rights reserved.
      </footer>
    </>
  );
}
