"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    ingredients: "",
    dietary: "",
    cuisine: "",
    skill: "",
    servings: "",
    prepTime: "",
    mealType: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setOutput(data.result || "Error generating recipe.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 text-sm font-medium">🍳 AI × Food & Cooking</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">AI Recipe Generator & Meal Planner</h1>
          <p className="text-gray-400 text-lg">Generate personalized recipes based on your ingredients, preferences, and meal planning needs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Available Ingredients</label>
              <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required rows={3} className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm" placeholder="e.g. chicken breast, garlic, lemon, olive oil, rosemary"></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Dietary Restrictions</label>
              <select name="dietary" value={form.dietary} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm">
                <option value="">Select restriction</option>
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="halal">Halal</option>
                <option value="kosher">Kosher</option>
                <option value="low-sodium">Low-Sodium</option>
                <option value="low-carb">Low-Carb</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Cuisine Preference</label>
              <select name="cuisine" value={form.cuisine} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm">
                <option value="">Select cuisine</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="japanese">Japanese</option>
                <option value="indian">Indian</option>
                <option value="french">French</option>
                <option value="chinese">Chinese</option>
                <option value="thai">Thai</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="american">American</option>
                <option value="korean">Korean</option>
                <option value="middle-eastern">Middle Eastern</option>
                <option value="spanish">Spanish</option>
                <option value="any">Any / Surprise Me</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Cooking Skill Level</label>
              <select name="skill" value={form.skill} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm">
                <option value="">Select skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert / Professional</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Servings Needed</label>
              <select name="servings" value={form.servings} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm">
                <option value="">Select servings</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6 people</option>
                <option value="8">8 people</option>
                <option value="10">10 people</option>
                <option value="12+">12+ people</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Prep Time Available</label>
              <select name="prepTime" value={form.prepTime} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-sm">
                <option value="">Select time</option>
                <option value="15">Under 15 minutes</option>
                <option value="30">15–30 minutes</option>
                <option value="45">30–45 minutes</option>
                <option value="60">45–60 minutes</option>
                <option value="90">60–90 minutes</option>
                <option value="120+">90+ minutes</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Meal Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Brunch", "Appetizer", "Side Dish"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="mealType" value={type.toLowerCase()} checked={form.mealType === type.toLowerCase()} onChange={handleChange} className="accent-amber-500" />
                    <span className="text-sm text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-gray-900 font-semibold py-4 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Generating Recipe...
              </>
            ) : "🍳 Generate My Recipe"}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Generated Recipe</h2>
            <div className="prose prose-invert prose-amber max-w-none text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}
