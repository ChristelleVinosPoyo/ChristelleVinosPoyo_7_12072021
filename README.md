### INFOS ###

Projet 7 de la formation Développeur Web d'OpenClassrooms :
Créez un réseau social d’entreprise
Juillet 2021

### Prerequis ###

Ce projet necessite l'installation de : 
    MySQL : http://dev.mysql.com/downloads/mysql/#downloads
    Node : https://nodejs.org/fr/download/ 
    Vue CLI : 


### Installation ###

DATABASE :

    Executez les commandes suivante pour importer la base de données : 
        mysql -h localhost -u root -p < P7_02_Database.sql

BACKEND :

    Executez les commandes suivantes dans le dossier "backend": 
        "npm install" 
        "node server"

    Il est necessaire de modifier le fichier ".env.test" présent en racine :
    - Renommez le fichier ".env"
    - modifiez le fichier : entrez les valeurs d'environnement suivantes :
        DB_NAME = groupomania
        DB_USER = root
        DB_PASSWORD = root
        TOKEN_KEY = RANDOM_TOKEN_SECRET

FRONTEND :

    Executez les commandes suivantes dans le dossier "groupomania": 
        "npm install" 
        "npm run serve"
    pour tester l'appli vous pouvez utilisez ces 2 comptes utilisateurs :
        1. compte administrateur :
            email : melanie@hotmail.fr
            mdp : 12345678
        2. compte utilisateur sans droits admin :
            email : jean@hotmail.fr
            mdp : 12345678




