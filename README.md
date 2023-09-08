# eazipay-microservice - Assessment Solution For Eazipay Backend Developer Role

## Assesment Requirements 

Create 2 services with:
 - one setup for basic GraphQL backend service
 - and the other used for MongoDB schema Models and Graphql Type definitions updates.

The Graphql service should have basic Auth endpoints(e.g. Signup & Login), however Schema and Types definitions are updated in the other service, and at all times the current file versions in the second service are automatically added to the Graphql service on deployment trigger(should be able to test locally as well).

## My Solution

My solution to this assessment task utilises the Microservices Architecture and Schema Federation using GraphQL, Apollo Federation and Apollo Gateway. The project contains two separate services - a model-service and a user-service - each with its own subgraph as well as a gateway services to combine both. Both sub-services (model-service and user-service) and their corresponding subgraphs are compositioned into one supergraph using Apollo Federation in the gateway service which handles incoming GraphQL request and delegates actions to its respective service as needed.

The project also combines REST APIs and GraphQL in that the root API is a REST API built with express which then exposes a /graphql route handled by our Apollo Server.

The **model-service** service handles schema definitions and types for thr MongoDB database while the **user-service** service handles the authentication actions such as signing up a user and logging in a user. It also handles actions such as signing and verifying JSON Web Tokens as well as parsing and sending response cookies.

## Project Setup

To reproduce this project locally, clone this repo to your local machine. Be advised that you will need a package manager, preferably PNPM, and MongoDB locally installed.

After cloning the repo, change your present working directory to the cloned folder using

```bash
cd eazipay-microservice
```

Next, install the dependencies using one of the following commands

```bash
# If you're using PNPM
pnpm install

# If you're using NPM
npm install
```

Once the packages are installed and you have verified that MongoDB is running

You can start the dev server which will start all services simultaneously using Concurrently or you can start individual services as shown below

```bash
# Start dev server
pnpm run dev

# Start only user-service
pnpm run start-user-service

# Start only model-service
pnpm run start-model-service

# Start only gateway
pnpm run start-gateway

```

## Challenges Faced

As this was my first time working with GraphQL and Apollo Server (and its sibling packages) as well as my first shift from building monolithic backend applications, I struggled early on with trying to wrap my head around GraphQL and the Microservices architecture particularly within the short timeframe required. Once I had finally built both services and setup the auth actions, I then struggled with setting up a unified database that both sub-services could access.

## Lessons Learnt

Overall, this has been a very rewarding challenge. While I was unable to properly set up my unified database and subsequently introduced bugs in my attempts at doing this, I am well-pleased with the strong progress I made within less than 72 hours to not only build this project to the level it is at now but to also have a very good baseline understanding of GraphQL, Apollo Servers, Schema Federations and Gateways.
