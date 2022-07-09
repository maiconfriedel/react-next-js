import Head from "next/head";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();

  return (
    <Flex flexDirection="column">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header title="Dashboard" />
      <Flex
        width="100%"
        alignItems="flex-start"
        justifyContent="center"
        height="calc(100vh - 50px)"
      >
        <Heading mt={2}>Dashboard</Heading>
        <Text>{JSON.stringify(data)}</Text>
      </Flex>
    </Flex>
  );
}
