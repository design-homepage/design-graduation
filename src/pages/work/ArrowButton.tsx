interface ArrowButtonProps {
  x: number;
  y: number;
  buttonClick: () => void;
}

export const ArrowButton = ({ x, y, buttonClick }: ArrowButtonProps) => {
  // 임시 버튼 컴포넌트
  return (
    <button
      className={`absolute w-20 h-20 bg-white text-white hover:bg-blue-400`}
      style={{ left: x, top: y }}
      onClick={buttonClick}
    />
  );
};
