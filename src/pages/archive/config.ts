// 🎯 아카이브 릴리즈 설정
// 이 파일만 수정하면 됩니다!

export const ARCHIVE_CONFIG = {
    // 릴리즈 날짜 (YYYY-MM-DD 형식)
    RELEASE_DATE: '2025-10-02',

    // 릴리즈 시간 (24시간 형식, 00:00 = 자정)
    RELEASE_TIME: '01:00',

    // 타임존 (기본: 한국 시간)
    TIMEZONE: 'Asia/Seoul'
} as const;

// 설정된 날짜로 Date 객체 생성
export const getReleaseDate = (): Date => {
    const dateString = `${ARCHIVE_CONFIG.RELEASE_DATE}T${ARCHIVE_CONFIG.RELEASE_TIME}:00`;
    return new Date(dateString);
};

// 현재 시간이 릴리즈 시간 이후인지 확인
export const isReleased = (): boolean => {
    const now = new Date();
    const releaseDate = getReleaseDate();
    return now >= releaseDate;
};
