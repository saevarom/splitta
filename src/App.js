import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  FcPlus,
  FcQuestions,
  FcDoughnutChart,
} from "react-icons/fc";

import EventForm from './EventForm'
import Event from './Event';
import EventList from './EventList';
import { participants3, transactions3 } from './fixtures/test';
import { useTour } from '@reactour/tour'

import './app.css';

const createEvent = (title, participants = [], transactions = []) => {
  return {
    uuid: crypto.randomUUID(),
    title,
    participants,
    transactions
  }
}

const App = () => {

  const [events, _setEvents] = useState(JSON.parse(localStorage.getItem('events')) || [])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [modalProps, setModalProps] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen: isTourOpen, currentStep, steps, setIsOpen, setCurrentStep, setSteps } = useTour()
  const [dirty, setDirty] = useState(Math.random())

  useEffect(() => {
    console.log('currentStep', currentStep)
    if (currentStep === 0 && events.length > 0 && isTourOpen) {
      setCurrentStep(1)
    }
    if (currentStep === 1 && selectedEvent && isTourOpen) {
      setCurrentStep(2)
    }
    if (currentStep === 2 && selectedEvent === null && isTourOpen) {
      setSelectedEvent(events[0])
    }
    if (isTourOpen && currentStep === 7 && selectedEvent && selectedEvent.transactions.length === 0 && selectedEvent.participants.length === 0) {
      console.log("jamm jamm")
      let newEvent = Object.assign({}, selectedEvent)
      newEvent.participants = participants3
      newEvent.transactions = transactions3
      setSelectedEvent(newEvent)
      saveEvent(newEvent)
      setDirty(Math.random())
    }
  }, [currentStep, events, selectedEvent, isTourOpen])

  const setEvents = (events) => {
    localStorage.setItem('events', JSON.stringify(events))
    _setEvents(events)
  }

  const selectEvent = (event) => {
    setSelectedEvent(event)
  }

  const unselectEvent = () => {
    setSelectedEvent(null)
  }

  const saveEvent = (event) => {
    events[events.indexOf(events.find(e => e.uuid === event.uuid))] = event
    setEvents(events)
  }

  const deleteEvent = (event) => {
    setEvents(events.filter(e => e.uuid !== event.uuid))
  }

  const addEvent = (event) => {
    setEvents([event, ...events])
  }

  const onAddEvent = (title) => {
    addEvent(createEvent(title))
  }

  const newEventModal = () => {

    setModalProps({
      title: 'Nýr viðburður',
      modalContent: (
        <>
          <ModalBody>
            <EventForm addEvent={onAddEvent} onClose={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" form="new-event" colorScheme='blue' mr={3} >
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

        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={10}>
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

        <Stack spacing={4} as={Container} maxW={'3xl'}>
          {selectedEvent ?
            <Event key={dirty} currentEvent={selectedEvent} saveEvent={saveEvent} unselectEvent={unselectEvent}/>
            :
            <EventList events={events} selectEvent={selectEvent} deleteEvent={deleteEvent} newEventModal={newEventModal} />
          }
        </Stack>

        {/* <Container maxW={'6xl'} mt={10}>
          <SimpleGrid columns="1" spacing={10}>

            <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
              <Stack direction="row" alignItems="center">
                <Text fontWeight="semibold">Hvernig virkar þetta?</Text>
                <FcQuestions />
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                  Stofnaðu nýjan viðburð með því að smella á hnappinn hér að ofan (Nýr viðburður). <br />
                  Bættu þátttakendum við og skráðu kostnaðarliði. Þegar þú ert búinn að skrá allt getur þú séð hvernig á að skipta kostnaðinum á milli þátttakenda í dálknum lengst til hægri.<br />
                  Smelltu á hnappinn hér til hægri til að hlaða inn litlu dæmi. Þú getur alltaf notað ruslatunnuna í fætinum til að hreinsa allt og byrja upp á nýtt. <br />
                  Það er óhætt að loka eða endurhlaða síðunni, gögnin eru vistuð í vafranum þínum.
                </Text>
                <Stack direction="column">
                  <Button colorScheme="green" onClick={() => {
                    let newEvent = createEvent(
                      'Dæmi',
                      participants3,
                      transactions3
                    )
                    addEvent(newEvent)
                    selectEvent(newEvent)
                  }}>
                  Dæmi
                  </Button>
                  <Button colorScheme="blue" onClick={() => setIsOpen(true)}>Skoðunarferð</Button>
                  <Button colorScheme="red" onClick={handleClearAll}>Hreinsa</Button>
                </Stack>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container> */}

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
          <Button className="example-button" colorScheme="green" onClick={() => {
                    let newEvent = createEvent(
                      'Dæmi',
                      participants3,
                      transactions3
                    )
                    addEvent(newEvent)
                    selectEvent(newEvent)
                  }}>
                  Dæmi
                  </Button>
            <Button colorScheme="blue" variant="outline" onClick={() => setIsOpen(true)}><FcQuestions /> &nbsp;Hvernig virkar?</Button>
            <span onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </span>
            <Text>
              {/* <Icon as={FcFullTrash} w={10} h={10} onClick={handleClearAll} /> */}
            </Text>
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

    </Box >
  );
}

export default App;

