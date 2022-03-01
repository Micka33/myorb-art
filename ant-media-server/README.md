# Docker Installation
## 1. Create Dockerfile
Download the Dockerfile file.

```
wget https://raw.githubusercontent.com/ant-media/Scripts/master/docker/Dockerfile_Process -O Dockerfile
```

## 2. Build Docker Image
Download and save Ant Media Server ZIP file in the same directory with Dockerfile. Then run the docker build command from command line

```
docker build --network=host -t antmediaserver --build-arg AntMediaServer=<Replace_With_Ant_Media_Server_Zip_File> .
```

## 3. Run the Docker Container
Now we have a docker container with Ant Media Server. Run the image.

```
docker run --network=host -it antmediaserver
OR
docker run -it antmediaserver -p 127.0.0.1:5080:5080
docker run -it antmediaserver --privileged=true -p 5080:80 -p 5443:443
```

## 4. Accessing Web panel
Open your browser and type http://SERVER_IP_ADDRESS:5080 to go to the web panel. If you're having difficulty in accessing the web panel, there may be a firewall that blocks accessing the 5080 port.
