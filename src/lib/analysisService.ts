import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ModuleType = 'taxonomy' | 'otolith' | 'edna' | 'biodiversity';

const moduleLabels: Record<ModuleType, string> = {
  taxonomy: 'Taxonomy',
  otolith: 'Otolith',
  edna: 'eDNA',
  biodiversity: 'Biodiversity',
};

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
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;
  if (!user) {
    console.warn('Skipping analysis save: no authenticated session');
    toast.info('Sign in to save your analyses to the dashboard');
    return null;
  }

  const { error } = await supabase.from('analysis_results').insert([{
    user_id: user.id,
    module,
    query_text: queryText,
    response_preview: responsePreview.slice(0, 500),
    summary,
    metadata: metadata as any,
  }]);

  if (error) {
    console.error('Failed to save analysis result:', error);
    toast.error(`Failed to save ${moduleLabels[module]} analysis`);
  } else {
    toast.success(`${moduleLabels[module]} analysis saved to dashboard`);
  }
}

export async function getModuleStats() {
  const { data, error } = await supabase
    .from('analysis_results')
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
    .from('analysis_results')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data: data as any[] | null, error };
}
