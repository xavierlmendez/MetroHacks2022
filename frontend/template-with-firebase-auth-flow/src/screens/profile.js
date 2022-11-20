import React from "react";
import { View } from "react-native";
import { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import {
    NativeBaseProvider, Text, Box,
    Heading, VStack, FormControl,
    HStack, Center, StatusBar,
    IconButton, Icon, Input,
    Pressable, Badge, Spacer, Flex, ScrollView,
    useToast, Checkbox, Avatar
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const TodoList = () => {
    const instState = [{
        title: "Code",
        isCompleted: true
    }, {
        title: "Meeting with team at 9",
        isCompleted: false
    }, {
        title: "Check Emails",
        isCompleted: false
    }, {
        title: "Write an article",
        isCompleted: false
    }];
    const [list, setList] = React.useState(instState);
    const [inputValue, setInputValue] = React.useState("");
    const toast = useToast();

    const addItem = title => {
        if (title === "") {
            toast.show({
                title: "Please Enter Text",
                status: "warning"
            });
            return;
        }

        setList(prevList => {
            return [...prevList, {
                title: title,
                isCompleted: false
            }];
        });
    };

    const handleDelete = index => {
        setList(prevList => {
            const temp = prevList.filter((_, itemI) => itemI !== index);
            return temp;
        });
    };

    const handleStatusChange = index => {
        setList(prevList => {
            const newList = [...prevList];
            newList[index].isCompleted = !newList[index].isCompleted;
            return newList;
        });
    };

    return <Center w="100%" aria-label="Close">
        <Box maxW="300" w="100%">
            <Heading mb="2" size="md">
                Sunday, 20 Nov, 2022
            </Heading>
            <VStack space={4}>
                <HStack space={2}>
                    <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task" />
                    <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
                        addItem(inputValue);
                        setInputValue("");
                    }} />
                </HStack>
                <VStack space={2}>
                    {list.map((item, itemI) => <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.title + itemI.toString()}>
                        <Checkbox isChecked={item.isCompleted} onChange={() => handleStatusChange(itemI)} value={item.title}></Checkbox>
                        <Text width="100%" flexShrink={1} textAlign="left" mx="2" strikeThrough={item.isCompleted} _light={{
                            color: item.isCompleted ? "gray.400" : "coolGray.800"
                        }} _dark={{
                            color: item.isCompleted ? "gray.400" : "coolGray.50"
                        }} onPress={() => handleStatusChange(itemI)}>
                            {item.title}
                        </Text>
                        <IconButton size="sm" colorScheme="trueGray" icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />} onPress={() => handleDelete(itemI)} />
                    </HStack>)}
                </VStack>
            </VStack>
        </Box>
    </Center>;
};



function TopNav({ navigation }) {
    return <>
        <StatusBar bg="#3700B3" barStyle="light-content" />
        <Box safeAreaTop bg="violet.600" />
        <HStack bg="blue.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="400">
            <HStack alignItems="center">
                <IconButton icon={<Icon size="sm" as={MaterialIcons} name="" color="blue.800" />} />
                <Text color="white" fontSize="20" fontWeight="bold">
                    Dashboard
                </Text>
            </HStack>
            <HStack>
                <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
                <Avatar bg="green.500" mr="1" source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} size="sm">
                    RS
                </Avatar>
            </HStack>
        </HStack>
    </>;
}

// The Card Trap the Todo List
function ToDo_Card() {
    return <Box alignItems="center">
        <Text>
        </Text>
        <Pressable onPress={() => console.log("")} rounded="40" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
            <Box> <TodoList /> </Box>
        </Pressable>
    </Box>;
}


const Doctor = ["Doctor Frank", "Doctor John"]
const DoctorDescription = ["Frank N. Stein, the Liver specialist", "John A. Coleson, the family doctor"]

function Doctor_CardList({ navigation, doctor, doctorDescription }) {
    return <Box alignItems="center">
        <Text>
        </Text>
        <Pressable onPress={() => navigation.navigate("Meetings")} rounded="40" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
            <Box>
                <HStack alignItems="center">
                    <Badge colorScheme="darkBlue" _text={{
                        color: "white"
                    }} variant="solid" rounded="4">
                        {doctor}
                    </Badge>
                    <Spacer />

                </HStack>
                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {doctorDescription}
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">

                </Text>

                <Flex>
                </Flex>
            </Box>
        </Pressable>
    </Box>;
}

export default function App({ navigation }) {
    // 2. Use at the root of your app
    return (
        <NativeBaseProvider>
            <ScrollView>
                <Center>
                    <TopNav navigation={navigation} />
                    <ToDo_Card />
                    <Doctor_CardList navigation={navigation} doctor={Doctor[0]} doctorDescription={DoctorDescription[0]} />
                    <Doctor_CardList navigation={navigation} doctor={Doctor[1]} doctorDescription={DoctorDescription[1]} />
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}




