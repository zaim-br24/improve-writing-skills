import React, {useEffect} from "react";
import { Title } from "../../styles/settings";
import { Switch } from "../../components";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
useAppContext;
export default function General() {
  const { toggleContent, myCustomTexts} = useAppContext();
  return (
    <div>
      <Title>General</Title>
      <Main className="main">
        {/* <p className="column">
          <Switch
            isChecked={myCustomTexts}
            handleSwitch={(e) => toggleContent(true)}
          />
          <span>Enable Custom Texts.</span>
        </p> */}
      </Main>
    </div>
  );
}

const Main = styled.div`
  .column {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  }
`;
