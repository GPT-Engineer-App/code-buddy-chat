import React, { useState } from "react";
import { Box, Container, VStack, Heading, Textarea, Button, Divider, Text, useToast } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

const Index = () => {
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const toast = useToast();

  const sendMessage = () => {
    if (message.trim() === "") {
      toast({
        title: "Empty message",
        description: "You can't send an empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    // Simulate sending message and getting a response from the AI
    setConversations([...conversations, { sender: "user", content: message }, { sender: "ai", content: `AI Response to: "${message}"` }]);
    setMessage("");
  };

  return (
    <Container maxW="100%" height="100vh" py={5}>
      <VStack spacing={5} minH="calc(100vh - 40px)">
        <Heading as="h1" size="2xl" textAlign="center">
          <FaRobot /> Code Buddy
        </Heading>

        <Divider />

        <VStack spacing={4} w="full" h="500px" p={4} overflowY="auto" bg="gray.100" borderRadius="md" border="1px" borderColor="gray.200">
          {conversations.map((conv, index) => (
            <Box key={index} alignSelf={conv.sender === "ai" ? "flex-start" : "flex-end"} bg={conv.sender === "ai" ? "blue.100" : "green.100"} borderRadius="md" p={3}>
              <Text fontSize="sm">{conv.content}</Text>
            </Box>
          ))}
        </VStack>

        <Textarea placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} mb={4} />

        <Button colorScheme="blue" rightIcon={<FaRobot />} onClick={sendMessage} _active={{ boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.2)" }}>
          Send
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
