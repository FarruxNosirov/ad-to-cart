import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";

export const Wrapper = styled.div`
  margin: 45px 50px;
`;
export const StyleButton = styled(IconButton)`
  position: fixed;
  z-index: 10;
  right: 20px;
  top: 20px;
`;
export const Badge = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  background-color: red;
  right: 0;
  border-radius: 50%;
  font-size: 13px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
