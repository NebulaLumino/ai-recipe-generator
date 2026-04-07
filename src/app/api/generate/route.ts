import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { ingredients, dietary, cuisine, skill, servings, prepTime, mealType } = await req.json();

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are an expert culinary AI assistant specializing in personalized recipe generation and meal planning. Generate comprehensive, actionable output based on the user's inputs. Your output should include: a full recipe with ingredients list and step-by-step instructions, nutritional info estimate per serving, meal plan suggestions for the week, and a shopping list extension for any missing ingredients. Format everything clearly with headers, bullet points, and markdown. Be specific with measurements, temperatures, and times.`,
        },
        {
          role: "user",
          content: `Generate a personalized recipe with the following details:

- Available Ingredients: ${ingredients}
- Dietary Restrictions: ${dietary}
- Cuisine Preference: ${cuisine}
- Cooking Skill Level: ${skill}
- Servings Needed: ${servings}
- Prep Time Available: ${prepTime} minutes
- Meal Type: ${mealType}

Please provide:
1. Recipe Name & Description
2. Complete Ingredients List (with measurements)
3. Step-by-Step Instructions
4. Nutritional Info Estimate (per serving)
5. Meal Plan Suggestions
6. Shopping List Extension (additional items needed)`,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
