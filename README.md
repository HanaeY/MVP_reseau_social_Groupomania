# Introduction
Projet réalisé dans le cadre du parcours de formation "web développeur" Openclassrooms (projet n°7). 
## Objectifs
Construire un réseau social interne pour une entreprise ([spécifications fonctionnelles](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf)) reprenant les fonctionnalités de deux produits déjà existants : 9GAG (partage de contenu multimedia) et reddit (partage d'articles). Les pages du projet doivent respecter les standards WCAG. 

Les compétences évaluées sur ce projet sont : 
* Personnaliser le contenu envoyé à un client web
* Authentifier un utilisateur et maintenir sa session
* Gérer un stockage de données à l'aide de SQL
* Implémenter un stockage de données sécurisé en utilisant SQL

## MVP
Une seule des deux fonctionnalités sera développée pour le MVP qui sera présenté au client, et ce afin de s'assurer que ses attentes aient bien été comprises avant de continuer le développement de l'application. 

# Installation et utilisation 
### Outils recommandés : Visual Studio Code, Git Bash
### Installation nécessaire : MySQL (détaillé plus bas)

## Cloner le présent projet en local 
* Ouvrez git bash depuis le répertoire de votre choix sur votre machine puis lancer la commande suivante : `git clone https://github.com/HanaeY/groupomania-v0.git`
* Ouvrez le projet dans un éditeur de code (par exemple VSCode)

## Lancement du serveur backend
* Depuis l'éditeur de code, ouvrez un nouveau terminal et rentrez dans le dossier backend du projet avec la commande `cd backend_groupomania` 
* Éxecutez la commande `npm install` pour installer les dépendances
* Installer nodemon server : `npm install --save-dev nodemon`
* Rentrez la commande `nodemon server` (cela permet de recharger le server à chaque modification d'un des fichiers du projet)
* Laissez tourner le serveur en arrière-plan

## Variables d'environnement
Dans l'éditeur de code, dans le fichier du backend ".env.exemple", rentrez une clé secrète de votre choix (elle sera utilisée pour l'authentification par token), puis renommez le fichier ".env". 

## Création de la base de données locale 
* Installez MySQL sur votre machine
    * Lien d'installation : https://dev.mysql.com/downloads/windows/installer/8.0.html
    * Choisissez le type d'installation "Developer default"
    * Lancez l'installation et laissez les options par défaut 
    * Choisissez un mot de passe pour l'utilisateur par défaut de MySQL (utilisateur root) et consevez le précieusement, rentrez le mot de passe à l'étape de configuration 
    * Ajouter le chemin vers MySQL aux dossiers explorés par l'invite de commande en ajoutant l'ajoutant au path (ce devrait être un chemin comme celui-ci : "C:\Program Files\MySQL\MySQL Server 5.6\bin")
* Se connecter à MySQL :
    * Ouvrez l'invit de commande et se connecter à MySQL avec les accès de l'utilisateur "root", à l'aide de la commande : `mysql -h localhost -u root -p`, il est ensuite demandé de rentrer le mot de passe de l'utilisateur (choisi lors de la configuration de MySQL)
* Créer un nouvel utilisateur MySQL pour le projet : 
    * Depuis le même invit de commande lancez la commande suivante : `create user nom@localhost identified by 'mdp';` (remplacer 'nom' et 'mdp' par votre nom d'utilisateur et mot de passe), 
    * puis quittez avec la commande `exit;`
* Configurer la base de données:  
    * Retournez sur l'éditeur de code et dans le dossier backend_groupomania, allez dans le dossier "config", puis le fichier "config.json"
    * Remplacez le nom d'utilisateur et le mot de passe pour chaque base de donnée par ceux de votre nouvel utilisateur MySQL et enregistrez
* Toujours depuis l'éditeur de code, ouvrez un nouveau terminal et allez dans le dossier backend_groupomania du projet, créez une nouvelle base de données à l'aide des commandes suivantes :
    * `sequelize db:create`
    * `sequelize db:migrate`
* Vérifier que tout a bien fonctionné :  
    * Retournez dans l'invit de commande et connectez vous avec au compte du nouvel utilisateur : `mysql -u nomdutilisateur -p`, puis rentrez le mot de passe du compte 
    * Allez dans la base de donnée de développement avec la commande : `use database_development_groupomania;`
    * Avec la commande `SHOW TABLES;` vous verrez la liste des tables de la base de données (users, articles, comments)
    * Avec la commande `SELECT * FROM USERS;` vous verrez apparaitre le contenu de la table users (qui pour le moment est vide)
    * Ne pas quitter l'invit de commande (on en aura besoin lors qu'une étape à venir...)

## Lancement du serveur frontend
Depuis l'éditeur de code ouvert, ouvrez un nouveau terminal et aller dans le dossier frontend du projet avec la commande `cd frontend_groupomania`
* Lancer la commande `npm install` pour installer les dépendances
* Lancer le serveur front avec la commande `npm run serve`
* Laisser tourner le serveur en arrière-plan

* Vous pouvez mainenant aller sur l'url donnée par le front - vue CLI - pour tester l'application

## Création d'un profil admin 
* Créez un nouveau compte directement depuis l'application (page signup) avec les identifiants de votre choix
* Retournez sur l'invit de commande ouvert sur mysql
* Passer l'utilisateur créé sur l'application en admin (remplacer "nom") : `UPDATE users SET isadmin = 1 WHERE username = 'nom';`
* Cet admin a maintenant la possiblité de modérer les articles et commentaires publiés sur l'application 

# Technologies utilisées 

* Vue.js
* Node.js
* Express
* MySQL
* Sequelize 