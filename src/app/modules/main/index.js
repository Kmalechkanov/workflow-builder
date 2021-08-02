flows = [
    {
        "id": 1,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/Array/ArrayPush",
        "name": "ArrayPush",
        "displayName": "Array Push",
        "description": "Adds an item to an array"
    },
    {
        "id": 2,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/Array/ArrayPop",
        "name": "ArrayPop",
        "displayName": "Array Pop",
        "desription": "Removes the last element from an array and returns the element as a result"
    },
    {
        "id": 3,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/Array/ArraySize",
        "name": "ArraySize",
        "desription": "Returns the size of an array"
    },
    {
        "id": 4,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/HttpRequest",
        "name": "HttpRequest",
        "displayName": "Http Request",
        "desription": "Make Http Requests such as GET, POST, PUT, PATCH, DELETE"
    },
    {
        "id": 5,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/JSON/JsonEncode",
        "name": "JsonEncode",
        "displayName": "JSON Encode",
        "desription": "Encode data to JSON string"
    },
    {
        "id": 6,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/JSON/JsonEncodePretty",
        "name": "JsonEncodePretty",
        "displayName": "JSON Pretty Encode",
        "desription": "Encode data to JSON string with pretty print"
    },
    {
        "id": 7,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/JSON/JsonParse",
        "name": "JsonParse",
        "displayName": "JSON Parse",
        "desription": "Parse a JSON string"
    },
    {
        "id": 8,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/JSON/JsonStringify",
        "name": "JsonStringify",
        "displayName": "JSON Stringify",
        "desription": "Converts an object into a JSON string"
    },
    {
        "id": 9,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Common/Sleep",
        "name": "Sleep",
        "displayName": "Sleep",
        "desription": "Sleep (wait) for a number of seconds before executing next block"
    },
    {
        "id": 11627249388581,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Slack/users/users_conversations",
        "name": "users_conversations",
        "desription": "List conversations the calling user may access"
    },
    {
        "id": 11,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Slack/users/users_list",
        "name": "users_list",
        "desription": "List all users in a Slack team"
    },
    {
        "id": 12,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Slack/chat/chat_postMessage",
        "name": "chat_postMessage",
        "desription": "Sends an ephermal message to a user in a channel"
    },
    {
        "id": 13,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Slack/chat/chat_delete",
        "name": "chat_delete",
        "desription": "Deletes a message"
    },
    {
        "id": 14,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Atlassian/Jira/Issues/CreateIssue",
        "name": "CreateIssue",
        "displayName": "Create Issue",
        "desription": "Creates an issue or a subtask"
    },
    {
        "id": 15,
        "created": 1627249388581,
        "lastUpdated": 1627249388581,
        "path": "/Atlassian/Jira/Issues/AssignIssue",
        "name": "AssignIssue",
        "displayName": "Assign Issue",
        "desription": "Assigns an issue to an user"
    }
]

let tree = { '': {} };
(() => {
    flows.forEach(flow => {
        addToTree('', flow.path.slice(1))
    })

    console.log(JSON.stringify(tree))
})()


function addToTree(selector, path) {
    commands = path.split('/')
    console.log('5', tree)
    console.log('1', selector)
    console.log('2', commands[0])
    console.log('3', path)
    console.log('4', resolvePath(tree, selector, '/'))
    if (!resolvePath(tree, selector, '/').hasOwnProperty(commands[0])) {
        setPath(tree, selector + '/' + commands[0], '/', {})
    }
    if (commands.length > 1) {
        if (selector == '') {
            addToTree(selector + '/' + commands[0], path.slice(commands[0].length + 1));
        } else {
            addToTree(selector + '/' + commands[0], path.slice(commands[0].length + 1));
        }
    }
}

function resolvePath(object, path, separator) {
    return path
        .split(separator)
        .reduce((o, p) => o ? o[p] : null, object)
}

function setPath(object, path, separator, value) {
    return path
        .split(separator)
        .reduce((o, p, i) => o[p] = path.split(separator).length === ++i ? value : o[p] || {}, object)
}
// function resolve(path, obj=self, separator='.') {
//     var properties = Array.isArray(path) ? path : path.split(separator)
//     return properties.reduce((prev, curr) => prev && prev[curr], obj)
// }

//working
/*

let tree = { '': {} };
(() => {
    flows.forEach(flow => {
        addToTree('', flow.path.slice(1))
    })

    console.log(JSON.stringify(tree))
})()


function addToTree(selector, path) {
    commands = path.split('/')
    // console.log('5', tree)
    // console.log('1', selector)
    // console.log('2', commands[0])
    // console.log('3', path)
    // console.log('4', resolvePath(tree, selector, '/'))
    if (!resolvePath(tree, selector, '/').hasOwnProperty(commands[0])) {
        setPath(tree, selector + '/' + commands[0], '/', {})
    }
    if (commands.length > 1) {
        if (selector == '') {
            addToTree(selector + '/' + commands[0], path.slice(commands[0].length + 1));
        } else {
            addToTree(selector + '/' + commands[0], path.slice(commands[0].length + 1));
        }
    }
}

function resolvePath(object, path, separator, defaultValue) {
    return path
        .split(separator)
        .reduce((o, p) => o ? o[p] : defaultValue, object)
}

function setPath(object, path, separator, value) {
    return path
        .split(separator)
        .reduce((o, p, i) => o[p] = path.split(separator).length === ++i ? value : o[p] || {}, object)
}

*/