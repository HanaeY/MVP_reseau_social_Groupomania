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
Cloner le présent projet en local.

## Lancement du serveur backend
* Depuis le dossier backend_groupomania du projet, ouvrir un nouveau terminal et exécuter la commande `npm install` pour installer les dépendances
* Puis la commande `nodemon server` (cela permet de recharger le server à chaque modification d'un des fichiers du projet)
* Laisser tourner le serveur en arrière-plan

## Variables d'environnement
Dans le fichier du backend .env.exemple, affecter les valeurs souhaitées au port et à la clé secrète (pour l'authentification par token), puis copier le fichier pour créer un nouveau fichier .env. 

## Création de la base de données locale 
* Installer MySQL
* Créer un nouvel utilisateur mysql (qui aura les droits sur la base de données)
    * Ouvrir l'invite de commande et connecter l'utilisateur root : `mysql -u root -p`
    * Créer un nouvel utilisateur pour la base de données groupomania (remplacer 'nom' et 'mdp') : `create user nom@localhost identified by 'mdp';`
* Dans le dossier backend_groupomania du projet > dossier config > fichier config.json, remplacer le nom d'utilisateur et le mot de passe pour chaque base de donnée ceux de votre utilisateur mysql
* Créer une nouvelle base de données à l'aide des commandes suivantes dans un nouveau terminal, dossier backend_groupomania : 
    * `sequelize db:create`
    * `sequelize db:migrate`

## Lancement du serveur frondend
Depuis le dossier frontend_groupomania 
* Lancer la commande `npm install` pour installer les dépendances
* Lancer le serveur front avec la commande `npm run serve`
* Laisser tourner le serveur en arrière-plan

* Vous pouvez mainenant aller sur l'url donnée par le front - vue CLI - pour tester l'application !

## Création d'un profil admin 
* Créer un nouveau compte directement depuis l'application (page signup)
* Ouvrir l'invite de commande et lancer mysql avec les identifiants que vous venez de créer à l'aide de cette commande : `mysql -u nomutilisateur -p`, puis rentrez le mot de passe
* Aller dans la base de donnée de développement : `use database_development_groupomania;`
* Passer l'utilisateur créé sur l'application en admin : `UPDATE users SET isadmin = 1 WHERE username = 'lenomdevotreadmin';`
* Cet admin a maintenant la possiblité de modérer les articles et commentaires publiés sur l'application ! 

# Technologies utilisées 

* Vue.js
* Node.js
* Express
* MySQL
* Sequelize 