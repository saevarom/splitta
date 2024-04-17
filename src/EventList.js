import React from 'react'
import {
    Container,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react'
import { FcCancel } from "react-icons/fc";


const EventList = ({ events, selectEvent, deleteEvent }) => {

    return (
        <Container maxW={'6xl'} mt={10}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Stack>
                    <Heading>Viðburðir</Heading>

                    {events.length === 0 ?
                        <Text>Engir viðburðir skráðir</Text>
                        :
                        <Stack>
                            {events.map((event) =>
                                <>
                                    <Text onClick={() => selectEvent(event)}>{event.title}</Text>
                                    <Icon as={FcCancel} w={3} h={3} onClick={() => window.confirm('Ertu viss um að þú viljir eyða?', deleteEvent(event))} />
                                </>
                            )}
                        </Stack>
                    }
                </Stack>
            </SimpleGrid>
        </Container>
    )
}
export default EventList;