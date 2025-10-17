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

// 데이터를 행별로 배치하고 각 행의 스크롤 너비를 계산하는 함수
const distributeToRows = (data: GuestBookEntry[], getGapSize: () => number) => {
  if (data.length === 0) return { rows: [[], [], [], [], []], rowWidths: [0, 0, 0, 0, 0] };
  
  const rows: GuestBookEntry[][] = [[], [], [], [], []];
  const rowWidths: number[] = [0, 0, 0, 0, 0];
  const itemsPerRow = 6;
  
  // 각 행에 6개씩 채우기 (위에서부터)
  for (let i = 0; i < data.length; i++) {
    const rowIndex = Math.floor(i / itemsPerRow);
    if (rowIndex < 5) {
      rows[rowIndex].push(data[i]);
    }
  }
  
  // 각 행의 너비 계산
  for (let i = 0; i < rows.length; i++) {
    const rowEntries = rows[i];
    if (rowEntries.length > 0) {
      const gap = getGapSize();
      const totalCardWidth = rowEntries.reduce((sum, entry) => {
        const cardWidth = entry.message.length >= 98 ? 548 : 332;
        return sum + cardWidth;
      }, 0);
      rowWidths[i] = totalCardWidth + rowEntries.length * gap;
    }
  }
  
  return { rows, rowWidths };
};

export const InfiniteScrollSection = ({ 
  entries, 
  loading, 
  error, 
  windowWidth, 
  cardDimensions, 
  onRefetch 
}: InfiniteScrollSectionProps) => {
  // 화면 크기에 따른 가로 간격 설정
  const getGapSize = () => {
    return windowWidth > 1020 ? 34 : 30;
  };

  // 애니메이션 속도 계산 (모든 행 동일한 속도)
  const getAnimationDuration = () => {
    return '20s'; // 모든 행이 동일한 속도로 움직임
  };

  // 5개 행으로 배치된 데이터와 각 행의 너비
  const { rows: distributedRows, rowWidths } = distributeToRows(entries, getGapSize);

  return (
    <div className={`snap-start relative z-10 ${windowWidth >= 1020 ? 'py-8' : 'py-16'}`} style={{ minHeight: 'calc(100vh - 64px)', overflow: 'hidden', overflowY: 'auto' }}>
      <div className="relative w-full" style={{ minHeight: 'calc(100vh - 64px - 128px)' }}>
        {windowWidth <= 400 ? (
          // Mobile (400px 이하): 각 행마다 독립적인 스크롤 영역
          <div 
            className="mobile-scroll-container"
            style={{
              width: '100%',
              height: 'calc(100vh - 64px - 128px)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {distributedRows.map((row, rowIndex) => (
              <div key={`mobile-row-${rowIndex}`} style={{
                width: '100%',
                height: `${100 / 5}%`, // 각 행이 화면의 1/5 높이
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 0'
              }}>
                {/* 각 행의 독립적인 스크롤 영역 */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '0 15px',
                  WebkitOverflowScrolling: 'touch'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: `${getGapSize()}px`,
                    alignItems: 'center',
                    minWidth: `${rowWidths[rowIndex]}px`, // 각 행의 독립적인 너비
                    height: '100%'
                  }}>
                    {row.map((entry) => (
                      <GuestBookCard key={`mobile-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : windowWidth <= 768 ? (
          // Tab>Mobile (400px 초과 ~ 768px 이하): 각 행마다 완전히 독립적인 무한 스크롤
          <div 
            className="infinite-scroll-container"
            style={{
              width: '100%',
              minHeight: 'calc(100vh - 64px - 128px)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {distributedRows.map((row, rowIndex) => (
              <div key={`tablet-row-${rowIndex}`} style={{
                width: '100%',
                height: `${100 / 5}%`, // 각 행이 화면의 1/5 높이
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 0',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* 각 행의 완전히 독립적인 무한 스크롤 영역 */}
                <div 
                  className="infinite-scroll-track"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    animationName: 'scroll-from-right',
                    animationDuration: getAnimationDuration(),
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationPlayState: 'running',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: `${getGapSize()}px`,
                    alignItems: 'center',
                    width: `${rowWidths[rowIndex] * 4}px`, // 각 행의 독립적인 너비 * 4 (무한 스크롤용)
                    height: '100%'
                  }}>
                    {/* 첫 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`tablet-1-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                    {/* 두 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`tablet-2-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                    {/* 세 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`tablet-3-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                    {/* 네 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`tablet-4-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop/Tablet: 각 행마다 완전히 독립적인 무한 스크롤 + 호버 효과
          <div 
            className="infinite-scroll-container"
            style={{
              width: '100%',
              minHeight: 'calc(100vh - 64px - 128px)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {distributedRows.map((row, rowIndex) => (
              <div key={`desktop-row-${rowIndex}`} style={{
                width: '100%',
                height: `${100 / 5}%`, // 각 행이 화면의 1/5 높이
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 0',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* 각 행의 완전히 독립적인 무한 스크롤 영역 */}
                <div 
                  className="infinite-scroll-track"
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    animationName: 'scroll-from-right',
                    animationDuration: getAnimationDuration(),
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationPlayState: 'running',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: `${getGapSize()}px`,
                    alignItems: 'center',
                    width: `${rowWidths[rowIndex] * 4}px`, // 각 행의 독립적인 너비 * 4 (무한 스크롤용)
                    height: '100%'
                  }}>
                    {/* 첫 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`desktop-1-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                    {/* 두 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`desktop-2-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                    {/* 세 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`desktop-3-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                    {/* 네 번째 세트 */}
                    <div style={{
                      display: 'flex',
                      gap: `${getGapSize()}px`,
                      alignItems: 'center',
                      width: `${rowWidths[rowIndex]}px`,
                      height: '100%'
                    }}>
                      {row.map((entry) => (
                        <GuestBookCard key={`desktop-4-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
