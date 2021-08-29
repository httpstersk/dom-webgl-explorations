import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  position: absolute;
  top: 100%;
`;

type Props = {
  size: number;
};

type SvgInHtml = HTMLElement & SVGCircleElement;
export type Ref = SvgInHtml;

const SvgCircle = forwardRef<Ref, Props>(({ size }, ref) => {
  return (
    <Svg
      fill="none"
      height="100%"
      viewBox={`0 0 ${size * 2} ${size * 2}`}
      width="100%"
    >
      <circle cx={size} cy={size} r={size} ref={ref} />
    </Svg>
  );
});

export default React.memo(SvgCircle);
