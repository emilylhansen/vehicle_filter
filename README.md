# Vehicle Filter

This application has a tab that allows admins to easily view and filter their customers' vehicles. The design is clean and sleek to showcase the vehicles and their affluent owners, and pops of color provide a modern feel. The grid makes it easy to identify vehicles, their status, and several other important details at first glance. The sidebar provides filter and search making it easier to discover vehicles that fit certain criteria.

![vehicle filter](https://github.com/emilylhansen/vehicle_filter/blob/main/identity/desktop_1.png)
![vehicle filter](https://github.com/emilylhansen/vehicle_filter/blob/main/identity/vehicle_filter.gif)

## Task

Your task will be to create Web GUI that will show these vehicles with their status and the customers who own them.

# Analysis

Analysis of the task can be found in the `/identity`.

## Technologies

### Frontend

- Create a New React App
- React Redux
- Material UI
- Styled Components
- React Window
- fp-ts
- monacle-ts
- newtype-ts
- JSON Server
- Cypress
- Jest

## Getting Started

Using the terminal navigate to vehicle-filter and run `ts-node src/json-server.ts`. In another tab run `npm i` and `npm start`

### Jest

`npm test`

### cypress

`npm run cypress`

### Troubleshooting

If you have trouble starting json-server you may have to change `module` in `tsconfig.json` from `"esnext"` to common `"commonjs"`. This is the best solution while I figure out how to fix it.
