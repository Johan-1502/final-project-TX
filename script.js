new Vue({
    el: '#app',
    data: {
        users: [{ username: "Johan", password: "1234" }],
        id: 0,
        showHash: false,
        step: 1,
        hashCode: 0,
        randomNumber: 0,
        showButton: false,
        username: "",
        currentMessage: "",
        showStage1: false,
        showStage2: false,
        showStage3: false,
        showStage4: false,
        showMessage: false,
        showInformation: false,
        showNameForm: true,
        showAnswerForm: false,
        recivedAnswer: "",
        textToTransform: "",
        recivedAnswer: "",
        expectedAnswer: "",
        password: "",
        showDenied: false,
        showAllowed: false,
        showLogIn: true,
        accessClass: "success-message",
        accessMessage: "",
        buttonText: "Siguiente paso",
        showFormUser: false,
        userToCreate: "",
        passwordToCreate: "",
        showUsers: false,
        userExist: true,
        haveShowButtons: true
    },
    methods: {
        handleSubmit() {
            this.haveShowButtons = false;
            this.showStage1 = true;
            this.currentMessage = "Conexón establecida con el usuario";
            this.showButton = true;
            this.showMessage = true;
        },
        nextStep() {
            document.activeElement.blur();
            this.addStep();
            let user = null;
            switch (this.step) {
                case 2:
                    this.userExist = true;
                    this.id++;
                    this.showInformation = true;
                    this.randomNumber = Math.floor(10000 + Math.random() * 90000);
                    this.currentMessage = "Se ha generado el código aleatorio " + this.randomNumber + " para enviar";
                    break;
                case 3:
                    this.showMessage = false;
                    this.showStage2 = true;
                    this.currentMessage = "Enviando información al usuario";
                    this.showNameForm = false;
                    this.showAnswerForm = true;
                    this.showButton = false;
                    break;
                case 4:
                    this.showButton = true;
                    this.showMessage = true;
                    this.showStage3 = true;
                    this.currentMessage = "Información recibida por parte del usuario";
                    break;
                case 5:
                    user = this.users.find(u => u.username === this.username)
                    if (user) {
                        this.expectedAnswer = this.generateHash();
                        this.showStage4 = true;
                        this.currentMessage = "Procediendo a validar la respuesta del usuario";
                    }else{
                        this.expectedAnswer = "Usuario no encontrado";
                        this.showStage4 = true;
                        this.currentMessage = "Usuario no encontrado en el sistema";
                    }
                    break;
                case 6:
                    this.showMessage = false;
                    user = this.users.find(u => u.username === this.username)
                    if (user) {
                        if (this.expectedAnswer == this.recivedAnswer) {
                            this.showLogIn = false;
                            this.showAllowed = true;
                            this.currentMessage = "Acceso concedido al usuario";
                            this.accessMessage = "Acceso concedido al sistema";
                            this.accessClass = "success-message";
                        } else {
                            this.showLogIn = false;
                            this.showDenied = true;
                            this.currentMessage = "Acceso denegado al usuario";
                            this.accessMessage = "Acceso denegado al sistema";
                            this.accessClass = "error-message";
                        }
                    } else {
                        this.currentMessage = "Acceso concedido al usuario";
                        this.showLogIn = false;
                        this.showDenied = true;
                        this.currentMessage = "Acceso denegado al usuario";
                        this.accessMessage = "Acceso denegado al sistema";
                        this.accessClass = "error-message";
                    }
                    this.buttonText = "Reiniciar simulación"
                    break;
                case 7:
                    this.resetValues();
                    break;
                default:
                    break;
            }
        },
        resetValues() {
            this.step = 1;
            this.showHash = false;
            this.hashCode = 0;
            this.randomNumber = 0;
            this.showButton = false;
            this.username = "";
            this.currentMessage = "";
            this.showStage1 = false;
            this.showStage2 = false;
            this.showStage3 = false;
            this.showStage4 = false;
            this.showMessage = false;
            this.showInformation = false;
            this.showNameForm = true;
            this.showAnswerForm = false;
            this.recivedAnswer = "";
            this.textToTransform = "";
            this.expectedAnswer = "";
            this.password = "";
            this.showDenied = false;
            this.showAllowed = false;
            this.showLogIn = true;
            this.accessClass = "success-message";
            this.accessMessage = "";
            this.buttonText = "Siguiente paso";
            this.haveShowButtons = true;
        },
        addStep() {
            this.step++;
        },
        createHashForClient() {
            document.activeElement.blur();
            this.hashCode = CryptoJS.MD5(this.textToTransform).toString();
            this.showHash = true;
        },
        generateHash() {
            const password = this.searchUserPassword();
            this.password = password;
            return CryptoJS.MD5(this.id + "" + this.randomNumber + password).toString();
        },
        searchUserPassword() {
            const user = this.users.find(u => u.username === this.username);
            return user.password;
        },
        showUserForm() {
            this.showFormUser = true;
        },
        hideUserForm() {
            this.showFormUser = false;
        },
        createUser() {
            this.users.push({ username: this.userToCreate, password: this.passwordToCreate });
            this.userToCreate = "";
            this.passwordToCreate = "";
            this.showFormUser = false;
        },
        showUsersPanel() {
            this.showUsers = true;
        },
        hideUsersPanel() {
            this.showUsers = false;
        }
    }
});