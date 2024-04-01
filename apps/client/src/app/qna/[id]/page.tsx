'use client';

import styled from '@emotion/styled';
import { IconEmoticonThin, IconHeartRegular } from '@seed-design/icon';
import { colors } from '@sickgyun/design-token';
import { Flex, Spacer, Stack, Text } from '@sickgyun/ui';
import Header from '@/components/common/Header';
import QnaCategory from '@/components/qna/QnaCategory';
import QnaComment from '@/components/qna/QnaComment';
import { Qna } from '@/types/qna';

const QnaPostPage = () => {
  return (
    <>
      <Header />
      <StyledQnaPostLayout>
        <StyledQnaPost>
          <Stack style={{ display: 'inline-flex' }}>
            <QnaCategory questionType={Qna.CONCERN} />
          </Stack>
          <Stack style={{ marginTop: '15px' }}>
            <Text fontType="h3">연봉과 업무 중 무엇을 선택하는게 좋을지..</Text>
          </Stack>
          <StyledQnaPostSubTitleBox>
            <Stack direction="horizontal" spacing={10}>
              <Text fontType="p2">lsj0202</Text>
              <Text fontType="p2" color="gray500">
                5일 전
              </Text>
            </Stack>
            <Stack direction="horizontal" align="center" spacing={3}>
              <IconEmoticonThin // TODO: eye-icon 으로 바꿔야함
                width={20}
                height={20}
                color={colors.gray500}
              />
              <Text fontType="p2" color="gray500">
                조회 22
              </Text>
            </Stack>
          </StyledQnaPostSubTitleBox>
          <Stack style={{ borderBottom: `1px solid ${colors.gray200}` }}>
            <StyledQnaContentsBox>
              연봉을 많이 주지만 범위가 좁고 루틴한 업무를 맡게될 회사.. 연봉은 적지만..
              다양한 업무를 맡을수 있는 회사.. (그리고.. 바쁨..) 어느 회사를 선택하는게
              좋을까요? 결정을 못하겠어요
            </StyledQnaContentsBox>
            <Flex align="center" justify="center">
              <StyledLikeButton>
                <IconHeartRegular width={16} height={16} color={colors.black} />
                <Text>9</Text>
              </StyledLikeButton>
            </Flex>
            <Spacer height={5} />
          </Stack>
          <QnaComment />
        </StyledQnaPost>
      </StyledQnaPostLayout>
    </>
  );
};

export default QnaPostPage;

const StyledQnaPostLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledQnaPost = styled.div`
  width: 800px;
  border-radius: 12px;
  background-color: white;
  min-height: 80%;
  padding: 25px;
`;

const StyledLikeButton = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 16px;
  gap: 5px;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  cursor: pointer;
`;

const StyledQnaContentsBox = styled.div`
  padding-top: 30px;
  padding-bottom: 10px;
`;

const StyledQnaPostSubTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
