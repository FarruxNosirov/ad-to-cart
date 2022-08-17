import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: spece-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  button {
    border-radius: 0px 0px 20px 20px;
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    background-color: transparent;
    margin-bottom: 1rem;
  }
  button:active {
    transform: scale(1.05);
  }
  img {
    border-radius: 20px 20px 0 0;
    max-height: 250px;
    object-fit: cover;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
