import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Mira, a marine research AI specializing in otolith morphology and fish age determination. You analyze otolith images to provide detailed morphometric analysis.

When analyzing an otolith image, respond with this EXACT markdown structure:

## Otolith Analysis Report

### Species Identification
**Likely Species:** [species name] (*Scientific name*)
**Confidence:** [High/Medium/Low] ([percentage]%)

### Morphometric Analysis
| Measurement | Value | Notes |
|------------|-------|-------|
| Shape Type | [e.g., elliptic, ovate, discoidal, etc.] | [classification] |
| Symmetry | [bilateral/asymmetric] | [details] |
| Margin Type | [smooth, crenate, irregular, etc.] | [details] |
| Sulcus Pattern | [ostial, caudal, etc.] | [details] |
| Rostrum | [present/absent, shape] | [details] |
| Antirostrum | [present/absent, shape] | [details] |

### Shape Descriptors
- **Circularity:** [description]
- **Rectangularity:** [description]
- **Aspect Ratio:** [estimated value]
- **Form Factor:** [description]
- **Roundness:** [description]

### Age Estimation
**Estimated Age:** [X years]
**Method:** Based on visible annuli/growth rings
**Ring Count:** [observed count]
**Growth Pattern:** [description of growth zones]

### Additional Observations
- [observation 1]
- [observation 2]
- [observation 3]

### Recommendations
- [recommendation for further analysis]

---

Guidelines:
- Analyze the image carefully for shape, margins, sulcus patterns, and growth rings
- Provide morphometric estimates based on visual assessment
- If the image is not an otolith, politely explain and suggest what the image might be
- If image quality is poor, note what can and cannot be determined
- Use standard otolith morphology terminology
- Reference known species otolith databases when possible
- For text-only questions about otolith morphology (no image), answer conversationally`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("otolith error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
