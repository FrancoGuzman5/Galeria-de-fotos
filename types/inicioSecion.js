var app = new Vue({
    el: '#app',
    data: {
        contra: '',
        correo: '',
        errorCorreo: '',
        errorContra: ''
    },
    methods: {

        /* inicio: function(){
             firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                 // Handle Errors here.
                 var errorCode = error.code;
                 var errorMessage = error.message;
                 // ...
               });
         },
         */
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
        validarLog: function() {
            this.validarCorreo();
            this.validarContra();
        }
    }
});