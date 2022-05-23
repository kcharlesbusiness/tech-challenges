For this Vue3 tech challenge I was tasked with building a simple visual display of data in the form of tables.

The focus for this challenge was actually on the architectural approach.

The rhetoric for this challenge was that I was to imagine the backend data was unorganised and needed some basic organisation.

This included adding magic properties to the datasets. The way I chose to acheive this was to create a class system which would allow us to add in the accessor properties you'd expect to come from the backend/API when we initialise the application.

Full Typescript implementation is highly impactful in this scenario as there will be a few custom properties derived from the class accessors, so may not be easily interpretable for fresh eyes.

NOTE: Full test coverage wasn't the goal here. There are test implemented, but only to illustrate my capabilities to white unit tests.






###_Setup_
Install modules
```yarn install```

###_Environment_
Run dev environment
```yarn dev```

###_Tests_
Run tests with vitest
```yarn test```