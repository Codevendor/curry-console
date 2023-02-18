<div align="center">
    <img src="https://github.com/Codevendor/curry-console/blob/main/assets/curry-console.png?raw=true" alt="Logo" height="500px" width="475px" />
</div>

# curry-console - Overview
The [**curry-console**]() module extends the native console logging library with many extra features like **coloring**, **labels**, **profiling**, **recording**, **hiding**, **event emit notifications**, etc. 

All extended new features are included, without changing the native behavior of the methods console **log()**, **info()**, **warn()** and **debug()**. By implementing **JavaScript Currying**, we are able to extend in an easy to use informative way.

## Installation
The latest [curry-console]() esmodule can be installed with following **npm** command.
```sh
npm i curry-console
```

If you would like to clone the git repository for the module, use the command:
```sh
git clone https://github.com/Codevendor/curry-console.git
```

## Importing Module
You need to import the esmodule into your code and initiate it. The [curryConsole]() class will attach itself to [console.log()](), [console.info()](), [console.warn()]() and [console.error()]() native methods through currying. 
```js
import { curryConsole, COLOR, LABEL } from "curry-console";
const curr = new curryConsole();
```

## Usage Examples
After installing and importing the module, you can use it's features like so:

### Simple Coloring Example:
```js
// Native
console.log('Native Testing');

// CurryConsole
console.log(COLOR.GREEN)('CurryConsole Testing');
```

#### Output:
![Example1](https://github.com/Codevendor/curry-console/blob/main/assets/example1.png?raw=true)

If you are new to **currying** in **JavaScript**, the syntax may look strange above. Basically currying, allows you to add parenthesis to groups of parameters passed to nested return functions. If you would like to learn more about how to curry in **JavaScript**, here is a simple tutorial [JavaScript Currying](https://www.w3docs.com/learn-javascript/currying.html).

Normally you would expect the second version to error, but [**CurryConsole**]() extends it through currying. The const param [COLOR.GREEN]() changes the color of the log message to green. So simple, but yet so powerfull. 

### Multi Coloring Example:
```js
// Multi Color Test
console.log(COLOR.BG_BLUE, COLOR.WHITE)('CurryConsole Testing');
```

The above example adds two color types to the text. Sets the background color to [COLOR.BG_BLUE]() and the text to [COLOR.WHITE](). Notice they are passed in the first parenthesis group as parameters. You can specify as many as you want in any order. Also, foreground color can be specified like [COLOR.FG_WHITE]() as well. 

#### Output:
![Example2](https://github.com/Codevendor/curry-console/blob/main/assets/example2.png?raw=true)

### Color Effects Example:
```js
// Color Effects Test
console.log(COLOR.RED, COLOR.BLINK)('CurryConsole Testing');
```

You can also add color effects to your text. In the above example we set the text color to [COLOR.RED]() and the effect to [COLOR.BLINK](). This causes the text to blink on and off.

#### Output:
![Example3](https://github.com/Codevendor/curry-console/blob/main/assets/example3.gif?raw=true)

### Label Example:

Label tags are an awesome feature for identifying what process created the log message. You are free to use the label for anything you want. To use labels, you need to add a LABEL constant to your curry. 

**Format**: console.log([COLOR|LABEL|FEATURE]())("LABEL-STRING")("MSG")

```js
console.log(LABEL.BG_BLUE, LABEL.WHITE, COLOR.WHITE)('MY-LABEL')('CurryConsole Testing');
```

#### Output:
![Example4](https://github.com/Codevendor/curry-console/blob/main/assets/example4.png?raw=true)






