import React from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react'
import { FcCancel, FcPlus } from "react-icons/fc";


const EventList = ({ events, selectEvent, deleteEvent, newEventModal }) => {

    return (
        <>
            <SimpleGrid columns="1" spacing={10}>
                <Flex>
                    <Heading>
                        Viðburðir
                    </Heading>
                    <Spacer />
                    <Stack>
                        <Button onClick={() => newEventModal()} className="first-step">
                            <Icon as={FcPlus} w={5} h={5} /> &nbsp;Nýr viðburður
                        </Button>
                    </Stack>
                </Flex>
            </SimpleGrid>


            <SimpleGrid columns="1" spacing={10} bg='gray.100' className="main-content" minH={20}>
                <Stack>
                    {events.length === 0 ?
                        <Flex justify="center" mt={7}>
                            <Text>Engir viðburðir skráðir</Text>
                        </Flex>
                        :
                        < >
                            {events.map((event) =>
                                <Flex >
                                    <Box flex='1' p={4} onClick={() => selectEvent(event)} className="event-list-item">
                                        <Heading >{event.title}</Heading>
                                    </Box>
                                    <Box p={4}>
                                        <Button colorScheme="red" variant="outline" onClick={() => window.confirm('Ertu viss um að þú viljir eyða?') && deleteEvent(event)}>
                                            <Icon as={FcCancel} w={3} h={3} />
                                        </Button>
                                    </Box>
                                </Flex>
                            )}
                        </>
                    }
                </Stack>
            </SimpleGrid>
        </>
    )
}
export default EventList;