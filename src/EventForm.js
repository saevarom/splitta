import React, { useRef } from 'react'
import {
    FormControl,
    Input,
    Stack,
} from '@chakra-ui/react'


const EventForm = ({ addEvent, onClose }) => {

    const eventTitle = useRef('')

    return (
        <Stack spacing={4}>
            <form id="new-event"
                onSubmit={(e) => {
                    e.preventDefault()
                    addEvent(eventTitle.current.value)
                    onClose()
                }} >
                <FormControl>
                    <Input ref={eventTitle} placeholder="Titill" />
                </FormControl>
            </form>
        </Stack>
    )
}

export default EventForm