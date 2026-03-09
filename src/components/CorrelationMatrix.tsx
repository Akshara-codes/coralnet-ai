import React from 'react';

const variables = ['Temp', 'Salinity', 'pH', 'DO', 'Chlor-a', 'Turbidity'];
const matrix = [
  [1.00, -0.32, -0.67,  0.45, -0.58,  0.22],
  [-0.32, 1.00,  0.18, -0.12,  0.08, -0.45],
  [-0.67, 0.18,  1.00,  0.72, -0.35,  0.10],
  [0.45, -0.12,  0.72,  1.00, -0.28, -0.15],
  [-0.58, 0.08, -0.35, -0.28,  1.00,  0.55],
  [0.22, -0.45,  0.10, -0.15,  0.55,  1.00],
];

const getColor = (v: number) => {
  if (v >= 0.7) return 'bg-primary/80 text-primary-foreground';
  if (v >= 0.4) return 'bg-primary/40 text-foreground';
  if (v >= 0.1) return 'bg-primary/15 text-foreground';
  if (v >= -0.1) return 'bg-muted/30 text-muted-foreground';
  if (v >= -0.4) return 'bg-destructive/15 text-foreground';
  if (v >= -0.7) return 'bg-destructive/35 text-foreground';
  return 'bg-destructive/60 text-destructive-foreground';
};

const CorrelationMatrix = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr>
          <th className="p-1.5" />
          {variables.map(v => (
            <th key={v} className="p-1.5 text-center font-medium text-muted-foreground">{v}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {variables.map((row, i) => (
          <tr key={row}>
            <td className="p-1.5 font-medium text-muted-foreground text-right pr-2">{row}</td>
            {matrix[i].map((val, j) => (
              <td key={j} className="p-0.5">
                <div className={`rounded p-1.5 text-center font-mono ${getColor(val)} transition-colors`}>
                  {val.toFixed(2)}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
      <div className="w-3 h-3 rounded bg-destructive/60" /> Strong -ve
      <div className="w-3 h-3 rounded bg-muted/30 mx-1" /> Neutral
      <div className="w-3 h-3 rounded bg-primary/80" /> Strong +ve
    </div>
  </div>
);

export default CorrelationMatrix;
