import styled from '@emotion/styled';
import { Button, Flex, Stack, Text } from '@sickgyun/ui';
import { useState } from 'react';
import { QNA_CATEGORY } from '@/constants/qna-category';

type StyledAskCategoryProps = {
  active: boolean;
};

const QnaAskBox = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <StyledQnaAskBox>
      <Stack
        direction="horizontal"
        align="center"
        justify="center"
        style={{ height: '90px', borderBottom: '1px solid white' }}
      >
        <Button width="80%" styleType="primary">
          질문하기
        </Button>
      </Stack>
      <Flex direction="column">
        {QNA_CATEGORY.map((category) => (
          <StyledAskCategory
            onClick={() => setActiveCategory(category.id)}
            active={category.id === activeCategory}
          >
            <Stack direction="horizontal" spacing={10}>
              <Text styleType="body1">{category.thumbnail}</Text>
              <Text styleType="body1">{category.title}</Text>
            </Stack>
          </StyledAskCategory>
        ))}
      </Flex>
    </StyledQnaAskBox>
  );
};

export default QnaAskBox;

const StyledQnaAskBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;
`;

const StyledAskCategory = styled.div<StyledAskCategoryProps>`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 10%;
  position: relative;
  gap: 5px;
  cursor: pointer;

  ::before {
    content: '';
    display: block;
    height: 25px;
    width: 3px;
    position: absolute;
    left: 0px;
    border-left: 3px solid
      ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  }
`;
