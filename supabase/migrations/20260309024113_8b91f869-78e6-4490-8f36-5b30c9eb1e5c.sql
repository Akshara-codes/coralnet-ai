
-- Drop all existing restrictive policies
DROP POLICY IF EXISTS "Public can read for aggregates" ON public.analysis_results;
DROP POLICY IF EXISTS "Users can delete own results" ON public.analysis_results;
DROP POLICY IF EXISTS "Users can insert own results" ON public.analysis_results;
DROP POLICY IF EXISTS "Users can read own results" ON public.analysis_results;

-- Recreate as PERMISSIVE policies (default)
CREATE POLICY "Users can insert own results"
  ON public.analysis_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own results"
  ON public.analysis_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own results"
  ON public.analysis_results FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read for aggregates"
  ON public.analysis_results FOR SELECT
  TO anon
  USING (true);
