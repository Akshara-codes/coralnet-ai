import { supabase } from '@/integrations/supabase/client';

export type ModuleType = 'taxonomy' | 'otolith' | 'edna' | 'biodiversity';

export async function saveAnalysisResult({
  module,
  queryText,
  responsePreview,
  summary,
  metadata = {},
}: {
  module: ModuleType;
  queryText: string;
  responsePreview: string;
  summary: string;
  metadata?: Record<string, unknown>;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { error } = await supabase.from('analysis_results' as any).insert({
    user_id: user.id,
    module,
    query_text: queryText,
    response_preview: responsePreview.slice(0, 500),
    summary,
    metadata,
  });

  if (error) {
    console.error('Failed to save analysis result:', error);
  }
}

export async function getModuleStats() {
  const { data, error } = await supabase
    .from('analysis_results' as any)
    .select('module')
    .then(({ data, error }) => {
      if (error) return { data: null, error };
      // Aggregate client-side since view may not be in types
      const stats: Record<string, number> = {};
      (data as any[])?.forEach((row: any) => {
        stats[row.module] = (stats[row.module] || 0) + 1;
      });
      return { data: stats, error: null };
    });
  return { data, error };
}

export async function getUserRecentActivity(limit = 10) {
  const { data, error } = await supabase
    .from('analysis_results' as any)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data: data as any[] | null, error };
}
