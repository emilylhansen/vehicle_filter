import { Concat, iso, Newtype } from "newtype-ts";
import { NonEmptyString } from "newtype-ts/lib/NonEmptyString";
import { PositiveInteger } from "newtype-ts/lib/PositiveInteger";

export const isoNonEmptyString = iso<NonEmptyString>();

export interface UserId
  extends Newtype<{ readonly UserId: unique symbol }, string> {}
export const isoUserId = iso<UserId>();

export interface VehicleId
  extends Newtype<{ readonly VehicleId: unique symbol }, string> {}
export const isoVehicleId = iso<VehicleId>();

export interface String6
  extends Newtype<{ readonly String6: unique symbol }, string> {}
export interface NonEmptyString6 extends Concat<String6, NonEmptyString> {}
export const isoNonEmptyString6 = iso<NonEmptyString6>();

export interface Integer5
  extends Newtype<{ readonly Integer5: unique symbol }, number> {}
export interface PositiveInteger5 extends Concat<Integer5, PositiveInteger> {}
export const isoPositiveInteger5 = iso<PositiveInteger5>();

export interface Integer4
  extends Newtype<{ readonly Integer4: unique symbol }, number> {}
export interface PositiveInteger4 extends Concat<Integer4, PositiveInteger> {}
export const isoPositiveInteger4 = iso<PositiveInteger4>();

export interface TimeStamp
  extends Newtype<{ readonly Timestamp: unique symbol }, number> {}
export interface IntegerTimeStamp extends Concat<TimeStamp, PositiveInteger> {}
export const isoIntegerTimeStamp = iso<IntegerTimeStamp>();

export type Address = {
  street: NonEmptyString;
  postalCode: PositiveInteger5;
  city: NonEmptyString;
  country: NonEmptyString;
};

export type User = {
  id: UserId;
  first: NonEmptyString;
  last: NonEmptyString;
  email: NonEmptyString;
  address: Address;
};

export type Vehicle = {
  id: VehicleId;
  ownerId: UserId;
  make: NonEmptyString;
  model: NonEmptyString;
  year: PositiveInteger4;
  registration: NonEmptyString6;
  connected: boolean;
  lastActive: IntegerTimeStamp;
};

export type GetUsersResponse = Array<User>;

export type GetVehiclesResponse = Array<Vehicle>;
