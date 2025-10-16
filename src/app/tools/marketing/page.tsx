"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Mail, Search, Megaphone, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Sections Data
const sections = [
  {
    id: 1,
    title: "Social Media Management",
    description:
      "Plan, schedule, and manage your social media posts with AI insights to maximize reach and engagement.",
    icon: Share2,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    title: "Email Marketing Automation",
    description:
      "Automate personalized campaigns, track open rates, and increase conversions with smart analytics.",
    icon: Mail,
    color: "from-emerald-400 to-green-600",
  },
  {
    id: 3,
    title: "SEO & Keyword Research",
    description:
      "Find the right keywords and optimize your content to rank higher on search engines effortlessly.",
    icon: Search,
    color: "from-purple-400 to-indigo-600",
  },
  {
    id: 4,
    title: "Ad Campaign Optimization",
    description:
      "Run smarter ad campaigns on Google, Facebook, and LinkedIn with real-time AI optimization.",
    icon: Megaphone,
    color: "from-pink-400 to-rose-600",
  },
  {
    id: 5,
    title: "Content Creation & Analytics",
    description:
      "Generate blogs, ad copies, and visuals with AI, and measure their real-time engagement impact.",
    icon: FileText,
    color: "from-amber-400 to-orange-600",
  },
  {
    id: 6,
    title: "Customer Engagement & CRM",
    description:
      "Build relationships using AI-driven chatbots, predictive CRM insights, and engagement strategies.",
    icon: Users,
    color: "from-teal-400 to-cyan-600",
  },
];

const MarketingToolsPage = () => {
  return (
    <>
      <Navbar />

      {/* 🌟 Hero Section */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Marketing Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#6B946A] to-[#997452] bg-clip-text text-transparent mb-4">
            Marketing Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Boost your marketing game with AI-powered tools for social media,
            content, CRM, and beyond.
          </p>
          <Link
            href="/milgpt"
            className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-[#6B946A] to-[#997452] rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          >
            Explore Tools
          </Link>
        </motion.div>
      </section>

      {/* 💼 Marketing Tools Grid */}
      <section
        id="tools"
        className="w-full lg:w-[90%] xl:w-[75%] 2xl:max-w-[90rem] mx-auto text-white py-20 px-6 md:px-12 lg:px-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#0f0f0f] border border-[#222] rounded-2xl shadow-lg p-8 hover:shadow-lg hover:shadow-[#6B946A]/30 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center mb-6">
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${section.color} bg-opacity-20`}
                >
                  <section.icon className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2
                className={`text-2xl font-bold mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent text-center`}
              >
                {section.title}
              </h2>

              <p className="text-gray-300 text-center leading-relaxed">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MarketingToolsPage;
