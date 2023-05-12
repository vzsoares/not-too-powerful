set -e

yarn vite build && \

aws s3 rm s3://not-too-powerful.zenhalab.com --recursive --profile myself && \
aws s3 cp ./dist s3://not-too-powerful.zenhalab.com/ --recursive --profile myself
