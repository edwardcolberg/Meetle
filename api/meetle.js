export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Debug: check if key exists
  if (!apiKey) {
    return res.status(500).json({ error: "NO_KEY_FOUND" });
  }

  const { locationA, locationB } = req.body;

  if (!locationA || !locationB) {
    return res.status(400).json({ error: "Both locations are required" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey.trim(),
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `I have two people trying to meet in the middle.

Person A is at: ${locationA}
Person B is at: ${locationB}

Find the geographic/drive-time midpoint area between these two locations. Then suggest 5 real, specific places to meet near that midpoint — a mix of restaurants, cafes, and activities. Focus on places that actually exist and are well-known in the area.

Respond ONLY in this exact JSON format with no other text, no markdown, no backticks:
{"midpoint_area":"Name of the neighborhood/area that's roughly in the middle","midpoint_note":"One sentence about why this area works as a midpoint","suggestions":[{"name":"Actual Place Name","type":"restaurant|cafe|activity|park","vibe":"One short phrase describing it","why":"One sentence on why it's good for meeting up","drive_a":"Estimated drive from Person A (e.g. 15 min)","drive_b":"Estimated drive from Person B (e.g. 18 min)","rating":4.5}]}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "API_ERROR",
        status: response.status,
        detail: data.error?.message || "Unknown error",
        keyPrefix: apiKey.substring(0, 10) + "..."
      });
    }

    const text = data.content
      .filter((item) => item.type === "text")
      .map((item) => item.text)
      .join("");

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
}
