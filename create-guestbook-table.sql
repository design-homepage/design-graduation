-- 방명록 테이블 생성
CREATE TABLE IF NOT EXISTS guestbook (
  id SERIAL PRIMARY KEY,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  receiver TEXT NOT NULL
);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 방명록을 읽을 수 있도록 허용
CREATE POLICY "Anyone can read guestbook entries" ON guestbook
  FOR SELECT USING (true);

-- 샘플 데이터 삽입
INSERT INTO guestbook (sender, message, receiver) VALUES
('홍길동', '안녕하세요! 정말 멋진 포트폴리오네요. 앞으로도 좋은 작품 기대하겠습니다!', '디자인팀'),
('김민수', '디자인이 너무 깔끔하고 좋아요. 특히 UX/UI 작업이 인상깊었습니다.', '개발팀'),
('이영희', '창의적인 아이디어가 돋보이는 작품들이네요!', '기획팀'),
('박철수', 'UX 디자인 센스가 정말 뛰어나신 것 같아요.', '디자인팀'),
('최민정', '앞으로의 성장이 기대됩니다!', '전체팀'),
('정동현', '색감과 레이아웃이 매우 조화롭네요.', '디자인팀');
