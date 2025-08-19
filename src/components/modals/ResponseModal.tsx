import { X, CheckCircle, TrendingUp } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  avatar: string;
}

interface ExpertResponse {
  content: string;
  timestamp: string;
  verificationScore: number;
  researchMatches: Array<{
    title: string;
    similarity: number;
  }>;
}

interface ResponseModalProps {
  expert: Expert | null;
  response: ExpertResponse | null;
  onClose: () => void;
}

export const ResponseModal = ({ expert, response, onClose }: ResponseModalProps) => {
  if (!expert || !response) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="nexus-card max-w-4xl max-h-[90vh] overflow-y-auto p-6 m-4 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{expert.avatar}</span>
            <div>
              <h2 className="text-xl font-bold nexus-gradient-text">{expert.name}의 응답</h2>
              <p className="text-muted-foreground">응답 시간: {response.timestamp}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/20 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-muted/20 rounded-lg p-6 mb-4 border border-border/50">
            <h3 className="font-bold mb-3 text-foreground">전문가 응답</h3>
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {response.content}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <h4 className="font-bold text-success mb-3 flex items-center">
                <CheckCircle size={16} className="mr-2" />
                AI 검증 결과
              </h4>
              <div className="flex items-center mb-2">
                <div className="text-2xl font-bold text-success mr-2">
                  {response.verificationScore}/10
                </div>
                <div className="text-sm text-muted-foreground">
                  논리 일관성, 사실 정확성, 신뢰도 종합 평가
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-bold text-primary mb-3 flex items-center">
                <TrendingUp size={16} className="mr-2" />
                연구 매칭
              </h4>
              <div className="space-y-2">
                {response.researchMatches.map((match, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-foreground flex-1 mr-2">
                      {match.title.substring(0, 30)}...
                    </span>
                    <span className="text-primary font-bold">{match.similarity}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="nexus-button-secondary w-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
};