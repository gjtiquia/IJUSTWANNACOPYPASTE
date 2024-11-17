# I JUST WANNA COPY PASTE

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

### Deployment

First run the following command, since ahead of time builds are required by the
tailwindcss plugin: https://fresh.deno.dev/docs/concepts/ahead-of-time-builds

```
deno task build
```

Then run the following command to build the docker image from the Dockerfile

```
docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t ijustwannacopypaste .
```

Run the following command to test the docker image in local host port 80

```
docker run -t -i -p 80:8000 ijustwannacopypaste
```
