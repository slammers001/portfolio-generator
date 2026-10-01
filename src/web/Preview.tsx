import { useEffect, useRef, useState, type CSSProperties } from 'react';
import PortfolioView from '../shared/PortfolioView';
import { themeVars } from '../shared/themes';
import type { PortfolioAnswers } from '../shared/types';

export type Device = 'desktop' | 'mobile';

const DEVICE_WIDTH: Record<Device, number> = {
  desktop: 1280,
  mobile: 400
};

interface PreviewProps {
  answers: PortfolioAnswers;
  device: Device;
  folder: string;
}

export default function Preview({ answers, device, folder }: PreviewProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const contentWidth = DEVICE_WIDTH[device];

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const fit = () => setScale(Math.min(1, frame.clientWidth / contentWidth));
    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [contentWidth]);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const measure = () => setContentHeight(inner.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`studio-browser studio-browser--${device}`}>
      <div className="studio-browser__bar">
        <span className="studio-browser__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="studio-browser__url">{folder}</span>
      </div>

      <div className="studio-browser__frame" ref={frameRef}>
        <div
          className="studio-browser__scaler"
          style={{ height: contentHeight * scale || undefined }}
        >
          <div
            className="studio-browser__viewport"
            ref={innerRef}
            style={
              {
                width: contentWidth,
                transform: `scale(${scale})`,
                ...themeVars(answers)
              } as CSSProperties
            }
          >
            <PortfolioView answers={answers} instant />
          </div>
        </div>
      </div>
    </div>
  );
}