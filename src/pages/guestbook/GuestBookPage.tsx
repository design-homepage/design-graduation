import { useState, useCallback, memo } from 'react';
import { useGuestBook } from '@/hooks/useGuestBook';
import type { GuestBookEntry } from '@/types/guestbook';
import { getTeamMemberImage, teamMemberNames } from '@/types/teamMembers';
import type { TeamMember } from '@/types/teamMembers';


// 메모이제이션된 카드 컴포넌트
const GuestBookCard = memo(({ entry }: { entry: GuestBookEntry }) => (
  <div className="group relative">
    {/* 화살표 모양 말풍선 카드 */}
    <div className="relative w-full h-48 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-green-300">
      {/* 화살표 꼬리 */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
        <div className="w-0 h-0 border-t-[24px] border-b-[24px] border-r-[24px] border-t-transparent border-b-transparent border-r-green-200"></div>
      </div>
      
      <div className="p-6 h-full flex">
        {/* 왼쪽: 받는 사람 이미지 */}
        <div className="flex-shrink-0 w-20 h-full flex items-center justify-center">
          <img 
            src={getTeamMemberImage(entry.receiver)} 
            alt={entry.receiver}
            className="w-16 h-16 object-contain"
            onError={(e) => {
              // 이미지 로드 실패 시 기본 아이콘 표시
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          {/* 기본 아이콘 (이미지 로드 실패 시) */}
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg hidden">
            {entry.receiver.charAt(0)}
          </div>
        </div>

        {/* 오른쪽: 메시지 내용 */}
        <div className="flex-1 flex flex-col justify-between">
          {/* 메시지 텍스트 */}
          <div className="flex-1">
            <p className="text-gray-800 text-sm leading-relaxed">
              {entry.message}
            </p>
          </div>
          
          {/* 하단: 보내는 사람 */}
          <div className="mt-4 pt-3 border-t border-green-300">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-xs font-medium">
                - {entry.sender}
              </span>
              <span className="text-gray-500 text-xs">
                To: {entry.receiver}
              </span>
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
    receiver: '강유진' as TeamMember
  });


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        receiver: formData.receiver
      });
      
      alert('방명록이 성공적으로 등록되었습니다!');
      setFormData({ sender: '', message: '', receiver: '강유진' as TeamMember });
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
        <div className="flex items-center justify-center h-full">
          <div 
            className="glassmorphism-container" 
            style={{ 
              display: 'flex',
              width: '828px',
              height: '521px',
              padding: '30px 41px',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            {/* 1. 보낸이 섹션 */}
            <div style={{ width: '100%' }}>
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-black drop-shadow-lg">ME:</h3>
                <input
                  type="text"
                  name="sender"
                  value={formData.sender}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-sm text-gray-800 placeholder-gray-600"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    backdropFilter: 'none'
                  }}
                  placeholder="보낸이"
                  required
                />
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-400 border-opacity-30" style={{ width: '100%', margin: '10px 0' }}></div>

              {/* 2. 메시지 섹션 */}
              <div style={{ width: '100%', flex: 1 }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-sm text-gray-800 placeholder-gray-600 resize-none"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    backdropFilter: 'none',
                    height: '100%',
                    minHeight: '200px'
                  }}
                  placeholder="메시지를 입력해주세요"
                  required
                  maxLength={200}
                />
                <div className="flex justify-end mt-2">
                  <span className="text-xs text-black drop-shadow-lg">{formData.message.length}/200</span>
                </div>
              </div>

            {/* 구분선 */}
            <div className="border-t border-gray-400 border-opacity-30" style={{ width: '100%', margin: '10px 0' }}></div>

            {/* 3. 받는이 섹션 */}
            <div style={{ width: '100%' }}>
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-black drop-shadow-lg">WE:</h3>
                <select
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleInputChange}
                  className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-200 text-sm text-gray-800"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    backdropFilter: 'none'
                  }}
                  required
                >
                  {teamMemberNames.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* 메시지 보내기 버튼 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleSubmit}
            className="py-3 px-8 rounded-lg font-medium transition-all duration-200 text-sm text-white hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.3)'
            }}
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
