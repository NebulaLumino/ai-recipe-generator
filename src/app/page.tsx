'use client';

import { useState } from 'react';

export default function RecipeGeneratorPage() {
  const [form, setForm] = useState({
    ingredients: '',
    cuisineStyle: '',
    dietaryRestrictions: '',
    skillLevel: '',
    timeAvailable: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/##\s+(.*)/g, '<h2 class="text-blue-400 font-bold text-base mt-5 mb-2 uppercase tracking-wide">$1</h2>')
      .replace(/###\s+(.*)/g, '<h3 class="text-white font-semibold text-sm mt-3 mb-1">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/^(\d+\.|Step \d+[:]?)\s+(.*)/gim, '<p class="font-medium text-gray-200 ml-0 my-1">$1 $2</p>')
      .replace(/^-\s+(.*)/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-300 my-2">')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="border-b border-blue-500/20 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl">👨‍🍳</div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Recipe & Flavor Profile Generator</h1>
            <p className="text-xs text-gray-400">Create complete recipes with flavor analysis</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900/60 border border-blue-500/20 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Recipe Inputs</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Available Ingredients</label>
                  <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required rows={4} placeholder="e.g. chicken breast, lemon, garlic, olive oil, rosemary, capers, cherry tomatoes, arborio rice, parmesan..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition resize-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Cuisine Style</label>
                  <select name="cuisineStyle" value={form.cuisineStyle} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition">
                    <option value="">Select style...</option>
                    <option value="Italian">Italian</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Thai">Thai</option>
                    <option value="American">American</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Korean">Korean</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                    <option value="Modern Fusion">Modern Fusion</option>
                    <option value="Farm-to-Table">Farm-to-Table</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Dietary Restrictions</label>
                  <select name="dietaryRestrictions" value={form.dietaryRestrictions} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition">
                    <option value="None">None</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Dairy-Free">Dairy-Free</option>
                    <option value="Nut-Free">Nut-Free</option>
                    <option value="Keto">Keto</option>
                    <option value="Paleo">Paleo</option>
                    <option value="Halal">Halal</option>
                    <option value="Kosher">Kosher</option>
                    <option value="Low-Sodium">Low-Sodium</option>
                    <option value="Shellfish Allergy">Shellfish Allergy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Cooking Skill Level</label>
                  <select name="skillLevel" value={form.skillLevel} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition">
                    <option value="">Select level...</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Time Available</label>
                  <select name="timeAvailable" value={form.timeAvailable} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition">
                    <option value="">Select time...</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2+ hours">2+ hours</option>
                  </select>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2">
                  {loading ? (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg> Generating Recipe...</>
                  ) : (
                    <>🔥 Generate Recipe</>
                  )}
                </button>
              </form>
              {error && <p className="mt-3 text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>}
            </div>
          </div>

          <div className="lg:col-span-3">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-blue-500/20 rounded-2xl bg-gray-900/30">
                <div className="text-5xl mb-4">🍳</div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Your Recipe Will Appear Here</h3>
                <p className="text-sm text-gray-500 max-w-xs">Enter your ingredients and preferences to generate a complete recipe with flavor profile analysis.</p>
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-4 border-blue-600/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-blue-400 text-sm font-medium">Crafting your recipe...</p>
                <p className="text-gray-500 text-xs mt-1">Analyzing flavors, substitutions, plating</p>
              </div>
            )}
            {result && (
              <div className="bg-gray-900/60 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-blue-400">🍽️ Generated Recipe</h3>
                  <button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-gray-400 hover:text-white transition">📋 Copy</button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
