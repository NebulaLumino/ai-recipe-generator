"use server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { ingredients, cuisine, dietary, mealType, servings, skillLevel } = await req.json();
    const openai = new OpenAI({ baseURL: "https://api.deepseek.com/v1", apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert chef and culinary consultant. Generate creative recipes with Recipe Name, Flavor Profile, Ingredients & Quantities, Technique Notes, Step-by-Step Instructions, Serving Suggestions, Wine/Food Pairing." },
        { role: "user", content: "Generate a recipe: ingredients/cuisine={ingredients}, cuisine={cuisine}, dietary={dietary}, mealType={mealType}, servings={servings}, skillLevel={skillLevel}" },
      ],
      temperature: 0.8,
      max_tokens: 2048,
    });
    return NextResponse.json({ output: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
