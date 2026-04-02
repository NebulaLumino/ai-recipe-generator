import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://api.deepseek.com/v1',
    });

    const { ingredients, cuisineStyle, dietaryRestrictions, skillLevel, timeAvailable } = await req.json();

    const prompt = `You are an expert chef and culinary creative. Generate a complete, detailed recipe based on the following inputs:

**Available Ingredients:** ${ingredients}
**Cuisine Style:** ${cuisineStyle}
**Dietary Restrictions:** ${dietaryRestrictions || 'None'}
**Cooking Skill Level:** ${skillLevel}
**Time Available:** ${timeAvailable}

Please provide a comprehensive recipe with all sections below:

## 🍽️ RECIPE NAME
Give the dish an appealing, evocative name.

## 📝 DESCRIPTION
A brief, enticing description of the dish (2-3 sentences).

## 🔥 FLAVOR PROFILE ANALYSIS
Analyze the flavor profile in detail:
- **Primary flavors:** (e.g., savory, sweet, sour, bitter, umami)
- **Secondary notes:** (e.g., smoky, floral, spicy, earthy)
- **Texture balance:** (e.g., creamy vs crunchy, tender vs crispy)
- **Aroma profile:** (what scents will fill the kitchen)

## 🧂 INGREDIENTS (with measurements)
Full ingredient list with precise measurements, noting which are in the available ingredients list vs. common pantry staples.

## 👨‍🍳 STEP-BY-STEP INSTRUCTIONS
Numbered, detailed cooking steps. Adapt complexity to "${skillLevel}" skill level. Include:
- Prep work
- Cooking technique
- Key technique tips
- plating/final assembly

## ⏱️ TIMING GUIDE
- Prep time: __
- Cook time: __
- Total time: __
- Active vs passive time breakdown

## 🍽️ SERVING SIZE
Number of servings this recipe makes.

## 🎨 PLATING IDEAS
Creative plating suggestions:
- Plate shape/type recommendation
- Sauce application technique
- Garnish recommendations
- Height and visual layers
- Color contrast suggestions

## 🔄 INGREDIENT SUBSTITUTIONS
3-5 practical substitutions for key ingredients, explaining how they affect flavor/texture:
1. [Substitution 1] → Effect on dish
2. [Substitution 2] → Effect on dish
etc.

## ⚠️ COMMON MISTAKES TO AVOID
3 things that typically go wrong with this dish and how to prevent them.

## 🍷 SERVING SUGGESTIONS
What to serve alongside (side dishes, bread, beverages).

Format the output with bold headers, emojis, structured sections, and clear step numbers. Make it feel like a professional recipe card.`;

    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 3000,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: unknown) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
