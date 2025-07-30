"use client";

import { Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
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
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white overflow-hidden">
        {/* Blurred Color Blobs */}
        <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-30 z-0 animate-pulse" />
        <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[160px] opacity-20 z-0 animate-float" />

        {/* Hero Content */}
        <section className="text-center max-w-3xl z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 to-purple-500 text-transparent bg-clip-text mb-6 animate-fade-up">
            Dive into Anonymous Feedback
          </h1>
          
          <div className="mt-8 animate-fade-up delay-300">
           
          </div>
        </section>

        {/* Message Carousel */}
        <section className="mt-24 w-full max-w-6xl relative z-10 px-4 animate-fade-up delay-500">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
            What People Are Saying
          </h2>

          <Carousel plugins={[Autoplay({ delay: 4000 })]}>
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 p-4 transition-transform duration-300"
                >
                  <div className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-1">
                          {message.title}
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

      {/* Footer */}
      <footer className="text-center p-6 bg-[#0b1120] text-sm text-gray-400">
        © 2025 <span className="text-white font-semibold">Fidelio</span>. All rights reserved.
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </>
  );
}
