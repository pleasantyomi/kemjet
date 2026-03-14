"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  published_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sample data for display
  const sampleNews: NewsItem[] = [
    {
      id: "1",
      title: "AI Research Breakthrough: New Model Achieves 95% Accuracy",
      excerpt:
        "Our latest research demonstrates significant improvements in therapeutic target prediction using novel neural architectures.",
      content:
        "Our team has been working on improving AI models for therapeutic discovery. After months of research and testing, we've achieved a breakthrough with our latest model achieving 95% accuracy on target prediction tasks. This represents a significant improvement over previous approaches and opens new possibilities for drug discovery.",
      published_at: "2026-03-10",
    },
    {
      id: "2",
      title: "Kemjet Joins Global AI for Good Initiative",
      excerpt:
        "We're partnering with leading research institutions to accelerate drug discovery for rare diseases.",
      content:
        "We're excited to announce that Kemjet has joined the Global AI for Good Initiative. This partnership will allow us to collaborate with leading research institutions around the world to accelerate drug discovery efforts, particularly focusing on rare diseases that have been under-researched.",
      published_at: "2026-03-05",
    },
    {
      id: "3",
      title: "Open Source Release: Therapeutic Data Pipeline",
      excerpt:
        "We've released our data processing pipeline to help researchers worldwide build better models.",
      content:
        "In line with our commitment to open science, we've released our therapeutic data processing pipeline as open source. This tool helps researchers prepare and process data for machine learning models in drug discovery. We hope this will accelerate the entire field and enable more discoveries.",
      published_at: "2026-02-28",
    },
  ];

  useEffect(() => {
    // For now, use sample data. When Supabase is set up with news table, this will fetch real data.
    setNews(sampleNews);
    setLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* News Header */}
      <section className="w-full bg-black py-12 px-4 lg:px-0 border-b border-[#2A2A2A]">
        <div className="w-11/12 mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#19FB9B] hover:text-[#1FCFF1] transition-colors font-inter font-semibold text-[14px] mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[48px] lg:text-[64px] font-inter font-bold text-white"
          >
            News & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[18px] text-[#DBDBDB] font-inter mt-4"
          >
            Stay updated with the latest from Kemjet
          </motion.p>
        </div>
      </section>

      {/* News List */}
      <section className="w-full bg-black py-20 px-4 lg:px-0">
        <div className="w-11/12 mx-auto max-w-4xl">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-[#DBDBDB] font-inter">Loading news...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-[#FF6B6B] font-inter">{error}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#DBDBDB] font-inter">No news articles yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {news.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-[#2A2A2A] pb-8 last:border-b-0"
                >
                  <div className="group cursor-pointer">
                    <p className="text-[#666] font-inter text-[12px] uppercase mb-2">
                      {formatDate(item.published_at)}
                    </p>
                    <h2 className="text-[32px] lg:text-[40px] font-inter font-bold text-white mb-4 group-hover:text-[#19FB9B] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-[16px] text-[#DBDBDB] font-inter leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                    <p className="text-[16px] text-[#DBDBDB] font-inter leading-relaxed opacity-75">
                      {item.content}
                    </p>
                    <Link
                      href={`/news/${item.id}`}
                      className="inline-block mt-4 text-[#19FB9B] hover:text-[#1FCFF1] transition-colors font-inter font-semibold"
                    >
                      Continue reading →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
