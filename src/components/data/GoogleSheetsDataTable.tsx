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

      {/* 사용 가이드 */}
      {data.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>사용 방법</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. 구글 시트 준비</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                <li>구글 시트에서 데이터를 준비합니다</li>
                <li>첫 번째 행은 컬럼 헤더로 사용됩니다</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. 시트 공유 설정</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                <li>시트 우상단 "공유" 버튼 클릭</li>
                <li>"링크가 있는 모든 사용자"로 설정</li>
                <li>"뷰어" 권한으로 설정</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. URL 복사 및 연결</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                <li>시트 URL을 복사하여 위 입력창에 붙여넣기</li>
                <li>"데이터 불러오기" 버튼 클릭</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};