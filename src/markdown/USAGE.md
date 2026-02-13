# IJUSTWANNACOPYPASTE

I JUST WANNA COPY PASTE SOME TEXT   
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

## windows basic usage (PowerShell)

```ps1
# POST "bar" to room "foo"
Invoke-RestMethod cp.gjt.io/foo -Method Post -Body "bar"

# GET "bar" from room "foo"
Invoke-RestMethod cp.gjt.io/foo
```

note: `curl` should be available in CMD (Command Prompt) since 2018

