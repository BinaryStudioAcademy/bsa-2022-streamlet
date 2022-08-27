#!/bin/bash

CONTAINER_IS_READY='Instance is ready to test!'
CONTAINER_IS_NOT_READY='Instance did not start!'

function wait_until_healthy () {
	CONTAINER=$1
	counter=0
	status="$(docker inspect --format="{{json .State.Health.Status}}" "$CONTAINER")"
	while [[ $status != "\"healthy\"" && $counter -lt 10 ]]
	do
		counter=$(($counter+1))
		sleep 1
		status=$(docker inspect --format="{{json .State.Health.Status}}" "$CONTAINER")
	done

	if [[ $status != "\"healthy\"" ]]; then
		echo "$CONTAINER was not started!"
		docker ps
		echo "$CONTAINER_IS_NOT_READY"
		exit 1
	else
	  echo "$CONTAINER: was started successfully!"
	fi
}


wait_until_healthy "backend"
wait_until_healthy "push"
wait_until_healthy "rabbitmq"
wait_until_healthy "api-db"
