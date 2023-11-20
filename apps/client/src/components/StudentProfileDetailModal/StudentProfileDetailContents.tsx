import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useGetStudentProfile } from '@/hooks/api/student-profile/useGetStudentProfile';
import { getUserProfileImage } from '@/utils/user';

type StudnetProfileDetailContentProps = {
  userCode: number;
};

const StudentProfileDetailContents = ({ userCode }: StudnetProfileDetailContentProps) => {
  const { studentProfile } = useGetStudentProfile(userCode);

  const profileImage = getUserProfileImage(studentProfile.profileUrl);

  const handleGoGithub = (githubId?: string) => {
    window.open(`https://github.com/${githubId}`);
  };

  const handleGoEmail = (email?: string) => {
    window.open(`mailto: ${email}`);
  };

  return (
    <Flex flexDirection="column" gap="24px">
      <Flex gap="24px" alignItems="flex-start" height="94px">
        <Image
          src={profileImage}
          borderRadius="8px"
          height="100%"
          alt="Student Profile"
        />
        <Flex flexDirection="column" gap="4px">
          <Flex alignItems="center" gap="6px">
            <Text fontSize="20px" fontWeight="semibold">
              {studentProfile.name}
            </Text>
            <Text fontSize="14px" color="gray.600" fontWeight="medium">
              {studentProfile.cardinal}기
            </Text>
          </Flex>
          <Text fontSize="14px" color="gray.600" fontWeight="medium">
            관심 있는 분야: {studentProfile.position}
          </Text>
          <Flex gap="6px" alignItems="center">
            <Image src="/assets/company.svg" height="16px" alt="Company" />
            <Text fontSize="14px" color="gray.600">
              {studentProfile.company
                ? studentProfile.company
                : '부산소프트웨어마이스터고등학교'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {studentProfile.bio && (
        <Flex flexDirection="column" gap="16px">
          <Text fontSize="20px" fontWeight="semibold">
            소개 말
          </Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="12px 24px"
            backgroundColor="gray.50"
            borderRadius="8px"
            _hover={{ cursor: 'pointer' }}
            width="100%"
            minHeight="56px"
          >
            <Text color="gray.600" fontSize="14px">
              {studentProfile.bio}
            </Text>
          </Box>
        </Flex>
      )}
      <Flex flexDirection="column" gap="16px">
        <Text fontSize="20px" fontWeight="semibold">
          정보
        </Text>
        {/* 깃허브 */}
        <Flex flexDirection="column" gap="12px">
          {studentProfile.githubId && (
            <Box
              onClick={() => handleGoGithub(studentProfile.githubId)}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="0px 24px"
              backgroundColor="gray.50"
              borderRadius="8px"
              _hover={{ cursor: 'pointer' }}
              width="100%"
              height="56px"
            >
              <Text fontSize="14px" fontWeight="semibold">
                👀 선배의 깃허브는 어떻게 되어 있을까요?
              </Text>
              <Flex alignItems="center">
                <Text fontSize="12px" color="gray.700">
                  깃허브 바로가기
                </Text>
                <ChevronRightIcon color="gray.700" />
              </Flex>
            </Box>
          )}
          {/* 이메일 */}
          {studentProfile.email && (
            <Box
              onClick={() => handleGoEmail(studentProfile.email)}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding="0px 24px"
              backgroundColor="gray.50"
              borderRadius="8px"
              _hover={{ cursor: 'pointer' }}
              width="100%"
              height="56px"
            >
              <Text fontSize="14px" fontWeight="semibold">
                📨 커피챗, 코드리뷰, 조언 요청하러가기
              </Text>
              <Flex alignItems="center">
                <Text fontSize="12px" color="gray.700">
                  이메일 바로가기
                </Text>
                <ChevronRightIcon color="gray.700" />
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StudentProfileDetailContents;
