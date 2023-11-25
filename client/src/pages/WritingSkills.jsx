import React from "react";
import { Wrapper, Editor, Right, Left } from "../styles/WritingSkills";

import {
  AudioContainer,
  ButtonRow,
  LanguageBar,
  ModesBar,
  Navbar,
  Sidebar,
  SidebarSmall,
  UserTextContainer,
  OriginalTextContainer,
} from "../components";

export default function WritingSkills() {
  return (
    <Wrapper>
      <LanguageBar />
      <ModesBar />
      <Editor>
        <Right>
          <UserTextContainer />
        </Right>
        <Left>
          <AudioContainer />
          <OriginalTextContainer />
        </Left>
      </Editor>
    </Wrapper>
  );
}
