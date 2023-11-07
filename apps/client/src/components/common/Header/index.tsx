import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogin = () => {
    window.open(process.env.NEXT_PUBLIC_AUTH_URL);
  };

  return (
    <Box borderBottom="1px solid" borderColor="gray.100" width="100%" height="54px">
      <Box
        margin="0 auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="80%"
        height="100%"
      >
        <Text
          onClick={() => router.push('/')}
          fontSize="18px"
          fontWeight="semibold"
          _hover={{ cursor: 'pointer' }}
        >
          로고
        </Text>
        <Button onClick={handleLogin} size="sm" variant="ghost">
          로그인
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
