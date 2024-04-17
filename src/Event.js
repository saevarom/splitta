import React, { useState, useRef, useEffect } from 'react'
import {
    Button,
    Container,
    Flex,
    FormControl,
    Heading,
    Icon,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SimpleGrid,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import Splitt, { precisionRound } from './splitt'
import {
    FcConferenceCall,
    FcMoneyTransfer,
    FcTodoList,
    FcSettings,
    FcPlus,
    FcCancel,
} from "react-icons/fc";
import './app.css';
import TransactionForm from './TransactionForm'

import { formatMoney } from './utils'


const Event = ({ currentEvent, saveEvent }) => {

    const [participants, _setParticipants] = useState(currentEvent.participants || [])
    const [transactions, _setTransactions] = useState(currentEvent.transactions || [])
    const [editingParticipants, setEditingParticipants] = useState(false)
    const [editingTransactions, setEditingTransactions] = useState(false)
    const [modalProps, setModalProps] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const participantName = useRef('')

    let splitt = new Splitt(participants, transactions);
    useEffect(() => {
        splitt = new Splitt(participants, transactions);
    }, [participants, transactions])

    const setParticipants = (participants) => {
        _setParticipants(participants)
        currentEvent.participants = participants
        saveEvent(currentEvent)
    }
    const setTransactions = (transactions) => {
        _setTransactions(transactions)
        currentEvent.transactions = transactions
        saveEvent(currentEvent)
    }

    const addParticipant = (name) => {
        setEditingParticipants(false)
        let id = 1
        if (participants.length > 0) {
            id = Math.max(...participants.map(p => p.id)) + 1
        }

        setParticipants([...participants, { name, id: id }])
    }

    const removeParticipant = (id) => {
        const newTransactions = transactions.map((t) => {
            return { ...t, participants: t.participants.filter(p => p !== id) }
        })
        const newList = participants.filter(p => p.id !== id)

        setTransactions(newTransactions)
        setParticipants(newList)
    }
    const addTransaction = (title, amount, involvedParticipants, paidBy) => {
        setEditingTransactions(false)
        let id = 1
        if (transactions.length > 0) {
            id = Math.max(...transactions.map(p => p.id)) + 1
        }
        setTransactions([...transactions, { paidBy: +paidBy, title, amount, participants: involvedParticipants, id: id }])
    }

    const removeTransaction = (id) => {
        const newList = transactions.filter(p => p.id !== id)
        setTransactions(newList)
    }

    const doClearAll = () => {
        setParticipants([])
        setTransactions([])
    }

    const newParticipantModal = () => {

        setModalProps({
            title: 'Nýr þátttakandi',
            modalContent: (
                <>
                    <ModalBody>
                        <Stack spacing={4}>
                            <form id="new-participant"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    addParticipant(participantName.current.value)
                                    onClose()
                                }} >
                                <FormControl>
                                    <Text>Nafn</Text>
                                    <Input ref={participantName} placeholder="Nafn" />
                                </FormControl>
                            </form>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" form="new-participant" colorScheme='blue' mr={3} >
                            Bæta við
                        </Button>
                    </ModalFooter>
                </>
            )
        })
        onOpen()
    }

    const newTransactionModal = () => {
        setModalProps({
            title: 'Nýr kostnaður',
            modalContent: (
                <>
                    <ModalBody>
                        <TransactionForm participants={participants} addTransaction={addTransaction} onClose={onClose} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" form="new-transaction" colorScheme='blue' mr={3} >
                            Bæta við
                        </Button>
                    </ModalFooter>
                </>
            )
        })
        onOpen()
    }

    return (
        <Container maxW={'6xl'} mt={10}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Heading>
                    {currentEvent.title} <Text as={'span'} fontSize='sm' color='gray.600' >Samtals {formatMoney(splitt.total, 0)} kr.</Text>
                </Heading>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Stack>
                    <Flex
                        w={16}
                        h={16}
                        align={'center'}
                        justify={'center'}
                        color={'white'}
                        rounded={'full'}
                        bg={'gray.100'}
                        mb={1}>
                        <Icon as={FcConferenceCall} w={10} h={10} />
                    </Flex>
                    <Text fontWeight={600}>Þátttakendur <Icon as={FcSettings} w={3} h={3} onClick={() => setEditingParticipants(!editingParticipants)} /></Text>
                    <Text color={'gray.600'}>
                        {editingParticipants ?
                            <ul>
                                {participants.map(participant => (
                                    <li style={{ textDecoration: 'underline' }}>{participant.name} <Icon as={FcCancel} w={3} h={3} onClick={() => removeParticipant(participant.id)} /></li>
                                ))}
                            </ul>
                            :
                            <ul>
                                {participants.map(participant => (
                                    <li>{participant.name}</li>
                                ))}
                            </ul>
                        }
                        <Icon as={FcPlus} w={5} h={5} onClick={() => newParticipantModal()} />
                    </Text>
                </Stack>
                <Stack>
                    <Flex
                        w={16}
                        h={16}
                        align={'center'}
                        justify={'center'}
                        color={'white'}
                        rounded={'full'}
                        bg={'gray.100'}
                        mb={1}>
                        <Icon as={FcMoneyTransfer} w={10} h={10} />
                    </Flex>
                    <Text fontWeight={600}>Kostnaður <Icon as={FcSettings} w={3} h={3} onClick={() => setEditingTransactions(!editingTransactions)} /></Text>
                    <Text>
                        {editingTransactions ?
                            <ul>
                                {transactions.map(transaction => (
                                    <li style={{ textDecoration: 'underline' }}>
                                        {transaction.title} ({formatMoney(transaction.amount)}) <Icon as={FcCancel} w={3} h={3} onClick={() => removeTransaction(transaction.id)} />
                                    </li>
                                ))}
                            </ul>
                            :
                            <ul>
                                {transactions.map(transaction => (
                                    <Popover trigger="hover">
                                        <PopoverTrigger>
                                            <li>{transaction.title} ({formatMoney(transaction.amount)})</li>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>{transaction.title}</PopoverHeader>
                                            <PopoverBody>
                                                {participants.find(p => p.id === transaction.paidBy).name} greiddi {formatMoney(transaction.amount)} kr.
                                                <hr />
                                                {transaction.participants.map(tId => participants.find(p => p.id === tId).name).join(', ')} tóku þátt.
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                ))}
                            </ul>
                        }
                        {participants.length > 0 && <Icon as={FcPlus} w={5} h={5} onClick={() => newTransactionModal()} />}
                    </Text>
                </Stack>
                <Stack>
                    <Flex
                        w={16}
                        h={16}
                        align={'center'}
                        justify={'center'}
                        color={'white'}
                        rounded={'full'}
                        bg={'gray.100'}
                        mb={1}>
                        <Icon as={FcTodoList} w={10} h={10} />
                    </Flex>
                    <Text fontWeight={600}>Uppgjör</Text>
                    <Text color={'gray.600'}>
                        <ol>
                            {splitt.settlement.map(s => (
                                <li>{s.from.name} greiðir <strong>kr {formatMoney(precisionRound(s.amount, 0))}</strong>, viðtakandi: {s.to.name} </li>
                            ))}
                        </ol>
                    </Text>
                </Stack>
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalProps.title}</ModalHeader>
                    <ModalCloseButton />
                    {modalProps.modalContent}
                </ModalContent>
            </Modal>
        </Container>
    )
}
export default Event;