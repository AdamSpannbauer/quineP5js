#!/usr/bin/env python3

"""
Save `sketch.js` contents to a variable.

Saves `sketch.js` to an exported var in a js file.
The output js file will only contain:
`export default SKETCH_CODE = '<sketch.js contents>'`

Usage: 
    * Intended to run everytime `sketch.js` is saved
        * i.e. vscode's runonsave extension
"""

input_file = "sketch.js"
output_file = "sketchCodeStr.js"
output_str_var_name = "SKETCH_CODE"

with open(input_file, "r") as f:
    contents = f.read()

output = f"export const {output_str_var_name} = `{contents}`;\n"

with open(output_file, "w") as f:
    f.write(output)
