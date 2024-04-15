import accounting from 'accounting';

export const formatMoney = (num, decimals = 0) => {
    return accounting.formatMoney(+num, '', decimals, ".", ",")
  }
  