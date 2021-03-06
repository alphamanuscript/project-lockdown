import * as validators from '../validator';
import { testValidationSucceeds, testValidationFails } from '../../test-util';
import { generateId, generateToken } from '../../util'

describe('validatesCreate', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesCreate, [
      { phone: '254729291091', password: 'dsksjjn,', name: 'John' },
      { phone: '254729291091', password: 'dsks12jnDM4', name: 'John' },
      { phone: '254032929109', password: 'dsks12jnDM4', name: 'John' },
      { phone: '254729291091', password: 'dsks12jnDM4SEZLZSS', name: 'John' },
      { phone: '254729291091', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254029291091', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254019291091', googleIdToken: 'dsks12jnDM4SEZLZSS' }
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesCreate, [
      { phone: '25472929109', password: 'dsksjjn,' },
      { phone: '25472929109', password: 'dsksjjn,', name: ''},
      { phone: '254738103012', password: 'wiedna102Ldnffrfldm' },
      { phone: '', password: 'wiedna102Ldnffrfldm' },
      { password: 'wiedna102Ldnffrfldm' },
      { phone: '254738103012' },
      { phone: '254738103012', password: 1 },
      { phone: '254729291091', password: '', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254729291091', password: 'dsks12jnDM4SEZLZSS', googleIdToken: '' },
      { phone: '', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254729291091', googleIdToken: '' },
      { password: 'dsks12jnDM4SEZLZSS', googleIdToken: 'dsks12jnDM4SEZLZSS' }
    ]);
  });
});

describe('validatesLogin', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesLogin, [
      { phone: '254729291091', password: 'dsksjjn,' },
      { phone: '254738103012', password: 'f' },
      { phone: '254729291091', password: 'dsks12jnDM4' },
      { phone: '254729291091', password: 'dsks12jnDM4SEZLZSS' },
      { phone: '254729291091', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254829291091', password: 'dsks12jnDM4SEZLZSS' },
      { phone: '254129291091', password: 'dsks12jnDM4SEZLZSS' },
      { phone: '254738103012', password: 'wiedna102Ldnffrfldm' },
      { googleIdToken: 'dsks12jnDM4SEZLZSS' }
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesLogin, [
      { phone: '25472929109', password: 'dsksjjn,' },
      { phone: '+254729291091', password: 'dsks12jnDM4' },
      { phone: '', password: '', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254729291091', password: 'dsks12jnDM4SEZLZSS', googleIdToken: '' },
      { phone: '', googleIdToken: 'dsks12jnDM4SEZLZSS' },
      { phone: '254729291091', googleIdToken: '' },
      { googleIdToken: '' },
      { password: 'dsks12jnDM4SEZLZSS', googleIdToken: 'dsks12jnDM4SEZLZSS' }
    ]);
  });
});

describe('validatesNominate', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesNominate, [
      { phone: '254729291091', nominatorId: 'nominator1', nominatorName: 'John Doe', name: 'James', role: 'beneficiary' },
      { phone: '254729311023', nominatorId: 'nominator1', nominatorName: 'John Doe', name: 'John', role: 'middleman' },
      { phone: '254729311023', nominatorId: 'nominator1', nominatorName: 'John Doe', name: 'James John', role: 'middleman' }
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesNominate, [
      { phone: '25472929109', nominatorId: '' },
      { phone: '25405929109', nominatorId: '' },
      { phone: '25462929109', nominatorId: 'nominator1', name: {} },
      { phone: '25482929109', nominatorId: 'nominator1', name: '' },
      { phone: '+254729291091', nominatorId: {} },
      { phone: '254829291091' },
      { nominatorId: 'donor1' },
      { phone: '25472929109', nominatorId: 'nominator1', nominatorName: 'Jane Doe', name: 'Nandi', role: 'donor' },
      { phone: '25472929109', nominatorId: 'nominator1', nominatorName: 'Jane Doe', name: 'Nandi', role: 'xyz' },
      { phone: '25472929109', nominatorId: 'nominator1', name: 'Nandi', role: 'beneficiary' },
    ]);
  });
});

describe('validatesGetAllBeneficiariesByUser', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesGetAllBeneficiariesByUser, [
      generateId(),
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesGetAllBeneficiariesByUser, [
      'dksllcjzcsdmqozm123E2OE',
      'jkshvfb,cnsg&"àéà"ç22013933392028RI3CKF..V?K0332EECDKRU842823.KSkflkfvvnfrozcc32E9ZEZIZRZRZOR391029Egjkvkvdfc ',
      123832929223627
    ]);
  });
});

describe('validatesGetByToken', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesGetByToken, [
      generateToken(),
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesGetByToken, [
      undefined,
      'shvf?K0332EECDKRU842823.KSkflkfvvnE9ZEZIZRZRZOR391029EgjkvkvdfcFMSnd',
      5.23426,
      {},
      null,
      generateId()
    ]);
  });
});

describe('validatesLogout', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesLogout, [
      generateToken(),
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesLogout, [
      null,
      generateId(),
      '32EECDKRU3Edjsls2823.KSkflkfvvnE9ZEZIZRZRZOR391029EgjkvkvdfcFMSnd42029392?Ccncjcdkhhmczdbcdcsjnswc',
      {}
    ]);
  });
});

describe('validatesLogoutAll', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesLogoutAll, [
      generateId(),
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesLogoutAll, [
      'shvf?K0332EECDKRU842823.KSkflkfvvnE9ZEZIZRZRZOR391029EgjkvkvdfcFMSnd',
      104382,
      undefined,
      null
    ]);
  });
});

describe('validatesInitiateDonation', () => {
  it('should not throw error if inputs are valid', () => {
    testValidationSucceeds(validators.validatesInitiateDonation, [
      { userId: generateId(), amount: 100 },
      { userId: generateId(), amount: 500 },
      { userId: generateId(), amount: 2500 },
      { userId: generateId(), amount: 10905 },
      { userId: generateId(), amount: 527350 },
    ]);
  });
  it('should throw error if inputs are not valid', () => {
    testValidationFails(validators.validatesInitiateDonation, [
      { userId: true, amount: 100 },
      { userId: '', amount: 100 },
      { userId: 34256, amount: 2000 },
      { userId: {}, amount: 530 },
      { amount: 100 },
      { userId: generateId() },
      { userId: generateId(), amount: 10 },
      { userId: generateId(), amount: '1000' }
    ]);
  });
});