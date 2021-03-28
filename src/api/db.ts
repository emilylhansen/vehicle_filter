import faker from "faker";
import { A, pipe } from "../utils/fp-ts-exports";
import {
  isoIntegerTimeStamp,
  isoNonEmptyString,
  isoNonEmptyString6,
  isoPositiveInteger4,
  isoPositiveInteger5,
  isoUserId,
  isoVehicleId,
  User,
  Vehicle,
} from "./types";

//#region userA start
const userA: User = {
  id: isoUserId.wrap("userA"),
  first: isoNonEmptyString.wrap("Kalles"),
  last: isoNonEmptyString.wrap("Grustransporter"),
  email: isoNonEmptyString.wrap("kalles_grustransporter@email.com"),
  address: {
    street: isoNonEmptyString.wrap("Cementvägen 8"),
    postalCode: isoPositiveInteger5.wrap(11111),
    city: isoNonEmptyString.wrap("Södertälje"),
    country: isoNonEmptyString.wrap("Sverige"),
  },
};
const vehicleAA: Vehicle = {
  id: isoVehicleId.wrap("YS2R4X20005399401"),
  ownerId: isoUserId.wrap("userA"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("ABC123"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
const vehicleAB: Vehicle = {
  id: isoVehicleId.wrap("VLUR4X20009093588"),
  ownerId: isoUserId.wrap("userA"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("DEF456"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
const vehicleAC: Vehicle = {
  id: isoVehicleId.wrap("VLUR4X20009048066"),
  ownerId: isoUserId.wrap("userA"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("GHI789"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
//#endregion userA end

//#region userB start
const userB: User = {
  id: isoUserId.wrap("userB"),
  first: isoNonEmptyString.wrap("Johans"),
  last: isoNonEmptyString.wrap("Bulk"),
  email: isoNonEmptyString.wrap("johans_bulk@email.com"),
  address: {
    street: isoNonEmptyString.wrap("Balkvägen 12"),
    postalCode: isoPositiveInteger5.wrap(22222),
    city: isoNonEmptyString.wrap("Stockholm"),
    country: isoNonEmptyString.wrap("Sverige"),
  },
};
const vehicleBA: Vehicle = {
  id: isoVehicleId.wrap("YS2R4X20005388011"),
  ownerId: isoUserId.wrap("userB"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("JKL012"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
const vehicleBB: Vehicle = {
  id: isoVehicleId.wrap("YS2R4X20005387949"),
  ownerId: isoUserId.wrap("userB"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("MNO345"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
//#endregion userB end

//#region userC start
const userC: User = {
  id: isoUserId.wrap("userC"),
  first: isoNonEmptyString.wrap("Haralds"),
  last: isoNonEmptyString.wrap("Värdetransporter"),
  email: isoNonEmptyString.wrap("haralds_värdetransporter@email.com"),
  address: {
    street: isoNonEmptyString.wrap("Budgetvägen 1"),
    postalCode: isoPositiveInteger5.wrap(33333),
    city: isoNonEmptyString.wrap("Uppsala"),
    country: isoNonEmptyString.wrap("Sverige"),
  },
};
const vehicleCA: Vehicle = {
  id: isoVehicleId.wrap("VLUR4X20009048066"),
  ownerId: isoUserId.wrap("userC"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("PQR678"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
const vehicleCB: Vehicle = {
  id: isoVehicleId.wrap("YS2R4X20005387055"),
  ownerId: isoUserId.wrap("userC"),
  make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
  model: isoNonEmptyString.wrap(faker.vehicle.model()),
  year: isoPositiveInteger4.wrap(2021),
  registration: isoNonEmptyString6.wrap("STU901"),
  connected: faker.random.boolean(),
  lastConnected: isoIntegerTimeStamp.wrap(1616866793),
};
//#endregion userC end

const baseCustomers = [userA, userB, userC];

const baseVehicles = [
  vehicleAA,
  vehicleAB,
  vehicleAC,
  vehicleBA,
  vehicleBB,
  vehicleCA,
  vehicleCB,
];

const generatedCustomers: Array<User> = pipe(
  A.range(baseCustomers.length + 1, 20),
  A.map((i) => ({
    id: isoUserId.wrap(i.toLocaleString()),
    first: isoNonEmptyString.wrap(faker.name.firstName()),
    last: isoNonEmptyString.wrap(faker.name.lastName()),
    email: isoNonEmptyString.wrap(faker.internet.email()),
    address: {
      street: isoNonEmptyString.wrap(faker.address.streetAddress()),
      postalCode: isoPositiveInteger5.wrap(11111),
      city: isoNonEmptyString.wrap(faker.address.city()),
      country: isoNonEmptyString.wrap(faker.address.country()),
    },
  }))
);

const generatedVehicles: Array<Vehicle> = pipe(
  A.range(baseCustomers.length + 1, 20),
  A.map((i) => ({
    id: isoVehicleId.wrap(i.toLocaleString()),
    ownerId: isoUserId.wrap(i.toLocaleString()),
    make: isoNonEmptyString.wrap(faker.vehicle.manufacturer()),
    model: isoNonEmptyString.wrap(faker.vehicle.model()),
    year: isoPositiveInteger4.wrap(2021),
    registration: isoNonEmptyString6.wrap("dk1l1"),
    connected: faker.random.boolean(),
    lastConnected: isoIntegerTimeStamp.wrap(1616866793),
  }))
);

const users: Array<User> = [...baseCustomers, ...generatedCustomers];

const vehicles: Array<Vehicle> = [...baseVehicles, ...generatedVehicles];

export const db = { users, vehicles };
