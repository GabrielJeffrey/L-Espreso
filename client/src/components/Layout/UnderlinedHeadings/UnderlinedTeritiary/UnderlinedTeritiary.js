import React from "react";

import styled from "styled-components";
import { HeadingSecondary } from "../../../../utils/animations";

export const UnderlinedTeritiary = (props) => {
  return (
    <HeadingSecondary className="center heading__teritiary">
      <UnderlinedTeritiaryCss className="top heading__teritiary--underlined">
        {props.children}
      </UnderlinedTeritiaryCss>
      <span className="heading__underline-3"></span>
    </HeadingSecondary>
  );
};

const UnderlinedTeritiaryCss = styled.div`
  font-size: 2.5rem;

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
