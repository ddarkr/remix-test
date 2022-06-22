import styled from '@emotion/styled';

export const Hello = () => {
  return (
    <HelloSection>
      <HelloWrapper>
        Hello!! from <Code>Hello component</Code>
      </HelloWrapper>
    </HelloSection>
  );
};

const HelloSection = styled.section`
  display: flex;
  height: 200px;

  color: blueviolet;
`;
const HelloWrapper = styled.div`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;
const Code = styled.code`
  font-family: D2Coding;
`;
