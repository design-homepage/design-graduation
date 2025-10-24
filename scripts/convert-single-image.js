import sharp from 'sharp';
import fs from 'fs';

async function convertGuestbookBackground() {
  const inputPath = 'public/guestbook/background-white.png';
  const outputPath = 'public/guestbook/background-white.webp';

  console.log('🖼️  Guestbook 배경 이미지 변환 시작...');

  try {
    // 원본 파일 크기 확인
    const originalStats = fs.statSync(inputPath);
    console.log(`   원본 PNG 크기: ${Math.round(originalStats.size / 1024)}KB`);

    // Sharp를 사용한 무손실 WebP 변환 (품질 100%, 무손실, pixel limit 해제)
    await sharp(inputPath)
      .webp({ quality: 100, lossless: true, effort: 6 })
      .resize({ width: undefined, height: undefined }) // 크기 제한 해제
      .toFile(outputPath);

    // 변환된 파일 크기 확인
    const convertedStats = fs.statSync(outputPath);
    const originalSize = originalStats.size;
    const convertedSize = convertedStats.size;
    const savings = ((originalSize - convertedSize) / originalSize * 100).toFixed(1);

    console.log(`   ✅ 변환 완료: ${Math.round(convertedSize / 1024)}KB`);
    console.log(`   💾 용량 절약: ${savings}%`);

    // 원본 파일 백업
    const backupPath = 'public/guestbook/background-white.png.backup';
    fs.copyFileSync(inputPath, backupPath);
    console.log(`   📦 원본 백업: ${backupPath}`);

    // WebP로 교체
    fs.renameSync(outputPath, inputPath.replace('.png', '.webp'));
    console.log(`   🔄 WebP로 교체 완료!`);

    console.log('🎉 Guestbook 배경 이미지 변환 완료!');

  } catch (error) {
    console.error('❌ 변환 중 에러:', error);
  }
}

convertGuestbookBackground();
