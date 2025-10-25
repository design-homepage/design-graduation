import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import App from './App.tsx';

// Extend Window interface for custom properties
declare global {
  interface Window {
    isMacBookZoom: boolean;
    zoomFactor: number;
  }
}

// 맥북 크기(1280-1470px)에서 80% 축소
if (window.innerWidth >= 1280 && window.innerWidth <= 1470) {
  document.documentElement.style.zoom = '0.8';
  document.documentElement.style.overflowX = 'hidden';

  // zoom 상태를 전역으로 저장
  window.isMacBookZoom = true;
  window.zoomFactor = 0.8;
} else {
  window.isMacBookZoom = false;
  window.zoomFactor = 1;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);