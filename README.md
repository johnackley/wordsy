# summary

*Wordy* - a wordle-type game guessing tool

# scaffolding: ts-min-scaffold

git@github.com:johnackley/ts-min-scaffold.git

# example shell

```shell
for f in `a-z`; do
  # first position anchor
  look $f | \
    # anchors
    egrep '^..s..$' | \
    # duds
    egrep -v "[A-Z${duds}]" | \
    # bad anchors
    egrep -v '^s|^.t|^..e|t$|e.$' | \
    # floaters
    egrep 'e|t';
done
```
