# Dice Roller

[![build](https://circleci.com/gh/aloverso/dice-roller.svg?style=shield)](https://circleci.com/gh/aloverso/dice-roller)

An Express/React/typescript bootstrapper app

View it live at [http://rpgdiceroller.com](http://rpgdiceroller.com/)

## Getting Started

This [typescript](https://www.typescriptlang.org/) repo is structured with two primary sub-folders:

 - **backend** - the [express](https://expressjs.com/) API server
 - **frontend** - the [react](https://reactjs.org/) web UI
 
### npm Dependencies

For npm dependencies:
```shell script
./scripts/install-all.sh
```

## Development

Start frontend dev server:
```shell script
./scripts/frontend-start.sh
```

Start backend dev server:
```shell script
./scripts/backend-start.sh
```

Run all [jest](https://jestjs.io/) tests, and linting:
```shell script
./scripts/test-all.sh
```

Run [cypress](https://www.cypress.io/) feature tests:
```shell script
./scripts/feature-tests.sh
```

### Fences

This repo uses [good-fences](https://github.com/smikula/good-fences) to enforce module boundaries.
Most importantly, the `backend` and `frontend` cannot import from each other.

Additionally, fences are used in the backend subdirectories to enforce [dependency inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle).
The `routes` and `database` folders depend on the interfaces defined in `domain` (only - not on each other), and `domain` is not allowed to
import from any of these implementation directories.

Fences are enforced via a linting-like command that will fail when any violations are flagged:

```shell script
npm --prefix=backend run fences
npm --prefix=frontend run fences
```

## Pushing changes

Always push via ship-it ([why?](https://medium.com/@AnneLoVerso/ship-it-a-humble-script-for-low-risk-deployment-1b8ba99994f7))
```shell script
./scripts/ship-it.sh
```

## CI/CD

We use circleci.

The pipeline is:
1. npm install (frontend and backend)
1. run all unit tests (frontend and backend)
1. build code and run feature tests
1. deploy to GCP environment

## Deployment

Build frontend, build backend, compile all into one directory:
```shell script
./scripts/build.sh
```

Start the production server (frontend & backend)
```shell script
./scripts/prod-start.sh
```

### Deploying to GCP

First, make sure that [Google Cloud SDK](https://cloud.google.com/sdk/install) is installed

Ensure you are logged in to the CLI and pointing to the correct project.

This script generates the `app.yaml` and deploys the app:
```shell script
./scripts/deploy.sh
```

Generally, developers won't have to do this - we have automated deploys via CircleCI.
