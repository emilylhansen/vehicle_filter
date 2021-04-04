import faker from "faker";
import { prismNonEmptyString } from "newtype-ts/lib/NonEmptyString";
import { A, O, pipe, sequenceS, sequenceT } from "../utils/fp-ts-exports";
import {
  isoUserId,
  isoVehicleId,
  prismNonEmptyString6,
  prismIntegerTimeStamp,
  prismPositiveInteger4,
  prismPositiveInteger5,
  prismNonEmptyStringEmail,
  User,
  Vehicle,
} from "./api.types";

const LAST_CONNECTED = 1616866793;

//#region userA start
const userAO: O.Option<User> = pipe(
  sequenceS(O.option)({
    first: prismNonEmptyString.getOption("Kalles"),
    last: prismNonEmptyString.getOption("Grustransporter"),
    email: prismNonEmptyStringEmail.getOption(
      "kalles_grustransporter@email.com"
    ),
    street: prismNonEmptyString.getOption("Cementvägen 8"),
    postalCode: prismPositiveInteger5.getOption(11111),
    city: prismNonEmptyString.getOption("Södertälje"),
    country: prismNonEmptyString.getOption("Sverige"),
  }),
  O.map((data) => ({
    id: isoUserId.wrap("userA"),
    first: data.first,
    last: data.last,
    email: data.email,
    address: {
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    },
  }))
);
const vehicleAaO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("ABC123"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("YS2R4X20005399401"),
    ownerId: isoUserId.wrap("userA"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
const vehicleAbO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("DEF456"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("VLUR4X20009093588"),
    ownerId: isoUserId.wrap("userA"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
const vehicleAcO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("GHI789"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("VLUR4X20009048066"),
    ownerId: isoUserId.wrap("userA"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
//#endregion userA end

//#region userB start
const userBO: O.Option<User> = pipe(
  sequenceS(O.option)({
    first: prismNonEmptyString.getOption("Johans"),
    last: prismNonEmptyString.getOption("Bulk"),
    email: prismNonEmptyStringEmail.getOption("johans_bulk@email.com"),
    street: prismNonEmptyString.getOption("Balkvägen 12"),
    postalCode: prismPositiveInteger5.getOption(22222),
    city: prismNonEmptyString.getOption("Stockholm"),
    country: prismNonEmptyString.getOption("Sverige"),
  }),
  O.map((data) => ({
    id: isoUserId.wrap("userB"),
    first: data.first,
    last: data.last,
    email: data.email,
    address: {
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    },
  }))
);
const vehicleBaO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("JKL012"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("YS2R4X20005388011"),
    ownerId: isoUserId.wrap("userB"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
const vehicleBbO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("MNO345"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("YS2R4X20005387949"),
    ownerId: isoUserId.wrap("userB"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
//#endregion userB end

//#region userC start
const userCO: O.Option<User> = pipe(
  sequenceS(O.option)({
    first: prismNonEmptyString.getOption("Haralds"),
    last: prismNonEmptyString.getOption("Värdetransporter"),
    email: prismNonEmptyStringEmail.getOption(
      "haralds_värdetransporter@email.com"
    ),
    street: prismNonEmptyString.getOption("Budgetvägen 1"),
    postalCode: prismPositiveInteger5.getOption(33333),
    city: prismNonEmptyString.getOption("Uppsala"),
    country: prismNonEmptyString.getOption("Sverige"),
  }),
  O.map((data) => ({
    id: isoUserId.wrap("userC"),
    first: data.first,
    last: data.last,
    email: data.email,
    address: {
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    },
  }))
);
const vehicleCaO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("PQR678"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("VLUR4X20009048066"),
    ownerId: isoUserId.wrap("userC"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
const vehicleCbO: O.Option<Vehicle> = pipe(
  sequenceS(O.option)({
    make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
    model: prismNonEmptyString.getOption(faker.vehicle.model()),
    year: prismPositiveInteger4.getOption(2021),
    registration: prismNonEmptyString6.getOption("STU901"),
    lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
  }),
  O.map((data) => ({
    id: isoVehicleId.wrap("YS2R4X20005387055"),
    ownerId: isoUserId.wrap("userC"),
    make: data.make,
    model: data.model,
    year: data.year,
    registration: data.registration,
    connected: faker.random.boolean(),
    lastConnected: data.lastConnected,
  }))
);
//#endregion userC end

const baseCustomers: Array<User> = pipe(
  sequenceT(O.option)(userAO, userBO, userCO),
  O.getOrElse<Array<User>>(() => [])
);

const baseVehicles = pipe(
  sequenceT(O.option)(
    vehicleAaO,
    vehicleAbO,
    vehicleAcO,
    vehicleBaO,
    vehicleBbO,
    vehicleCaO,
    vehicleCbO
  ),
  O.getOrElse<Array<Vehicle>>(() => [])
);

const generatedCustomers: Array<User> = pipe(
  A.range(baseCustomers.length + 1, 20),
  A.filterMap((i) =>
    pipe(
      sequenceS(O.option)({
        first: prismNonEmptyString.getOption(faker.name.firstName()),
        last: prismNonEmptyString.getOption(faker.name.lastName()),
        email: prismNonEmptyStringEmail.getOption(faker.internet.email()),
        street: prismNonEmptyString.getOption(faker.address.streetAddress()),
        postalCode: prismPositiveInteger5.getOption(11111),
        city: prismNonEmptyString.getOption(faker.address.city()),
        country: prismNonEmptyString.getOption(faker.address.country()),
      }),
      O.map((data) => ({
        id: isoUserId.wrap(i.toLocaleString()),
        first: data.first,
        last: data.last,
        email: data.email,
        address: {
          street: data.street,
          postalCode: data.postalCode,
          city: data.city,
          country: data.country,
        },
      }))
    )
  )
);

const generatedVehicles: Array<Vehicle> = pipe(
  A.range(baseCustomers.length + 1, 20),
  A.filterMap((i) =>
    pipe(
      sequenceS(O.option)({
        make: prismNonEmptyString.getOption(faker.vehicle.manufacturer()),
        model: prismNonEmptyString.getOption(faker.vehicle.model()),
        year: prismPositiveInteger4.getOption(2021),
        registration: prismNonEmptyString6.getOption("dk1l1"),
        lastConnected: prismIntegerTimeStamp.getOption(LAST_CONNECTED),
      }),
      O.map((data) => ({
        id: isoVehicleId.wrap(i.toLocaleString()),
        ownerId: isoUserId.wrap(i.toLocaleString()),
        make: data.make,
        model: data.model,
        year: data.year,
        registration: data.registration,
        connected: faker.random.boolean(),
        lastConnected: data.lastConnected,
      }))
    )
  )
);

const users: Array<User> = [...baseCustomers, ...generatedCustomers];

const vehicles: Array<Vehicle> = [...baseVehicles, ...generatedVehicles];

export const db = { users, vehicles };
