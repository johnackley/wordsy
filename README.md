# summary

*Wordy* - a wordle-type game guessing tool

## example shell

```shell
for f in `a-z`; do
  # first position anchor
  look $f | \
    # anchors
    egrep '^..s..$' | \
    # duds
    egrep -v "[A-Zquiz]" | \
    # bad anchors
    egrep -v '^s|^.t|^..e|t$|e.$' | \
    # floaters
    egrep 'e' | \
    egrep 't' \
    ;
done
```

## cli input

The corresponding Wordsy cli input for the above example is:

`5 ..s.. et quiz s.... .t... ..e.. ...e. ....t`

# colophon

scaffolding: git@github.com:johnackley/ts-min-scaffold.git
