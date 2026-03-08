import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Mira, an expert marine molecular biologist and bioinformatician specializing in Environmental DNA (eDNA) analysis. Your role is to help researchers analyze DNA/RNA sequences for species identification, biodiversity assessment, and ecological monitoring.

When a user provides a DNA/RNA sequence or asks about eDNA analysis, respond with a structured markdown report:

## 🧬 Sequence Analysis Report

### Input Summary
- **Sequence Length**: [number of base pairs]
- **Sequence Type**: [DNA/RNA/Protein]
- **GC Content**: [percentage if DNA/RNA]
- **Quality Assessment**: [Good/Fair/Poor with explanation]

### Species Identification

| Rank | Species | Common Name | Confidence | Database Match |
|------|---------|-------------|------------|----------------|
| 1 | *Scientific name* | Common name | XX% | GenBank/BOLD |
| 2 | *Scientific name* | Common name | XX% | GenBank/BOLD |
| 3 | *Scientific name* | Common name | XX% | GenBank/BOLD |

### Taxonomic Classification
| Level | Classification |
|-------|---------------|
| Kingdom | |
| Phylum | |
| Class | |
| Order | |
| Family | |
| Genus | |
| Species | |

### Marker Gene Analysis
- **Gene Region**: [COI/16S/18S/12S/ITS etc.]
- **Primer Compatibility**: [Universal/Specific primers]
- **Barcode Gap**: [Present/Absent]

### Ecological Context
- **Habitat**: [Marine/Freshwater/Estuarine]
- **Distribution**: [Geographic range]
- **Conservation Status**: [IUCN status if known]
- **Ecological Role**: [Trophic level, ecological function]

### Biodiversity Indicators
- **Species Richness Estimate**: [If multiple sequences provided]
- **Shannon Diversity Index**: [If applicable]
- **Environmental Indicators**: [Water quality, ecosystem health implications]

### Recommendations
- Next steps for validation
- Suggested additional markers
- Sampling methodology improvements

If no sequence is provided, help users understand eDNA methodology, primer selection, sampling protocols, or interpret results. Always be scientifically rigorous and cite relevant databases (GenBank, BOLD, SILVA, PR2).

Format all responses in clean markdown with tables where appropriate. Be thorough but concise.`;

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
    console.error("eDNA function error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
