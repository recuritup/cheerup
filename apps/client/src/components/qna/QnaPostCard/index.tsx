'use client';

import styled from '@emotion/styled';
import { IconHeartRegular, IconReplyRegular } from '@seed-design/icon';
import { colors } from '@sickgyun/design-token';
import { Flex, Stack, Text } from '@sickgyun/ui';
import { useRouter } from 'next/navigation';
import QnaCategory from '../QnaCategory';

type QnaPostingCardProps = {
  id: number;
  title: string;
  questionType: string;
  questionTitle: string;
  name: string;
  heart: number;
  commentCount: number;
};

const QnaPostCard = ({
  id,
  title,
  questionType,
  questionTitle,
  name,
  heart,
  commentCount,
}: QnaPostingCardProps) => {
  const router = useRouter();

  const handleGoQnaDetailPage = (id: number) => {
    router.push(`/qna/${id}`);
  };
  return (
    <StyledQnaPostCard onClick={() => handleGoQnaDetailPage(id)}>
      <Flex direction="column">
        <StyledPopularQnaContent>
          <QnaCategory questionType={questionType} questionTitle={questionTitle} />
          <StyledQnaContent fontType="h4">{title}</StyledQnaContent>
        </StyledPopularQnaContent>
        <StyledPopularInfo>
          <Text>{name}</Text>
          <Stack direction="horizontal" spacing={12}>
            <Stack direction="horizontal" align="center" spacing={3}>
              <IconHeartRegular width={16} height={16} color={colors.black} />
              <Text fontType="body2" style={{ marginTop: '2px' }}>
                {heart}
              </Text>
            </Stack>
            <Stack direction="horizontal" align="center" spacing={3}>
              <IconReplyRegular width={16} height={16} color={colors.black} />
              <Text fontType="body2" style={{ marginTop: '2px' }}>
                {commentCount}
              </Text>
            </Stack>
          </Stack>
        </StyledPopularInfo>
      </Flex>
    </StyledQnaPostCard>
  );
};

export default QnaPostCard;

const StyledQnaPostCard = styled.div`
  width: calc((100% / 3) - 10px);
  height: 185px;
  background-color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 12px;
`;

const StyledPopularQnaContent = styled.div`
  height: 145px;
  border-radius: 12px 12px 0 0;
  padding: 24px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const StyledPopularInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 0 0 12px 12px;
`;

const StyledQnaContent = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
