import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Brain, Users, Zap, TrendingUp, MessageCircle, CheckCircle, AlertTriangle, Search, Filter, Eye, GitBranch, Workflow, Target, Database, Table, ExternalLink } from 'lucide-react';

import { MetricCard } from './dashboard/MetricCard';
import { ExpertCard } from './experts/ExpertCard';
import { KnowledgeGraph } from './knowledge/KnowledgeGraph';
import { TabButton } from './common/TabButton';
import { ResponseModal } from './modals/ResponseModal';
import { WorkflowLibrary } from './workflows/WorkflowLibrary';
import { GrowthTracker } from './growth/GrowthTracker';
import { ExpertDataTable } from './data/ExpertDataTable';
import { KnowledgeDataTable } from './data/KnowledgeDataTable';
import { GoogleSheetsDataTable } from './data/GoogleSheetsDataTable';

export const NexusPrototype = () => {
  // State management
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [platformDay, setPlatformDay] = useState(47);
  const [isLiveDemo, setIsLiveDemo] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  // Live data simulation
  const [liveMetrics, setLiveMetrics] = useState({
    totalNodes: 156,
    totalConnections: 423,
    activeExperts: 32,
    dailyEngagement: 73,
    knowledgeDensity: 34.7,
    avgQualityScore: 8.2
  });

  // Mock data
  const dailyChallenges = [
    {
      id: 47,
      date: "2024-08-20",
      title: "창의적 글쓰기에서 AI와 협업하는 최적 워크플로우는?",
      category: "Creative_Workflow", 
      difficulty: 8.4,
      expectedParticipation: 78,
      status: "active",
      responses: 3
    },
    {
      id: 46,
      date: "2024-08-19", 
      title: "프롬프트 엔지니어링에서 가장 중요한 3가지는?",
      category: "Prompt_Engineering",
      difficulty: 6.2,
      expectedParticipation: 85,
      status: "completed",
      responses: 5
    }
  ];

  const experts = [
    {
      id: "exp_001",
      name: "Dr. Sarah Kim",
      avatar: "👩‍💼",
      specialization: ["Prompt Engineering", "NLP", "AI Ethics"],
      trustScore: 9.2,
      participationRate: 89,
      status: "online" as const,
      matchingScore: 8.64,
      responseTime: "14:30",
      lastActive: "2분 전"
    },
    {
      id: "exp_002", 
      name: "Marcus Chen",
      avatar: "👨‍💻",
      specialization: ["Creative Writing", "AI-Assisted Authoring", "Content Strategy"],
      trustScore: 8.7,
      participationRate: 76,
      status: "responding" as const,
      matchingScore: 8.91,
      responseTime: "11:45",
      lastActive: "응답 중"
    },
    {
      id: "exp_003",
      name: "Prof. Lisa Johnson",
      avatar: "👩‍🏫", 
      specialization: ["Creativity Research", "Cognitive Psychology", "HCI"],
      trustScore: 9.5,
      participationRate: 82,
      status: "online" as const,
      matchingScore: 8.73,
      responseTime: "16:20",
      lastActive: "5분 전"
    }
  ];

  const knowledgeNodes = [
    { id: 'node_157', x: 100, y: 150, type: 'tacit' as const, expert: 'Marcus Chen', content: 'AI-인간 창작 워크플로우', connections: 3, verification: 8.2 },
    { id: 'node_158', x: 300, y: 100, type: 'technical' as const, expert: 'Sarah Kim', content: 'Prompt chaining 방법론', connections: 5, verification: 9.0 },
    { id: 'node_159', x: 200, y: 200, type: 'convergent' as const, expert: 'Multiple', content: 'AI 창의성 한계 분석', connections: 4, verification: 8.9 },
    { id: 'research_001', x: 400, y: 150, type: 'research' as const, expert: 'Literature', content: 'Creative Writing with AI (2024)', connections: 6, verification: 9.5 },
    { id: 'research_002', x: 150, y: 250, type: 'research' as const, expert: 'Literature', content: 'Computational Creativity Limits', connections: 4, verification: 9.2 }
  ];

  const platformGrowthData = [
    { day: 1, nodes: 12, connections: 8, experts: 8, quality: 7.1 },
    { day: 10, nodes: 45, connections: 78, experts: 15, quality: 7.8 },
    { day: 20, nodes: 89, connections: 156, experts: 22, quality: 8.0 },
    { day: 30, nodes: 132, connections: 289, experts: 28, quality: 8.1 },
    { day: 40, nodes: 148, connections: 378, experts: 31, quality: 8.2 },
    { day: 47, nodes: 156, connections: 423, experts: 32, quality: 8.2 }
  ];

  const expertResponses = {
    "exp_002": {
      content: `AI는 창의적 글쓰기의 '도구'로서는 혁명적이지만, '대체'는 불가능합니다.
      
제가 3년간 GPT와 함께 작업하며 발견한 것은:
1. **감정의 진정성**: AI는 감정을 시뮬레이션할 뿐, 진짜 아픔이나 기쁨을 알지 못합니다.
2. **맥락적 직관**: 독자의 미묘한 문화적 코드를 AI는 놓칩니다.
3. **창의적 반란**: 진정한 창의성은 종종 규칙을 깨는 것인데, AI는 패턴을 따릅니다.

하지만 AI와의 협업은 마법 같습니다. AI가 초안을 만들면, 저는 그것을 '영혼'으로 변환합니다.`,
      timestamp: "11:42",
      verificationScore: 8.2,
      researchMatches: [
        { title: "The Role of Emotion in Creative Writing", similarity: 84 },
        { title: "Human-AI Collaboration in Creative Tasks", similarity: 78 }
      ]
    },
    "exp_001": {
      content: `기술적 관점에서 보면, 현재 LLM의 창의성은 '조합적 창의성'에 머물러 있습니다.

**핵심 한계점들:**
- **진정한 의도성 부재**: AI는 '무엇을' 쓸지는 알지만 '왜' 쓰는지는 모릅니다
- **경험적 참조점 부족**: 인간의 창작은 살아온 경험의 독특한 조합입니다
- **메타인지적 창의성**: "이 글이 독자에게 어떤 변화를 줄까?"하는 의식적 의도

**하지만 흥미로운 가능성도 있습니다:**
Prompt chaining으로 AI에게 '의도'를 시뮬레이션하게 할 수 있습니다.

결론: 대체가 아닌 **인지적 증강(Cognitive Augmentation)**이 미래입니다.`,
      timestamp: "14:28",
      verificationScore: 9.0,
      researchMatches: [
        { title: "Combinatorial vs. Transformational Creativity", similarity: 91 },
        { title: "Cognitive Augmentation Through Human-Machine Interfaces", similarity: 88 }
      ]
    }
  };

  // Real-time updates simulation
  useEffect(() => {
    if (isLiveDemo) {
      const interval = setInterval(() => {
        setLiveMetrics(prev => ({
          ...prev,
          dailyEngagement: prev.dailyEngagement + Math.random() * 2 - 1,
          avgQualityScore: prev.avgQualityScore + Math.random() * 0.1 - 0.05
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLiveDemo]);

  const AlgorithmViewer = () => (
    <div className="nexus-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="text-primary animate-glow" size={24} />
        <h2 className="text-xl font-bold text-foreground">실시간 알고리즘 분석</h2>
      </div>
      
      <div className="space-y-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h3 className="font-bold mb-3 text-primary">전문가 매칭 알고리즘</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-2 bg-background rounded">
              <div className="text-lg font-bold text-primary">40%</div>
              <div className="text-muted-foreground">전문성 매칭</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="text-lg font-bold text-success">20%</div>
              <div className="text-muted-foreground">참여 예측</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="text-lg font-bold text-secondary">25%</div>
              <div className="text-muted-foreground">신뢰도</div>
            </div>
            <div className="text-center p-2 bg-background rounded">
              <div className="text-lg font-bold text-warning">15%</div>
              <div className="text-muted-foreground">다양성</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground bg-muted/20 p-2 rounded">
            Marcus Chen 매칭: 0.94×0.4 + 0.76×0.2 + 0.87×0.25 + 0.25×0.15 = <span className="font-bold text-foreground">8.91</span>
          </div>
        </div>
        
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <h3 className="font-bold mb-3 text-success">지식 검증 파이프라인</h3>
          <div className="flex items-center justify-between flex-wrap gap-2">
            {[
              { label: '의미 분석', color: 'bg-primary' },
              { label: '논문 매칭', color: 'bg-success' },
              { label: '교차 검증', color: 'bg-warning' },
              { label: '최종 점수', color: 'bg-secondary' }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-3 h-3 ${step.color} rounded-full mr-2 animate-pulse-soft`}></div>
                <span className="text-sm text-foreground">{step.label}</span>
                {idx < 3 && <div className="text-muted-foreground mx-2">→</div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <h3 className="font-bold mb-3 text-accent">자가진화 학습</h3>
          <div className="space-y-2 text-sm text-foreground">
            <div className="flex items-center">
              <CheckCircle size={16} className="text-success mr-2" />
              매칭 정확도: 67% → 94% (47일간 학습 결과)
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="text-success mr-2" />
              새로운 패턴 발견: 실무+기술 조합 89% 성공률
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="text-success mr-2" />
              알고리즘 가중치 자동 조정: 전문성 40% → 42%
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen nexus-hero-background">
      {/* Header */}
      <header className="nexus-card shadow-lg border-b border-border/50 rounded-none">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Brain className="text-primary animate-glow" size={32} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold nexus-gradient-text">NEXUS</h1>
                <p className="text-sm text-muted-foreground font-medium">Network of EXpert Understanding Synthesis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">운영 {platformDay}일차</div>
                <div className="text-xs text-muted-foreground">2024.08.20 (화)</div>
              </div>
              
              <button
                onClick={() => setIsLiveDemo(!isLiveDemo)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isLiveDemo 
                    ? 'bg-destructive text-destructive-foreground nexus-live-indicator' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isLiveDemo ? 'bg-white animate-pulse' : 'bg-muted-foreground'}`} />
                  <span>{isLiveDemo ? 'LIVE' : 'DEMO'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nexus-card shadow-sm border-b border-border/50 rounded-none">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto">
            <TabButton
              tab="dashboard"
              label="대시보드"
              icon={TrendingUp}
              isActive={currentTab === 'dashboard'}
              onClick={() => setCurrentTab('dashboard')}
            />
            <TabButton
              tab="challenge"
              label="일일 화두"
              icon={MessageCircle}
              isActive={currentTab === 'challenge'}
              onClick={() => setCurrentTab('challenge')}
            />
            <TabButton
              tab="experts"
              label="전문가 네트워크"
              icon={Users}
              isActive={currentTab === 'experts'}
              onClick={() => setCurrentTab('experts')}
            />
            <TabButton
              tab="knowledge"
              label="지식 그래프"
              icon={GitBranch}
              isActive={currentTab === 'knowledge'}
              onClick={() => setCurrentTab('knowledge')}
            />
            <TabButton
              tab="workflows"
              label="워크플로우"
              icon={Workflow}
              isActive={currentTab === 'workflows'}
              onClick={() => setCurrentTab('workflows')}
            />
            <TabButton
              tab="growth"
              label="성장 추적"
              icon={Target}
              isActive={currentTab === 'growth'}
              onClick={() => setCurrentTab('growth')}
            />
            <TabButton
              tab="datatables"
              label="데이터 테이블"
              icon={Table}
              isActive={currentTab === 'datatables'}
              onClick={() => setCurrentTab('datatables')}
            />
            <TabButton
              tab="algorithm"
              label="알고리즘"
              icon={Brain}
              isActive={currentTab === 'algorithm'}
              onClick={() => setCurrentTab('algorithm')}
            />
            <TabButton
              tab="googlesheets"
              label="구글 시트"
              icon={ExternalLink}
              isActive={currentTab === 'googlesheets'}
              onClick={() => setCurrentTab('googlesheets')}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <MetricCard
                title="지식 노드"
                value={liveMetrics.totalNodes}
                change={1.9}
                icon={Brain}
                color="primary"
                isLive={isLiveDemo}
              />
              <MetricCard
                title="검증된 연결"
                value={liveMetrics.totalConnections}
                change={0.7}
                icon={GitBranch}
                color="success"
                isLive={isLiveDemo}
              />
              <MetricCard
                title="활성 전문가"
                value={liveMetrics.activeExperts}
                unit="명"
                change={0}
                icon={Users}
                color="secondary"
                isLive={isLiveDemo}
              />
              <MetricCard
                title="일평균 참여율"
                value={liveMetrics.dailyEngagement.toFixed(0)}
                unit="%"
                change={2.1}
                icon={TrendingUp}
                color="warning"
                isLive={isLiveDemo}
              />
              <MetricCard
                title="지식 밀도"
                value={liveMetrics.knowledgeDensity.toFixed(1)}
                unit="%"
                change={0.4}
                icon={Zap}
                color="accent"
                isLive={isLiveDemo}
              />
              <MetricCard
                title="평균 품질점수"
                value={liveMetrics.avgQualityScore.toFixed(1)}
                unit="/10"
                change={0.1}
                icon={CheckCircle}
                color="success"
                isLive={isLiveDemo}
              />
            </div>

            {/* Platform Growth Chart */}
            <div className="nexus-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <TrendingUp className="text-primary mr-3" size={24} />
                플랫폼 자가진화 추이
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={platformGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="nodes" stroke="hsl(var(--primary))" name="지식 노드" strokeWidth={3} />
                  <Line type="monotone" dataKey="connections" stroke="hsl(var(--success))" name="연결" strokeWidth={2} />
                  <Line type="monotone" dataKey="experts" stroke="hsl(var(--warning))" name="전문가" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Today's Highlights */}
            <div className="nexus-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">🎯 오늘의 핵심 성과</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-primary">새로운 지식 연결</h3>
                  <div className="space-y-2">
                    {[
                      "Marcus의 실무 워크플로우 ↔ 학술 연구 (매칭도 78%)",
                      "Sarah의 Prompt Chaining ↔ 기술 논문 (매칭도 91%)",
                      "두 전문가 의견의 수렴점 발견 (일치도 89%)"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center p-2 bg-success/5 rounded-lg">
                        <CheckCircle size={16} className="text-success mr-3 flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-secondary">알고리즘 진화</h3>
                  <div className="space-y-2">
                    {[
                      "전문가 매칭 정확도: 87% → 94%",
                      "새로운 성공 패턴 발견: 실무+기술 조합",
                      "응답 품질 예측 정확도: 91%"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center p-2 bg-secondary/5 rounded-lg">
                        <TrendingUp size={16} className="text-secondary mr-3 flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'experts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">전문가 네트워크</h2>
              <div className="text-sm text-muted-foreground">
                총 <span className="font-bold text-foreground">{experts.length}</span>명 활성 중
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map(expert => (
                <ExpertCard 
                  key={expert.id} 
                  expert={expert} 
                  onViewResponse={setSelectedExpert}
                />
              ))}
            </div>

            {/* Expert Matching Analysis */}
            <div className="nexus-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">실시간 매칭 분석</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={experts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="matchingScore" fill="hsl(var(--primary))" name="매칭 점수" />
                  <Bar dataKey="trustScore" fill="hsl(var(--success))" name="신뢰도" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {currentTab === 'knowledge' && (
          <div className="space-y-6">
            <KnowledgeGraph knowledgeNodes={knowledgeNodes} liveMetrics={liveMetrics} />
            
            {/* Knowledge Evolution Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="nexus-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">지식 유형 분포</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { type: '암묵지', count: 67, color: 'hsl(var(--primary))' },
                    { type: '기술적 통찰', count: 34, color: 'hsl(var(--warning))' },
                    { type: '연구 연결', count: 45, color: 'hsl(var(--success))' },
                    { type: '수렴 통찰', count: 10, color: 'hsl(var(--secondary))' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count">
                      {[
                        { type: '암묵지', count: 67, color: 'hsl(var(--primary))' },
                        { type: '기술적 통찰', count: 34, color: 'hsl(var(--warning))' },
                        { type: '연구 연결', count: 45, color: 'hsl(var(--success))' },
                        { type: '수렴 통찰', count: 10, color: 'hsl(var(--secondary))' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="nexus-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">검증 품질 분포</h3>
                <div className="space-y-4">
                  {[
                    { label: '9.0 이상 (매우 높음)', percentage: 23, color: 'bg-success' },
                    { label: '8.0-8.9 (높음)', percentage: 45, color: 'bg-primary' },
                    { label: '7.0-7.9 (보통)', percentage: 27, color: 'bg-warning' },
                    { label: '7.0 미만 (검토 필요)', percentage: 5, color: 'bg-destructive' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-muted/30 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{width: `${item.percentage}%`}}></div>
                        </div>
                        <span className="text-sm font-bold text-foreground w-8">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'challenge' && (
          <div className="space-y-6">
            {/* Today's Challenge - Workflow Focused */}
            <div className="nexus-card p-6 border-l-4 border-l-primary">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">🎯 오늘의 화두 (Day {platformDay})</h2>
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Creative_Workflow
                  </div>
                  <div className="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-medium">
                    난이도 8.4
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {dailyChallenges[0].title}
              </h3>
              
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{dailyChallenges[0].expectedParticipation}%</div>
                  <div className="text-sm text-muted-foreground">예상 참여율</div>
                </div>
                <div className="text-center p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">{dailyChallenges[0].responses}</div>
                  <div className="text-sm text-muted-foreground">현재 응답</div>
                </div>
                <div className="text-center p-4 bg-warning/5 rounded-lg">
                  <div className="text-2xl font-bold text-warning">진행중</div>
                  <div className="text-sm text-muted-foreground">상태</div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-bold text-primary mb-3">💡 강성진님의 "일머리" 통찰 적용</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">관련 워크플로우:</span>
                    <span className="font-bold ml-2 text-foreground">3개</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">실무 우선도:</span>
                    <span className="font-bold ml-2 text-success">9.1/10</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">예상 새로운 단계:</span>
                    <span className="font-bold ml-2 text-foreground">5단계</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">매칭된 전문가:</span>
                    <span className="font-bold ml-2 text-foreground">5명</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Responses Status */}
            <div className="nexus-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">전문가 응답 현황</h3>
              <div className="space-y-4">
                {experts.slice(0, 2).map(expert => (
                  <div key={expert.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{expert.avatar}</span>
                      <div>
                        <h4 className="font-bold text-foreground">{expert.name}</h4>
                        <p className="text-sm text-muted-foreground">{expert.specialization.join(', ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {expertResponses[expert.id] ? (
                        <div>
                          <div className="text-success font-bold">워크플로우 제안 완료</div>
                          <div className="text-sm text-muted-foreground">{expertResponses[expert.id].timestamp}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-warning font-bold">응답 예정</div>
                          <div className="text-sm text-muted-foreground">{expert.responseTime}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'workflows' && <WorkflowLibrary />}

        {currentTab === 'growth' && <GrowthTracker />}

        {currentTab === 'datatables' && (
          <div className="space-y-6">
            {/* Expert Data Table */}
            <ExpertDataTable experts={experts} />
            
            {/* Knowledge Data Table */}
            <KnowledgeDataTable knowledgeNodes={knowledgeNodes} />
          </div>
        )}

        {currentTab === 'algorithm' && (
          <div className="space-y-6">
            <AlgorithmViewer />
            
            {/* Learning Progress */}
            <div className="nexus-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">AI 자가진화 학습 현황</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { value: '94%', label: '매칭 정확도', sublabel: '시작일 대비 +27%p', color: 'text-primary' },
                  { value: '91%', label: '품질 예측 정확도', sublabel: '지난주 대비 +8%p', color: 'text-success' },
                  { value: '7개', label: '발견된 패턴', sublabel: '새로운 성공 패턴', color: 'text-secondary' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-muted/10 rounded-lg">
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-sm text-foreground font-medium">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                <h3 className="font-bold mb-3 text-foreground">오늘 학습한 새로운 패턴</h3>
                <div className="space-y-2">
                  {[
                    "실무 경험자 + 기술 전문가 조합 → 89% 성공률",
                    "창의성 주제에서 개인 경험 공유 → 23% 참여율 증가",
                    "교차 검증 시 수렴 통찰 → 91% 품질 점수"
                  ].map((pattern, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle size={14} className="text-success mr-2 flex-shrink-0" />
                      <span className="text-foreground">{pattern}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Meta System Evolution */}
            <div className="nexus-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">🧠 메타 시스템 진화</h3>
              <div className="bg-accent/5 rounded-lg p-4">
                <h4 className="font-bold text-accent mb-3">달의이성님의 비전 구현</h4>
                <p className="text-sm text-foreground mb-4">
                  <strong>"변화 → 적응 → 시스템 변화 → 진화"</strong>의 완전한 구현. 
                  시스템이 자신을 개선하는 방법을 스스로 학습합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-background rounded-lg">
                    <div className="text-lg font-bold text-primary">변화 감지</div>
                    <div className="text-xs text-muted-foreground">사용자 패턴 인식</div>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="text-lg font-bold text-success">적응</div>
                    <div className="text-xs text-muted-foreground">알고리즘 조정</div>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="text-lg font-bold text-warning">시스템 변화</div>
                    <div className="text-xs text-muted-foreground">구조적 개선</div>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="text-lg font-bold text-secondary">진화</div>
                    <div className="text-xs text-muted-foreground">새로운 능력 창발</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'googlesheets' && (
          <div className="space-y-6">
            <GoogleSheetsDataTable 
              title="구글 시트 연동 데이터"
              description="실시간으로 동기화되는 구글 시트 데이터를 확인하세요"
            />
          </div>
        )}
      </main>

      {/* Response Detail Modal */}
      <ResponseModal 
        expert={selectedExpert} 
        response={selectedExpert ? expertResponses[selectedExpert.id] : null}
        onClose={() => setSelectedExpert(null)} 
      />

      {/* Footer Status Bar */}
      <footer className="nexus-card shadow-lg border-t border-border/50 mt-8 rounded-none">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="text-muted-foreground">
              <span className="nexus-gradient-text font-semibold">NEXUS v2.0</span> | 자가진화 지식 플랫폼 프로토타입
            </div>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-soft"></div>
                시스템 정상
              </div>
              <div>마지막 업데이트: 방금 전</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};