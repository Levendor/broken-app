const jwt = require('jsonwebtoken');
var User = require('../models/user')(require('../db'), require('sequelize').DataTypes);;

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();   // allowing options as a method for request
    } else {
        var sessionToken = req.headers.authorization;
        console.log(sessionToken);
        if (!sessionToken) return res.status(403).json({
            auth: false,
            message: "No token provided."
        });
        else {
            jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        console.log(`user: ${user}`)
                        next()
                    },
                        function () {
                            res.status(401).json({
                                message: "Not authorized"
                            });
                        })

                } else {
                    res.status(400).json({
                        message: "Not authorized"
                    })
                }
            });
        }
    }
}