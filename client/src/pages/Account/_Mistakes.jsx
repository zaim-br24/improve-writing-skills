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
            <MistakeText>{mistake.mistake}</MistakeText>
            <AnswerText>{mistake.answer}</AnswerText>
            <div
              className="delete"
              onClick={() => {
                deleteMistake(mistake._id);
              }}
            >
              <p>delete</p>
            </div>
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  border: 1px solid var(--grey-50);
  box-shadow: var(--shadow-1);
  border-radius: var(--borderRadius-small);

  .delete {
    display: none;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0;
    bottom: 0;
    background-color: var(--red-light);
    color: var(--red-dark);
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--borderRadius-small);
    padding: 10px;
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
