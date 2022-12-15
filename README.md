# CAPS

System that emulates a real world supply chain

## Phase 2 Requirements

In Phase 2, we’ll be changing the underlying networking implementation of our CAPS system from using node events to using a library called Socket.io so that clients can communicate over a network. Socket.io manages the connection pool for us, making broadcasting much easier to operate, and works well both on the terminal (between servers) and with web clients.

The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.

### The following user/developer stories detail the major functionality for this phase of the project

* As a vendor, I want to alert the system when I have a package to be picked up.

* As a driver, I want to be notified when there is a package to be delivered.

* As a driver, I want to alert the system when I have picked up a package and it
  is in transit.

* As a driver, I want to alert the system when a package has been delivered.

* As a vendor, I want to be notified when my package has been delivered.

### As developers, here are some of the development stories that are relevant to the above

##### Phase 1

* As a developer, I want to use industry standards for managing the state of each
  package.

* As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.

##### Phase 2

As a developer, I want to create network event driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications

### UML

![UML](./src/assets/UML.png)

### Socket UML

![UML](./src/assets/Socket_UML.png)

### Queue UML
