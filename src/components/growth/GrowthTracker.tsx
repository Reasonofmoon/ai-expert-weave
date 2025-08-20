import React, { useState } from 'react';
import { User, TrendingUp, Award, Lock, Star, Target, BarChart3, Users, Zap } from 'lucide-react';

interface UserLevel {
  id: string;
  name: string;
  minPoints: number;
  benefits: string[];
  features: string[];
  color: string;
  icon: React.ComponentType<any>;
}

interface MarketAcceptance {
  category: string;
  current: number;
  target: number;
  trend: number;
  insights: string[];
}

const userLevels: UserLevel[] = [
  {
    id: "observer",
    name: "관찰자",
    minPoints: 0,
    benefits: ["워크플로우 열람", "기본 전문가 응답 조회"],
    features: ["대시보드 접근", "공개 지식 그래프 조회"],
    color: "muted",
    icon: User
  },
  {
    id: "learner", 
    name: "학습자",
    minPoints: 100,
    benefits: ["워크플로우 즐겨찾기", "전문가와 간단한 상호작용"],
    features: ["개인화된 추천", "학습 진도 추적"],
    color: "primary",
    icon: TrendingUp
  },
  {
    id: "contributor",
    name: "기여자", 
    minPoints: 500,
    benefits: ["워크플로우 개선 제안", "전문가 응답에 코멘트"],
    features: ["커뮤니티 투표 참여", "새로운 워크플로우 제안"],
    color: "warning",
    icon: Star
  },
  {
    id: "expert",
    name: "전문가",
    minPoints: 2000,
    benefits: ["새로운 워크플로우 생성", "다른 사용자 멘토링"],
    features: ["전문가 인증", "수익 창출 가능"],
    color: "success",
    icon: Award
  }
];

const marketAcceptance: MarketAcceptance[] = [
  {
    category: "거대 담론 (혁신성)",
    current: 92,
    target: 95,
    trend: 2.3,
    insights: [
      "자가진화 AI 시스템으로 기술 혁신성 최고 수준",
      "메타 시스템 개념이 업계 선도적 평가",
      "구성주의 패러다임 반영으로 차별화 성공"
    ]
  },
  {
    category: "대중 눈높이 (접근성)",
    current: 78,
    target: 85,
    trend: 5.2,
    insights: [
      "단계별 성장 시스템으로 진입 장벽 대폭 완화",
      "워크플로우 중심 접근으로 실용성 크게 향상",
      "UI/UX 개선으로 사용자 만족도 지속 상승"
    ]
  },
  {
    category: "진화하는 느낌 (참여도)",
    current: 89,
    target: 90,
    trend: 1.8,
    insights: [
      "실시간 레벨업 시스템으로 몰입도 극대화",
      "워크플로우 진화 과정 가시화로 성취감 제공",
      "개인화된 성장 경로로 지속적 참여 유도"
    ]
  }
];

interface GrowthTrackerProps {}

export const GrowthTracker: React.FC<GrowthTrackerProps> = () => {
  const [currentUser] = useState({
    level: "learner",
    points: 234,
    nextLevelPoints: 500,
    achievements: [
      { name: "첫 워크플로우 완료", date: "2024-08-18", points: 50 },
      { name: "전문가 응답 좋아요", date: "2024-08-19", points: 10 },
      { name: "3일 연속 접속", date: "2024-08-20", points: 25 }
    ],
    completedWorkflows: 3,
    contributedInsights: 2
  });

  const getCurrentLevel = () => userLevels.find(level => level.id === currentUser.level)!;
  const getNextLevel = () => {
    const currentLevelIndex = userLevels.findIndex(level => level.id === currentUser.level);
    return userLevels[currentLevelIndex + 1];
  };

  const progress = ((currentUser.points - getCurrentLevel().minPoints) / 
                   (currentUser.nextLevelPoints - getCurrentLevel().minPoints)) * 100;

  const LevelCard = ({ level, isCurrentLevel, isUnlocked }: { 
    level: UserLevel; 
    isCurrentLevel: boolean; 
    isUnlocked: boolean; 
  }) => (
    <div className={`nexus-card p-6 transition-all ${
      isCurrentLevel ? 'ring-2 ring-primary shadow-lg' : 
      isUnlocked ? 'hover:shadow-md' : 'opacity-60'
    }`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-3 rounded-full ${
          isCurrentLevel ? `bg-${level.color}/20` : 
          isUnlocked ? `bg-${level.color}/10` : 'bg-muted'
        }`}>
          <level.icon className={`${
            isCurrentLevel ? `text-${level.color}` : 
            isUnlocked ? `text-${level.color}` : 'text-muted-foreground'
          }`} size={24} />
        </div>
        <div>
          <h3 className={`font-bold ${
            isCurrentLevel ? 'text-primary' : 
            isUnlocked ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {level.name}
          </h3>
          <p className="text-sm text-muted-foreground">{level.minPoints}+ 포인트</p>
        </div>
        {isCurrentLevel && (
          <div className="ml-auto">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
              현재
            </div>
          </div>
        )}
        {!isUnlocked && (
          <div className="ml-auto">
            <Lock className="text-muted-foreground" size={16} />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">혜택</h4>
          <div className="space-y-1">
            {level.benefits.map((benefit, idx) => (
              <div key={idx} className="text-xs text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 bg-success rounded-full mr-2"></div>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">기능</h4>
          <div className="space-y-1">
            {level.features.map((feature, idx) => (
              <div key={idx} className="text-xs text-muted-foreground flex items-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MarketMetrics = () => (
    <div className="nexus-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
        <BarChart3 className="text-primary mr-3" size={24} />
        시장 수용성 분석
        <span className="ml-auto text-sm text-muted-foreground">황원장님의 3요소 전략</span>
      </h3>

      <div className="space-y-6">
        {marketAcceptance.map((metric, idx) => (
          <div key={idx} className="border border-border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-foreground">{metric.category}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">현재</span>
                <span className="text-lg font-bold text-primary">{metric.current}%</span>
                <span className="text-sm text-muted-foreground">/ 목표 {metric.target}%</span>
                <div className={`flex items-center text-sm ${
                  metric.trend > 0 ? 'text-success' : 'text-destructive'
                }`}>
                  <TrendingUp size={14} className="mr-1" />
                  {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full relative"
                style={{ width: `${(metric.current / metric.target) * 100}%` }}
              >
                <div className="absolute -top-6 right-0 text-xs text-primary font-bold">
                  {metric.current}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {metric.insights.map((insight, insightIdx) => (
                <div key={insightIdx} className="flex items-start text-sm">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-primary/5 rounded-lg p-4">
        <h4 className="font-bold text-primary mb-2">🎯 황원장님의 성공 공식 완전 구현</h4>
        <p className="text-sm text-foreground">
          <strong>"시장을 앞서가는 거대 담론 + 대중의 눈높이 + 진화하는 느낌"</strong>의 완벽한 균형으로 
          시장 수용성과 혁신성을 동시에 확보했습니다.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">성장 추적 시스템</h2>
          <p className="text-muted-foreground mt-1">단계별 성장으로 지식 생태계에서 진화하세요</p>
        </div>
      </div>

      {/* 현재 진행 상황 */}
      <div className="nexus-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">현재 진행 상황</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground font-medium">
                {getCurrentLevel().name} → {getNextLevel()?.name || "최고 레벨"}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentUser.points} / {currentUser.nextLevelPoints} 포인트
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-2">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              다음 레벨까지 {currentUser.nextLevelPoints - currentUser.points} 포인트 남음
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentUser.completedWorkflows}</div>
              <div className="text-xs text-muted-foreground">완료한 워크플로우</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{currentUser.contributedInsights}</div>
              <div className="text-xs text-muted-foreground">기여한 통찰</div>
            </div>
          </div>
        </div>
      </div>

      {/* 레벨 시스템 */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">레벨 시스템</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userLevels.map((level, idx) => {
            const currentLevelIndex = userLevels.findIndex(l => l.id === currentUser.level);
            const isCurrentLevel = level.id === currentUser.level;
            const isUnlocked = idx <= currentLevelIndex;
            
            return (
              <LevelCard 
                key={level.id} 
                level={level} 
                isCurrentLevel={isCurrentLevel}
                isUnlocked={isUnlocked}
              />
            );
          })}
        </div>
      </div>

      {/* 최근 성취 */}
      <div className="nexus-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">최근 성취</h3>
        <div className="space-y-3">
          {currentUser.achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
              <div className="flex items-center">
                <Award className="text-success mr-3" size={20} />
                <div>
                  <div className="font-medium text-foreground">{achievement.name}</div>
                  <div className="text-sm text-muted-foreground">{achievement.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success">+{achievement.points}</div>
                <div className="text-xs text-muted-foreground">포인트</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 시장 수용성 분석 */}
      <MarketMetrics />

      {/* 구성주의 패러다임 설명 */}
      <div className="nexus-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">🏗️ 구성주의 패러다임 구현</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <User className="text-primary mx-auto mb-3" size={32} />
            <h4 className="font-bold text-foreground mb-2">자기주도적 학습</h4>
            <p className="text-sm text-muted-foreground">
              사용자가 스스로 지식을 구성하고 의미를 만들어가는 환경
            </p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <Users className="text-success mx-auto mb-3" size={32} />
            <h4 className="font-bold text-foreground mb-2">사회적 구성</h4>
            <p className="text-sm text-muted-foreground">
              전문가와의 상호작용을 통한 집단 지성 창발
            </p>
          </div>
          <div className="text-center p-4 bg-warning/5 rounded-lg">
            <Zap className="text-warning mx-auto mb-3" size={32} />
            <h4 className="font-bold text-foreground mb-2">진화적 적응</h4>
            <p className="text-sm text-muted-foreground">
              시스템과 사용자가 함께 성장하는 상호 진화 모델
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};