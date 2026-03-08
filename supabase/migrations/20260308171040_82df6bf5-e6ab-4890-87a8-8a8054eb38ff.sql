
-- Drop the existing view and recreate with security_invoker on
DROP VIEW IF EXISTS public.module_stats;

CREATE VIEW public.module_stats
WITH (security_invoker = on) AS
  SELECT
    module,
    COUNT(*) as total_analyses,
    COUNT(DISTINCT user_id) as unique_users,
    MAX(created_at) as last_analysis
  FROM public.analysis_results
  GROUP BY module;

GRANT SELECT ON public.module_stats TO anon, authenticated;

-- Add a public read policy for aggregate access (the view needs to read the table)
CREATE POLICY "Public can read for aggregates"
  ON public.analysis_results FOR SELECT
  TO anon
  USING (true);
