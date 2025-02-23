import React, { useState, ReactNode } from 'react';
import styles from '../../index.module.scss';

interface CustomTooltipProps {
  content: string;
  children: ReactNode;
  TooltipBgColor?: string;
  TooltipBorderColor?: string;
  isWeekFullWidth?:boolean;
}

function CustomTooltip({
  children, content, TooltipBgColor, TooltipBorderColor, isWeekFullWidth,
}:CustomTooltipProps) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };
  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
      className={isWeekFullWidth ? styles.analystCell : ''}
    >
      {children}
      {isTooltipVisible && (
        <div
          className={TooltipBgColor ? `custom-tooltip ${TooltipBgColor}` : 'custom-tooltip'}
          style={{
            position: 'absolute',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            bottom: '100%',
            left: '50%',
            transform: 'translate(-50%, -8%)',
            zIndex: 1000,
            fontSize: '14px',
            filter: 'drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.3))',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: `12px solid ${TooltipBorderColor}`,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          {content}
        </div>
      )}
    </div>
  );
}

export default CustomTooltip;
