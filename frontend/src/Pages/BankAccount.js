import React, { useState } from "react";
import {
  Text,
  Box,
  Center,
  Flex,
  Square,
  Input,
  Button,
} from "@chakra-ui/react";
import { AccountState } from "../context/AccountProvider";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const BankAccount = () => {
  const { user } = AccountState();
  var acc = user.accountBalance;

  const [moneyToWithdraw, setMoneyToWithdraw] = useState();
  const [moneyToDeposit, setMoneyToDeposit] = useState();

  const [Loading, setLoading] = useState();

  const toast = useToast();
  const history = useHistory();

  const withdrawHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/user/withdrawBal",
        {
          moneyToWithdraw,
        },
        config
      );
      console.log(data);
      toast({
        title: "Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Account balance is ",
        description: acc - moneyToWithdraw,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history.push("/");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };

  const depositHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/user/depositBal",
        {
          moneyToDeposit,
        },
        config
      );
      console.log(data);
      toast({
        title: "Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Account balance is ",
        description: acc + parseInt(moneyToDeposit),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      history.push("/");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };

  return (
    <>
      <Box bg="#3b3b3b" w="100%" p={5}>
        <Center>
          <Text
            bgGradient={[
              "linear(to-tr, teal.300, yellow.400)",
              "linear(to-t, blue.200, teal.500)",
              "linear(to-b, orange.100, purple.300)",
            ]}
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Welcome to HDMC Bank
          </Text>
        </Center>
      </Box>

      <Flex color="white" justifyContent={"space-between"}>
        <Square bg="white" size="150px" width="49.5%" marginTop={"10px"}>
          <Flex
            alignItems={"center"}
            flexDirection="column"
            justifyContent={"space-between"}
          >
            <Text
              fontSize={"2xl"}
              fontStyle={"Poppins"}
              color="black"
              marginBottom={"10px"}
            >
              Withdraw
            </Text>
            <Input
              type="number"
              color="black"
              placeholder="Enter Amount"
              size="lg"
              onChange={(e) => {
                setMoneyToWithdraw(e.target.value);
              }}
            />
            <Button
              colorScheme="teal"
              size="lg"
              marginTop={"8px"}
              onClick={withdrawHandler}
            >
              Withdraw Now
            </Button>
          </Flex>
        </Square>
        <Square bg="white" size="150px" width="49.5%" marginTop={"10px"}>
          <Flex
            alignItems={"center"}
            flexDirection="column"
            justifyContent={"space-between"}
          >
            <Text
              fontSize={"2xl"}
              fontStyle={"Poppins"}
              color="black"
              marginBottom={"10px"}
            >
              Deposit
            </Text>
            <Input
              type="number"
              color="black"
              placeholder="Enter Amount"
              size="lg"
              onChange={(e) => {
                setMoneyToDeposit(e.target.value);
              }}
            />
            <Button
              colorScheme="teal"
              size="lg"
              marginTop={"8px"}
              onClick={depositHandler}
            >
              Deposit Now
            </Button>
          </Flex>
        </Square>
      </Flex>
    </>
  );
};

export default BankAccount;
