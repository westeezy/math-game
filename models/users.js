'use strict';

// Keep track of which names are used so that there are no duplicates
var userNames = (function() {
    var names = {};

    var claim = function(name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = {
                points: 0
            };
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function(name) {
        var nextUserId = 0;
        name = name ? name : 'Guest ';

        do {
            name = nextUserId > 0 ? name + nextUserId : name;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    var get = function() {
        var res = [];
        for (var user in names) {
            res.push({
                'name': user,
                'points': names[user].points
            });
        }

        return res;
    };

    var free = function(name) {
        if (names[name]) {
            delete names[name];
        }
    };

    var addPoints = function(user, inc) {
        names[user].points += inc;
        return names[user].points;
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getGuestName: getGuestName,
        addPoints: addPoints
    };
}());

module.exports = {
    claim: userNames.claim,
    free: userNames.free,
    get: userNames.get,
    getGuestName: userNames.getGuestName,
    addPoints: userNames.addPoints
};