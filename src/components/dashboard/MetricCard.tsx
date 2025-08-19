import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  isLive?: boolean;
}

export const MetricCard = ({ 
  title, 
  value, 
  unit = '', 
  change, 
  icon: Icon, 
  color = 'primary',
  isLive = false 
}: MetricCardProps) => {
  const getColorClass = (color: string) => {
    const colorMap = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-primary';
  };

  const getBackgroundClass = (color: string) => {
    const backgroundMap = {
      primary: 'bg-primary/10',
      secondary: 'bg-secondary/10',
      accent: 'bg-accent/10',
      success: 'bg-success/10',
      warning: 'bg-warning/10'
    };
    return backgroundMap[color as keyof typeof backgroundMap] || 'bg-primary/10';
  };

  return (
    <div className={`nexus-metric-card ${isLive ? 'animate-pulse-soft' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${getBackgroundClass(color)} animate-float`}>
          <Icon className={`${getColorClass(color)} animate-glow`} size={24} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center ${
            change > 0 ? 'text-success' : change < 0 ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
              change > 0 ? 'bg-success/10' : change < 0 ? 'bg-destructive/10' : 'bg-muted/20'
            }`}>
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-foreground">
          {value}{unit}
        </h3>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};