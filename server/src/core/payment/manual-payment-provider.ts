import * as axios from 'axios';
import { PaymentProvider, PaymentRequestResult, ProviderTransactionInfo, SendFundsResult, TransactionStatus, Transaction } from './types';
import { User } from '../user';
import { createManualPayApiError, isAppError } from '../error';

export const MANUAL_PAYMENT_PROVIDER_NAME = 'manualpay';

export interface ManualPaymentProviderArgs {
  baseUrl: string;
}

interface ManualPayCreateTransactionArgs {
  amount: number;
  recipientName: string;
  recipientPhone: string;
  socialReliefId?: string;
  metadata?: any;
}

interface ManualPayTransaction {
  _id: string;
  reference: string;
  recipientName: string;
  recipientPhone: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  metadata?: any;
  status: string;
  socialReliefId?: any;
  failureReason?: string;
}

function convertStatus(status: string): TransactionStatus {
  return status === 'success' ? 'success' :
    status === 'pending' ? 'pending' : 'failed';
}

function convertTransaction(tx: ManualPayTransaction): ProviderTransactionInfo {
  return {
    providerTransactionId: tx._id,
    amount: tx.amount,
    userData: {
      phone: tx.recipientPhone
    },
    status: convertStatus(tx.status),
    failureReason: tx.failureReason,
    metadata: tx
  };
}

export class ManualPaymentProvider implements PaymentProvider {
  transactionsBaseUrl: string;

  constructor(args: ManualPaymentProviderArgs) {
    this.transactionsBaseUrl = `${args.baseUrl}/api/transactions`;
  }

  name(): string {
    return MANUAL_PAYMENT_PROVIDER_NAME;
  }
  requestPaymentFromUser(user: User, amount: number): Promise<PaymentRequestResult> {
    throw new Error("Method not implemented.");
  }

  async handlePaymentNotification(payload: any): Promise<ProviderTransactionInfo> {
    const tx: ManualPayTransaction = payload;
    return convertTransaction(tx);
  }

  async getTransaction(localTransaction: Transaction): Promise<ProviderTransactionInfo> {
    const id = localTransaction.providerTransactionId;
    try {
      const res = await axios.default.get<ManualPayTransaction>(this.getTransactionsUrl(`/${id}`));

      if (res.status !== 200) {
        const data: any = res.data;
        throw createManualPayApiError(data.error || res.statusText);
      }

      const tx = res.data;
      return convertTransaction(tx);
    }
    catch (e) {
      if (isAppError(e)) throw e;
      throw createManualPayApiError(e.message);
    }
  }

  async sendFundsToUser(user: User, amount: number, metadata: any): Promise<SendFundsResult> {
    const args: ManualPayCreateTransactionArgs = {
      amount: amount,
      recipientName: user.name || user.email || '',
      recipientPhone: user.phone,
      metadata,
    };

    try {
      const res = await axios.default.post<ManualPayTransaction>(this.getTransactionsUrl(), args);

      if (res.status !== 200) {
        const data: any = res.data;
        throw createManualPayApiError(data.error || res.statusText);
      }

      const tx = res.data;

      return {
        providerTransactionId: tx._id,
        status: convertStatus(tx.status)
      };
    }
    catch (e) {
      if (isAppError(e)) throw e;
      throw createManualPayApiError(e.message);
    }
  }

  private getTransactionsUrl(path: string = '') {
    return `${this.transactionsBaseUrl}${path}`;
  }

}