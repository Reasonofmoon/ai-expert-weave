import React, { useState } from 'react';
import { Play, Clock, Users, TrendingUp, Star, BookOpen, ArrowRight } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  tools: string[];
  keyPoints: string[];
}

interface Workflow {
  id: string;
  title: string;
  category: string;
  difficulty: number;
  duration: string;
  participants: number;
  successRate: number;
  verifiedBy: string[];
  description: string;
  steps: WorkflowStep[];
  outcomes: string[];
  evolutionHistory: {
    version: string;
    changes: string;
    improvedBy: string;
    date: string;
  }[];
}

const workflows: Workflow[] = [
  {
    id: "wf_001",
    title: "AI 협업 창의적 글쓰기 워크플로우",
    category: "창작 워크플로우",
    difficulty: 7.2,
    duration: "2-3시간",
    participants: 124,
    successRate: 89,
    verifiedBy: ["Marcus Chen", "Dr. Sarah Kim", "Prof. Lisa Johnson"],
    description: "AI와 인간이 협업하여 창의적 글쓰기를 수행하는 검증된 작업순서. 감정적 진정성과 기술적 효율성을 동시에 확보하는 방법론.",
    steps: [
      {
        id: "step_1",
        title: "의도 설정 및 컨텍스트 구축",
        description: "글쓰기의 목적, 독자, 감정적 톤을 명확히 정의",
        estimatedTime: "15분",
        tools: ["마인드맵", "페르소나 시트"],
        keyPoints: ["감정적 목표 설정", "독자 페르소나 구체화", "핵심 메시지 정의"]
      },
      {
        id: "step_2", 
        title: "AI 브레인스토밍 세션",
        description: "GPT를 활용한 아이디어 확장 및 구조화",
        estimatedTime: "30분",
        tools: ["ChatGPT", "Claude", "프롬프트 체인"],
        keyPoints: ["다각도 접근", "아이디어 폭발", "구조적 정리"]
      },
      {
        id: "step_3",
        title: "인간 큐레이션",
        description: "AI 제안을 인간의 경험과 직관으로 필터링",
        estimatedTime: "20분", 
        tools: ["비판적 사고", "감정 검증"],
        keyPoints: ["진정성 검증", "감정적 울림 확인", "개인적 경험 연결"]
      },
      {
        id: "step_4",
        title: "협업 초안 작성",
        description: "AI가 구조를 잡고 인간이 영혼을 넣는 단계",
        estimatedTime: "45분",
        tools: ["AI 초안 생성", "인간 감정 주입"],
        keyPoints: ["구조적 일관성", "감정적 진정성", "읽기 흐름 최적화"]
      },
      {
        id: "step_5",
        title: "반복 개선",
        description: "AI와 인간의 교대 피드백을 통한 품질 향상",
        estimatedTime: "30분",
        tools: ["AI 분석", "인간 직감"],
        keyPoints: ["논리적 완성도", "감정적 임팩트", "독자 반응 예측"]
      }
    ],
    outcomes: [
      "AI의 효율성과 인간의 창의성이 결합된 고품질 콘텐츠",
      "작업 시간 40% 단축, 품질 점수 15% 향상",
      "감정적 진정성 유지하면서도 생산성 극대화"
    ],
    evolutionHistory: [
      {
        version: "v2.1",
        changes: "감정 검증 단계 강화, 프롬프트 체인 최적화",
        improvedBy: "Marcus Chen",
        date: "2024-08-18"
      },
      {
        version: "v2.0", 
        changes: "AI-인간 역할 분담 명확화",
        improvedBy: "커뮤니티 피드백",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: "wf_002",
    title: "프롬프트 엔지니어링 체계적 접근법",
    category: "기술 워크플로우",
    difficulty: 8.1,
    duration: "1-2시간",
    participants: 87,
    successRate: 94,
    verifiedBy: ["Dr. Sarah Kim", "Tech Community"],
    description: "효과적인 프롬프트를 체계적으로 설계하고 최적화하는 단계별 방법론. 논리적 구조와 반복 개선을 통한 프롬프트 품질 극대화.",
    steps: [
      {
        id: "step_1",
        title: "요구사항 분석",
        description: "AI가 수행해야 할 작업의 명확한 정의",
        estimatedTime: "10분",
        tools: ["요구사항 체크리스트"],
        keyPoints: ["입력 형태", "출력 형태", "품질 기준"]
      },
      {
        id: "step_2",
        title: "컨텍스트 설계",
        description: "AI에게 필요한 배경 정보와 역할 설정",
        estimatedTime: "15분",
        tools: ["역할 템플릿", "컨텍스트 프레임워크"],
        keyPoints: ["역할 정의", "배경 지식", "제약 조건"]
      },
      {
        id: "step_3",
        title: "프롬프트 구조화",
        description: "논리적 순서로 프롬프트 요소들을 배치",
        estimatedTime: "20분",
        tools: ["구조 템플릿"],
        keyPoints: ["명령어 순서", "예시 배치", "출력 형식"]
      },
      {
        id: "step_4",
        title: "테스트 및 개선",
        description: "다양한 입력으로 테스트하고 반복 개선",
        estimatedTime: "30분",
        tools: ["테스트 케이스"],
        keyPoints: ["엣지 케이스", "일관성", "효율성"]
      }
    ],
    outcomes: [
      "일관되고 예측 가능한 AI 출력",
      "프롬프트 효율성 60% 향상",
      "재사용 가능한 프롬프트 템플릿 구축"
    ],
    evolutionHistory: [
      {
        version: "v1.3",
        changes: "체인 오브 사고(CoT) 기법 통합",
        improvedBy: "Dr. Sarah Kim",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: "wf_003",
    title: "창의성 연구 방법론",
    category: "연구 워크플로우", 
    difficulty: 9.2,
    duration: "1주일",
    participants: 34,
    successRate: 76,
    verifiedBy: ["Prof. Lisa Johnson", "Research Community"],
    description: "창의성의 본질을 탐구하고 AI와 인간 창의성의 차이점을 과학적으로 분석하는 연구 방법론.",
    steps: [
      {
        id: "step_1",
        title: "문헌 조사 및 가설 설정",
        description: "기존 창의성 연구를 체계적으로 리뷰하고 연구 가설 수립",
        estimatedTime: "2일",
        tools: ["학술 데이터베이스", "메타분석"],
        keyPoints: ["이론적 배경", "연구 격차", "가설 설정"]
      },
      {
        id: "step_2",
        title: "실험 설계",
        description: "AI와 인간의 창의성을 비교할 수 있는 실험 프로토콜 설계",
        estimatedTime: "1일",
        tools: ["실험 프레임워크"],
        keyPoints: ["통제 변수", "측정 지표", "윤리적 고려"]
      },
      {
        id: "step_3",
        title: "데이터 수집",
        description: "AI와 인간 참가자로부터 창의적 산출물 수집",
        estimatedTime: "3일",
        tools: ["데이터 수집 플랫폼"],
        keyPoints: ["샘플 크기", "다양성 확보", "품질 관리"]
      },
      {
        id: "step_4",
        title: "분석 및 해석",
        description: "정량적, 정성적 분석을 통한 창의성 패턴 발견",
        estimatedTime: "1일",
        tools: ["통계 소프트웨어", "질적 분석"],
        keyPoints: ["패턴 인식", "통계적 유의성", "의미 해석"]
      }
    ],
    outcomes: [
      "AI와 인간 창의성의 본질적 차이 규명",
      "새로운 창의성 측정 지표 개발",
      "창의적 협업 모델 제안"
    ],
    evolutionHistory: [
      {
        version: "v1.1",
        changes: "질적 분석 방법론 강화",
        improvedBy: "Prof. Lisa Johnson",
        date: "2024-08-12"
      }
    ]
  }
];

interface WorkflowLibraryProps {}

export const WorkflowLibrary: React.FC<WorkflowLibraryProps> = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredWorkflows = workflows.filter(workflow => 
    filter === 'all' || workflow.category.includes(filter)
  );

  const WorkflowCard = ({ workflow }: { workflow: Workflow }) => (
    <div className="nexus-card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
         onClick={() => setSelectedWorkflow(workflow)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">{workflow.title}</h3>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
              {workflow.category}
            </span>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {workflow.duration}
            </div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {workflow.participants}명 검증
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">{workflow.successRate}%</div>
          <div className="text-xs text-muted-foreground">성공률</div>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {workflow.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star size={14} className="text-warning mr-1" />
            <span className="text-sm font-medium">{workflow.difficulty}/10</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {workflow.steps.length}단계
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedWorkflow(workflow);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Play size={14} className="mr-2 inline" />
          시작하기
        </button>
      </div>
    </div>
  );

  const WorkflowDetail = ({ workflow }: { workflow: Workflow }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="nexus-card max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{workflow.title}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {workflow.category}
              </span>
              <div className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-2" />
                {workflow.duration}
              </div>
              <div className="flex items-center text-muted-foreground">
                <TrendingUp size={16} className="mr-2" />
                성공률 {workflow.successRate}%
              </div>
            </div>
          </div>
          <button 
            onClick={() => setSelectedWorkflow(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-foreground leading-relaxed">{workflow.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-foreground">워크플로우 단계</h3>
            {workflow.steps.map((step, index) => (
              <div key={step.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-medium text-foreground mb-1">소요시간</div>
                        <div className="text-muted-foreground">{step.estimatedTime}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">활용 도구</div>
                        <div className="text-muted-foreground">{step.tools.join(', ')}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="font-medium text-foreground text-xs mb-1">핵심 포인트</div>
                      <div className="flex flex-wrap gap-1">
                        {step.keyPoints.map((point, idx) => (
                          <span key={idx} className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-3">예상 성과</h4>
              <div className="space-y-2">
                {workflow.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-3">검증 전문가</h4>
              <div className="space-y-2">
                {workflow.verifiedBy.map((expert, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-sm text-foreground">{expert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-3">진화 히스토리</h4>
              <div className="space-y-3">
                {workflow.evolutionHistory.map((history, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="font-medium text-foreground">{history.version}</div>
                    <div className="text-muted-foreground">{history.changes}</div>
                    <div className="text-muted-foreground">
                      {history.improvedBy} • {history.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setSelectedWorkflow(null)}
            className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            닫기
          </button>
          <button 
            onClick={() => {
              alert(`"${workflow.title}" 워크플로우를 시작합니다!\n\n첫 번째 단계: ${workflow.steps[0].title}\n소요시간: ${workflow.steps[0].estimatedTime}\n\n실제 구현 시 여기서 워크플로우 실행 화면으로 이동합니다.`);
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Play size={16} className="mr-2 inline" />
            워크플로우 시작
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">워크플로우 라이브러리</h2>
          <p className="text-muted-foreground mt-1">검증된 작업순서로 효율성과 품질을 동시에 확보하세요</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 bg-background text-foreground"
          >
            <option value="all">전체 카테고리</option>
            <option value="창작">창작 워크플로우</option>
            <option value="기술">기술 워크플로우</option>
            <option value="연구">연구 워크플로우</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map(workflow => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>

      <div className="nexus-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">🔄 워크플로우 진화 시스템</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{workflows.length}</div>
            <div className="text-sm text-muted-foreground">검증된 워크플로우</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
            </div>
            <div className="text-sm text-muted-foreground">평균 성공률</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">
              {workflows.reduce((acc, w) => acc + w.evolutionHistory.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">진화 업데이트</div>
          </div>
        </div>

        <div className="mt-6 bg-primary/5 rounded-lg p-4">
          <h4 className="font-bold text-primary mb-2">💡 강성진님의 "일머리" 통찰 구현</h4>
          <p className="text-sm text-foreground">
            단순한 지식 공유를 넘어 <strong>검증된 작업순서</strong>를 중심으로 한 지식 생태계. 
            각 워크플로우는 실무진의 경험과 전문가의 이론이 결합된 <strong>실행 가능한 방법론</strong>입니다.
          </p>
        </div>
      </div>

      {selectedWorkflow && <WorkflowDetail workflow={selectedWorkflow} />}
    </div>
  );
};