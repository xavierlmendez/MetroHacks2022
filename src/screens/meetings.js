import React from "react";
import { View } from "react-native";
import {
  NativeBaseProvider, Text, Box,
  Heading, VStack, FormControl,
  HStack, Center, StatusBar,
  IconButton, Icon, Input,
  Pressable, Badge, Spacer, Flex, ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function App({navigation}) {
  // 2. Use at the root of your app
  return (
    <NativeBaseProvider>
      <ScrollView backgroundColor="#86efac">
        <Center>
          <VStack space={3}>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>

            <HStack space={14}>
            <IconButton icon={<Icon size="sm" as={MaterialIcons} name="chevron-left" color="white" />} onPress={() => navigation.goBack()}/>
            <IconButton icon={<Icon size="sm" as={MaterialIcons} name="add" color="black" />} onPress={() => navigation.navigate("chart")}/>
              <Heading bold color="#312e81">
                  Frank N. Stein 👨‍⚕️
              </Heading>
            </HStack>
            <CardList navigation={navigation}/>
            <CardList navigation={navigation}/>
            <CardList navigation={navigation}/>
            <CardList navigation={navigation}/>
            <CardList navigation={navigation}/>
            <CardList navigation={navigation}/>
            <CardList navigation={navigation}/>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}


function TopNav({ navigation }) {
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack bg="blue.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="400">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="chevron-left" color="white" />} onPress={() => navigation.goBack()}/>
          <Text color="white" fontSize="20" fontWeight="bold">
            Meeting Room
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
        </HStack>
      </HStack>
    </>;
}

function CardList({navigation}) {
  return <Box alignItems="center">
      <Text>
      </Text>
      <Pressable onPress={() => navigation.navigate("DoctorMeetingNotes")} rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" backgroundColor="#dcfce7">
        <Box>
          <HStack alignItems="center">
            <Badge backgroundColor="#15803d" _text={{
            color: "white"
          }} variant="solid" rounded="4">
              Nov 18, 2022
            </Badge>
            <Spacer />
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            Meeting
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            Meeting with Doctor Frank about my Liver Health & Diet
          </Text>

          <Flex>
            <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
              Read More
            </Text>
          </Flex>
        </Box>
      </Pressable>
    </Box>;
}