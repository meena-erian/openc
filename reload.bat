docker container rm -f openc
docker image rm openc-app
docker build --tag openc-app .
docker run -d -p 3009:3000 --name openc openc-app