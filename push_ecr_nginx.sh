set -e

cd .nginx/

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 355738159777.dkr.ecr.us-east-1.amazonaws.com

docker buildx build -t nginx-tasty-water --build-arg "IMAGE_NAME_4000=not-too-powerful" .

docker tag nginx-tasty-water:latest 355738159777.dkr.ecr.us-east-1.amazonaws.com/nginx-tasty-water:latest

docker push 355738159777.dkr.ecr.us-east-1.amazonaws.com/nginx-tasty-water:latest
