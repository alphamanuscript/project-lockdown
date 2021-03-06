export const transactions = [
  {
    _id: 'transaction1',
    expectedAmount: 250,
    to: 'id 1',
    from:'',
    type: 'donation',
    status: 'paymentRequested',
    amount: 0,
  },
  {
    _id: 'transaction2',
    expectedAmount: 470,
    to: 'id 1',
    from:'',
    type: 'donation',
    status: 'success',
    amount: 470,
  },
  {
    _id: 'transaction3',
    expectedAmount: 1000,
    to: 'id 2',
    from:'',
    type: 'donation',
    status: 'success',
    amount: 1000,
  },
  {
    _id: 'transaction4',
    expectedAmount: 500,
    to: 'id 3',
    from:'',
    type: 'donation',
    status: 'paymentRequested',
    amount: 0,
  },
  {
    _id: 'transaction5',
    expectedAmount: 250,
    to: 'id 3',
    from:'id 2',
    type: 'distribution',
    status: 'success',
    amount: 250,
  },
  {
    _id: 'transaction6',
    expectedAmount: 250,
    to: 'id 4',
    from:'id 2',
    type: 'distribution',
    status: 'success',
    amount: 250,
  },
  {
    _id: 'transaction7',
    expectedAmount: 250,
    to: 'id 5',
    from:'id 2',
    type: 'distribution',
    status: 'success',
    amount: 250,
  },
  {
    _id: 'transaction8',
    expectedAmount: 250,
    to: 'id 6',
    from:'id 2',
    type: 'distribution',
    status: 'pending',
    amount: 250,
  },
  {
    _id: 'transaction9',
    expectedAmount: 130,
    to: 'id 7',
    from:'id 1',
    type: 'distribution',
    status: 'success',
    amount: 130,
  },
  {
    _id: 'transaction10',
    expectedAmount: 500,
    to: 'id 2',
    from:'',
    type: 'donation',
    status: 'success',
    amount: 500,
  },
  {
    _id: 'transaction11',
    expectedAmount: 1000,
    to: 'id 2',
    from: '',
    type: 'donation',
    status: 'success',
    amount: 1000
  },
  // this refund should cancel out the previous donation
  {
    _id: 'transaction12',
    expectedAmount: 1000,
    from: 'id 2',
    to: '',
    type: 'refund',
    status: 'success',
    amount: 1000,
    toExternal: true,
    fromExternal: false
  }
];

export const users = [
  {
    _id: 'id 1',
    roles: ['donor']
  },
  {
    _id: 'id 2',
    roles: ['donor']
  },
  {
    _id: 'id 3',
    roles: ['beneficiary']
  },
  {
    _id: 'id 4',
    roles: ['beneficiary']
  },
  {
    _id: 'id 5',
    roles: ['beneficiary']
  },
  {
    _id: 'id 6',
    roles: ['beneficiary']
  },
  {
    _id: 'id 7',
    roles: ['beneficiary', 'middleman']
  },
  {
    _id: '10',
    roles: ['beneficiary']
  }
];
