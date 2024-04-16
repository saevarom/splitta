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
  useCheckboxGroup,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { participants2, transactions2 } from './fixtures/test'
import { participants3, transactions3 } from './fixtures/test'
import Splitt, { precisionRound } from './splitt'
import {
  FcConferenceCall,
  FcMoneyTransfer,
  FcTodoList,
  FcSettings,
  FcPlus,
  FcLock,
  FcCancel,
  FcDoughnutChart,
  FcFullTrash,
} from "react-icons/fc";
import './app.css';
import TransactionForm from './TransactionForm'

import { formatMoney } from './utils'

window.splitt = null


function App() {

  const [participants, _setParticipants] = useState(JSON.parse(localStorage.getItem('participants')) || [])
  const [transactions, _setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || [])

  const { colorMode, toggleColorMode } = useColorMode()

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
              <Text color='gray.600'>Samtals {formatMoney(splitt.total, 0)} kr.</Text>
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
        </Container>

        <Container maxW={'6xl'} mt={10}>
          <SimpleGrid columns="1" spacing={10}>

            <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
              <Stack direction="row" alignItems="center">
                <Text fontWeight="semibold">Hvernig virkar þetta?</Text>
                <FcLock />
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  Bættu þátttakendum við og skráðu kostnaðarliði. Þegar þú ert búinn að skrá allt getur þú séð hvernig á að skipta kostnaðinum á milli þátttakenda í dálknum lengst til hægri.<br />
                  Smelltu á hnappinn hér til hægri til að hlaða inn litlu dæmi. Þú getur alltaf notað ruslatunnuna í fætinum til að hreinsa allt og byrja upp á nýtt. <br />
                  Það er óhætt að loka eða endurhlaða síðunni, gögnin eru vistuð í vafranum þínum.
                </Text>
                <Stack direction="column">
                  <Button colorScheme="green" onClick={() => {
                    setParticipants(participants3)
                    setTransactions(transactions3)
                  }}>
                    Dæmi
                  </Button>
                  <Button colorScheme="red" onClick={handleClearAll}>Hreinsa</Button>
                </Stack>
              </Stack>
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
            <span onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </span>
            <Text>
              <Icon as={FcFullTrash} w={10} h={10} onClick={handleClearAll} />
            </Text>>
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

