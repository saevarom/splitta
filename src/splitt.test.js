import Splitt from './splitt';

import { transactions1, participants1 } from './fixtures/test';
import { transactions2, participants2 } from './fixtures/test';

test('init empty class', () => {
    const splitt = new Splitt([], []);
});

test('simple scenario 1 calculates correct total paid', () => {
    const splitt = new Splitt(participants1, transactions1);
    expect(splitt.total).toBe(15000);
    expect(splitt.totalAmountPaidForParticipant(1)).toBe(5000);
    expect(splitt.totalAmountPaidForParticipant(2)).toBe(10000);
    expect(splitt.totalAmountPaidForParticipant(3)).toBe(0);
});

test('simple scenario 1 calculates correct final amount', () => {
    const splitt = new Splitt(participants1, transactions1);
    expect(splitt.totalAmountUsedForParticipant(1)).toBeCloseTo(5833.33, 1);
    expect(splitt.totalAmountUsedForParticipant(2)).toBeCloseTo(5833.33, 1);
    expect(splitt.totalAmountUsedForParticipant(3)).toBeCloseTo(3333.33, 1);
});

test('simple scenario 1 calculates correct owed amount', () => {
    const splitt = new Splitt(participants1, transactions1);
    expect(splitt.totalAmountOwedForParticipant(1)).toBeCloseTo(833.33, 1);
    expect(splitt.totalAmountOwedForParticipant(2)).toBeCloseTo(-4166.66, 1);
    expect(splitt.totalAmountOwedForParticipant(3)).toBeCloseTo(3333.33, 1);
});

test('simple scenario 1 calculates correct settlement', () => {
    const splitt = new Splitt(participants1, transactions1);
    let settlement = splitt.settlement;
    expect(settlement.length).toBe(2);
    expect(settlement[0].from.id).toBe(3);
    expect(settlement[1].from.id).toBe(1);
});


test('more complex scenario 2 calculates correct total paid', () => {
    const splitt = new Splitt(participants2, transactions2);
    expect(splitt.total).toBe(159875);
    expect(splitt.totalAmountPaidForParticipant(1)).toBe(29365);
    expect(splitt.totalAmountPaidForParticipant(2)).toBe(120410);
    expect(splitt.totalAmountPaidForParticipant(3)).toBe(10100);
});

test('more complex scenario 2 calculates correct final amount', () => {
    const splitt = new Splitt(participants2, transactions2);
    expect(splitt.totalAmountUsedForParticipant(1)).toBeCloseTo(24575, 1);
    expect(splitt.totalAmountUsedForParticipant(2)).toBeCloseTo(24575, 1);
    expect(splitt.totalAmountUsedForParticipant(3)).toBeCloseTo(24575, 1);
    expect(splitt.totalAmountUsedForParticipant(4)).toBeCloseTo(20062.5, 1);
    expect(splitt.totalAmountUsedForParticipant(5)).toBeCloseTo(18587.5, 1);
    expect(splitt.totalAmountUsedForParticipant(6)).toBeCloseTo(24575, 1);
    expect(splitt.totalAmountUsedForParticipant(7)).toBeCloseTo(17585, 1);
    expect(splitt.totalAmountUsedForParticipant(8)).toBeCloseTo(2670, 1);
    expect(splitt.totalAmountUsedForParticipant(9)).toBeCloseTo(2670, 1);
});

test('more complex scenario 2 calculates correct owed amount', () => {
    const splitt = new Splitt(participants2, transactions2);
    expect(splitt.totalAmountOwedForParticipant(1)).toBeCloseTo(-4790, 1);
    expect(splitt.totalAmountOwedForParticipant(2)).toBeCloseTo(-95835, 1);
    expect(splitt.totalAmountOwedForParticipant(3)).toBeCloseTo(14475, 1);
    expect(splitt.totalAmountOwedForParticipant(4)).toBeCloseTo(20062.5, 1);
    expect(splitt.totalAmountOwedForParticipant(5)).toBeCloseTo(18587.5, 1);
    expect(splitt.totalAmountOwedForParticipant(6)).toBeCloseTo(24575, 1);
    expect(splitt.totalAmountOwedForParticipant(7)).toBeCloseTo(17585, 1);
    expect(splitt.totalAmountOwedForParticipant(8)).toBeCloseTo(2670, 1);
    expect(splitt.totalAmountOwedForParticipant(9)).toBeCloseTo(2670, 1);
});

test('more complex scenario 2 calculates correct settlement', () => {
    const splitt = new Splitt(participants2, transactions2);
    let settlement = splitt.settlement;
    // [
    //     {
    //       from: { name: 'Haffi', id: 6 },
    //       to: { name: 'Andri', id: 2 },
    //       amount: 24575
    //     },
    //     {
    //       from: { name: 'Baldur', id: 4 },
    //       to: { name: 'Andri', id: 2 },
    //       amount: 20062.5
    //     },
    //     {
    //       from: { name: 'Jói', id: 5 },
    //       to: { name: 'Andri', id: 2 },
    //       amount: 18587.5
    //     },
    //     {
    //       from: { name: 'Magnús', id: 7 },
    //       to: { name: 'Andri', id: 2 },
    //       amount: 17585
    //     },
    //     {
    //       from: { name: 'Gummi', id: 3 },
    //       to: { name: 'Andri', id: 2 },
    //       amount: 14475
    //     },
    //     {
    //       from: { name: 'Hjalti', id: 8 },
    //       to: { name: 'Sævar', id: 1 },
    //       amount: 2670
    //     },
    //     {
    //       from: { name: 'Björn', id: 9 },
    //       to: { name: 'Sævar', id: 1 },
    //       amount: 2120
    //     },
    //     {
    //       from: { name: 'Björn', id: 9 },
    //       to: { name: 'Andri', id: 2 },
    //       amount: 550
    //     }
    //   ]
    expect(settlement.length).toBe(8);
    expect(settlement[0].from.id).toBe(6);
    expect(settlement[0].to.id).toBe(2);
    expect(settlement[1].from.id).toBe(4);
    expect(settlement[1].to.id).toBe(2);
    expect(settlement[2].from.id).toBe(5);
    expect(settlement[2].to.id).toBe(2);
    expect(settlement[3].from.id).toBe(7);
    expect(settlement[3].to.id).toBe(2);
    expect(settlement[4].from.id).toBe(3);
    expect(settlement[4].to.id).toBe(2);
    expect(settlement[5].from.id).toBe(8);
    expect(settlement[5].to.id).toBe(1);
    expect(settlement[6].from.id).toBe(9);
    expect(settlement[6].to.id).toBe(1);
    expect(settlement[7].from.id).toBe(9);
    expect(settlement[7].to.id).toBe(2);

});