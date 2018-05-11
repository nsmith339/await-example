async function requestList() {
    // "requests" a list to be returned
    // imagine this functionality is in an external package

    return new Promise(resolve => {
        // promise that resolves a list
        resolve(['a', 'b', 'c']);
    });
}

async function getList() {
    // awaits the requestList Promise and returns the result
    return requestList();
}

async function getListUsingAwait() {
    // returns the requestList Promise
    // this await is deemed redundant
    return await requestList();
}

// Note that all three of these will achieve the same result
// The only difference is that return await will return a Promise to a pending promise
let result;
result = requestList(); // should return a promise
console.log('requestList result:', result);
result.then(res => {
    console.log('the list from requestList is:', res);
});

result = getList(); // should return a promise
console.log('getList result:', result);
result.then(res => {
    console.log('the list from getList is:', res);
});

result = getListUsingAwait(); // returns with an extra wrapped promise
// however, this doesn't affect execution other than doing an extra resolve

console.log('getListUsingAwait result:', result);
result.then(res => {
    console.log('the list from getListUsingAwait is:', res);
});
