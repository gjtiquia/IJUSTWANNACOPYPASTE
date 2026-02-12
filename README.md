# IJUSTWANNACOPYPASTE

I JUST WANNA COPY AND PASTE SOME TEXT   
FROM ONE COMPUTER TO ANOTHER   
IT SHOULDNT BE THAT HARD   

btw:
- pls do not send sensitive information

## basic usage

```bash

# POST "bar" to room "foo"
curl -L cp.gjt.io/foo -d "bar"

# GET "bar" from room "foo"
curl -L cp.gjt.io/foo

```

## advanced usage

```bash

# POST several lines to room "lines"
curl -L cp.gjt.io/lines -d $'FirstLine\nSecondLine'

# POST lines from file "contents.txt" 
# (--data-binary preserves newlines, -d does not)
curl -L cp.gjt.io/fromFile --data-binary @contents.txt

# GET lines from room "foo" and write to file "contents.txt"
curl -sL cp.gjt.io/foo > contents.txt

```

## commands

```bash
# install dependencies
bun install

# dev server
bun run dev
```
