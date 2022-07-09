import {
  Button,
  Heading,
  Flex,
  Input,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
export default function Home() {
  const formBackground = useColorModeValue("gray.100", "gray.700");

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
              w="72"
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
              w="72"
              mt={8}
              variant="flushed"
              {...register("password", { required: true })}
            />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>
          <Button
            mt={8}
            colorScheme="purple"
            w="72"
            color="white"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
          <Button mt={3} colorScheme="blackAlpha" w="72" color="white">
            <Icon as={FaGithub} mr={2} mt="0.5" w={5} h={5} /> Login with Github
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
