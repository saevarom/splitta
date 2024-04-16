import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Container,
    Flex,
    FormControl,
    Heading,
    HStack,
    Icon,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    SimpleGrid,
    Stack,
    Text,
    useCheckboxGroup,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'


const TransactionForm = ({ participants, addTransaction, onClose }) => {

    const [activeValues, setActiveValues] = useState(participants.map(p => p.id) || [])
    const transactionTitle = useRef('')
    const transactionAmount = useRef('')

    const [paidBy, setPaidBy] = useState(null)

    const handleSelect = (e) => {
        setPaidBy(e.target.value)
    }

    return (
        <Stack spacing={4}>
            <form id="new-transaction"
                onSubmit={(e) => {
                    e.preventDefault()
                    addTransaction(transactionTitle.current.value, transactionAmount.current.value, activeValues, paidBy)
                    onClose()
                }} >
                <FormControl>
                    <Text>Skýring</Text>
                    <Input ref={transactionTitle} placeholder="Skýring" />
                    <Text>Upphæð</Text>
                    <Input ref={transactionAmount} placeholder="Upphæð" />
                    <Text>Hverjir tóku þátt í þessum kostnaðarlið?</Text>
                    {participants.length > 0 &&
                        <>
                            <CheckboxGroup colorScheme='green' value={activeValues} onChange={setActiveValues}>
                                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                    {participants.map(participant =>
                                        <Checkbox isChecked={activeValues.includes(participant.id)} value={participant.id}>
                                            {participant.name}
                                        </Checkbox>
                                    )}
                                </Stack>
                            </CheckboxGroup>
                            <Select placeholder="Hver greiddi?" onChange={handleSelect}>
                                {participants.map(participant =>
                                    <option value={participant.id}>{participant.name}</option>
                                )}
                            </Select>
                        </>
                    }
                </FormControl>
            </form>
        </Stack>
    )
}

export default TransactionForm