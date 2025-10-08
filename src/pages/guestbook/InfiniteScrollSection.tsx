import type { GuestBookEntry } from '@/types/guestbook';
import { GuestBookCard } from './GuestBookCard';

interface InfiniteScrollSectionProps {
  entries: GuestBookEntry[];
  loading: boolean;
  error: string | null;
  windowWidth: number;
  cardDimensions: { width: string; height: string };
  onRefetch: () => void;
}

// 데이터를 5개 행으로 균등하게 배치하는 함수
const distributeToRows = (data: GuestBookEntry[]) => {
  if (data.length === 0) return [[], [], [], [], []];
  
  const rows: GuestBookEntry[][] = [[], [], [], [], []];
  const baseCount = Math.floor(data.length / 5);
  const remainder = data.length % 5;
  
  let dataIndex = 0;
  
  // 각 행에 기본 개수 배치 (위에서부터)
  for (let i = 0; i < 5; i++) {
    const count = baseCount + (i < remainder ? 1 : 0);
    rows[i] = data.slice(dataIndex, dataIndex + count);
    dataIndex += count;
  }
  
  return rows;
};

export const InfiniteScrollSection = ({ 
  entries, 
  loading, 
  error, 
  windowWidth, 
  cardDimensions, 
  onRefetch 
}: InfiniteScrollSectionProps) => {
  // 5개 행으로 배치된 데이터
  const distributedRows = distributeToRows(entries);
  
  // 디버깅: 데이터 확인
  console.log('받아온 데이터 개수:', entries.length);
  console.log('배치된 행들:', distributedRows.map((row, index) => `행 ${index + 1}: ${row.length}개`));
  console.log('총 배치된 카드 수:', distributedRows.reduce((sum, row) => sum + row.length, 0));

  return (
    <div className="py-16 snap-start relative z-10" style={{ minHeight: 'calc(100vh - 64px)', overflow: 'hidden', overflowY: 'auto' }}>
      <div className="relative w-full" style={{ minHeight: 'calc(100vh - 64px - 128px)' }}>
        {/* 모든 화면에서 무한 스크롤 적용 */}
        {windowWidth <= 768 ? (
          // Mobile: 무한 스크롤 (호버 효과 없음)
          <div 
            className="infinite-scroll-container swiper-wrapper"
            style={{
              width: '100%',
              minHeight: 'calc(100vh - 64px - 128px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* 무한 스크롤 트랙 */}
            <div 
              className="infinite-scroll-track"
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: `${(Math.max(...distributedRows.map(row => row.length)) * 450) + 100}px`,
                height: '100%',
                animationName: 'scroll-from-right',
                animationDuration: `${Math.max(...distributedRows.map(row => row.length)) * 8}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: 'running'
              }}
            >
              {/* 첫 번째 세트 - 5개 행 */}
              <div className="scroll-section" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%', 
                padding: '15px', 
                gap: '40px',
                justifyContent: 'space-around'
              }}>
                {distributedRows.map((row, rowIndex) => (
                  <div key={`mobile-row-${rowIndex}`} style={{ 
                    display: 'flex', 
                    gap: '50px', 
                    alignItems: 'center',
                    minHeight: `${100 / 5}%`
                  }}>
                    {row.map((entry) => (
                      <GuestBookCard key={`mobile-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Desktop/Tablet: 무한 스크롤 + 호버 효과
          <div 
            className="infinite-scroll-container swiper-wrapper"
            style={{
              width: '100%',
              minHeight: 'calc(100vh - 64px - 128px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              // 마우스 진입 시 애니메이션 일시정지
              const container = e.currentTarget;
              const track = container.querySelector('.infinite-scroll-track') as HTMLElement;
              if (track) {
                track.style.animationPlayState = 'paused';
              }
            }}
            onMouseLeave={(e) => {
              // 마우스 벗어날 시 애니메이션 재생
              const container = e.currentTarget;
              const track = container.querySelector('.infinite-scroll-track') as HTMLElement;
              if (track) {
                track.style.animationPlayState = 'running';
              }
            }}
          >
            {/* 무한 스크롤 트랙 */}
            <div 
              className="infinite-scroll-track"
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: `${(Math.max(...distributedRows.map(row => row.length)) * 450) + 100}px`,
                height: '100%',
                animationName: 'scroll-from-right',
                animationDuration: `${Math.max(...distributedRows.map(row => row.length)) * 8}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: 'running'
              }}
            >
              {/* 첫 번째 세트 - 5개 행 */}
              <div className="scroll-section" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%', 
                padding: '15px', 
                gap: '40px',
                justifyContent: 'space-around'
              }}>
                {distributedRows.map((row, rowIndex) => (
                  <div key={`first-row-${rowIndex}`} style={{ 
                    display: 'flex', 
                    gap: '50px', 
                    alignItems: 'center',
                    minHeight: `${100 / 5}%`
                  }}>
                    {row.map((entry) => (
                      <GuestBookCard key={`first-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 로딩 및 에러 상태 */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80">
          <p className="text-red-500 mb-4">오류가 발생했습니다: {error}</p>
          <button 
            onClick={() => onRefetch()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <p className="text-gray-500 mb-4">아직 남겨진 메시지가 없습니다.</p>
          <p className="text-gray-400">첫 번째 메시지를 남겨보세요!</p>
        </div>
      )}
    </div>
  );
};
