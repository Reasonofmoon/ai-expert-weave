import { CheckCircle, Clock, User } from 'lucide-react';

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

interface ExpertCardProps {
  expert: Expert;
  onViewResponse: (expert: Expert) => void;
}

export const ExpertCard = ({ expert, onViewResponse }: ExpertCardProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online':
        return 'nexus-expert-status-online';
      case 'responding':
        return 'nexus-expert-status-responding';
      default:
        return 'nexus-expert-status-offline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return '온라인';
      case 'responding':
        return '응답 중';
      default:
        return '오프라인';
    }
  };

  return (
    <div className="nexus-card p-6 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="text-3xl">{expert.avatar}</div>
            <div className={`absolute -bottom-1 -right-1 ${getStatusClass(expert.status)}`} />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{expert.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-muted-foreground">{getStatusText(expert.status)}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{expert.lastActive}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{expert.matchingScore}</div>
          <div className="text-xs text-muted-foreground">매칭 점수</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {expert.specialization.map((spec, idx) => (
            <span 
              key={idx} 
              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="font-bold text-foreground">{expert.trustScore}</div>
          <div className="text-xs text-muted-foreground">신뢰도</div>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="font-bold text-foreground">{expert.participationRate}%</div>
          <div className="text-xs text-muted-foreground">참여율</div>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="font-bold text-foreground">{expert.responseTime}</div>
          <div className="text-xs text-muted-foreground">응답예정</div>
        </div>
      </div>

      <button 
        onClick={() => onViewResponse(expert)}
        className="nexus-button-primary w-full flex items-center justify-center space-x-2"
      >
        <User size={16} />
        <span>응답 보기</span>
      </button>
    </div>
  );
};