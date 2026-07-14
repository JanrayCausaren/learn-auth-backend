// async function hello() {
//   return "Hello";
// }
// function hello() {
//   return Promise.resolve("Hello");
// }

// try...catch — Error Handling
// Its job is to handle exceptions (errors that are thrown).

// async
// async marks a function as asynchronous.
// It tells JavaScript:
// "This function always returns a Promise."

// await
// await waits for a Promise to finish.

// async function hello() {
//   throw new Error("Oops");
// }

// function hello() {
//   return Promise.reject(new Error("Oops"));
// }

const result =  hello();
console.log(result);
