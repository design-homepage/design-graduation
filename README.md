# Design Graduation Project

React + TypeScript + Tailwind CSS + Vite 개발 환경

## 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Vite** - 빠른 개발 서버 및 빌드 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포매팅

## 개발 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 린트 검사
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 코드 포매팅
pnpm format

# 코드 포매팅 검사
pnpm format:check

# CI 파이프라인 (빌드 -> 린트 -> 포매팅 검사)
pnpm ci
```

## 프로젝트 구조

```
src/
├── App.tsx          # 메인 앱 컴포넌트
├── main.tsx         # 앱 진입점
└── index.css        # Tailwind CSS 설정
```

## 개발 환경 설정

- **Node.js**: 20.19+ 또는 22.12+ (`.nvmrc` 파일 참조)
- **패키지 매니저**: pnpm
- **코드 스타일**: Prettier (설정: `.prettierrc`)
- **린팅**: ESLint (설정: `eslint.config.js`)