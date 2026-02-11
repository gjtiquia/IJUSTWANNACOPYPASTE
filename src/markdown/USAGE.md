# IJUSTWANNACOPYPASTE

note: 
- only text is supported
- do not send sensitive information

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

# POST lines from file (--data-binary preserves newlines, -d does not)
curl -L cp.gjt.io/fromFile --data-binary @file.txt

```
