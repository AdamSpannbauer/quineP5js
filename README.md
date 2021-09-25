# A Quine Design in p5js

<p align="center">
  <img src="exampleOutput.svg" width="75%" />
</p>

From [Wikipedia](<https://en.wikipedia.org/wiki/Quine_(computing)>):

> A quine is a computer program which takes no input and produces a copy of its own source code as its only output. The standard terms for these programs in the computability theory and computer science literature are "self-replicating programs", "self-reproducing programs", and "self-copying programs".

This project's goal was to have a `sketch.js` file output itself to an html canvas. And as someone who uses the #generativeart tag on Instagram, I couldn't resist adding in some `noise()` to the output characters.

## How it works

To be upfront, I'm a javascript hobbyist, so I'm lacking some formal training. I'm not sure if I built the best way to do this, or if I jumped through some extra hoops. Regardless, I had fun and was able to learn about a very useful VSCode extension.

### Run on Save VSCode extension

The main workhorse of the whole process is found in [.vscode/settings.json](.vscode/settings.json). The [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) extension does the rest.

With the below configuration, everytime the file `sketch.js` is saved, a python script is run. This python script copys the contents of `sketch.js` to a string variable. This string is then read by `sketch.js` (i.e. it's reading itself).

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "sketch.js",
        "cmd": "./copyFileToVar.py"
      }
    ]
  }
}
```

### The p5js sketch

I won't comment too much on the sketch itself. The workhorse functions are all fairly documented (esp by side project standards).

Note some of the coding decisions in `sketch.js` were made for design reasons rather than best practices.
