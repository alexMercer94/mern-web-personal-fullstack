const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const User = require('../models/user');

/**
 * Register a user
 * @param {*} req
 * @param {*} res
 */
const signUp = (req, res) => {
    const user = new User();

    const { name, lastname, email, password, repeatPassword } = req.body;

    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = 'admin';
    user.active = false;

    if (!password || !repeatPassword) {
        res.status(404).send({ message: 'Las contraseñas son obligatorias' });
    } else {
        if (password !== repeatPassword) {
            res.status(404).send({ message: 'Las contraseñas son incorrectas' });
        } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                if (err) {
                    res.status(500).send({ message: 'Ha ocurrido un error.' });
                } else {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: 'El email ya se esta registrado.' });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: 'Error al crear el usuario' });
                            } else {
                                res.status(200).send({ user: userStored });
                            }
                        }
                    });
                }
            });
        }
    }
};

/**
 * Login user
 * @param {*} req
 * @param {*} res
 */
const signIn = (req, res) => {
    const params = req.body;
    const { email, password } = params;

    User.findOne({ email: email.toLowerCase() }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: 'Error del servidor.' });
        } else {
            if (!userStored) {
                res.status(404).send({ message: 'Usuario no encontrado.' });
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: 'Error del servidor.' });
                    } else if (!check) {
                        res.status(404).send({ message: 'La contraseña es incorrecta.' });
                    } else {
                        if (!userStored.active) {
                            res.status(200).send({ code: 200, message: 'El usuario no esta activo.' });
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored),
                            });
                        }
                    }
                });
            }
        }
    });
};

module.exports = {
    signUp,
    signIn,
};
