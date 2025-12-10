import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface YearButtonProps {
  selectedTenure: string | null;
  onTenureChange: (tenure: string) => void;
}

const YearButton: React.FC<YearButtonProps> = ({ selectedTenure, onTenureChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const tenures = [
    { label: '2025-2026', value: '2025-2026' },
    { label: '2024-2025', value: '2024-2025' },
    { label: '2023-2024', value: '2023-2024' },
  ];

  const handleTenureClick = (tenure: string) => {
    onTenureChange(tenure);
    setIsOpen(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block z-20" ref={ref}>
      {/* Main Button */}
      <button
        className="relative w-[296px] h-[74px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ outline: 'none' }}
      >
        <Image
          src="/images/tenure.png"
          alt="Select Tenure"
          width={296}
          height={74}
          className="absolute inset-0"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-[296px] z-30">
          <div className="relative">
            <Image
              src="/images/tenure-dd.png"
              alt="Tenure Dropdown"
              width={296}
              height={222}
              className="w-full"
            />
            {tenures.map((tenure, index) => (
              <div
                key={tenure.value}
                className="absolute cursor-pointer"
                onClick={() => handleTenureClick(tenure.value)}
                style={{
                  top: `${20 + index * 63}px`,
                  left: '0',
                  width: '296px',
                  height: '63px',
                }}
              >
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearButton;
