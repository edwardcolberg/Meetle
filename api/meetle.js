export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

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
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `I have two people trying to meet in the middle.

Person A is at: ${locationA}
Person B is at: ${locationB}

Find the geographic/drive-time midpoint area between these two locations. Then suggest 5 real, specific places to meet near that midpoint — a mix of restaurants, cafes, and activities/parks. Focus on places that actually exist and are well-known in the area.

IMPORTANT:
- Include approximate latitude and longitude coordinates for Person A's location, Person B's location, and the midpoint area.
- Include approximate lat/lng for each suggested place.
- Include a price level for each place: "Free" for parks/free attractions, "$" for cheap/fast casual, "$$" for moderate sit-down, "$$$" for upscale, "$$$$" for fine dining/premium.
- Include the approximate straight-line distance in miles from the midpoint to each location A and B (used for drawing radius circles on a map).

Respond ONLY in this exact JSON format with no other text, no markdown, no backticks:
{"midpoint_area":"Name of the neighborhood/area","midpoint_note":"One sentence about why this area works","location_a":{"lat":41.83,"lng":-87.82},"location_b":{"lat":41.95,"lng":-87.73},"midpoint":{"lat":41.89,"lng":-87.78},"radius_miles":6.5,"suggestions":[{"name":"Actual Place Name","type":"restaurant|cafe|activity|park","vibe":"One short phrase","why":"One sentence on why it's good","drive_a":"Estimated drive from A","drive_b":"Estimated drive from B","rating":4.5,"price":"$$","lat":41.89,"lng":-87.78}]}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return res.status(500).json({
        error: "API_ERROR",
        status: response.status,
        detail: data.error?.message || "Unknown error",
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
    console.error("Server error:", err);
    return res.status(500).json({ error: "SERVER_ERROR", message: err.message });
  }
}
