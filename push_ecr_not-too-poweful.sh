set -e

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 355738159777.dkr.ecr.us-east-1.amazonaws.com

docker buildx build \
-t not-too-powerful \
--build-arg "VITE_DISCORD_GET_USER_CODE=https://discord.com/api/oauth2/authorize?client_id=1075578805579698196&redirect_uri=https%3A%2F%2Fnot-too-powerful.zenhalab.com%2F&response_type=code&scope=identify%20guilds" \
--build-arg "VITE_DISCORD_ADD_BOT_TO_SERVER=https://discord.com/api/oauth2/authorize?client_id=1075578805579698196&permissions=34816&scope=bot" \
--build-arg "VITE_API_BASE=https://not-too-powerful.zenhalab.com" .

docker tag not-too-powerful:latest 355738159777.dkr.ecr.us-east-1.amazonaws.com/not-too-powerful:latest

docker push 355738159777.dkr.ecr.us-east-1.amazonaws.com/not-too-powerful:latest
