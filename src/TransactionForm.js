import React, { useState, useRef, useEffect } from 'react'
import {
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    Input,
    Select,
    Stack,
    Text,
} from '@chakra-ui/react'

const TransactionForm = ({ participants, addTransaction, onClose }) => {

    const [activeValues, setActiveValues] = useState(participants.map(p => p.id) || [])
    
    const [touched, setTouched] = useState(false)
    const [paidBy, setPaidBy] = useState(null)
    const [amountValue, setAmountValue] = useState(null)
    const [titleValue, setTitleValue] = useState(null)
    const paidByError = paidBy === null || paidBy === undefined || (+paidBy) === 0
    const amountError = touched && (parseInt(amountValue) === 0 || amountValue === '' || isNaN(parseInt(amountValue)))
    const activeValuesError = activeValues.length === 0
    const isError = paidByError || amountError || activeValuesError

    const handleSelect = (e) => {
        setPaidBy(e.target.value)
    }

    return (
        <Stack spacing={4}>
            <form id="new-transaction"
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!isError) {
                        addTransaction(titleValue, amountValue, activeValues, paidBy)
                        onClose()
                    }
                }} >
                <FormControl isRequired mb={3}>
                    <Text>Skýring</Text>
                    <Input placeholder="Skýring" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}/>
                </FormControl>
                <FormControl isRequired isInvalid={amountError} mb={3}>
                    <Text>Upphæð</Text>
                    <Input placeholder="Upphæð" value={amountValue} onChange={(e) => {setTouched(true);setAmountValue(e.target.value)}} />
                    {amountError && <FormErrorMessage>Upphæð er ógild</FormErrorMessage>}
                </FormControl>
                {participants.length > 0 &&
                    <>
                        <FormControl isInvalid={activeValuesError} mb={3}>
                            <Text>Hverjir tóku þátt í þessum kostnaðarlið?</Text>
                            <CheckboxGroup colorScheme='green' value={activeValues} onChange={(e) => setActiveValues(e.map(p => parseInt(p)))}>
                                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                    {participants.map(participant =>
                                        <Checkbox isChecked={activeValues.includes(participant.id)} value={participant.id}>
                                            {participant.name}
                                        </Checkbox>
                                    )}
                                </Stack>
                            </CheckboxGroup>
                            {activeValuesError && <FormErrorMessage>Veldu a.m.k. einn þátttakanda.</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={paidByError}>
                            <Select placeholder="Hver greiddi?" onChange={handleSelect}>
                                {participants.map(participant =>
                                    <option value={participant.id}>{participant.name}</option>
                                )}
                            </Select>
                            {paidByError && <FormErrorMessage>Veldu greiðanda</FormErrorMessage>}
                        </FormControl>
                    </>
                }
            </form>
        </Stack>
    )
}

export default TransactionForm