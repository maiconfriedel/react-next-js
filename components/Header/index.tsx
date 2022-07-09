import {
  Box,
  Flex,
  Heading,
  Icon,
  Switch,
  Text,
  useColorMode,
  useBreakpoint,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { FaSun, FaSignOutAlt } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const breakpoint = useBreakpoint();

  return (
    <Flex
      background="teal.400"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      height="50px"
      padding={2}
      color="white"
    >
      <Heading size="lg">{title}</Heading>
      <Flex direction="row" alignItems="center" justifyContent="center">
        <Icon as={FaSun} mr={2} h={5} w={5} color="yellow.400" />
        <Switch
          colorScheme="blackAlpha"
          mr={2}
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        />
        <Icon as={MdDarkMode} mr={[1, 2, 3]} h={5} w={5} />
        <Flex
          flexDirection="row"
          cursor="pointer"
          _hover={{ color: "gray.200" }}
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          <Icon as={FaSignOutAlt} height={6} width={6} />
          <Text ml={1} fontWeight="bold">
            {breakpoint !== "base" ? "Sign out" : ""}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
