import styled, { keyframes } from "styled-components";

import {
  zoomInUp,
  zoomInLeft,
  zoomInRight,
  slideInRight,
  slideInLeft,
  tada,
  zoomInDown,
  bounceInUp,
  wobble,
} from "react-animations";

const zoomInDownAnimation = keyframes`${zoomInDown}`;
const zoomInUpAnimation = keyframes`${zoomInUp}`;
const zoomInLeftAnimation = keyframes`${zoomInLeft}`;
const zoomInRightAnimation = keyframes`${zoomInRight}`;
const tadaAnimation = keyframes`${tada}`;
const slideInRightAnimation = keyframes`${slideInRight}`;
const slideInLeftAnimation = keyframes`${slideInLeft}`;
const bounceInUpAnimation = keyframes`${bounceInUp}`;
const wobbleAnimation = keyframes`${wobble}`;

export const ZoomInDown = styled.div`
  animation: 1.5s ${zoomInDownAnimation};
`;
export const ZoomInUp = styled.div`
  animation: 1.5s ${zoomInUpAnimation};
`;
export const ZoomInLeft = styled.div`
  animation: 1.8s ${zoomInLeftAnimation};
`;
export const ZoomInRight = styled.div`
  animation: 1.8s ${zoomInRightAnimation};
`;

export const SlideInRight = styled.div`
  animation: 2s ${slideInRightAnimation};
`;
export const SlideInLeft = styled.div`
  animation: 1.5s ${slideInLeftAnimation};
`;

export const HeadingSecondary = styled.h2`
  animation: 1s ${tadaAnimation};
`;

export const BounceInUp = styled.div`
  animation: 2s ${bounceInUpAnimation};
`;

export const WobbleErrorForm = styled.div`
  animation: 0.5s ${wobbleAnimation};
`;
