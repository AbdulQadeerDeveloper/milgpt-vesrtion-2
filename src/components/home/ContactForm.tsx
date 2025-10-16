"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-gradient-to-b from-[#0B1120] via-[#111827] to-[#1F2937] text-white py-20 px-6 md:px-12 lg:px-20">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-[#4ADE80] to-[#60A5FA] bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Have a question or want to collaborate with MilGPT? We’d love to
            hear from you. Fill out the form or reach us directly through the
            contact details below.
          </p>
        </div>

        {/* Contact Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#4ADE80]">
              Send us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#333] focus:border-[#4ADE80] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#333] focus:border-[#4ADE80] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] text-white border border-[#333] focus:border-[#4ADE80] outline-none transition-all"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4ADE80] to-[#60A5FA] text-black font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-[#4ADE80]/30 transition-all"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-[#4ADE80]">
                Contact Details
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="text-[#4ADE80]" />
                  <span>support@milgpt.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-[#4ADE80]" />
                  <span>+1 (234) 567-8901</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#4ADE80]" />
                  <span>123 AI Innovation Street, San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#222]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2470596198163!2d-122.41941538468108!3d37.77492927975895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809caaaaaaab%3A0xbbbbbbbbbbbbbbbb!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1696432640000!5m2!1sen!2sus"
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                className="border-none w-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
