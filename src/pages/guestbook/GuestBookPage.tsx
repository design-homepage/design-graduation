import { useState, useCallback, memo } from 'react';
import { useGuestBook } from '@/hooks/useGuestBook';
import type { GuestBookEntry } from '@/types/guestbook';

// 메모이제이션된 점 렌더링 컴포넌트
const DotsPattern = memo(() => (
  <div className="space-y-2">
    <div className="flex items-center space-x-1 flex-wrap">
      {Array.from({ length: 80 }, (_, i) => (
        <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
      ))}
    </div>
    <div className="flex items-center space-x-1 flex-wrap">
      {Array.from({ length: 75 }, (_, i) => (
        <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
      ))}
    </div>
    <div className="flex items-center space-x-1 flex-wrap">
      {Array.from({ length: 82 }, (_, i) => (
        <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
      ))}
    </div>
    <div className="flex items-center space-x-1 flex-wrap">
      {Array.from({ length: 45 }, (_, i) => (
        <div key={i} className="w-1 h-1 bg-black rounded-full"></div>
      ))}
    </div>
  </div>
));

// 메모이제이션된 카드 컴포넌트
const GuestBookCard = memo(({ entry }: { entry: GuestBookEntry }) => (
  <div className="group relative">
    {/* 사각형 카드 */}
    <div className="relative w-full h-64 bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-200">
      <div className="p-6 h-full flex flex-col">
        {/* 상단: 보내는 사람과 받는 사람 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* 아바타 */}
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {entry.sender.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">
                {entry.sender}
              </h3>
              <span className="text-gray-500 text-xs">
                To: {entry.receiver}
              </span>
            </div>
          </div>
          {/* ID 표시 */}
          <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded">
            #{entry.id}
          </span>
        </div>

        {/* 메시지 내용 */}
        <div className="flex-1">
          <p className="text-gray-700 text-sm leading-relaxed overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical'
          }}>
            {entry.message}
          </p>
        </div>

        {/* 하단 구분선 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">
              방명록 메시지
            </span>
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const GuestBookPage = () => {
  // Supabase에서 방명록 데이터 가져오기
  const { entries, loading, error, addEntry, refetch } = useGuestBook();
  
  const [formData, setFormData] = useState({
    sender: '',
    message: '',
    receiver: ''
  });


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sender.trim() || !formData.message.trim() || !formData.receiver.trim()) {
      alert('보내는 사람, 메시지, 받는 사람을 모두 입력해주세요.');
      return;
    }

    try {
      await addEntry({
        sender: formData.sender.trim(),
        message: formData.message.trim(),
        receiver: formData.receiver.trim()
      });
      
      alert('방명록이 성공적으로 등록되었습니다!');
      setFormData({ sender: '', message: '', receiver: '' });
    } catch (error) {
      alert('방명록 등록에 실패했습니다. 다시 시도해주세요.');
      console.error('Failed to add guestbook entry:', error);
    }
  }, [formData, addEntry]);

  return (
    <div 
      className="relative snap-y snap-mandatory smooth-scroll-snap" 
      style={{ 
        height: 'calc(100vh - 64px)', 
        overflowY: 'auto'
      }}
    >
      <div 
        className="guestbook-container relative" 
        style={{ 
          minHeight: '300vh',
          backgroundColor: '#00E53A'
        }}
      >
        {/* 배경 이미지 오버레이 (30% 투명도) - 지연 로딩 */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(/guestbook/background-white.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            opacity: 0.3,
            willChange: 'auto'
          }}
        ></div>
      {/* 첫 번째 섹션: 고정된 메시지 화면 */}
      <div 
        className="relative flex items-center justify-center snap-start"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* 메시지 컨텐츠 */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          {/* 한글 텍스트 */}
          <div className="space-y-8 mb-12">
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-black font-bold text-center leading-relaxed" style={{ letterSpacing: '-0.064px' }}>
              작은 불꽃이 큰 등불이 되는 시대,<br/>
              <span className="whitespace-nowrap">무하마드 알리가 던진 단 두 음절 <span className="font-bold">"ME, WE"</span>는 반세기 만에 우리 사회의 운영 원리로 떠올랐습니다.</span>
            </p>
            <br/><br/>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-3xl text-black font-bold text-center leading-relaxed mt-12" style={{ letterSpacing: '-0.064px' }}>
              당신이 전하는 응원의 메세지로<br/>
              또 다른 누군가에게 <span className="font-bold">'우리'</span>를 밝혀줄 불빛이 되어주세요.
            </p>
          </div>

          {/* 영문 텍스트 */}
          <div className="space-y-6 mt-16">
            <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed">
              In an age where small sparks can become powerful lights,
            </p>
            <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed">
              Muhammad Ali's simple two-syllable motto, <span className="font-semibold text-yellow-200">"ME, WE,"</span> has emerged as the guiding principle of our society in half a century.
            </p>
            <p className="text-lg md:text-xl text-blue-100 italic leading-relaxed mt-8">
              With your message of encouragement, become a beacon of light that illuminates <span className="font-semibold text-yellow-200">"us"</span> for someone else.
            </p>
          </div>
        </div>
      </div>

      {/* 두 번째 섹션: 방명록 작성 폼 */}
      <div 
        className="relative snap-start z-10" 
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <div 
          className="backdrop-blur-sm mx-auto" 
          style={{ 
            height: '400px',
            width: 'fit-content',
            maxWidth: '800px',
            display: 'flex',
            padding: '47px 41px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.00)',
            marginTop: 'calc((100vh - 64px - 400px) / 2)'
          }}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '7px',
              alignSelf: 'stretch'
            }}
          >
          {/* ME 섹션 */}
          <div style={{ width: '100%' }}>
            <h3 className="text-lg font-bold text-black mb-3">ME: 보내이</h3>
            <div className="bg-white bg-opacity-60 border border-gray-300 border-opacity-50 rounded-lg p-4 backdrop-blur-sm" style={{ width: '100%' }}>
              <DotsPattern />
            </div>
          </div>

          {/* WE 섹션 */}
          <div style={{ width: '100%' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-black">WE: 방문자 (이름을 정자로 기입해주세요.)</h3>
              <span className="text-xs text-gray-600">0/200</span>
            </div>
            
            <div className="space-y-3" style={{ width: '100%' }}>
              <div>
                <input
                  type="text"
                  name="sender"
                  value={formData.sender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 border-opacity-50 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white bg-opacity-60 backdrop-blur-sm text-sm"
                  placeholder="보내는 사람을 입력해주세요"
                  required
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 border-opacity-50 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none bg-white bg-opacity-60 backdrop-blur-sm text-sm"
                  placeholder="메시지를 입력해주세요"
                  required
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 border-opacity-50 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white bg-opacity-60 backdrop-blur-sm text-sm"
                  placeholder="받는 사람을 입력해주세요"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        </div>
        
        {/* 메시지 보내기 버튼 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleSubmit}
            className="bg-black text-white py-3 px-8 rounded-md font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
          >
            메시지 남기기
          </button>
        </div>
      </div>

      {/* 세 번째 섹션: 방명록 목록 */}
      <div className="py-16 snap-start relative z-10" style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', contain: 'layout style paint' }}>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            방명록 ({entries.length})
          </h2>
          
          {/* 로딩 상태 */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {/* 에러 상태 */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-600 mb-4">방명록을 불러오는데 실패했습니다.</p>
              <button 
                onClick={refetch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                다시 시도
              </button>
            </div>
          )}
          
          {/* 사각형 그리드 방명록 목록 */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry) => (
                <GuestBookCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default GuestBookPage;
