import React, { useState, useRef } from 'react'
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
    const transactionTitle = useRef('')
    const transactionAmount = useRef('')
    const [paidBy, setPaidBy] = useState(null)
    const paidByError = paidBy === null || paidBy === undefined || (+paidBy) === 0
    const isError = paidByError

    const handleSelect = (e) => {
        setPaidBy(e.target.value)
    }

    return (
        <Stack spacing={4}>
            <form id="new-transaction"
                onSubmit={(e) => {
                    if (!isError) {
                        e.preventDefault()
                        addTransaction(transactionTitle.current.value, transactionAmount.current.value, activeValues, paidBy)
                        onClose()
                    }
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
                            {paidByError && <FormErrorMessage>Veldu greiðanda</FormErrorMessage>}
                        </>
                    }
                </FormControl>
            </form>
        </Stack>
    )
}

export default TransactionForm