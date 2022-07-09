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
} from "@chakra-ui/react";
import { FaGithub, FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

import { useForm } from "react-hook-form";
export default function Home() {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const { colorMode, toggleColorMode } = useColorMode();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
    reset();
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box top={0} right={0} position="absolute" m={0} p={0}>
        <Flex direction="row" alignItems="center" justifyContent="center">
          <Icon as={FaSun} mt={5} mr={2} h={5} w={5} color="yellow.400" />
          <Switch
            colorScheme="whiteAlpha"
            mt={5}
            mr={2}
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
          <Icon as={MdDarkMode} mt={5} mr={5} h={5} w={5} />
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
          <Heading mb={10}>Login</Heading>
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="E-mail"
              type="email"
              w={[40, 60, 72]}
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
              w={[40, 60, 72]}
              mt={8}
              variant="flushed"
              {...register("password", { required: true })}
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>
          <Button
            mt={8}
            colorScheme="purple"
            w={[40, 60, 72]}
            color="white"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
          <Button
            mt={3}
            colorScheme="blackAlpha"
            w={[40, 60, 72]}
            color="white"
          >
            <Icon as={FaGithub} mr={2} mt="0.5" w={5} h={5} /> Login with Github
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
