"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, CloudCog, GitBranch, Rocket, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Grid from "@/components/home/Grid";
import { Footer } from "@/components/Footer";

const sections = [
  {
    id: 1,
    title: "AI Code Generation",
    description:
      "Boost your workflow with intelligent AI that writes, debugs, and improves your code instantly.",
    icon: Code2,
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 2,
    title: "API Automation",
    description:
      "Streamline integration, testing, and documentation using next-gen API automation tools.",
    icon: CloudCog,
    color: "from-blue-400 to-cyan-600",
  },
  {
    id: 3,
    title: "Version Control",
    description:
      "Collaborate effortlessly with Git-based tools that simplify version tracking and branching.",
    icon: GitBranch,
    color: "from-purple-400 to-indigo-600",
  },
  {
    id: 4,
    title: "DevOps & Deployment",
    description:
      "Automate CI/CD pipelines, manage environments, and deploy your projects seamlessly.",
    icon: Rocket,
    color: "from-orange-400 to-red-600",
  },
  {
    id: 5,
    title: "Security & Testing",
    description:
      "Scan code, detect vulnerabilities, and enhance project security with AI-powered analysis.",
    icon: ShieldCheck,
    color: "from-pink-400 to-rose-600",
  },
];

const DeveloperToolsPage = () => {
  return (
    <>
      <Navbar />

      {/* 🌟 Hero Section */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80"
          alt="Developer Tools Hero"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

        {/* Content */}
        <motion.div
          className="relative z-10 px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Developer Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Build, test, and deploy faster with the latest AI-driven tools for
            modern developers.
          </p>

          <Link
            href="/milgpt"
            className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          >
            Explore Tools
          </Link>
        </motion.div>
      </section>

      {/* 💻 Tools Sections */}
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
              className="bg-[#0f0f0f] border border-[#222] rounded-2xl shadow-lg p-8 hover:shadow-lg hover:shadow-emerald-600/20 transition-transform transform hover:-translate-y-2 duration-300"
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

      <Grid />
      <Footer />
    </>
  );
};

export default DeveloperToolsPage;
