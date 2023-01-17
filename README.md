# WashTrak

WashTrak allows for the tracking of the current state of the washing machine. For this it uses a ESP32-Board with a MPU-6050 sensor.

## Backend

For the backend an ExpressJS server was used, that offers REST-Routes for the data on all machines currently in use. For more information please refer to the [Backend-Readme](https://github.com/troppes/washtrak/tree/master/backend).

## Frontend

The frontend was built with Svelte-Kit. If offers support for user / machine creation, modificacion and deletion, as well as a dashboard for the current status of all machines. For more information please refer to the [Frontend-Readme](https://github.com/troppes/washtrak/tree/master/frontend).

## Controller

The controller collects the sensor data and calculates the current status of the machine. It then connects to the REST-API and uploads the results. The software is written in C/C++ for Arduino. For more information please refer to the [Controller-Readme](https://github.com/troppes/washtrak/tree/master/controller).

## Container

There are two containers available for deployment purposes. If you only want to deploy the backend, please refer to the API-Documentation: COMING SOON!

### Docker-Compose

A docker-compose file can be found at [https://github.com/troppes/washtrak/blob/master/docker-compose.yml](https://github.com/troppes/washtrak/blob/master/docker-compose.yml). It assumes the deployment for localhost. If you want to deploy in production, please refer to the Readme-Files at Dockerhub. Links can be found in the specific Readme-Files for the frontend and backend.

### Ansible

A simple ansible deployment task can be found at [https://github.com/troppes/playbooks-public/tree/main/docker/roles/washtrak](https://github.com/troppes/playbooks-public/tree/main/docker/roles/washtrak)

## Future

- After measuring the payment gateway, it was found out that a pin delivers a different voltage depending if the machine is running or not. This can be used for build a better start/end detection.

- During the measurement we detected also that is was possible to skip the payment by shorting two pins. This can potentially be used later on for online payments.