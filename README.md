# 1. Medias center

A JS project to share medias through a web interface, with Polymer 2 for the frontend and NodeJS 8 for the backend. 
Still not impressive but will pool other famous and innovative technologies (Redux, Docker, Sentry, ...).

Stay tuned!

<!-- TOC -->

- [1. Medias center](#1-medias-center)
    - [1.1. Too long, didn't read (tl;dr)](#11-too-long-didnt-read-tldr)
    - [1.2. Functional](#12-functional)
    - [1.3. Technical](#13-technical)
        - [1.3.1. Prerequisites](#131-prerequisites)
        - [1.3.2. Development](#132-development)
            - [1.3.2.1. Standalone](#1321-standalone)
            - [1.3.2.2. Docker](#1322-docker)
        - [1.3.3. Delivery](#133-delivery)
        - [1.3.4. Configuration](#134-configuration)
        - [1.3.5. NPM scripts](#135-npm-scripts)
        - [1.3.6. Network](#136-network)
        - [1.3.7. Medias](#137-medias)
        - [1.3.8. Tests and code coverage](#138-tests-and-code-coverage)
    - [1.4. Known issues](#14-known-issues)
    - [1.5. Improvements](#15-improvements)
    - [1.6. Contributing](#16-contributing)
    - [1.7. License](#17-license)
    - [1.8. Resources](#18-resources)

<!-- /TOC -->

## 1.1. Too long, didn't read (tl;dr)

__Frontend__

```shell
cd frontend && npm run start
```

__Backend__

```shell
cd backend && npm run start
```

## 1.2. Functional

To set the context, this project has been delivered on a private Raspberry Pi. The following content will try to explain how does it work.

1. When requesting the application with its IP address, you'll request a router which, with port forwarding, will forward the request until the Raspberry Pi and the correct port.
1. You'll find the frontend loading the resources (the medias) by sending a GET request to the backend.
1. The backend will read the folder containing medias to get all the necessary information and fetch it to the frontend.
1. If an error is raised up, the backend will send it to a Sentry.io dashboard to be able to sum up efficiently received error logs.
1. To be able to reproduce errors situation and fix it, data will be fetched to a Redux store too.

Here a schema for a better comprehension of the workflow.

![Schema Medias Center structure](./Schema_Medias_Center_structure.png "Schema Medias Center structure")

## 1.3. Technical

### 1.3.1. Prerequisites

You'll need

- git: To clone the project
- nodejs/npm: To run scripts
- docker-compose (docker-compose.yml v3 --> Docker Engine Release > 1.13.0 +): To run app through containers (in a future version)

### 1.3.2. Development

#### 1.3.2.1. Standalone

If you want to run the app in a _dev_ mode __without__ Docker, clone the project

```shell
git clone [-b branch-name] git@github.com:gigouni/polymer2-medias-center.git
```

and run the app in two phases

```shell
# Run the frontend (in a first terminal window)
cd frontend && npm run start

# Run backend (in another terminal window)
cd backend && npm run start
```

Just edit the source code and re-run ̀```npm run start``` if necessary.

#### 1.3.2.2. Docker

If you want to run the app in a _dev_ mode __with__ Docker, clone the project

```shell
git clone [-b branch-name] git@github.com:gigouni/polymer2-medias-center.git
```

and run the app (__not implemented yet__)

```shell
docker-compose up -d
```

### 1.3.3. Delivery

__TODO__: Needs to be completed

### 1.3.4. Configuration

__TODO__: Needs to be completed

### 1.3.5. NPM scripts

__TODO__: Needs to be completed

### 1.3.6. Network

__TODO__: Needs to be completed

(PM2, port forwarding ? --> security, )

### 1.3.7. Medias

__TODO__: Needs to be completed

### 1.3.8. Tests and code coverage

__TODO__: Needs to be completed

## 1.4. Known issues

__TODO__: Needs to be completed

## 1.5. Improvements

__TODO__: Needs to be completed

## 1.6. Contributing

No __direct__ contribution needed. But you can still submit [issues here](https://github.com/gigouni/polymer2-medias-center/issues) and [pull requests here](https://github.com/gigouni/polymer2-medias-center/pulls).

## 1.7. License

See [LICENSE](./LICENSE).

## 1.8. Resources

- Videos samples: [www.divx.com/en/devices/profiles/video](www.divx.com/en/devices/profiles/video) & [http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5](http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5)