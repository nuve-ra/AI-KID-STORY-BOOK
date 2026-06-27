// import { NextResponse } from "next/server";
// import { chatSession } from "@/config/Geminiai";

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     const result = await chatSession.sendMessage(prompt);
//     const story = JSON.parse(result.response.text());

//     return NextResponse.json({ story });
//   } catch (error) {
//     console.error("Generate story error:", error);

//     return NextResponse.json(
//       {
//         error:
//           error instanceof Error ? error.message : "Failed to generate story",
//       },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { ai } from "@/config/Geminiai";

// export async function POST(req: Request) {
//   try {
//    const { prompt } = await req.json();console.log("Prompt:", prompt);
//     const result = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//         temperature: 1,
//         topP: 0.95,
//         maxOutputTokens: 8192,
//       },
//     });

//     const text = result.text;

//     if (!text) {
//       throw new Error("Gemini returned an empty response.");
//     }

//     const story = JSON.parse(text);

//     return NextResponse.json({ story });
//   } catch (error) {
//     console.error("Generate Story Error:", error);

//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Unknown Error",
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { ai } from "@/config/Geminiai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const finalPrompt = `
You are a professional children's story writer.

Generate a story in VALID JSON ONLY.

Rules:
- Age: 5-8 years
- Exactly 5 chapters
- Educational and fun
- Paper cut illustration style
- Return ONLY JSON
- Do not wrap the response in markdown

JSON format:

{
  "story_title": "",
  "story_cover": {
    "image_prompt": ""
  },
  "chapters": [
    {
      "chapter": 1,
      "title": "",
      "text": "",
      "image_prompt": ""
    }
  ]
}

Story Topic:
${prompt}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 1,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    });

    const text = result.text;

    console.log("Gemini Response:\n", text);

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    let story;

    try {
      story = JSON.parse(text);
    } catch {
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      story = JSON.parse(cleaned);
    }

    return NextResponse.json({
      success: true,
      story,
    });
  } catch (error: any) {
    console.error("Generate Story Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown Error",
      },
      { status: 500 }
    );
  }
}