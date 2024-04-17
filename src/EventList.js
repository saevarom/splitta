import React from 'react'
import {
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react'


const EventList = ({ events, selectEvent }) => {

    return (
        <Container maxW={'6xl'} mt={10}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Stack>
                    <Heading>Viðburðir</Heading>
                    <Stack>
                        {events.map((event) =>
                            <Text onClick={() => selectEvent(event)}>{event.title}</Text>
                        )}
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    )
}
export default EventList;