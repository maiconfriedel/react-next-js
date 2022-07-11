import Head from "next/head";
import { GetServerSideProps } from "next";
import { signIn, getSession } from "next-auth/react";
import {
  Button,
  Heading,
  Flex,
  Input,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Icon,
  Switch,
  Box,
  useColorMode,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { FaGithub, FaSun, FaGoogle } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function Home() {
  const formBackground = useColorModeValue("white", "gray.700");
  const buttonTextColor = useColorModeValue("white", "black");
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { query } = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (query["error"]) {
      toast({
        title: "Failed to login",
        description: query["error"],
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
        variant: "left-accent",
      });
    }
  }, [query, toast]);

  function onSubmit(data: any) {
    signIn("credentials", data);
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Head>
        <title>Login</title>
      </Head>
      <Box top={0} right={0} position="absolute" m={0} p={0}>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={5}
        >
          <Icon as={FaSun} mr={2} h={5} w={5} color="yellow.400" />
          <Switch
            colorScheme="whiteAlpha"
            mr={2}
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
          <Icon as={MdDarkMode} mr={[1, 2, 3]} h={5} w={5} />
        </Flex>
      </Box>
      <form>
        <Flex
          direction="column"
          background={formBackground}
          rounded={6}
          py={12}
          px={20}
          alignItems="center"
          justifyContent="center"
        >
          <Heading mb={5}>Login</Heading>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="E-mail"
              type="email"
              w={[48, 60, 72]}
              variant="flushed"
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i,
              })}
            />
            <FormErrorMessage>Must be a valid email</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <Input
              placeholder="Password"
              type="password"
              w={[48, 60, 72]}
              mt={8}
              variant="flushed"
              {...register("password", { required: true })}
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>
          <Button
            mt={8}
            mb={10}
            colorScheme="teal"
            w={[48, 60, 72]}
            color={buttonTextColor}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>

          <Button
            mt={3}
            colorScheme="blackAlpha"
            w={[48, 60, 72]}
            color="white"
            onClick={() => signIn("github")}
          >
            <Icon as={FaGithub} mr={2} mt="0.5" w={5} h={5} /> Login with Github
          </Button>
          <Button
            mt={3}
            colorScheme="yellow"
            w={[48, 60, 72]}
            onClick={() => signIn("google")}
          >
            <Icon as={FaGoogle} mr={2} mt="0.5" w={5} h={5} /> Login with Google
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
