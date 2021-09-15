exports.ErrorDo = function (data, name = "Error") {
    const errorDoData = `${name} ${data}`;
    console.error(errorDoData);
    return errorDoData
}

exports.LogDo = function (data, name = "") {
    const logDoData = `${name} ${data}`;
    console.log(logDoData);
    return logDoData;
}

exports.EmptyDo = function (data = "") { }