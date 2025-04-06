"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies
import { Brain, TrendingUp, ShieldCheck, ArrowRight, BarChart3 } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_MARKET_URL;

const Insights = () => {
  const [isHovered, setIsHovered] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const features = [
    {
      id: "personalized",
      icon: <Brain className="w-8 h-8 text-yellow-400" />,
      title: "Personalized Recommendations",
      description: "AI-driven stock & fund suggestions based on your risk profile and goals",
    },
    {
      id: "risk",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
      title: "Risk Analysis",
      description: "Advanced risk assessment with real-time market correlation analysis",
    },
    {
      id: "trends",
      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
      title: "Market Trends",
      description: "Real-time market insights powered by advanced AI algorithms",
    },
    {
      id: "comparison",
      icon: <BarChart3 className="w-8 h-8 text-yellow-400" />,
      title: "Smart Comparisons",
      description: "Intelligent fund comparison with performance predictions",
    },
  ];

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const authToken = Cookies.get("authToken"); // Get the auth token from cookies
        const response = await axios.get(`${BASE_URL}/stocks`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include token in Authorization header
          },
        });
        setStocks(response.data.stocks);
      } catch (err) {
        setError("Failed to fetch stock data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Section */}
      <section className="text-center px-6 lg:px-8 py-24 lg:py-32">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">
          Unlock AI-Powered Insights
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Get personalized stock & mutual fund recommendations, risk analysis & market trends — powered by AI.
        </p>
        <Link href="/Insights">
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-lg hover:bg-yellow-300 hover:scale-105 transition-transform">
            Try AI Recommendations <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-gray-800/50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-6 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 ${
                isHovered === feature.id ? "transform scale-105 border-yellow-400/50" : ""
              }`}
              onMouseEnter={() => setIsHovered(feature.id)}
              onMouseLeave={() => setIsHovered("")}
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-3 text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Stock Data Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Real-Time Market Insights
        </h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading stock data...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : (
          <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="p-6 rounded-xl bg-gray-800 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stock.name} ({stock.symbol})
                </h3>
                <p className="text-gray-400 mb-1">
                  Price: ${stock.price.toLocaleString()}
                </p>
                <p
                  className={`mb-1 ${
                    stock.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Change: {stock.change.toFixed(2)}%
                </p>
                <p className="text-gray-400">
                  Market Cap: ${(stock.marketCap / 1e9).toFixed(2)}B
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Insights;