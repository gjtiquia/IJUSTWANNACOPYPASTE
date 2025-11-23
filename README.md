# IJUSTWANNACOPYPASTE

```bash
# TODO : this detailed usage should... be in its own file...?
# TODO : base README should just contain basic usage
# basic usage

# POST "some text" to room named "foo"
curl cp.gjt.io/foo -d "some text"

# with new lines
curl cp.gjt.io/foo -d $'first\nsecond'

# with file (--data-binary preserves newline characters, -d does not)
curl cp.gjt.io/foo --data-binary @filename.txt

# GET from room "foo" to stdout
curl -fsSL cp.gjt.io/foo

# GET to file
# TODO : need to test if this actually works
# TODO : might be worth doing integration tests with a bash shell...?
curl -LO cp.gjt.io/foo
```
