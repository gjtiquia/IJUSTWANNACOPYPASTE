# I JUST WANNA COPY PASTE

all i wanna do is COPY AND PASTE SOME TEXT FROM ONE COMPUTER TO ANOTHER

## Fresh project

This project is developed with Fresh. You can follow the Fresh "Getting Started"
guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Manual Deployment

First run the following command, since ahead of time builds are required by the
tailwindcss plugin: https://fresh.deno.dev/docs/concepts/ahead-of-time-builds

```
deno task build
```

Then run the following command to build the docker image from the Dockerfile

(Ensure that Docker Desktop is running on your machine first)

```
docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t gjtiquia/ijustwannacopypaste .
```

Run the following command to test the docker image in local host port 80

```
docker run -t -i -p 80:8000 gjtiquia/ijustwannacopypaste
```

Using Docker Hub, can push the image to the public repository gjtiquia/ijustwannacopypaste

### CI/CD

GitHub Actions have been setup so that 
- Docker Hub image will be updated everytime on push to `main`
- Railway Redeploy will be triggered to use the latest docker image on Docker Hub
