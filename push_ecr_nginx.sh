set -e

cd .nginx/

AWS_REGION=$1
AWS_ACCOUNT_ID=$2
IMAGE_NAME_4000=$3
IMAGE_NAME_ROOT=$4 
IMAGE_NAME_ROOT_VERSION=$5

aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

docker buildx build -t ${IMAGE_NAME_ROOT} --build-arg "IMAGE_NAME_4000=${IMAGE_NAME_4000}" .

docker tag ${IMAGE_NAME_ROOT}:${IMAGE_NAME_ROOT_VERSION} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME_ROOT}:${IMAGE_NAME_ROOT_VERSION}

docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME_ROOT}:${IMAGE_NAME_ROOT_VERSION}