"use client";

import { Mail } from "lucide-react";
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
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white overflow-hidden">

        {/* Hero Section */}
        <section className="text-center max-w-3xl z-10 relative px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 to-purple-500 text-transparent bg-clip-text mb-6">
            Dive into Anonymous Feedback
          </h1>

          <div className="mt-6">

          </div>
        </section>

        {/* Carousel */}
        <section className="mt-20 w-full max-w-6xl relative z-10 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            What People Are Saying
          </h2>

          <Carousel plugins={[Autoplay({ delay: 4000 })]}>
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 p-4"
                >
                  <div className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white text-base font-semibold mb-1">
                          {message.title || "Anonymous"}
                        </h3>
                        <p className="text-sm text-gray-200">{message.content}</p>
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
        © 2026 <span className="text-white font-semibold">Fidelio</span>. All rights reserved.
      </footer>
    </>
  );
}