import { randomBytes } from 'crypto';
import { ObjectSchema } from '@hapi/joi';
import * as argon2 from 'argon2';
import { createValidationError } from '../error';

export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain);
}

export async function verifyPassword(hashed: string, plain: string): Promise<boolean> {
  try {
    return argon2.verify(hashed, plain);
  }
  catch (e)
  {
    return false;
  }
}

export function generateId(): string {
  return randomBytes(16).toString('hex');
}

export function generateToken(): string {
  return randomBytes(64).toString('hex');
}


export function hasOnlyAllowedKeys (arg: any, allowedKeys: string[]): boolean {
  return arg ? !Object.keys(arg).some(key => !allowedKeys.includes(key)) : false;
}

export function makeValidatorFromJoiSchema<TArgs = any>(schema: ObjectSchema) {
  return (args: TArgs) => {
    const { error } = schema.validate(args);
    if (error) throw createValidationError(error.details[0].message);
  };
}