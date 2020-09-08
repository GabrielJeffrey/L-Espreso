import React from "react";

import styled from "styled-components";
import { HeadingSecondary } from "../../../../utils/animations";

export const UnderlinedPrimary = (props) => {
  return (
    <HeadingSecondary className="center heading__secondary">
      <UnderlinedPrimaryCss className="top heading__secondary--underlined">
        {props.children}
      </UnderlinedPrimaryCss>
      <span className="heading__underline"></span>
    </HeadingSecondary>
  );
};

const UnderlinedPrimaryCss = styled.div`
  font-size: 8rem;
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
