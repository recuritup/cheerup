import { ChevronRightIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { Flex, Stack, Text } from '@sickgyun/ui';
import { getUserProfileImage } from '@sickgyun/utils';
import Image from 'next/image';
import { withSuspense } from '@/hocs/withSuspense';
import { useGetStudentProfile } from '@/hooks/api/student-profile/useGetStudentProfile';

type StudnetProfileDetailContentProps = {
  userCode: number;
};

const StudentProfileDetailContents = ({ userCode }: StudnetProfileDetailContentProps) => {
  const { studentProfileData } = useGetStudentProfile(userCode);

  const profileImage = getUserProfileImage(studentProfileData?.profileUrl);

  const handleGoGithub = () => {
    window.open(`https://github.com/${studentProfileData.githubId}`);
  };

  const handleGoEmail = () => {
    window.open(`mailto: ${studentProfileData.email}`);
  };

  return (
    <StyledStudentProfileDetailContents>
      <Stack
        direction="horizontal"
        spacing={24}
        align="flex-start"
        style={{ height: '94px' }}
      >
        <Image
          src={profileImage}
          width={94}
          height={94}
          style={{ borderRadius: '8px' }}
          alt="Student Profile"
        />
        <Stack spacing={4}>
          <Stack direction="horizontal" align="center" spacing={6}>
            <Text fontType="h3">{studentProfileData?.name}</Text>
            <Text fontType="body2" color="gray600">
              {studentProfileData?.cardinal}기
            </Text>
          </Stack>
          <Text fontType="body2" color="gray600">
            관심 있는 분야: {studentProfileData?.position}
          </Text>
          <Stack direction="horizontal" spacing={6} align="center">
            <Image src="/assets/company.svg" height={16} width={16} alt="Company" />
            <Text fontType="body2" color="gray600">
              {studentProfileData?.company
                ? studentProfileData.company
                : '부산소프트웨어마이스터고등학교'}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      {studentProfileData?.bio && (
        <Stack spacing={16}>
          <Text fontType="h3">소개 말</Text>
          <StyledIntroduceBox>
            <Text fontType="body2" color="gray600">
              {studentProfileData.bio}
            </Text>
          </StyledIntroduceBox>
        </Stack>
      )}
      <Stack spacing={16}>
        <Text fontType="h3">정보</Text>
        {/* 깃허브 */}
        <Stack spacing={12}>
          {studentProfileData?.githubId && (
            <StyledNavigationLinkButton onClick={handleGoGithub}>
              <Text fontType="body2">👀 선배의 깃허브는 어떻게 되어 있을까요?</Text>
              <Flex align="center">
                <Text fontType="body3" color="gray700">
                  깃허브 바로가기
                </Text>
                <ChevronRightIcon color="gray.700" />
              </Flex>
            </StyledNavigationLinkButton>
          )}
          {/* 이메일 */}
          {studentProfileData?.email && (
            <StyledNavigationLinkButton onClick={handleGoEmail}>
              <Text fontType="body2">📨 커피챗, 코드리뷰, 조언 요청하러가기</Text>
              <Flex align="center">
                <Text fontType="body3" color="gray700">
                  이메일 바로가기
                </Text>
                {/* TODO: RightIcon 컴포넌트 추가 */}
                <ChevronRightIcon color="gray.700" />
              </Flex>
            </StyledNavigationLinkButton>
          )}
        </Stack>
      </Stack>
    </StyledStudentProfileDetailContents>
  );
};

export default withSuspense<StudnetProfileDetailContentProps>({
  Comp: StudentProfileDetailContents,
});

const StyledStudentProfileDetailContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const StyledIntroduceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
  width: 100%;
  min-height: 56px;
  cursor: pointer;
`;

const StyledNavigationLinkButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
  width: 100%;
  height: 56px;
  cursor: pointer;
`;
