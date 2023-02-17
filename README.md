<div align="center">
    <img src="https://github.com/Codevendor/curry-console/blob/main/assets/curry-console.png?raw=true" alt="Logo" height="500px" width="475px" />
</div>

# curry-console - Overview
The [**curry-console**]() module extends the native console logging library with many extra features like **coloring**, **labels**, **recording**, **hiding**, **event emit notifications**, etc. 

All extended new features are included, without changing the native behavior of the methods console **log()**, **info()**, **warn()** and **debug()**. By implementing **JavaScript Currying**, we are able to extend in an easy to use informative way.

## Usage Examples
After installing the module, you can use it's features like so:

#### Simple Coloring Example:
```js
// Native
console.log('Native Testing');

// CurryConsole
console.log(COLOR.GREEN)('CurryConsole Testing');
```

#### Output
[Example1](https://github.com/Codevendor/curry-console/blob/main/assets/example1.png?raw=true)


If you are new to **currying** in **JavaScript**, the syntax may look strange above. Basically currying, allows you to add parenthesis to groups of parameters passed to nested return functions. If you would like to learn more about how to curry in **JavaScript**, here is a simple tutorial [JavaScript Currying](https://www.w3docs.com/learn-javascript/currying.html).



