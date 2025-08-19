import { useState } from 'react';
import { Filter, Eye, GitBranch } from 'lucide-react';

interface KnowledgeNode {
  id: string;
  x: number;
  y: number;
  type: 'tacit' | 'technical' | 'research' | 'convergent';
  expert: string;
  content: string;
  connections: number;
  verification: number;
}

interface LiveMetrics {
  totalNodes: number;
  totalConnections: number;
  knowledgeDensity: number;
}

interface KnowledgeGraphProps {
  knowledgeNodes: KnowledgeNode[];
  liveMetrics: LiveMetrics;
}

export const KnowledgeGraph = ({ knowledgeNodes, liveMetrics }: KnowledgeGraphProps) => {
  const [filter, setFilter] = useState<string>('all');

  const getNodeClass = (type: string) => {
    const classMap = {
      tacit: 'nexus-knowledge-node-tacit',
      technical: 'nexus-knowledge-node-technical', 
      research: 'nexus-knowledge-node-research',
      convergent: 'nexus-knowledge-node-convergent'
    };
    return classMap[type as keyof typeof classMap] || 'nexus-knowledge-node-tacit';
  };

  const filteredNodes = filter === 'all' 
    ? knowledgeNodes 
    : knowledgeNodes.filter(node => node.type === filter);

  return (
    <div className="nexus-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <GitBranch className="text-primary" size={24} />
          <h2 className="text-xl font-bold text-foreground">실시간 지식 그래프</h2>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="text-muted-foreground" size={16} />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="all">전체</option>
            <option value="tacit">암묵지</option>
            <option value="research">연구</option>
            <option value="technical">기술적 통찰</option>
            <option value="convergent">수렴 통찰</option>
          </select>
        </div>
      </div>
      
      <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Connection lines */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Draw connections */}
          <line x1="100" y1="150" x2="300" y2="100" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse-soft" />
          <line x1="100" y1="150" x2="200" y2="200" stroke="hsl(var(--success))" strokeWidth="3" opacity="0.7" />
          <line x1="300" y1="100" x2="200" y2="200" stroke="hsl(var(--warning))" strokeWidth="2" opacity="0.6" />
          <line x1="200" y1="200" x2="400" y2="150" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.6" />
          <line x1="100" y1="150" x2="150" y2="250" stroke="hsl(var(--secondary))" strokeWidth="2" opacity="0.6" />
          
          {/* Draw nodes */}
          {filteredNodes.map(node => (
            <g key={node.id} className="cursor-pointer group">
              <circle
                cx={node.x}
                cy={node.y}
                r={8 + node.connections}
                className={`${getNodeClass(node.type)} hover:opacity-80 transition-all duration-300`}
                stroke="#fff"
                strokeWidth="2"
                filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={4}
                fill="white"
                opacity="0.8"
              />
              <text
                x={node.x}
                y={node.y + 25}
                textAnchor="middle"
                className="text-xs fill-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {node.content.substring(0, 15)}...
              </text>
            </g>
          ))}
        </svg>
        
        <div className="absolute bottom-4 right-4 nexus-card p-3">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>암묵지</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span>연구</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span>기술</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span>수렴</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary">{liveMetrics.totalNodes}</div>
          <div className="text-sm text-muted-foreground">지식 노드</div>
        </div>
        <div className="p-3 bg-success/5 rounded-lg">
          <div className="text-2xl font-bold text-success">{liveMetrics.totalConnections}</div>
          <div className="text-sm text-muted-foreground">연결</div>
        </div>
        <div className="p-3 bg-secondary/5 rounded-lg">
          <div className="text-2xl font-bold text-secondary">{liveMetrics.knowledgeDensity.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">밀도</div>
        </div>
      </div>
    </div>
  );
};