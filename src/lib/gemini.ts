const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;

export async function getFoodPrediction(data: {
  people: number;
  eventType: string;
  pastWastage: string;
}) {
  const prompt = `
You are an AI system helping reduce food waste.

Inputs:
- Expected people: ${data.people}
- Event type: ${data.eventType}
- Past wastage level: ${data.pastWastage}

Give:
1. Suggested food quantity
2. Risk level
3. Sustainability tip

Give response strictly in this format:

Food Quantity: <number> servings
Risk Level: Low / Medium / High
Sustainability Tip: <1 line advice>

`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const json = await res.json();

  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "No AI response";
}
