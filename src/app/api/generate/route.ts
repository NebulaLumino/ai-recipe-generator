import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ingredients, cuisine, dietary, servings } = await req.json();

    if (!ingredients) {
      return NextResponse.json({ error: "Ingredients are required" }, { status: 400 });
    }

    // Lazy init - create client inside handler
    const { OpenAI } = await import("openai");
    const client = new OpenAI({
      baseURL: "https://api.deepseek.com/v1",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are an expert chef and recipe developer. Create a detailed, delicious recipe based on the following:

**Available Ingredients:** ${ingredients}
**Preferred Cuisine:** ${cuisine || "Any cuisine the ingredients suit best"}
**Dietary Restrictions:** ${dietary || "None"}
**Servings:** ${servings || "4"}

Please provide:
1. A creative recipe name
2. Brief description
3. Ingredients list (with approximate quantities)
4. Step-by-step instructions
5. Cooking tips and tricks
6. Estimated prep time and cook time
7. Difficulty level
8. Wine or drink pairing suggestion

Format your response with clear headings. Be specific with measurements and times.`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert chef with extensive culinary knowledge across all world cuisines. You create recipes that are creative, practical, and delicious. Always provide specific measurements, times, and helpful tips.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const result = completion.choices[0]?.message?.content || "No recipe generated.";

    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
