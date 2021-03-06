import { transactions, users } from './fixtures';
import { Statistics } from '../stat-service';
import { Stats } from '../types';

import { createDbUtils, expectDatesAreClose } from '../../test-util';

const DB = '_social_relief_stat_service_tests_';
const STATS_COLLECTION = 'stats';
const TRANSACTION_COLLECTION = 'transactions';
const USERS_COLLECTION = 'users';

describe('stat-service tests', () => {
  const dbUtils = createDbUtils(DB, STATS_COLLECTION);

  beforeAll(async () => {
    await dbUtils.setupDb();
  });

  afterAll(async () => {
    await dbUtils.tearDown();
  });

  beforeEach(async () => {
    await dbUtils.resetCollectionWith([], STATS_COLLECTION);
    await dbUtils.resetCollectionWith(transactions, TRANSACTION_COLLECTION);
    await dbUtils.resetCollectionWith(users, USERS_COLLECTION);
  });

  function statsColl() {
    return dbUtils.getCollection<Stats>(STATS_COLLECTION);
  }

  function createDefaultService() {
    const service = new Statistics(dbUtils.getDb());
    return service;
  }

  describe('get', () => {
    it('should call update if stats doc does not exist', async () => {
      const statsService = createDefaultService();
      const updateSpy = jest.spyOn(statsService, 'update');
      await statsService.get();
      expect(updateSpy).toHaveBeenCalled();
    });
    it('should not call update if stats doc exists', async () => {
      let statsDoc = await statsColl().findOne({ _id: 'stats' });
      expect(statsDoc).toBeFalsy();
      statsDoc = await createDefaultService().get();
      expect(statsDoc).toBeTruthy();
      const statsService = createDefaultService();
      const updateSpy = jest.spyOn(statsService, 'update');
      await statsService.get();
      expect(updateSpy).not.toHaveBeenCalled();
    });
    it('should return the same stats doc as stored in the db', async () => {
      const returnedStats = await createDefaultService().get();
      const statsInDb = await statsColl().findOne({ _id: 'stats'});
      expect(returnedStats.numContributors).toEqual(statsInDb.numContributors);
      expect(returnedStats.numRecipients).toEqual(statsInDb.numRecipients);
      expect(returnedStats.numBeneficiaries).toEqual(statsInDb.numBeneficiaries);
      expect(returnedStats.totalContributed).toEqual(statsInDb.totalContributed);
      expect(returnedStats.totalDistributed).toEqual(statsInDb.totalDistributed);
      expect(returnedStats.updatedAt).toEqual(statsInDb.updatedAt);
    });
  });

  describe('update', () => {
    it('should create and store a stats doc if it does not exist', async () => {
      let statsDoc = await statsColl().findOne({ _id: 'stats' });
      expect(statsDoc).toBeFalsy();
      await createDefaultService().update();
      statsDoc = await statsColl().findOne({ _id: 'stats' });
      expect(statsDoc).toBeTruthy();
    });
    it('should return a stats doc with the right fields', async () => {
      await createDefaultService().update();
      const statsDoc = await statsColl().findOne({ _id: 'stats' });
      expect(statsDoc).toHaveProperty('_id');
      expect(statsDoc).toHaveProperty('numContributors');
      expect(statsDoc).toHaveProperty('numRecipients');
      expect(statsDoc).toHaveProperty('numBeneficiaries');
      expect(statsDoc).toHaveProperty('totalContributed');
      expect(statsDoc).toHaveProperty('totalDistributed');
      expect(statsDoc).toHaveProperty('updatedAt');
    });
    it('should return a stats doc with correct statistic figures', async () => {
      const statsDoc = await createDefaultService().update();
      expect(statsDoc.numContributors).toEqual(2);
      expect(statsDoc.numRecipients).toEqual(4);
      expect(statsDoc.numBeneficiaries).toEqual(6);
      expect(statsDoc.totalContributed).toEqual(1970);
      expect(statsDoc.totalDistributed).toEqual(880);
    });
  })
});