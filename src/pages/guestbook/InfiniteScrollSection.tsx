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
const distributeToRows = (
  data: GuestBookEntry[],
  getGapSize: () => number,
  getCardWidth: (entry: GuestBookEntry) => number
) => {
  const rows: GuestBookEntry[][] = [[], [], [], [], []];
  const rowWidths: number[] = [0, 0, 0, 0, 0];

  if (data.length === 0) {
    return { rows, rowWidths };
  }

  const baseCount = Math.floor(data.length / 5);
  const remainder = data.length % 5;

  let currentIndex = 0;

  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    const targetCount = baseCount + (rowIndex < remainder ? 1 : 0);

    if (targetCount > 0) {
      rows[rowIndex] = data.slice(currentIndex, currentIndex + targetCount);
      currentIndex += targetCount;
    }

    const rowEntries = rows[rowIndex];
    if (rowEntries.length > 0) {
      const gap = getGapSize();
      const totalCardWidth = rowEntries.reduce((sum, entry) => {
        return sum + getCardWidth(entry);
      }, 0);
      const totalGapWidth = Math.max(rowEntries.length - 1, 0) * gap;
      rowWidths[rowIndex] = totalCardWidth + totalGapWidth;
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
    return '90s'; // 모든 행이 동일한 속도로 움직임
  };

  // 카드 너비 계산 (반응형 적용)
  const getCardWidth = (entry: GuestBookEntry) => {
    const isLargeCard = entry.message.length >= 98;

    if (windowWidth <= 400) {
      return isLargeCard ? 402 : 292;
    }

    // 401px 이상은 공통 카드 사이즈 사용
    return isLargeCard ? 548 : 332;
  };

  // 5개 행으로 배치된 데이터와 각 행의 너비
  const { rows: distributedRows, rowWidths } = distributeToRows(entries, getGapSize, getCardWidth);

  if (process.env.NODE_ENV !== 'production') {
    console.log('Distributed row lengths:', distributedRows.map(row => row.length));
    console.log('Calculated row widths:', rowWidths);
    distributedRows.forEach((row, rowIndex) => {
      const sampleMessages = row.slice(0, 3).map(entry => entry.message.slice(0, 20));
      console.log(`Row ${rowIndex + 1}`, {
        entryCount: row.length,
        firstEntryId: row[0]?.id,
        lastEntryId: row[row.length - 1]?.id,
        sampleMessages,
        calcWidth: rowWidths[rowIndex]
      });
    });
  }

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
                height: windowWidth <= 400 ? '55%' : `${100 / 5}%`, // Mobile에서는 매우 큰 높이
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: windowWidth <= 400 ? '0px 0' : '14.5px 0'
              }}>
                {/* 각 행의 독립적인 스크롤 영역 */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  overflowX: 'auto',
                  overflowY: 'visible',
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
                    height: '100%',
                    flexShrink: 0
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
                height: windowWidth <= 400 ? '35%' : `${100 / 5}%`, // Mobile에서는 매우 큰 높이
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: windowWidth <= 400 ? '30px 0' : '14.5px 0',
                overflow: 'visible',
                position: 'relative'
              }}>
                {/* 각 행의 완전히 독립적인 무한 스크롤 영역 */}
                <div 
                  className="infinite-scroll-track"
                  style={{
                    width: `${rowWidths[rowIndex] * 2}px`,
                    minWidth: `${rowWidths[rowIndex] * 2}px`,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: `${getGapSize()}px`,
                    animationName: 'scroll-from-right',
                    animationDuration: getAnimationDuration(),
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationPlayState: 'running',
                    position: 'relative'
                  }}
                >
                  {[0, 1].map((dupIndex) => (
                    <div
                      key={`tablet-dup-${dupIndex}`}
                      style={{
                        display: 'flex',
                        gap: `${getGapSize()}px`,
                        alignItems: 'center',
                        width: `${rowWidths[rowIndex]}px`,
                        minWidth: `${rowWidths[rowIndex]}px`,
                        height: '100%',
                        flexShrink: 0
                      }}
                    >
                      {row.map((entry) => (
                        <GuestBookCard key={`tablet-${dupIndex}-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                  ))}
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
                height: windowWidth <= 400 ? '35%' : `${100 / 5}%`, // Mobile에서는 매우 큰 높이
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: windowWidth <= 400 ? '30px 0' : '14.5px 0',
                overflow: 'visible',
                position: 'relative'
              }}>
                {/* 각 행의 완전히 독립적인 무한 스크롤 영역 */}
                <div 
                  className="infinite-scroll-track"
                  style={{
                    width: `${rowWidths[rowIndex] * 2}px`,
                    minWidth: `${rowWidths[rowIndex] * 2}px`,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: `${getGapSize()}px`,
                    animationName: 'scroll-from-right',
                    animationDuration: getAnimationDuration(),
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationPlayState: 'running',
                    position: 'relative'
                  }}
                >
                  {[0, 1].map((dupIndex) => (
                    <div
                      key={`desktop-dup-${dupIndex}`}
                      style={{
                        display: 'flex',
                        gap: `${getGapSize()}px`,
                        alignItems: 'center',
                        width: `${rowWidths[rowIndex]}px`,
                        minWidth: `${rowWidths[rowIndex]}px`,
                        height: '100%',
                        flexShrink: 0
                      }}
                    >
                      {row.map((entry) => (
                        <GuestBookCard key={`desktop-${dupIndex}-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                      ))}
                    </div>
                  ))}
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
