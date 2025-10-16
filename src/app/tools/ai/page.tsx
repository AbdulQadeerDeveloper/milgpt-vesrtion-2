"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  Bot,
  PenTool,
  BarChart3,
  Video,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";

const AIToolsPage = () => {
  return (
    <>
      <Navbar />
      <main className="relative bg-black text-white overflow-hidden">
        {/* ========== HERO SECTION (Image Background) ========== */}
        <section className="relative flex flex-col justify-center items-center text-center px-6 min-h-[80vh]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80"
              alt="AI Background"
              fill
              priority
              className="object-cover object-center opacity-40"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/70 to-[#000]/90" />
          </div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover the Future of{" "}
              <span className="text-[#8BFA4E]">AI Tools</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Explore cutting-edge AI innovations that boost creativity, enhance
              productivity, and redefine what’s possible.
            </p>
            <Link
              href="/milgpt"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8BFA4E] to-[#4A6B48] text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300"
            >
              Explore Now
            </Link>
          </motion.div>

          {/* Floating Gradient Glows */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#8BFA4E]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        </section>

        {/* ========== MAIN CONTENT (Icons instead of images) ========== */}
        <div className="w-full lg:w-[90%] xl:w-[75%] 2xl:max-w-[90rem] mx-auto text-white">
          {[
            {
              icon: <PenTool className="w-10 h-10 text-[#8BFA4E]" />,
              title: "AI Writing Assistants",
              desc: "Create blogs, emails, and professional content faster with AI-powered writing tools like ChatGPT and Jasper.",
            },
            {
              icon: <Sparkles className="w-10 h-10 text-[#8BFA4E]" />,
              title: "AI Design & Image Generation",
              desc: "Generate stunning visuals, graphics, and illustrations using AI-powered tools like MidJourney and DALL·E.",
              reverse: true,
            },
            {
              icon: <Video className="w-10 h-10 text-[#8BFA4E]" />,
              title: "AI Video Creation",
              desc: "Turn ideas into professional videos with AI tools like Synthesia, Pictory, and Runway.",
            },
            {
              icon: <BrainCircuit className="w-10 h-10 text-[#8BFA4E]" />,
              title: "AI Productivity Tools",
              desc: "Automate tasks, organize work, and improve efficiency with AI-powered productivity apps.",
              reverse: true,
            },
            {
              icon: <Bot className="w-10 h-10 text-[#8BFA4E]" />,
              title: "AI Chatbots & Assistants",
              desc: "Provide smarter customer support and personal assistance with AI chatbots like Intercom and Drift.",
            },
            {
              icon: <BarChart3 className="w-10 h-10 text-[#8BFA4E]" />,
              title: "AI Data & Analytics",
              desc: "Analyze data faster and gain smarter insights with AI-powered analytics platforms.",
              reverse: true,
            },
          ].map((section, i) => (
            <section
              key={i}
              className="py-16 border-t border-white/20 overflow-hidden"
            >
              <div
                className={`container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center ${
                  section.reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon Bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex justify-center md:justify-start"
                >
                  <div className="flex items-center justify-center w-48 h-48 bg-[#8BFA4E]/10 rounded-full shadow-inner">
                    {section.icon}
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-gray-300 mb-6">{section.desc}</p>
                  <Link
                    href="/milgpt"
                    className="px-6 py-3 bg-[#4A6B48] rounded-lg font-semibold hover:bg-[#39553a] transition-colors"
                  >
                    Explore Tools
                  </Link>
                </motion.div>
              </div>
            </section>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AIToolsPage;
