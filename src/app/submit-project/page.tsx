"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Grid from "@/components/home/Grid";
import { motion } from "framer-motion";
import {
  UploadCloud,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  School,
} from "lucide-react";

type FormDataType = {
  username: string;
  instituteName: string;
  email: string;
  mobile: string;
  location: string;
  city: string;
  feedback: string;
  file: File | null;
};

export default function SubmitProjectPage() {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    instituteName: "",
    email: "",
    mobile: "",
    location: "",
    city: "",
    feedback: "",
    file: null,
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.file) {
      setError("Please upload your ZIP project file before submitting.");
      setLoading(false);
      return;
    }

    if (!formData.file.name.toLowerCase().endsWith(".zip")) {
      setError("Please upload a valid ZIP file.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value as string | Blob);
      });

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/projects/submit`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to submit project.");

      setSuccess(true);
      setFormData({
        username: "",
        instituteName: "",
        email: "",
        mobile: "",
        location: "",
        city: "",
        feedback: "",
        file: null,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-gradient-to-br from-[#0d0f10] via-[#111315] to-[#151819] text-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Decorative Gradient Circles */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#4A6B48]/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#997452]/10 blur-3xl rounded-full"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-xl shadow-black/30 p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#6B946A] to-[#997452] bg-clip-text text-transparent">
            Submit Your Project
          </h1>
          <p className="text-center text-gray-400 mb-10">
            Upload your project files and details. Our team will review your
            submission promptly.
          </p>

          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-500 font-semibold text-lg bg-green-500/10 border border-green-500/30 p-4 rounded-xl"
            >
              ✅ Project submitted successfully!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: User,
                    name: "username",
                    label: "Full Name",
                    type: "text",
                  },
                  {
                    icon: School,
                    name: "instituteName",
                    label: "Institute Name",
                    type: "text",
                  },
                  {
                    icon: Mail,
                    name: "email",
                    label: "Email Address",
                    type: "email",
                  },
                  {
                    icon: Phone,
                    name: "mobile",
                    label: "Mobile Number",
                    type: "tel",
                  },
                  {
                    icon: MapPin,
                    name: "location",
                    label: "Location",
                    type: "text",
                  },
                  { icon: MapPin, name: "city", label: "City", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <field.icon className="absolute top-3 left-4 text-gray-400 w-5 h-5" />
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.label}
                      value={
                        formData[field.name as keyof FormDataType] as string
                      }
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:border-[#6B946A] outline-none text-white placeholder-gray-400 transition"
                    />
                  </div>
                ))}
              </div>

              {/* File Upload */}
              <div className="relative border border-dashed border-gray-600 hover:border-[#6B946A] rounded-xl p-6 text-center cursor-pointer transition">
                <UploadCloud className="mx-auto text-[#6B946A] w-10 h-10 mb-2" />
                <label className="text-gray-300 block mb-2 font-medium">
                  Upload Project (ZIP file)
                </label>
                <input
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  required
                  className="w-full opacity-0 absolute inset-0 cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  {formData.file
                    ? formData.file.name
                    : "Drag or click to upload your project.zip"}
                </p>
              </div>

              {/* Feedback */}
              <div className="relative">
                <FileText className="absolute top-3 left-4 text-gray-400 w-5 h-5" />
                <textarea
                  name="feedback"
                  rows={4}
                  placeholder="Feedback / Notes..."
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:border-[#6B946A] outline-none text-white placeholder-gray-400 resize-none transition"
                ></textarea>
              </div>

              {/* Error */}
              {error && (
                <div className="text-red-500 text-center font-medium p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6B946A] to-[#997452] font-semibold text-white text-lg shadow-lg hover:shadow-xl transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Project"}
              </motion.button>
            </form>
          )}
        </div>
      </section>
      <Grid />
      <Footer />
    </>
  );
}
