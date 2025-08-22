import React, { useState, useEffect } from 'react';
import { Play, Pause, Check, Clock, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

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
  steps: WorkflowStep[];
}

interface WorkflowRunnerProps {
  workflow: Workflow;
  onClose: () => void;
}

export const WorkflowRunner: React.FC<WorkflowRunnerProps> = ({ workflow, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [notes, setNotes] = useState<{[key: number]: string}>({});

  const currentStep = workflow.steps[currentStepIndex];
  const isLastStep = currentStepIndex === workflow.steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
    setIsRunning(false);
    setTimeElapsed(0);
    setNotes({});
  };

  const progress = ((completedSteps.size) / workflow.steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="nexus-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{workflow.title}</h2>
              <p className="text-muted-foreground">워크플로우 실행 중</p>
            </div>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">진행률: {Math.round(progress)}%</span>
              <span className="text-muted-foreground">
                {completedSteps.size}/{workflow.steps.length} 단계 완료
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timer and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-foreground font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <button
                onClick={handleStartPause}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                  isRunning 
                    ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' 
                    : 'bg-success/10 text-success hover:bg-success/20'
                }`}
              >
                {isRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{isRunning ? '일시정지' : '시작'}</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm bg-muted text-muted-foreground hover:bg-muted/80"
              >
                <RotateCcw size={14} />
                <span>리셋</span>
              </button>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                completedSteps.has(currentStepIndex) 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-primary text-primary-foreground'
              }`}>
                {completedSteps.has(currentStepIndex) ? <Check size={16} /> : currentStepIndex + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{currentStep.title}</h3>
                <p className="text-muted-foreground text-sm">
                  단계 {currentStepIndex + 1} / {workflow.steps.length} • 예상 소요시간: {currentStep.estimatedTime}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-bold text-foreground mb-3">단계 설명</h4>
                  <p className="text-muted-foreground leading-relaxed">{currentStep.description}</p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-bold text-foreground mb-3">핵심 포인트</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentStep.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-bold text-foreground mb-3">메모</h4>
                  <textarea
                    value={notes[currentStepIndex] || ''}
                    onChange={(e) => setNotes(prev => ({ ...prev, [currentStepIndex]: e.target.value }))}
                    placeholder="이 단계에서 얻은 인사이트나 중요한 내용을 기록하세요..."
                    className="w-full h-24 p-3 border border-border rounded-lg bg-background text-foreground resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-bold text-foreground mb-3">활용 도구</h4>
                  <div className="space-y-2">
                    {currentStep.tools.map((tool, idx) => (
                      <div key={idx} className="bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-bold text-foreground mb-3">전체 단계</h4>
                  <div className="space-y-2">
                    {workflow.steps.map((step, idx) => (
                      <div 
                        key={step.id}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                          idx === currentStepIndex 
                            ? 'bg-primary/10 text-primary' 
                            : completedSteps.has(idx)
                              ? 'text-success'
                              : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => setCurrentStepIndex(idx)}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          completedSteps.has(idx) 
                            ? 'bg-success text-success-foreground' 
                            : idx === currentStepIndex
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {completedSteps.has(idx) ? <Check size={12} /> : idx + 1}
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <button
              onClick={handlePrevStep}
              disabled={isFirstStep}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isFirstStep
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <ChevronLeft size={16} />
              <span>이전 단계</span>
            </button>

            <div className="flex space-x-3">
              {!completedSteps.has(currentStepIndex) && (
                <button
                  onClick={handleStepComplete}
                  className="flex items-center space-x-2 px-6 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors"
                >
                  <Check size={16} />
                  <span>단계 완료</span>
                </button>
              )}

              {!isLastStep ? (
                <button
                  onClick={handleNextStep}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <span>다음 단계</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Check size={16} />
                  <span>워크플로우 완료</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};