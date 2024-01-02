import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { MdDelete } from "react-icons/md";
export default function _Mistakes() {
  const { getAllMistakes, allMistakes, deleteMistake, mistakeDeleted } =
    useAppContext();
  const [targetedMistake, setTargetedMistakeId] = useState(null);
  useEffect(() => {
    getAllMistakes();
  }, [mistakeDeleted]);

  return (
    <Wrapper>
      {!!allMistakes &&
        allMistakes?.map((mistake) => (
          <MistakesCard key={mistake._id}>
            <>
              <MistakeText>{mistake.mistake}</MistakeText>
              <span>-</span>
            <AnswerText>{mistake.answer}</AnswerText>
            </>
           
            <MdDelete
              className="icon-btn delete"
              onClick={() => {
                deleteMistake(mistake._id);
              }}
            />
          </MistakesCard>
        ))}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const MistakesCard = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 15px;
  border: 1px solid var(--grey-50);
  box-shadow: var(--shadow-1);
  border-radius: var(--borderRadius-small);
  .delete {
    display: none;
    background-color: var(--grey-50);
    width: 100%;
    font-size: 1.2rem;
  }
  &:hover {
    cursor: pointer;
    outline: 2px solid var(--yellow-light);
    box-shadow: var(--shadow-4);
    border: none;
    .delete {
      display: block;
    }
  }
`;

const MistakeText = styled.p`
  font-size: 1rem;
  color: var(--red-dark);
  font-weight: 600;
`;

const AnswerText = styled.p`
  font-size: 0.8rem;
  color: var(--green-dark);
  font-weight: 400;
`;
