import React from "react";
import { View } from "react-native";
import {
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Container, Text, Heading, NativeBaseProvider, Box, VStack, Center, Skeleton, TextArea, Divider, Stack, Image, HStack, AspectRatio, Popover  } from "native-base";
import { ScrollView } from 'react-native';

export default function note ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Doctor meeting notes"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
      />
    <ScrollView
        verticle
        showsVerticleScrollIndicator={true}
        contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            width: '100%',
        }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NativeBaseProvider>
        <Center flex={1} px="3">
            {/** Basic box component */}
            {/* <Box
            px="330"
            py="200"
            mb={["4","5"]}
            bg="primary.400"
            rounded="lg"
            >
                <Text fontWeight="medium" color="white" fontSize="sm">
                    Text transcribed from the audio file goes here
                </Text>
            </Box> */}
            {/** Basic box component */}

            {/** Container component */}
            {/* <Container>
                <Heading>
                A component library for the
                <Text color="emerald.500"> React Ecosystem</Text>
                </Heading>
                <Text mt="3" fontWeight="medium">
                NativeBase is a simple, modular and accessible component library that
                gives you building blocks to build you React applications.
                </Text>
            </Container> */}
            {/** Container component */}

            {/** vstack component */}
            {/* <VStack space={4} alignItems="center">
            <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
            <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
            <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
            </VStack>; */}
            {/** vstack component */}

            {/** skeleton component */}
            {/* <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.500"
                }} _light={{
                borderColor: "coolGray.200"
                }}>
                    <Skeleton h="40" />
                    <Skeleton.Text px="4" />
                    <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
            </VStack> */}
            {/** skeleton component */}

            {/** Textbox component */}
            {/* <Box alignItems="center" w="100%">
            <Stack space={2.5} w="75%" maxW="300">
                <Box>
                <Text mb="4" bold fontSize="lg">
                    Invalid TextArea
                </Text>
                <TextArea aria-label="t1" numberOfLines={4} placeholder="Invalid TextArea" isInvalid _dark={{
                placeholderTextColor: "gray.300"
                }} mb="5" />
                <Divider />
                </Box>
                <Box>
                <Text bold fontSize="lg" mb="4">
                    Disabled TextArea
                </Text>

                <TextArea aria-label="t1Disabled" placeholder="Disabled TextArea" isDisabled />
                </Box>
            </Stack>
            </Box>; */}
            {/** Textbox component */}
<VStack space={4} alignItems="center">
{/** Card component */}
        <Box alignItems="center">
            <Box maxW="800" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
            }} _web={{
            shadow: 2,
            borderWidth: 0
            }} _light={{
            backgroundColor: "gray.50"
            }}>
            <Box>
            </Box>
            <Stack p="4" space={3}>
            <Stack space={2}>
                <Heading size="md" ml="-1">
                Transcript
                </Heading>
            </Stack>
            <Text fontWeight="400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
            pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
            Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
            in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut 
            vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
            Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat 
            faucibus libero, at maximus nisl suscipit posuere. Morbi nec enim nunc. 
            Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis. 
            Cras pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum metus, 
            non dictum mauris. Nulla at tellus sagittis, viverra est a, bibendum metus.
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                </HStack>
            </HStack>
            </Stack>
        </Box>
        </Box>
{/** Card component */}

<Divider my="2" _light={{
        bg: "muted.800"
      }} _dark={{
        bg: "muted.50"
      }} />

{/** Card component */}
<Box alignItems="center">
            <Box maxW="800" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
            }} _web={{
            shadow: 2,
            borderWidth: 0
            }} _light={{
            backgroundColor: "gray.50"
            }}>
            <Box>
            </Box>
            <Stack p="4" space={3}>
            <Stack space={2}>
                <Heading size="md" ml="-1">
                Summary
                </Heading>
            </Stack>
            <Text fontWeight="400">
            Lorem - Lorem ips .............................................................................
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                </HStack>
            </HStack>
            </Stack>
        </Box>
        </Box>
{/** Card component */}

{/** Card component */}
{/* <Box alignItems="center">
            <Box maxW="800" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
            }} _web={{
            shadow: 2,
            borderWidth: 0
            }} _light={{
            backgroundColor: "gray.50"
            }}>
            <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
                <Image source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
            }} alt="image" />
            </AspectRatio>
            <Center bg="violet.500" _dark={{
            bg: "violet.400"
            }} _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
            }} position="absolute" bottom="0" px="3" py="1.5">
                PHOTOS
            </Center>
            </Box>
            <Stack p="4" space={3}>
            <Stack space={2}>
                <Heading size="md" ml="-1">
                The Garden City
                </Heading>
                <Text fontSize="xs" _light={{
                color: "violet.500"
            }} _dark={{
                color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                The Silicon Valley of India.
                </Text>
            </Stack>
            <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's high-tech
                industry. The city is also known for its parks and nightlife.
            </Text>
            <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
                }} fontWeight="400">
                    6 mins ago
                </Text>
                </HStack>
            </HStack>
            </Stack>
        </Box>
        </Box> */}
{/** Card component */}


</VStack>
        </Center>
        </NativeBaseProvider>
      </View>
      </ScrollView>
    </Layout>
  );
}
