import { Collection } from 'mongodb';
import { SystemLock, SystemLockRecord } from './types';
import { createSystemLockBusyError, AppError, createDbOpFailedError, isMongoDuplicateKeyError } from '../error';
import { generateId } from '../util';


// this is a bad name. We should just use a common prefix/suffix for interfaces
// to make it easier to name classes
export class SystemLockHandle implements SystemLock {

  constructor(private id: string, private collection: Collection<SystemLockRecord>, private key: string = '') {
    if (!this.key) {
      this.key = generateId();
    }
  }
  
  async lock() {
    try {
      const res = await this.collection.findOneAndUpdate(
        { _id: this.id, locked: { $ne: true } },
        { $set: { locked: true, updatedAt: new Date(), lockedWithKey: this.key } },
        { upsert: true });

      if (!res.ok) {
        throw createSystemLockBusyError();
      }
    }
    catch (e) {
      if (e instanceof AppError) throw e;
      if (isMongoDuplicateKeyError(e, this.id)) throw createSystemLockBusyError();
      throw createDbOpFailedError(e.message);
    }
  }

  async unlock() {
    try {
      await this.collection.findOneAndUpdate(
        { _id: this.id, locked: true, lockedWithKey: this.key },
        { $set: { locked: false, updated: new Date(), lockedWithKey: '' } });
    }
    catch (e) {
      if (e instanceof AppError) throw e;
      throw createDbOpFailedError(e.message);
    }
  }

  async ensureUnlocked() {
    try {
      const res = await this.collection.findOne({ _id: this.id, locked: true });
      if (res) throw createSystemLockBusyError();
    }
    catch (e) {
      if (e instanceof AppError) throw e;
      throw createDbOpFailedError(e.message);
    }
  }
}