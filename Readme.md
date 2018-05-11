# AWAIT EXAMPLE
A simple Node script to elaborate the difference between
`return await <function_call>` and `return <function_call>` and why it is redundant


## Script output
```
requestList result: Promise { [ 'a', 'b', 'c' ] }
getList result: Promise { [ 'a', 'b', 'c' ] }
getListUsingAwait result: Promise { <pending> }
the list from requestList is: [ 'a', 'b', 'c' ]
the list from getList is: [ 'a', 'b', 'c' ]
the list from getListUsingAwait is: [ 'a', 'b', 'c' ]
```

You should notice something odd about the result from `getListUsingAwait`. It is a **Promise of a Promise**.
Realistically, this wouldn't be an issue, but this would take up more memory if done on a larger scale.


# AN EXCEPTION TO THE RULE
Looking at another example, found here: https://github.com/eslint/eslint/issues/7581
Note that errors thrown by an async function can get swallowed, thus making try/catch useless.

**It's imperative that functions with try/catch blocks use `return await` in order to avoid rejecting too early and returning the result of the rejection.**
```javascript
function asyncLog() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('first log');
      resolve(true);
    }, 1000);
  });
}

async function foo() {
  try {
    return await asyncLog();
    // I really need this await, but no-return-await is complaining about it :(
  } finally {
    console.log('second log');
  }
}

foo();
// first log
// second log


async function bar() {
  try {
    return asyncLog();
  } finally {
    console.log('second log');
  }
}

bar();
// second log
// first log


async function baz() {
  try {
    return asyncLog();
  } catch (error) {
    // if asyncLog() rejects, error will be swallowed because I missed await :(
  }
}
```
