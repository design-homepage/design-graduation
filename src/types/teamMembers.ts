// 팀 멤버 타입 정의
export type TeamMember = 
  | '강유진'
  | '강현정'
  | '권민정'
  | '김도영'
  | '김민구'
  | '김승화'
  | '김은지'
  | '김주훈'
  | '박소연'
  | '박수민'
  | '박해연'
  | '박희건'
  | '신유빈'
  | '안수아'
  | '오서현'
  | '오지홍'
  | '원민정'
  | '이윤서'
  | '이지혁'
  | '전윤서'
  | '정현진'
  | '정환이';

// 팀 멤버 이름 배열
export const teamMemberNames: TeamMember[] = [
  '강유진',
  '강현정',
  '권민정',
  '김도영',
  '김민구',
  '김승화',
  '김은지',
  '김주훈',
  '박소연',
  '박수민',
  '박해연',
  '박희건',
  '신유빈',
  '안수아',
  '오서현',
  '오지홍',
  '원민정',
  '이윤서',
  '이지혁',
  '전윤서',
  '정현진',
  '정환이'
];

// 팀 멤버 이미지 경로 생성 함수
export const getTeamMemberImage = (memberName: TeamMember): string => {
  return `/guestbook/arrows-green/${memberName}_G.png`;
};
