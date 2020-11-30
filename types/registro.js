/*jshint esversion: 6 */
var express = require('express');
var admin = require("firebase-admin");
var serviceAccount = "newww.json";
var bodyParser = require('body-parser');

var app = express();


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sila-61516.firebaseio.com"
});

let db = admin.firestore();

app.use(bodyParser.json());
router = express.Router();

router.get('/listar', function(req, res) {
    var datos = [];
    const coleccion = db.collection('Usuarios');
    let Datos = coleccion.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                datos.push(doc.data());
            });
            res.json({
                status: 200,
                datos,
                message: "consulta realizada con exito"
            });

        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
});

router.post('/crear', function(req, res) {
    db.collection('Usuarios').add({
        clave: req.body.clave,
        correoElectronico: req.body.correo,
    }).then(function(docRef) {
        res.json({
            status: 200,
            data: docRef.id,
            message: "datos insertados con exito"
        });
    }).catch(function(error) {
        res.json({
            status: 404,
            message: "datos no pudo ser insertado"
        });
    });
});


app.use('/api', router);
const port = 3010;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


/*var email = document.getElementById('email').value;
var contra = document.getElementById('contra').value;

firebase.auth().createUserWithEmailAndPassword(email, contra)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
email - password.html*/

var apps = new Vue({
    el: '#app',
    data: {
        nombre: '',
        edad: 18,
        apellido: '',
        contra: '',
        correo: '',
        errorNombre: '',
        errorEdad: '',
        errorApellido: '',
        errorCorreo: '',
        errorContra: ''
    },


    methods: {
        /*registrar: function() {
            var email = document.getElementById('email').value;
            var contra = document.getElementById('contra').value;

            firebase.auth().createUserWithEmailAndPassword(email, contra)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    // ...
                });
            email - password.html
        },*/

        validarCorreo: function() {
            var expresion = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (this.correo === '' || !(expresion.test(this.correo))) {
                this.errorCorreo = 'Ingrese un correo valido, ejemplo (ejemplo@mail.com)';
            } else
                this.errorCorreo = '';
        },
        validarContra: function() {
            if (this.contra.length < 6 || this.contra.length > 12) {
                this.errorContra = 'Contraseña invalida (Debe tener entre 6 y 12 caracteres)';
            } else {
                this.errorContra = '';
            }
        },
        validarNombre: function() {
            if (this.nombre === '') {
                this.errorNombre = 'Campo obligatorio';
            } else
                this.errorNombre = '';
        },
        validarEdad: function() {
            if (this.edad < 18) {
                this.errorEdad = 'Debes ser mayor de 18 para registrarte';
            } else
                this.errorEdad = '';
        },
        validarApellido: function() {
            if (this.apellido === '') {
                this.errorApellido = 'Campo obligatorio';
            } else
                this.errorApellido = '';
        },
        validarReg: function() {
            this.validarNombre();
            this.validarApellido();
            this.validarEdad();
            this.validarCorreo();
            this.validarContra();
        }
    }
});


/*
function registrar() {
    var email = document.getElementById('email').value;
    var contra = document.getElementById('contra').value;

    firebase.auth().createUserWithEmailAndPassword(email, contra)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
    email - password.html
*/