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
