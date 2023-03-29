#!/bin/bash

# bash -x ./deploy.sh 

# !start docker
# sudo dockerd

# !run docker with env file, and expose port 4000 to host(ME)
# docker run -p 4000:4000 --env-file .env nottoopowerful:latest


echo "building client"
(cd client/ && yarn vite build --emptyOutDir --outDir ../server/dist/) 

echo "building server"
(cd server/ && yarn build) 

echo "building docker image"
docker buildx build --no-cache --pull --file Dockerfile -t gum-bults .

echo "docker tag ecr"
docker tag gum-bults:latest 355738159777.dkr.ecr.us-east-1.amazonaws.com/gum-bults:latest

echo "EXEC AWS - DOCKER LOGIN"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 355738159777.dkr.ecr.us-east-1.amazonaws.com

echo "EXEC DOCKER PUSH"
docker push 355738159777.dkr.ecr.us-east-1.amazonaws.com/gum-bults:latest

# TODO automate deploy
# EX: echo eval $(aws ecs update-service --cluster aprova-custer-prod --service approva-connect --force-new-deployment --region us-east-1)

# https://not-to-poweful-dev-balancer-2099129308.us-east-1.elb.amazonaws.com/

# prod bug, do not use https with invalid ssl or discordapi will cry