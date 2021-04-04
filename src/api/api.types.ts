import { CarrierOf, Concat, iso, Newtype, prism } from "newtype-ts";
import {
  isNonEmptyString,
  NonEmptyString,
} from "newtype-ts/lib/NonEmptyString";
import {
  isPositiveInteger,
  PositiveInteger,
} from "newtype-ts/lib/PositiveInteger";
import { O, pipe } from "../utils/fp-ts-exports";

const isInteger = (n: number) => Number.isInteger(n);

export const isPositiveIntegerX = ({
  val,
  length,
}: {
  val: number;
  length: number;
}): boolean =>
  pipe(
    val,
    O.fromPredicate(isInteger),
    O.chain(O.fromPredicate(isPositiveInteger)),
    O.map((n) => n.toLocaleString().length === length),
    O.getOrElse<boolean>(() => false)
  );

export const isoNonEmptyString = iso<NonEmptyString>();

export interface UserId
  extends Newtype<{ readonly UserId: unique symbol }, string> {}
export const isoUserId = iso<UserId>();
export type UserIdCarrier = CarrierOf<UserId>;

export interface VehicleId
  extends Newtype<{ readonly VehicleId: unique symbol }, string> {}
export const isoVehicleId = iso<VehicleId>();
export type VehicleIdCarrier = CarrierOf<VehicleId>;

export interface String6
  extends Newtype<{ readonly String6: unique symbol }, string> {}
export interface NonEmptyString6 extends Concat<String6, NonEmptyString> {}
export const isoNonEmptyString6 = iso<NonEmptyString6>();
export const isNonEmptyString6 = (str: string): boolean =>
  pipe(
    str,
    O.fromPredicate(isNonEmptyString),
    O.map((s) => s.length === 6),
    O.getOrElse<boolean>(() => false)
  );
export const prismNonEmptyString6 = prism<NonEmptyString6>(isNonEmptyString6);

export interface Integer5
  extends Newtype<{ readonly Integer5: unique symbol }, number> {}
export interface PositiveInteger5 extends Concat<Integer5, PositiveInteger> {}
export const isoPositiveInteger5 = iso<PositiveInteger5>();
export const isPositiveInteger5 = (num: number): boolean =>
  isPositiveIntegerX({ val: num, length: 5 });
export const prismPositiveInteger5 = prism<PositiveInteger5>(
  isPositiveInteger5
);

export interface Integer4
  extends Newtype<{ readonly Integer4: unique symbol }, number> {}
export interface PositiveInteger4 extends Concat<Integer4, PositiveInteger> {}
export const isoPositiveInteger4 = iso<PositiveInteger4>();
export const isPositiveInteger4 = (num: number): boolean =>
  isPositiveIntegerX({ val: num, length: 4 });
export const prismPositiveInteger4 = prism<PositiveInteger4>(
  isPositiveInteger4
);

export interface TimeStamp
  extends Newtype<{ readonly Timestamp: unique symbol }, number> {}
export interface PositiveIntegerTimeStamp
  extends Concat<TimeStamp, PositiveInteger> {}
export const isoPositiveIntegerTimeStamp = iso<PositiveIntegerTimeStamp>();
export const isPositiveIntegerTimeStamp = (num: number): boolean =>
  isPositiveIntegerX({ val: num, length: 16 });
export const prismIntegerTimeStamp = prism<PositiveIntegerTimeStamp>(
  isPositiveIntegerTimeStamp
);

export interface Email
  extends Newtype<{ readonly Email: unique symbol }, string> {}
export interface NonEmptyStringEmail extends Concat<Email, NonEmptyString> {}
export const isoNonEmptyStringEmail = iso<NonEmptyStringEmail>();
export const isNonEmptyStringEmail = (str: string): boolean =>
  pipe(
    str,
    O.fromPredicate(isNonEmptyString),
    O.map((s) => s.includes("@")),
    O.getOrElse<boolean>(() => false)
  );
export const prismNonEmptyStringEmail = prism<NonEmptyStringEmail>(
  isNonEmptyStringEmail
);

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
  email: NonEmptyStringEmail;
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
  lastConnected: PositiveIntegerTimeStamp;
};

export type GetUsersResponse = Array<User>;

export type GetVehiclesResponse = Array<Vehicle>;

export interface RdError
  extends Newtype<{ readonly RdError: unique symbol }, string> {}
export const isoRdError = iso<RdError>();
export type RdErrorCarrier = CarrierOf<RdError>;

export type ApiParams = Array<Array<string>>;
