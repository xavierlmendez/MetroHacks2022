import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import {
    NativeBaseProvider, Text, Box,
    Heading, VStack, FormControl,
    HStack, Center,
    IconButton, Icon, Input,
    Pressable, Badge, Spacer, Flex,
    useToast, Checkbox, Avatar, AspectRatio, Stack, Image, extendTheme, Divider
} from "native-base";
import { ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Feather, Entypo } from "@expo/vector-icons";


const TodoList = () => {
    const instState = [{
        title: "Code",
        isCompleted: true
    }, {
        title: "Talk about medicine",
        isCompleted: false
    }, {
        title: "Talk about new problem regarding spine",
        isCompleted: false
    }, {
        title: "Discuss new b",
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
                        Agenda
                    </Heading>
                    <VStack space={4}>
                        <HStack space={2}>
                            <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add item to the agenda" />
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
        <Pressable onPress={() => console.log("")} rounded="20" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" backgroundColor="#e5e5e5">
            <Box> <TodoList /> </Box>
        </Pressable>
    </Box>;
}


export default function ({ navigation }) {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <NativeBaseProvider>
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
        </NativeBaseProvider>
      );
    });
  }

  return (
    <NativeBaseProvider>
    <View style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "top",
          paddingTop: 50,
        }} backgroundColor="#fda4af">
        <VStack space={5}>
        <IconButton icon={<Icon size="xl" as={MaterialIcons} name="chevron-left" color="black" />} onPress={() => navigation.goBack()}/>
        <CardList navigation={navigation}/>
        <ToDo_Card />
        <Text>{message}</Text>
        <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
        {getRecordingLines()}
      <StatusBar style="auto" />
      </VStack>
    </View>
    </NativeBaseProvider>
  );
}

function CardList({navigation}) {
    return <Box alignItems="center">
        <Text>
        </Text>
        <Pressable onPress={() => navigation.navigate("DoctorMeetingNotes")} rounded="20" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5" backgroundColor="#e5e5e5">
          <Box>
            <HStack alignItems="center">
              <Spacer />
            </HStack>
            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
              Meeting Information
            </Text>
            <Text mt="2" fontSize="sm" color="coolGray.700">
              Meeting with Doctor Frank about my Liver Health & Diet.

              Meeting with Doctor Frank about my Liver Health & Diet.
            </Text>
            <Flex>
            </Flex>
          </Box>
        </Pressable>
      </Box>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efdfbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 24
  },
  button: {
    margin: 24
  }
});
