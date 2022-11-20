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
    useToast, Checkbox, Avatar, AspectRatio, Stack, Image, extendTheme, Divider
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, UserProfile, email } from "firebase/auth";

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

    return(
            <Center w="100%" aria-label="Close">
                <Box maxW="300" w="100%">
                    <Heading mb="2" size="md">
                        Todo
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
            </Center>
    )
};

// The Card Trap the Todo List
function ToDo_Card() {
    return <Box alignItems="center" shadow="5" >
        <Pressable onPress={() => console.log("")} rounded="20" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" backgroundColor="white">
            <Box> <TodoList /> </Box>
        </Pressable>
    </Box>;
}


const Doctor = ["Doctor Frank", "Doctor John"]
const DoctorDescription = ["Frank N. Stein, the Liver specialist", "John A. Coleson, the family doctor"]

function Doctor_CardList({ navigation, doctor, doctorDescription }) {
    return <Box alignItems="center" shadow="5">
        <Text>
        </Text>
        <Pressable onPress={() => navigation.navigate("Meetings")} rounded="30" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" backgroundColor="white">
            <Box >
                <HStack alignItems="center">
                    <Badge backgroundColor="#4338ca" _text={{
                        color: "white"
                    }} variant="solid" rounded="30">
                        {doctor}
                    </Badge>
                    <Spacer />

                </HStack>
                <Text color="#262626" mt="3" fontWeight="medium" fontSize="xl">
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

const theme = extendTheme({
    colors: {
        primary: {
            50: "#e0e7ff",
        },
        amber: {
            400: "#e0e7ff",
        },
    },
    config: {
        initialColorMode: 'light',
    },
});

export default function App({ navigation }) {
    // 2. Use at the root of your app
    return (
        <NativeBaseProvider>
            <ScrollView backgroundColor="#fda4af">
                <Center>
                    <VStack space={3}>
                    <VStack space={115}>
                        <Box>
                        </Box>
                        <Box></Box>
                    </VStack>
                    <VStack space={3}>
                        <HStack space={170}>
                            <Heading bold color="#262626">
                                Hello, Xavi 👋
                            </Heading>
                            <IconButton icon={<Icon as={Entypo} name="emoji-happy" />}
                            boarderRadius="full" _icon={{
                                color: 'coolGray.50',
                                size: 'md'
                            }} onPress={() => navigation.navigate("Home")}/>
                        </HStack>
                        <Divider bg="indigo.500" thickness="2"/>
                    </VStack>
                        <ToDo_Card />
                        <Doctor_CardList navigation={navigation} doctor={Doctor[0]} doctorDescription={DoctorDescription[0]}  />
                        <Doctor_CardList navigation={navigation} doctor={Doctor[1]} doctorDescription={DoctorDescription[1]} />
                    </VStack>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}




