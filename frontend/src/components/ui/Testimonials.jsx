"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Retail Investor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "Fin.ai has revolutionized the way I invest. The AI-driven recommendations help me make smarter decisions with ease.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Equity Trader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The predictive analytics have given me deeper insights into stock and mutual fund trends, helping me maximize returns.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wealth Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "I recommend Fin.ai to all my clients. Its risk analysis and market insights make financial planning effortless.",
  },
  {
    id: 4,
    name: "David Park",
    role: "Startup Investor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "With Fin.ai, I can execute trades and manage my portfolio seamlessly. The one-click investment feature is a game changer!",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Financial Analyst",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    quote: "The AI-powered portfolio optimization ensures my investments stay aligned with my financial goals—it's like having a personal advisor 24/7.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToTestimonial = (newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex((newIndex + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <section id="testimonials" aria-label="Customer testimonials" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-yellow-400 tracking-tight"
        >
          What Our Users Say
        </motion.h2>

        <div className="relative max-w-4xl mx-auto overflow-hidden h-[400px] md:h-[350px] flex items-center">
          <button
            onClick={() => goToTestimonial(currentIndex - 1)}
            aria-label="Previous testimonial"
            className="absolute left-0 z-10 p-2 bg-black/50 text-white rounded-full hover:text-yellow-400 hover:bg-black/70 transition"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-black/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <Quote className="w-12 h-12 text-yellow-400 mb-6" aria-hidden="true" />
              <blockquote className="text-xl md:text-2xl mb-8 flex-grow text-white">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={`Portrait of ${testimonials[currentIndex].name}`}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-white hover:text-yellow-400 transition">{testimonials[currentIndex].name}</h4>
                  <p className="text-white/70">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => goToTestimonial(currentIndex + 1)}
            aria-label="Next testimonial"
            className="absolute right-0 z-10 p-2 bg-black/50 text-white rounded-full hover:text-yellow-400 hover:bg-black/70 transition"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
}


