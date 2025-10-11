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

// 데이터를 5개 행에 각 행당 최대 6개씩 배치하는 함수
const distributeToRows = (data: GuestBookEntry[]) => {
  if (data.length === 0) return [[], [], [], [], []];
  
  const rows: GuestBookEntry[][] = [[], [], [], [], []];
  const itemsPerRow = 6;
  
  // 각 행에 6개씩 채우기 (위에서부터)
  for (let i = 0; i < data.length; i++) {
    const rowIndex = Math.floor(i / itemsPerRow);
    if (rowIndex < 5) {
      rows[rowIndex].push(data[i]);
    }
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

  return (
    <div className="py-16 snap-start relative z-10" style={{ minHeight: 'calc(100vh - 64px)', overflow: 'hidden', overflowY: 'auto' }}>
      <div className="relative w-full" style={{ minHeight: 'calc(100vh - 64px - 128px)' }}>
        {windowWidth <= 400 ? (
          // Mobile (400px 이하): 수동 스크롤 (무한 스크롤 없음)
          <div 
            className="mobile-scroll-container"
            style={{
              width: '100%',
              height: 'calc(100vh - 64px - 128px)',
              overflowX: 'auto',
              overflowY: 'hidden',
              position: 'relative',
              WebkitOverflowScrolling: 'touch' // iOS 스크롤 부드럽게
            }}
          >
            {/* 수동 스크롤 콘텐츠 */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: `${Math.max(...distributedRows.map(row => {
                  const gap = 50;
                  const totalCardWidth = row.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + row.length * gap;
                }))}px`,
                height: '100%',
                padding: '15px',
                gap: '70px',
                justifyContent: 'space-around'
              }}
            >
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
        ) : windowWidth <= 768 ? (
          // Tab>Mobile (400px 초과 ~ 768px 이하): 무한 스크롤 (호버 효과 없음)
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
                flexDirection: 'row',
                width: `${(Math.max(...Array.from({ length: Math.ceil(entries.length / 6) }, (_, i) => {
                  const rowEntries = entries.slice(i * 6, (i + 1) * 6);
                  const gap = 50;
                  const totalCardWidth = rowEntries.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + rowEntries.length * gap;
                }))) * 2}px`,
                height: '100%',
                animationName: 'scroll-from-right',
                animationDuration: `${Math.ceil(entries.length / 6) * 8}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: 'running'
              }}
            >
              {/* 첫 번째 세트 - 6개씩 행으로 배치 */}
              <div className="scroll-section" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%', 
                width: `${Math.max(...Array.from({ length: Math.ceil(entries.length / 6) }, (_, i) => {
                  const rowEntries = entries.slice(i * 6, (i + 1) * 6);
                  const gap = 50;
                  const totalCardWidth = rowEntries.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + rowEntries.length * gap;
                }))}px`,
                padding: '15px 0', 
                gap: '40px',
                justifyContent: 'center'
              }}>
                {Array.from({ length: Math.ceil(entries.length / 6) }, (_, rowIndex) => (
                  <div key={`tablet-row-${rowIndex}`} style={{ 
                    display: 'flex', 
                    gap: '50px', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: `${(() => {
                      const rowEntries = entries.slice(rowIndex * 6, (rowIndex + 1) * 6);
                      const gap = 50;
                      const totalCardWidth = rowEntries.reduce((sum, entry) => {
                        const cardWidth = entry.message.length > 59 ? 400 : 240;
                        return sum + cardWidth;
                      }, 0);
                      return totalCardWidth + rowEntries.length * gap;
                    })()}px`,
                    flexShrink: 0
                  }}>
                    {entries.slice(rowIndex * 6, (rowIndex + 1) * 6).map((entry) => (
                      <GuestBookCard key={`tablet-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                    ))}
                  </div>
                ))}
              </div>
              
              {/* 복제된 세트 - 무한 반복을 위한 imposter */}
              <div className="scroll-section" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%', 
                width: `${Math.max(...Array.from({ length: Math.ceil(entries.length / 6) }, (_, i) => {
                  const rowEntries = entries.slice(i * 6, (i + 1) * 6);
                  const gap = 50;
                  const totalCardWidth = rowEntries.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + rowEntries.length * gap;
                }))}px`,
                padding: '15px 0', 
                gap: '40px',
                justifyContent: 'center'
              }}>
                {Array.from({ length: Math.ceil(entries.length / 6) }, (_, rowIndex) => (
                  <div key={`tablet-clone-row-${rowIndex}`} style={{ 
                    display: 'flex', 
                    gap: '50px', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: `${(() => {
                      const rowEntries = entries.slice(rowIndex * 6, (rowIndex + 1) * 6);
                      const gap = 50;
                      const totalCardWidth = rowEntries.reduce((sum, entry) => {
                        const cardWidth = entry.message.length > 59 ? 400 : 240;
                        return sum + cardWidth;
                      }, 0);
                      return totalCardWidth + rowEntries.length * gap;
                    })()}px`,
                    flexShrink: 0
                  }}>
                    {entries.slice(rowIndex * 6, (rowIndex + 1) * 6).map((entry) => (
                      <GuestBookCard key={`tablet-clone-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
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
                flexDirection: 'row',
                width: `${(Math.max(...Array.from({ length: Math.ceil(entries.length / 6) }, (_, i) => {
                  const rowEntries = entries.slice(i * 6, (i + 1) * 6);
                  const gap = 50;
                  const totalCardWidth = rowEntries.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + rowEntries.length * gap;
                }))) * 2}px`,
                height: '100%',
                animationName: 'scroll-from-right',
                animationDuration: `${Math.ceil(entries.length / 6) * 8}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: 'running'
              }}
            >
              {/* 첫 번째 세트 - 6개씩 행으로 배치 */}
              <div className="scroll-section" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%', 
                width: `${Math.max(...Array.from({ length: Math.ceil(entries.length / 6) }, (_, i) => {
                  const rowEntries = entries.slice(i * 6, (i + 1) * 6);
                  const gap = 50;
                  const totalCardWidth = rowEntries.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + rowEntries.length * gap;
                }))}px`,
                padding: '15px 0', 
                gap: '40px',
                justifyContent: 'center'
              }}>
                {Array.from({ length: Math.ceil(entries.length / 6) }, (_, rowIndex) => (
                  <div key={`first-row-${rowIndex}`} style={{ 
                    display: 'flex', 
                    gap: '50px', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: `${(() => {
                      const rowEntries = entries.slice(rowIndex * 6, (rowIndex + 1) * 6);
                      const gap = 50;
                      const totalCardWidth = rowEntries.reduce((sum, entry) => {
                        const cardWidth = entry.message.length > 59 ? 400 : 240;
                        return sum + cardWidth;
                      }, 0);
                      return totalCardWidth + rowEntries.length * gap;
                    })()}px`,
                    flexShrink: 0
                  }}>
                    {entries.slice(rowIndex * 6, (rowIndex + 1) * 6).map((entry) => (
                      <GuestBookCard key={`first-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
                    ))}
                  </div>
                ))}
              </div>
              
              {/* 복제된 세트 - 무한 반복을 위한 imposter */}
              <div className="scroll-section" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%', 
                width: `${Math.max(...Array.from({ length: Math.ceil(entries.length / 6) }, (_, i) => {
                  const rowEntries = entries.slice(i * 6, (i + 1) * 6);
                  const gap = 50;
                  const totalCardWidth = rowEntries.reduce((sum, entry) => {
                    const cardWidth = entry.message.length > 59 ? 400 : 240;
                    return sum + cardWidth;
                  }, 0);
                  return totalCardWidth + rowEntries.length * gap;
                }))}px`,
                padding: '15px 0', 
                gap: '40px',
                justifyContent: 'center'
              }}>
                {Array.from({ length: Math.ceil(entries.length / 6) }, (_, rowIndex) => (
                  <div key={`clone-row-${rowIndex}`} style={{ 
                    display: 'flex', 
                    gap: '50px', 
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: `${(() => {
                      const rowEntries = entries.slice(rowIndex * 6, (rowIndex + 1) * 6);
                      const gap = 50;
                      const totalCardWidth = rowEntries.reduce((sum, entry) => {
                        const cardWidth = entry.message.length > 59 ? 400 : 240;
                        return sum + cardWidth;
                      }, 0);
                      return totalCardWidth + rowEntries.length * gap;
                    })()}px`,
                    flexShrink: 0
                  }}>
                    {entries.slice(rowIndex * 6, (rowIndex + 1) * 6).map((entry) => (
                      <GuestBookCard key={`clone-${entry.id}`} entry={entry} cardDimensions={cardDimensions} windowWidth={windowWidth} />
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
