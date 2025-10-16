"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, BarChart } from "lucide-react";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ProductivityPage() {
  return (
    <>
      <Navbar />

      {/* ✅ HERO SECTION (Full Width, Min Height 80vh) */}
      <section className="relative w-full min-h-[80vh] py-20 md:py-32 text-center overflow-hidden bg-gradient-to-br from-[#0b0b0b] via-[#101010] to-[#1a1a1a]">
        {/* Background Image + Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80"
            alt="AI productivity concept"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col justify-center h-full"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Supercharge Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B946A] to-[#997452]">
              Productivity
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Discover AI-powered tools that streamline your workflow, automate
            tasks, and help you achieve more in less time.
          </p>
          <div className="flex justify-center">
            <button className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#6B946A] to-[#997452] text-white font-semibold hover:opacity-90 transition shadow-lg">
              Get Started
            </button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-16 md:py-24 px-6 max-w-7xl mx-auto text-white">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-[#6B946A] to-[#997452] rounded-full text-sm font-medium mb-4 md:mb-6 shadow-md">
            Tools That Save Time
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Key <span className="text-[#6B946A]">Features</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Simplify, automate, and scale your productivity with intuitive
            AI-driven features.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Zap,
              title: "Automation",
              desc: "Automate repetitive tasks and save hours every week.",
            },
            {
              icon: Shield,
              title: "Security",
              desc: "Keep your workflows protected with enterprise-grade encryption.",
            },
            {
              icon: BarChart,
              title: "Analytics",
              desc: "Track performance with smart AI insights and dashboards.",
            },
            {
              icon: CheckCircle,
              title: "Collaboration",
              desc: "Work seamlessly with your team on one unified platform.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111] p-6 sm:p-8 rounded-2xl border border-[#222] border-b-4 border-b-[#6B946A] shadow-lg hover:shadow-[0_0_25px_#6B946A55] hover:scale-[1.02] transition-transform duration-300"
            >
              <item.icon className="w-12 h-12 mb-4 sm:mb-6 text-[#6B946A]" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 md:py-28 text-center bg-gradient-to-t from-[#0b0b0b] to-[#1a1a1a] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Ready to <span className="text-[#6B946A]">Boost</span> Your
            Productivity?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 md:mb-8">
            Start today with AI-powered productivity tools that transform how
            you work and collaborate.
          </p>
          <button className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#6B946A] to-[#997452] text-white font-semibold hover:opacity-90 transition shadow-md">
            Try Now
          </button>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
