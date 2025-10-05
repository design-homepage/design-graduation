# 🎯 아카이브 페이지 설정 가이드

## 릴리즈 날짜 변경하기

### 1. 설정 파일 수정
`src/pages/archive/config.ts` 파일을 열어서 다음 값들을 수정하세요:

```typescript
export const ARCHIVE_CONFIG = {
    // 릴리즈 날짜 (YYYY-MM-DD 형식)
    RELEASE_DATE: '2026-10-02',  // ← 여기를 변경
    
    // 릴리즈 시간 (24시간 형식, 00:00 = 자정)
    RELEASE_TIME: '00:00',       // ← 여기를 변경
    
    // 타임존 (기본: 한국 시간)
    TIMEZONE: 'Asia/Seoul'       // ← 필요시 변경
} as const;
```

### 2. 예시
```typescript
// 2026년 12월 25일 오후 3시에 릴리즈
RELEASE_DATE: '2026-12-25',
RELEASE_TIME: '15:00',

// 2025년 1월 1일 자정에 릴리즈
RELEASE_DATE: '2025-01-01',
RELEASE_TIME: '00:00',
```

## 동작 방식

### D-Day 이전
- **DdayHero 컴포넌트** 표시
- **"ME가 WE가 되는 날까지"** 메시지
- **D-{남은일수}** 카운트다운 표시
- **실시간 카운트다운** (1초마다 업데이트)

### D-Day 당일
- **"D-DAY"** 표시
- **아카이브 그리드** 표시

### D-Day 이후
- **아카이브 그리드** 표시
- **이미지 갤러리** 표시

## 이미지 추가하기

1. `public/archive/example/` 폴더에 이미지 파일 추가
2. 파일명을 `1.png`, `2.png`, `3.png`... 순서로 명명
3. `ArchiveGrid.tsx`에서 이미지 배열 확인

## 주의사항

- 날짜 형식은 반드시 `YYYY-MM-DD`로 입력
- 시간 형식은 반드시 `HH:MM`으로 입력 (24시간 형식)
- 한국 시간 기준으로 동작
