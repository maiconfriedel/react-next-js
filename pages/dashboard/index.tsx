import Head from "next/head";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import Header from "../../components/Header";

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
        alignItems="center"
        justifyContent="flex-start"
        height="calc(100vh - 50px)"
        flexDirection="column"
      >
        <Heading mt={2}>Dashboard</Heading>
        <Text>{data?.user?.name}</Text>
      </Flex>
    </Flex>
  );
}
