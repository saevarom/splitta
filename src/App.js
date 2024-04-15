import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
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
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { participants1, transactions1 } from './fixtures/test'
import Splitt, { precisionRound } from './splitt'
import {
  FcConferenceCall,
  FcMoneyTransfer,
  FcTodoList,
  FcSettings,
  FcPlus,
  FcCancel,
  FcDoughnutChart,
  FcFullTrash,
} from "react-icons/fc";
import './app.css';

import { formatMoney } from './utils'

window.splitt = null

function App() {

  const [participants, _setParticipants] = useState(JSON.parse(localStorage.getItem('participants')) || [])
  const [transactions, _setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || [])

  const [editingParticipants, setEditingParticipants] = useState(false)
  const [editingTransactions, setEditingTransactions] = useState(false)

  const [modalProps, setModalProps] = useState({})

  const [value, setValue] = React.useState('')
  const handleChange = (event) => setValue(event.target.value)

  const { isOpen, onOpen, onClose } = useDisclosure()

  let splitt = new Splitt(participants, transactions);
  window.splitt = splitt
  useEffect(() => {
    splitt = new Splitt(participants, transactions);
    window.splitt = splitt
  }, [participants, transactions])

  const participantName = useRef('')
  const transactionTitle = useRef('')
  const transactionAmount = useRef('')

  const setParticipants = (participants) => {
    localStorage.setItem('participants', JSON.stringify(participants))
    _setParticipants(participants)
  }
  const setTransactions = (transactions) => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
    _setTransactions(transactions)
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
    const newList = participants.filter(p => p.id !== id)
    setParticipants(newList)
  }
  const addTransaction = (title, amount) => {
    setEditingTransactions(false)
    let id = 1
    if (transactions.length > 0) {
      id = Math.max(...transactions.map(p => p.id)) + 1
    }
    setTransactions([...transactions, { paidBy: participants[0].id, title, amount, participants: participants.map(p => p.id), id: id }])
  }

  const removeTransaction = (id) => {
    const newList = transactions.filter(p => p.id !== id)
    setTransactions(newList)
  }

  const doClearAll = () => {
    setParticipants([])
    setTransactions([])
  }

  const handleClearAll = () => {
    window.confirm(
      'Ertu viss um að þú viljir hreinsa allt?',
    ) && doClearAll()
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
            <Stack spacing={4}>
              <form id="new-transaction"
                onSubmit={(e) => {
                  e.preventDefault()
                  addTransaction(transactionTitle.current.value, transactionAmount.current.value)
                  onClose()
                }} >
                <FormControl>
                  <Text>Skýring</Text>
                  <Input ref={transactionTitle} placeholder="Skýring" />
                  <Text>Upphæð</Text>
                  <Input ref={transactionAmount} placeholder="Upphæð" />
                </FormControl>
              </form>
            </Stack>

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
    <Box>
      <Box p={4} id="content">

        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <HStack>

            <Icon as={FcDoughnutChart} w={20} h={20} />
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Splitta

            </Heading>
            <Text color={'orange.400'}>
              Skiptu kostnaði á einfaldan hátt
            </Text>
          </HStack>
        </Stack>
        <Container maxW={'6xl'} mt={10}>
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
              <Text color={'gray.600'}>
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
                      <li>{transaction.title} ({formatMoney(transaction.amount)})</li>
                    ))}
                  </ul>
                }
                <Icon as={FcPlus} w={5} h={5} onClick={() => newTransactionModal()} />
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
        </Container>
      </Box>

      <Box
        id="footer"
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Icon as={FcDoughnutChart} w={20} h={20} />
          <Text>© 2024 Splitta.is</Text>
          <Stack direction={'row'} spacing={6}>
            <Text><Icon as={FcFullTrash} w={10} h={10} onClick={handleClearAll}/></Text>>
          </Stack>
        </Container>
      </Box>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalProps.title}</ModalHeader>
          <ModalCloseButton />
          {modalProps.modalContent}
        </ModalContent>
      </Modal>

    </Box>
  );
}

export default App;

