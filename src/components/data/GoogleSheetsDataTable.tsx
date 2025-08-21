import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, RefreshCw, Download } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

interface GoogleSheetsDataTableProps {
  title?: string;
  description?: string;
}

export const GoogleSheetsDataTable = ({ 
  title = "구글 시트 데이터", 
  description = "구글 시트의 데이터를 실시간으로 확인하세요" 
}: GoogleSheetsDataTableProps) => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [csvUrl, setCsvUrl] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  // 구글 시트 URL을 CSV URL로 변환
  const convertToCSVUrl = (url: string) => {
    try {
      // 일반적인 구글 시트 URL 형태: https://docs.google.com/spreadsheets/d/{ID}/edit#gid={GID}
      const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        const spreadsheetId = match[1];
        // GID 추출 (시트 탭 ID)
        const gidMatch = url.match(/gid=([0-9]+)/);
        const gid = gidMatch ? gidMatch[1] : '0';
        
        return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
      }
      return '';
    } catch (error) {
      console.error('URL 변환 오류:', error);
      return '';
    }
  };

  // CSV 데이터 파싱
  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return { headers: [], rows: [] };

    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });

    return { headers, rows };
  };

  // 데이터 로드
  const loadSheetData = async () => {
    if (!csvUrl) {
      toast({
        title: "오류",
        description: "CSV URL이 필요합니다.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // CORS 프록시를 사용하여 CSV 데이터 가져오기
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(csvUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error('데이터를 가져올 수 없습니다.');
      }

      const csvText = await response.text();
      const { headers, rows } = parseCSV(csvText);

      if (headers.length === 0) {
        throw new Error('유효한 데이터가 없습니다.');
      }

      // 동적으로 컬럼 생성
      const dynamicColumns: ColumnDef<any>[] = headers.map(header => ({
        accessorKey: header,
        header: header,
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate" title={row.getValue(header)}>
            {row.getValue(header)}
          </div>
        ),
      }));

      setColumns(dynamicColumns);
      setData(rows);
      setLastUpdated(new Date());

      toast({
        title: "성공",
        description: `${rows.length}개의 행이 로드되었습니다.`,
      });

    } catch (error) {
      console.error('데이터 로드 오류:', error);
      toast({
        title: "오류",
        description: "데이터를 불러오는데 실패했습니다. 시트가 공개되어 있는지 확인해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // URL 설정 및 자동 변환
  const handleUrlChange = (url: string) => {
    setSheetUrl(url);
    if (url.includes('docs.google.com/spreadsheets')) {
      const converted = convertToCSVUrl(url);
      setCsvUrl(converted);
    } else if (url.includes('export?format=csv')) {
      setCsvUrl(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* 시트 연결 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink size={20} />
            구글 시트 연결
          </CardTitle>
          <CardDescription>
            구글 시트 URL을 입력하여 실시간 데이터를 확인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sheet-url">구글 시트 URL</Label>
            <Input
              id="sheet-url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={sheetUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              💡 시트를 "링크가 있는 모든 사용자"로 공유해야 합니다
            </p>
          </div>

          {csvUrl && (
            <div className="space-y-2">
              <Label htmlFor="csv-url">변환된 CSV URL</Label>
              <Input
                id="csv-url"
                value={csvUrl}
                onChange={(e) => setCsvUrl(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={loadSheetData} 
              disabled={!csvUrl || isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              {isLoading ? '로딩중...' : '데이터 불러오기'}
            </Button>

            {data.length > 0 && (
              <Button 
                variant="outline" 
                onClick={loadSheetData}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                새로고침
              </Button>
            )}
          </div>

          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              마지막 업데이트: {lastUpdated.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* 데이터 테이블 */}
      {data.length > 0 && columns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description} • {data.length}개 항목
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={data}
              searchPlaceholder="데이터 검색..."
            />
          </CardContent>
        </Card>
      )}

      {/* 구글 시트 생성 가이드 */}
      {data.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 구글 시트 생성 및 연결 가이드
            </CardTitle>
            <CardDescription>
              처음부터 구글 시트를 만들어 연결하는 방법을 안내합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 1단계: 구글 시트 생성 */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                🚀 1단계: 새 구글 시트 생성
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    <a 
                      href="https://sheets.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      Google Sheets (sheets.google.com)
                    </a>
                    에 접속하세요
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>"+ 새로 만들기" 또는 "빈 스프레드시트" 클릭</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>시트에 의미있는 이름을 지어주세요 (예: "일일 화두 데이터")</span>
                </li>
              </ul>
            </div>

            {/* 2단계: 데이터 구조 설정 */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                📊 2단계: 데이터 구조 설정
              </h4>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  첫 번째 행에 컬럼 헤더를 입력하세요. 예시:
                </p>
                <div className="bg-background p-3 rounded border font-mono text-sm">
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="bg-primary/10 p-2 rounded">날짜</div>
                    <div className="bg-primary/10 p-2 rounded">제목</div>
                    <div className="bg-primary/10 p-2 rounded">카테고리</div>
                    <div className="bg-primary/10 p-2 rounded">난이도</div>
                    <div className="bg-primary/10 p-2 rounded">상태</div>
                  </div>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>두 번째 행부터 실제 데이터를 입력하세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>컬럼 이름은 한글이나 영문 모두 가능합니다</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3단계: 공유 설정 */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                🔗 3단계: 공유 설정 (중요!)
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>시트 우상단의 <span className="bg-primary/20 px-1 rounded">공유</span> 버튼을 클릭하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>"일반 액세스" 섹션에서 <span className="bg-primary/20 px-1 rounded">제한됨</span>을 클릭</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="bg-primary/20 px-1 rounded">링크가 있는 모든 사용자</span>를 선택</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>권한을 <span className="bg-primary/20 px-1 rounded">뷰어</span>로 설정</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><span className="bg-primary/20 px-1 rounded">완료</span> 버튼을 클릭</span>
                </li>
              </ul>
            </div>

            {/* 4단계: URL 복사 및 연결 */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                📎 4단계: URL 복사 및 연결
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>브라우저 주소창의 URL을 복사하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>위 "구글 시트 URL" 입력창에 붙여넣기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>"데이터 불러오기" 버튼을 클릭</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>성공적으로 연결되면 데이터가 테이블에 표시됩니다!</span>
                </li>
              </ul>
            </div>

            {/* 샘플 데이터 */}
            <div className="space-y-3 p-4 bg-success/10 rounded-lg border border-success/20">
              <h4 className="font-semibold text-success flex items-center gap-2">
                💡 샘플 데이터 예시
              </h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>테스트용 샘플 데이터를 만들어보세요:</p>
                <div className="bg-background p-3 rounded border">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-1">날짜</th>
                        <th className="text-left p-1">제목</th>
                        <th className="text-left p-1">카테고리</th>
                        <th className="text-left p-1">난이도</th>
                        <th className="text-left p-1">상태</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr>
                        <td className="p-1">2024-08-21</td>
                        <td className="p-1">AI와 창의적 협업</td>
                        <td className="p-1">Creative</td>
                        <td className="p-1">8</td>
                        <td className="p-1">활성</td>
                      </tr>
                      <tr>
                        <td className="p-1">2024-08-20</td>
                        <td className="p-1">프롬프트 최적화</td>
                        <td className="p-1">Technical</td>
                        <td className="p-1">6</td>
                        <td className="p-1">완료</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 문제 해결 */}
            <div className="space-y-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
              <h4 className="font-semibold text-warning flex items-center gap-2">
                🔧 문제 해결
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-warning">⚠️</span>
                  <span><strong>데이터를 불러올 수 없다면:</strong> 시트가 "링크가 있는 모든 사용자"로 공유되었는지 확인</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">⚠️</span>
                  <span><strong>빈 테이블이 나온다면:</strong> 첫 번째 행에 컬럼 헤더가 있는지 확인</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning">⚠️</span>
                  <span><strong>업데이트가 안 된다면:</strong> "새로고침" 버튼을 눌러보세요</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};