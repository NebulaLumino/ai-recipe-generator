"use client";
import { useState } from "react";

function Page() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Any");
  const [dietary, setDietary] = useState("None");
  const [mealType, setMealType] = useState("Any");
  const [servings, setServings] = useState("4");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const accent = "amber";
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!ingredients.trim()) { setError("Please enter ingredients or cuisine preference."); return; }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, cuisine, dietary, mealType, servings, skillLevel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.output);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const btnClass = loading
    ? "px-8 py-3 rounded-lg font-semibold text-white bg-" + accent + "-700 cursor-not-allowed"
    : "px-8 py-3 rounded-lg font-semibold text-white bg-" + accent + "-600 hover:bg-" + accent + "-500 transition-all";

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className={"text-4xl font-bold mb-3 bg-gradient-to-r from-" + accent + "-400 to-" + accent + "-600 bg-clip-text text-transparent"}>
          AI Recipe Generator
        </h1>
        <p className="text-gray-400 text-sm">Generate creative recipes from ingredients or cuisine preferences</p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Enter Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Ingredients / Cuisine Preference *</label>
            <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="e.g., chicken, garlic, lemon, rosemary or Italian cuisine" rows={3} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cuisine</label>
            <select value={cuisine} onChange={e => setCuisine(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"><option>Any</option><option>Italian</option><option>Mexican</option><option>Japanese</option><option>French</option><option>Indian</option><option>Thai</option><option>Chinese</option><option>Mediterranean</option><option>American</option><option>Korean</option><option>Vietnamese</option><option>Greek</option><option>Spanish</option></select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dietary</label>
            <select value={dietary} onChange={e => setDietary(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"><option>None</option><option>Vegetarian</option><option>Vegan</option><option>Gluten-Free</option><option>Dairy-Free</option><option>Keto</option><option>Paleo</option><option>Low-Carb</option><option>Nut-Free</option></select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meal Type</label>
            <select value={mealType} onChange={e => setMealType(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"><option>Any</option><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option><option>Appetizer</option><option>Dessert</option></select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Servings</label>
            <select value={servings} onChange={e => setServings(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"><option>2</option><option>4</option><option>6</option><option>8</option><option>10</option></select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Skill Level</label>
            <select value={skillLevel} onChange={e => setSkillLevel(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Professional</option></select>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <button onClick={handleGenerate} disabled={loading} className={btnClass}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 text-sm mb-6">{error}</div>
      )}
      {output && (
        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Generated Output</h2>
          <pre className="text-gray-300 text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </main>
  );
}

export default Page;
