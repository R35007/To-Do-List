# What-To-Do

> Cannot track your tasks. Then you must know **`What To Do`**

**`What To Do`** is a tool which helps you to track your daily task and its status.

This tool will carry over the previous days task to current date if the task is not completed. Your task details can be exported to excel.

## Table of Contents

- [Setup](#Setup)
- [Features](#Features)
- [How does it work?](#How-does-it-work)
- [Available Scripts](#available-scripts)
  - [npm install](#npm-install)
  - [npm start](#npm-start)
  - [npm run clean](#npm-run-clean)
  - [npm run server](#npm-run-server)
  - [npm run client](#npm-run-client)
  - [npm run reinstall](#npm-run-reinstall)
- [Built With](#Built-With)
- [Author](#Author)
- [Contributing](#Contributing)
- [Sample Screenshots](#Sample-Screenshots)
  - [Landing Pages](#Landing-Page)
  - [Edit Task](#Edit-Task)
  - [Add New Task](#Add-New-Task)
  - [Remove Task](#Remove-Task)
  - [Track Your Deadline](#Track-Your-Deadline)
  - [View More Detail](#View-More-Detail)

## Setup

A step by step series of examples that tell you how to get a development env running

clone the Repo :

```
git clone https://github.com/R35007/What-To-Do.git
```

go to root directory and run:

```
npm install
```

once the installation is complete and run:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

- Create task and set status such as
  - Open
  - In progress
  - Done
- Can create deadlines for the task and an indicator displays the time remaining to reach the deadline
- Priorities can be set for each task such as
  - High
  - Medium
  - Low
  - None
- The tasks can be edited or deleted
- The task details can be exported to excel
- Tasks can be scheduled for future date
- View All helps to view all the tasks that have been entered in the application till date
- A dashboard to display the task status and count

## How does it work?

Inside the root directory we have two applications written in TypeScript.

The `server/` -directory's contents are for the
backend part of the application, i.e. if you want to do filesystem
changes or other things that require IPC between the backend and the browser
windows.

The `client/` -directory's contents are for the
frontend part of the application, anything visible to the end-user.

The `assets/tasks.json` -contains the tasks which are saved by the end-user.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install the dependencies needed for both the Client and Server<br>

### `npm start`

Runs the both the server and client app concurrently in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run clean`

Removes all the node_modules which are available in the Client , Server and the root directory.

### `npm run server`

Runs the server side of the application

### `npm run client`

Runs the client side of the application

### `npm run reinstall`

Cleans the node_modules and reinstalls the dependencies for both client ans server.

## Built With

- React
- TypeScript
- SASS
- Kendo UI
- Bootstrap
- Lodash
- Express
- OvernightJS

## Author

**Sivaraman** - Mycount.siva@gmail.com

Distributed under the MIT license.

[https://github.com/R35007](https://github.com/R35007)

## Contributing

1. Fork it (<https://github.com/R35007/What-To-Do/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Sample Screenshots

#### `Landing Page`

<a href="https://user-images.githubusercontent.com/23217228/67146175-1c039300-f2a6-11e9-84d7-3c7d65f3803c.png" ><img width="100%" alt="Landing Page" src="https://user-images.githubusercontent.com/23217228/67146175-1c039300-f2a6-11e9-84d7-3c7d65f3803c.png"></a>

#### `Edit Task`

<a href="https://user-images.githubusercontent.com/23217228/67147071-fe86f700-f2ae-11e9-81a0-8bc8ec64496b.png"><img width="100%" alt="Edit Task" src="https://user-images.githubusercontent.com/23217228/67147071-fe86f700-f2ae-11e9-81a0-8bc8ec64496b.png"></a>

#### `Add New Task`

<a href="https://user-images.githubusercontent.com/23217228/67147097-4b6acd80-f2af-11e9-846a-0e3974e34ffe.png"><img width="100%" alt="Add New Task" src="https://user-images.githubusercontent.com/23217228/67147097-4b6acd80-f2af-11e9-846a-0e3974e34ffe.png"></a>

#### `Remove Task`

<a href="https://user-images.githubusercontent.com/23217228/67147110-6a695f80-f2af-11e9-9d8a-47f72a4a9468.png"><img width="100%" alt="Remove Task" src="https://user-images.githubusercontent.com/23217228/67147110-6a695f80-f2af-11e9-9d8a-47f72a4a9468.png"></a>

#### `Track Your Deadline`

<a href="https://user-images.githubusercontent.com/23217228/67147127-9553b380-f2af-11e9-841b-fc229f0d175e.png"><img width="100%" alt="rack Your Deadline" src="https://user-images.githubusercontent.com/23217228/67147127-9553b380-f2af-11e9-841b-fc229f0d175e.png">
</a>

#### `View More Detail`

<a href="https://user-images.githubusercontent.com/23217228/67147144-c59b5200-f2af-11e9-8592-a4b1e382d54b.png"><img width="100%" alt="View More Detail" src="https://user-images.githubusercontent.com/23217228/67147144-c59b5200-f2af-11e9-8592-a4b1e382d54b.png"></a>
