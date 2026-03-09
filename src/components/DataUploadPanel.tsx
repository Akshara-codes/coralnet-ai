import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet, X, BarChart3, LineChart, PieChart, ScatterChart } from 'lucide-react';
import { toast } from 'sonner';
import CustomDataChart from './CustomDataChart';

export type ParsedData = {
  headers: string[];
  rows: Record<string, string | number>[];
  fileName: string;
};

type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

const chartTypeOptions: { value: ChartType; label: string; icon: React.ElementType }[] = [
  { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
  { value: 'line', label: 'Line Chart', icon: LineChart },
  { value: 'scatter', label: 'Scatter Plot', icon: ScatterChart },
  { value: 'pie', label: 'Pie Chart', icon: PieChart },
];

function parseCSV(text: string): ParsedData | null {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return null;

  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    const row: Record<string, string | number> = {};
    headers.forEach((h, i) => {
      const val = values[i] ?? '';
      const num = Number(val);
      row[h] = val !== '' && !isNaN(num) ? num : val;
    });
    return row;
  }).filter(row => Object.values(row).some(v => v !== ''));

  return { headers, rows, fileName: '' };
}

const DataUploadPanel = () => {
  const [data, setData] = useState<ParsedData | null>(null);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const numericHeaders = data?.headers.filter(h =>
    data.rows.some(r => typeof r[h] === 'number')
  ) ?? [];

  const categoryHeaders = data?.headers ?? [];

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      if (!parsed || parsed.rows.length === 0) {
        toast.error('Could not parse CSV — ensure it has headers and data rows');
        return;
      }
      parsed.fileName = file.name;
      setData(parsed);

      // Auto-select axes
      const nums = parsed.headers.filter(h => parsed.rows.some(r => typeof r[h] === 'number'));
      const cats = parsed.headers.filter(h => !nums.includes(h));
      setXAxis(cats[0] || parsed.headers[0]);
      setYAxis(nums[0] || parsed.headers[1] || parsed.headers[0]);

      toast.success(`Loaded ${parsed.rows.length} rows from ${file.name}`);
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearData = () => {
    setData(null);
    setXAxis('');
    setYAxis('');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!data ? (
          <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card
              className={`glass-panel border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border/50'}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-lg font-medium text-foreground">Upload your dataset</p>
                  <p className="text-sm text-muted-foreground">Drag & drop a CSV file or click to browse</p>
                  <p className="text-xs text-muted-foreground">Max 5MB • CSV format with headers</p>
                </div>
                <label>
                  <input type="file" accept=".csv" className="hidden" onChange={handleInputChange} />
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span><FileSpreadsheet className="w-4 h-4 mr-2" />Choose File</span>
                  </Button>
                </label>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            {/* File info bar */}
            <Card className="glass-panel">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{data.fileName}</p>
                    <p className="text-xs text-muted-foreground">{data.rows.length} rows • {data.headers.length} columns</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{data.headers.join(', ')}</Badge>
                </div>
                <Button variant="ghost" size="icon" onClick={clearData}><X className="w-4 h-4" /></Button>
              </CardContent>
            </Card>

            {/* Chart configuration */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Chart Type</label>
                <Select value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {chartTypeOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>
                        <div className="flex items-center gap-2">
                          <o.icon className="w-3.5 h-3.5" />{o.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {chartType === 'pie' ? 'Label Column' : 'X Axis'}
                </label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categoryHeaders.map(h => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {chartType === 'pie' ? 'Value Column' : 'Y Axis'}
                </label>
                <Select value={yAxis} onValueChange={setYAxis}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(chartType === 'pie' ? numericHeaders : categoryHeaders).map(h => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">&nbsp;</label>
                <label>
                  <input type="file" accept=".csv" className="hidden" onChange={handleInputChange} />
                  <Button variant="outline" className="w-full cursor-pointer" asChild>
                    <span><Upload className="w-4 h-4 mr-2" />Replace File</span>
                  </Button>
                </label>
              </div>
            </div>

            {/* Chart */}
            <Card className="glass-panel">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {chartTypeOptions.find(o => o.value === chartType)?.label}: {yAxis} by {xAxis}
                </CardTitle>
                <CardDescription>Visualizing your uploaded dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomDataChart data={data.rows} chartType={chartType} xKey={xAxis} yKey={yAxis} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataUploadPanel;
