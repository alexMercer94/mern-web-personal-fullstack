const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const User = require('../models/user');

const signUp = (req, res) => {
    const user = new User();

    const { name, lastname, email, password, repeatPassword } = req.body;

    user.name = name;
    user.lastname = lastname;
    user.email = email;
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

module.exports = {
    signUp,
};
