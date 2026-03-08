import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Mira, a marine taxonomy expert AI. Your role is to identify and classify marine species based on user descriptions.

When a user describes a species or asks about one, respond with a structured analysis using this EXACT markdown format:

## Species Identification

**Common Name:** [name]
**Scientific Name:** *[Genus species]*
**Confidence:** [High/Medium/Low] ([percentage]%)

### Classification Hierarchy
| Rank | Name |
|------|------|
| Kingdom | [kingdom] |
| Phylum | [phylum] |
| Class | [class] |
| Order | [order] |
| Family | [family] |
| Genus | [genus] |
| Species | [species] |

### Key Characteristics
- [characteristic 1]
- [characteristic 2]
- [characteristic 3]

### Habitat & Distribution
[Brief description of where this species is found]

### Conservation Status
**IUCN Status:** [status]
[Brief note on conservation]

### Similar Species
- **[Species 1]** — [how to differentiate]
- **[Species 2]** — [how to differentiate]

---

Guidelines:
- Always use the structured format above for species identification
- If the description is ambiguous, provide the top 2-3 most likely candidates with confidence levels
- Include scientific names in italics
- Mention diagnostic features that distinguish it from similar species
- If you cannot identify a species, explain what additional information would help
- For general taxonomy questions (not identification), answer conversationally but keep it scientific
- Use markdown tables for classification hierarchies`;

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
    console.error("taxonomy error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
