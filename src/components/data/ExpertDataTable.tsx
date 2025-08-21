import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../ui/data-table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, MessageCircle } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  avatar: string;
  specialization: string[];
  trustScore: number;
  participationRate: number;
  status: 'online' | 'responding' | 'offline';
  matchingScore: number;
  responseTime: string;
  lastActive: string;
}

const columns: ColumnDef<Expert>[] = [
  {
    accessorKey: 'name',
    header: 'Expert',
    cell: ({ row }) => {
      const expert = row.original;
      return (
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{expert.avatar}</span>
          <div>
            <div className="font-medium text-foreground">{expert.name}</div>
            <div className="text-sm text-muted-foreground">{expert.lastActive}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'specialization',
    header: 'Specialization',
    cell: ({ row }) => {
      const specialization = row.getValue('specialization') as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {specialization.map((spec, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusColors = {
        online: 'bg-success text-success-foreground',
        responding: 'bg-warning text-warning-foreground',
        offline: 'bg-muted text-muted-foreground',
      };
      return (
        <Badge className={statusColors[status as keyof typeof statusColors]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'trustScore',
    header: 'Trust Score',
    cell: ({ row }) => {
      const score = row.getValue('trustScore') as number;
      return <div className="font-medium text-center">{score.toFixed(1)}</div>;
    },
  },
  {
    accessorKey: 'matchingScore',
    header: 'Match Score',
    cell: ({ row }) => {
      const score = row.getValue('matchingScore') as number;
      return (
        <div className="text-center">
          <div className="font-bold text-primary">{score.toFixed(2)}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'participationRate',
    header: 'Participation',
    cell: ({ row }) => {
      const rate = row.getValue('participationRate') as number;
      return (
        <div className="text-center">
          <div className="font-medium">{rate}%</div>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${rate}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'responseTime',
    header: 'Response Time',
    cell: ({ row }) => {
      const time = row.getValue('responseTime') as string;
      return <div className="text-center text-muted-foreground">{time}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const expert = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Eye size={14} className="mr-1" />
            View
          </Button>
          <Button size="sm" variant="default">
            <MessageCircle size={14} className="mr-1" />
            Contact
          </Button>
        </div>
      );
    },
  },
];

interface ExpertDataTableProps {
  experts: Expert[];
}

export function ExpertDataTable({ experts }: ExpertDataTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Expert Management</h2>
          <p className="text-muted-foreground">Manage and view all experts in the system</p>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={experts}
        searchPlaceholder="Search experts..."
        pageSize={5}
      />
    </div>
  );
}