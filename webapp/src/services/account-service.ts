export const AccountService = {
  async login(userId: string) {
    const payload = {
      uid: userId
    };
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return res.json();
  },
  async deposit(accountId: string, amount: number) {
    const payload = {
      _id: Math.floor(Math.random() * 10000).toString(),
      from : '',
      to: accountId,
      amount,
      type: 'deposit'
    };
    const res = await fetch('http://localhost:3000/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    return res.json();
  },
  async nominateBeneficiary(accountId: string, beneficiary: string) {
    const payload = {
      _id: Math.floor(Math.random() * 10000).toString(),
      phone: beneficiary,
      nominatedBy: accountId
    };
    const res = await fetch('http://localhost:3000/beneficiaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accountId
      },
      body: JSON.stringify(payload)
    });
    
    return res.json();
  },
  async getBeneficiaries(accountId: string) {
    const res = await fetch('http://localhost:3000/beneficiaries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accountId
      }
    });
    
    return res.json();
  },
  async getTransactions(accountId: string) {
    const res = await fetch('http://localhost:3000/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accountId
      }
    });
    
    return res.json();
  },

};
