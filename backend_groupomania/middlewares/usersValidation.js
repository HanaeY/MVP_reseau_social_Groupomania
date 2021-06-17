
// imports

//constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 8 caractères min, au moins 1 lettre, 1 chiffre et 1 caractère spécial
const TEXT_REGEX = /^[a-zA-Zéàèï\d\-_.,!'\s]+$/i

exports.validateUsername = (req, res, next) => {
    if(req.body.username.length >=13 || req.body.username.length <=4){
        res.status(400).json({'error' : "le nom d'utilisateur doit comprendre entre 3 et 12 caractères !"});
    }
    if(!TEXT_REGEX.test(req.body.username)) {
        res.status(400).json({'error' : "le nom d'utilisateur ne doit pas contenir de caractères spéciaux !"});  
    }
    next();
}; 

exports.validateEmail = (req, res, next) => {
   if(!EMAIL_REGEX.test(req.body.email)) {
    res.status(400).json({'error' : "email invalide !"});
   } 
   next();
};

exports.validatePassword = (req, res, next) => {
    if(!PASSWORD_REGEX.test(req.body.password)) {
        res.status(400).json({'error' : "Le mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 nombre et un caractère spécial!"});
    }
    next();
};



