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

`5 ..s.. et quiz 0,s 1,t 2,e 3,e 4,t`

# Starter words

For 5 letter games, I've been using _orate_, _lucid_, and _nymph_ based on a tip from someone at work.

Based on Frequencies (see below), I will start using _inert_, _shoal_, and _dumpy_ for 5 letter games.
And _retina_, _slouch_, and ? for 6 letter games.

## Frequencies

Based on letter frequencies in English, the following inputs will generate potentially good starting words:

`6 - erntsa`
`6 - erntsi`
`6 - erntso`

`5 - ernta`
`5 - ernti`
`5 - ernto`

## Frequency-weighting

When the results list is long-ish, we can post-process this to order the results by frequency-weighting.

# colophon

scaffolding: git@github.com:johnackley/ts-min-scaffold.git
