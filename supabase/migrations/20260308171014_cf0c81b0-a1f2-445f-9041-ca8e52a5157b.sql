
-- Table to store analysis results from all modules
CREATE TABLE public.analysis_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module TEXT NOT NULL CHECK (module IN ('taxonomy', 'otolith', 'edna', 'biodiversity')),
  summary TEXT NOT NULL,
  query_text TEXT NOT NULL,
  response_preview TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;

-- Users can insert their own results
CREATE POLICY "Users can insert own results"
  ON public.analysis_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own results
CREATE POLICY "Users can read own results"
  ON public.analysis_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own results
CREATE POLICY "Users can delete own results"
  ON public.analysis_results FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Public aggregate stats view (no user data exposed)
CREATE VIEW public.module_stats
WITH (security_invoker = off) AS
  SELECT
    module,
    COUNT(*) as total_analyses,
    COUNT(DISTINCT user_id) as unique_users,
    MAX(created_at) as last_analysis
  FROM public.analysis_results
  GROUP BY module;

-- Allow anyone to read aggregate stats
GRANT SELECT ON public.module_stats TO anon, authenticated;

-- Index for fast user queries
CREATE INDEX idx_analysis_results_user_module ON public.analysis_results(user_id, module, created_at DESC);
