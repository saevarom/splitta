export function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}


class Splitt {

    settlement = [];

    constructor(
        participants,
        transactions,
    ) {
        this.participants = participants;
        this.transactions = transactions;

        this.settlement = this.balance();
    }

    get total() {
        return this.transactions.reduce((sum, transaction) => sum + parseInt(transaction.amount), 0);
    }

    totalAmountPaidForParticipant(participantId) {
        return this.transactions.reduce((sum, transaction) => {
            if (transaction.paidBy === participantId) {
                return sum + parseInt(transaction.amount)
            }
            return sum;
        }, 0);
    }

    totalAmountUsedForParticipant(participantId) {
        return this.transactions.reduce((sum, transaction) => {
            if (transaction.participants.includes(participantId)) {
                return sum + parseInt(transaction.amount) / transaction.participants.length;
            }
            return sum;
        }, 0);
    }

    totalAmountOwedForParticipant(participantId) {
        return this.totalAmountUsedForParticipant(participantId) - this.totalAmountPaidForParticipant(participantId);
    }

    balance() {
        let balance = this.participants.map(participant => -this.totalAmountUsedForParticipant(participant.id) + this.totalAmountPaidForParticipant(participant.id));
        let settlement = []
        while(balance.some(amount => amount > 0.1)) {
            let max = balance.indexOf(Math.max(...balance));
            let min = balance.indexOf(Math.min(...balance));
            let amount = Math.min(Math.abs(balance[max]), Math.abs(balance[min]));
            balance[max] -= amount;
            balance[min] += amount;
            settlement.push({from: this.participants[min], to: this.participants[max], amount: amount});
        }
        return settlement;
    }
}

export default Splitt;