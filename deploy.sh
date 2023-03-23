#!/bin/bash

# bash -x ./deploy.sh 

# !run docker with env file, and expose port 4000 to host(ME)
# [zizmackrok@zizmackrok-ms7a33 server]$ docker run -p 4000:4000 --env-file .env nottoopowerful:latest

# !rund bash inside image
# [zizmackrok@zizmackrok-ms7a33 ~]$ docker run -it nottoopowerful:latest sh

# !docker build example command
# > docker image build --pull --file '/home/zizmackrok/Desktop/Code/not-too-powerful/Dockerfile' --tag 'nottoopowerful:latest' --label 'com.microsoft.created-by=visual-studio-code' '/home/zizmackrok/Desktop/Code/not-too-powerful' <

echo "building client"
(cd client/ && yarn vite build --emptyOutDir --outDir ../server/dist/) 

echo "building server"
(cd server/ && yarn build) 

echo "building docker image"
docker image build --no-cache --pull --file Dockerfile --tag 'nottoopowerful:latest' .

# TODO send to aws