import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../ui/data-table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, GitBranch, Star } from 'lucide-react';

interface KnowledgeNode {
  id: string;
  type: 'tacit' | 'technical' | 'convergent' | 'research';
  expert: string;
  content: string;
  connections: number;
  verification: number;
  createdAt?: string;
  category?: string;
}

const columns: ColumnDef<KnowledgeNode>[] = [
  {
    accessorKey: 'content',
    header: 'Knowledge Content',
    cell: ({ row }) => {
      const content = row.getValue('content') as string;
      const type = row.original.type;
      return (
        <div>
          <div className="font-medium text-foreground max-w-xs truncate" title={content}>
            {content}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            ID: {row.original.id}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const typeColors = {
        tacit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        technical: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        convergent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        research: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      };
      return (
        <Badge className={typeColors[type as keyof typeof typeColors]}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'expert',
    header: 'Expert',
    cell: ({ row }) => {
      const expert = row.getValue('expert') as string;
      return <div className="font-medium">{expert}</div>;
    },
  },
  {
    accessorKey: 'connections',
    header: 'Connections',
    cell: ({ row }) => {
      const connections = row.getValue('connections') as number;
      return (
        <div className="flex items-center space-x-2">
          <GitBranch size={16} className="text-muted-foreground" />
          <span className="font-bold">{connections}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'verification',
    header: 'Verification Score',
    cell: ({ row }) => {
      const score = row.getValue('verification') as number;
      const getScoreColor = (score: number) => {
        if (score >= 9) return 'text-green-600';
        if (score >= 8) return 'text-blue-600';
        if (score >= 7) return 'text-yellow-600';
        return 'text-red-600';
      };
      
      return (
        <div className="flex items-center space-x-2">
          <Star size={16} className={getScoreColor(score)} />
          <span className={`font-bold ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.original.category || 'General';
      return <Badge variant="outline">{category}</Badge>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Eye size={14} className="mr-1" />
            View
          </Button>
          <Button size="sm" variant="secondary">
            <GitBranch size={14} className="mr-1" />
            Explore
          </Button>
        </div>
      );
    },
  },
];

interface KnowledgeDataTableProps {
  knowledgeNodes: KnowledgeNode[];
}

export function KnowledgeDataTable({ knowledgeNodes }: KnowledgeDataTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Knowledge Repository</h2>
          <p className="text-muted-foreground">Browse and manage knowledge nodes in the system</p>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={knowledgeNodes}
        searchPlaceholder="Search knowledge nodes..."
        pageSize={8}
      />
    </div>
  );
}