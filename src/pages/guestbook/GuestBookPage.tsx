import React, { useState } from 'react';

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  email?: string;
  date: string;
}

interface GuestBookPageProps {}

const GuestBookPage = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([
    {
      id: '1',
      name: '홍길동',
      message: '안녕하세요! 정말 멋진 포트폴리오네요. 앞으로도 좋은 작품 기대하겠습니다!',
      email: 'hong@example.com',
      date: '2024-03-15'
    },
    {
      id: '2', 
      name: '김민수',
      message: '디자인이 너무 깔끔하고 좋아요. 특히 UX/UI 작업이 인상깊었습니다.',
      date: '2024-03-14'
    },
    {
      id: '3', 
      name: '이영희',
      message: '창의적인 아이디어가 돋보이는 작품들이네요!',
      date: '2024-03-13'
    },
    {
      id: '4', 
      name: '박철수',
      message: 'UX 디자인 센스가 정말 뛰어나신 것 같아요.',
      date: '2024-03-12'
    },
    {
      id: '5', 
      name: '최민정',
      message: '앞으로의 성장이 기대됩니다!',
      date: '2024-03-11'
    },
    {
      id: '6', 
      name: '정동현',
      message: '색감과 레이아웃이 매우 조화롭네요.',
      date: '2024-03-10'
    }
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }

    const newEntry: GuestBookEntry = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      email: formData.email || undefined,
      date: new Date().toISOString().split('T')[0]
    };

    setEntries(prev => [newEntry, ...prev]);
    setFormData({ name: '', message: '', email: '' });
  };

  return (
    <div 
      className="relative snap-y snap-mandatory guestbook-container" 
      style={{ 
        height: 'calc(100vh - 64px)', 
        overflowY: 'auto',
        backgroundImage: 'url(/guestbook/background-white.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 첫 번째 섹션: 고정된 메시지 화면 */}
      <div 
        className="relative flex items-center justify-center snap-start"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* 파란색 오버레이 - 완전 제거 */}
        
        {/* 메시지 컨텐츠 */}
        <div className="relative z-20 max-w-4xl mx-auto px-8 text-center">
          {/* 한글 텍스트 */}
          <div className="space-y-8 mb-12">
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
              작은 불꽃이 큰 등불이 되는 시대,
            </p>
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
              무하마드 알리가 던진 단 두 음절 <span className="font-bold text-yellow-300">"ME, WE"</span>는 반세기 만에 우리 사회의 운영 원리로 떠올랐습니다.
            </p>
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed mt-12">
              당신이 전하는 응원의 메세지로 또 다른 누군가에게 <span className="font-bold text-yellow-300">'우리'</span>를 밝혀줄 불빛이 되어주세요.
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
      <div className="relative snap-start" style={{ height: 'calc(100vh - 64px)' }}>
        {/* 가독성을 위한 반투명 배경 - 완전 제거 */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
          {/* ME 섹션 */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">ME: 나의 이야기</h3>
            <div className="bg-blue-50 bg-opacity-20 border border-blue-200 border-opacity-30 rounded-xl p-6 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: 48 }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: 52 }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* WE 섹션 */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-blue-600">WE: 방문자 (이름을 정자로 기입해주세요.)</h3>
              <span className="text-sm text-gray-500">0/200</span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white bg-opacity-40 backdrop-blur-sm"
                  placeholder="이름을 입력해주세요"
                  required
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white bg-opacity-40 backdrop-blur-sm"
                  placeholder="메시지를 입력해주세요"
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 border-opacity-30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white bg-opacity-40 backdrop-blur-sm"
                  placeholder="이메일을 입력해주세요 (선택)"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 text-lg"
              >
                메시지 남기기
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 세 번째 섹션: 방명록 목록 */}
      <div className="py-16 snap-start relative" style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        {/* 가독성을 위한 반투명 배경 - 완전 제거 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            방명록 ({entries.length})
          </h2>
          
          {/* 다이아몬드 그리드 방명록 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`group relative ${index % 2 === 0 ? 'mt-0' : 'mt-8'}`}
              >
                {/* 다이아몬드 카드 */}
                <div className="relative w-full h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  </div>
                  <div className="absolute inset-4 bg-white bg-opacity-60 backdrop-blur-sm transform rotate-45 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 transform -rotate-45 p-6 flex flex-col justify-center">
                      <div className="text-center">
                        {/* 아바타 */}
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                          {entry.name.charAt(0)}
                        </div>
                        {/* 이름 */}
                        <h3 className="font-bold text-gray-800 text-sm mb-2 truncate">
                          {entry.name}
                        </h3>
                        {/* 메시지 */}
                        <p className="text-gray-600 text-xs leading-relaxed mb-2 overflow-hidden" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {entry.message}
                        </p>
                        {/* 날짜 */}
                        <span className="text-gray-400 text-xs">
                          {entry.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 호버 시 상세 정보 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-72 max-w-sm">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">{entry.name}</h4>
                    {entry.email && (
                      <p className="text-sm text-gray-500 mb-2">{entry.email}</p>
                    )}
                    <p className="text-gray-700 text-sm leading-relaxed">{entry.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{entry.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestBookPage;
