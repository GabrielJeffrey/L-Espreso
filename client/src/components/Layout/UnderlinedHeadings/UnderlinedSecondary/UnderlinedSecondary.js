import React from "react";

import styled from "styled-components";
import { HeadingSecondary } from "../../../../utils/animations";

export const UnderlinedSecondary = (props) => {
  return (
    <HeadingSecondary className="center heading__secondary">
      <UnderlinedSecondaryCss className="top heading__secondary--underlined">
        {props.children}
      </UnderlinedSecondaryCss>
      <span className="heading__underline-2"></span>
    </HeadingSecondary>
  );
};

const UnderlinedSecondaryCss = styled.div`
  font-size: 6rem;
  cursor: default;
  text-transform: capitalize;

  transition: all 0.5s cubic-bezier(1, 0, 0, 1);

  :hover {
    transform: skew(5deg, -5deg);
  }

  :hover + span::after {
    transform: translateX(-50%) rotate(5deg);
  }
`;
