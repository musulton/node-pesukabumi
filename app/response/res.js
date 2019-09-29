exports.ok = function(values, res){
    const data = {
        'statusCode': 200,
        'values': values
    };
    res.json(data);
    res.end();
};

exports.err = function(values, res){
    const data = {
        'statusCode': 400,
        'values': values
    };
    res.json(data);
    res.end();
};

exports.unauthorized = function(values, res){
    const data = {
        'statusCode': 500,
        'values': values
    };
    res.json(data);
    res.end();
};