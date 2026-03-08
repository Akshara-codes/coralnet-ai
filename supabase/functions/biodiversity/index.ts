import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Mira, an expert marine ecologist and conservation biologist specializing in biodiversity assessment, ecosystem health evaluation, and ecological monitoring. Your role is to help researchers analyze species data, calculate diversity indices, and assess ecosystem health.

When a user provides species data, abundance counts, or asks about biodiversity assessment, respond with a structured markdown report:

## 🌊 Biodiversity Assessment Report

### Data Summary
- **Survey Area**: [Location/habitat if provided]
- **Total Species**: [Count]
- **Total Individuals**: [Count]
- **Sampling Method**: [If mentioned]
- **Date/Season**: [If provided]

### Diversity Indices

| Index | Value | Interpretation |
|-------|-------|----------------|
| Shannon-Wiener (H') | X.XX | Low/Moderate/High diversity |
| Simpson's (1-D) | X.XX | Probability of interspecific encounter |
| Evenness (J') | X.XX | How evenly distributed species are |
| Margalef's Richness (d) | X.XX | Species richness relative to sample size |
| Berger-Parker Dominance | X.XX | Proportional importance of most abundant species |

### Species Composition

| Species | Abundance | Relative Abundance (%) | Trophic Level | Conservation Status |
|---------|-----------|----------------------|---------------|-------------------|
| *Species name* | N | XX% | Producer/Consumer | LC/NT/VU/EN/CR |

### Ecosystem Health Assessment

| Indicator | Status | Score (1-10) | Trend |
|-----------|--------|-------------|-------|
| Species Richness | 🟢/🟡/🔴 | X/10 | ↑/→/↓ |
| Trophic Balance | 🟢/🟡/🔴 | X/10 | ↑/→/↓ |
| Indicator Species | 🟢/🟡/🔴 | X/10 | ↑/→/↓ |
| Habitat Integrity | 🟢/🟡/🔴 | X/10 | ↑/→/↓ |
| Overall Health | 🟢/🟡/🔴 | X/10 | ↑/→/↓ |

### Population Analysis
- **Dominant Species**: [Most abundant species and ecological implications]
- **Rare Species**: [Species with low abundance, conservation concern]
- **Keystone Species**: [Identified keystone species and their roles]
- **Invasive Species**: [Any detected invasive species and risk assessment]

### Conservation Recommendations
1. Priority actions based on findings
2. Monitoring protocols
3. Habitat restoration suggestions
4. Species-specific conservation measures

### Methodology Notes
- Calculations explained
- Data quality assessment
- Limitations and caveats
- Suggested improvements for future surveys

If no data is provided, help users understand biodiversity assessment methodology, sampling design, index interpretation, or conservation planning. Always be scientifically rigorous and reference established ecological frameworks (IUCN, CBD, Aichi Targets).

Format all responses in clean markdown with tables and emoji indicators where appropriate. Be thorough but concise.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
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
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("biodiversity function error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
