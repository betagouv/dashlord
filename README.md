# DashLord

Tableau de bord des données brutes aggrégées de plusieurs outils qui évaluent une URL.

L'acquisition des données ainsi que la génération du rapport sont automatisés par des [GitHub actions](https://github.com/features/actions)

https://dashlord.incubateur.net

## Usage

Pour déployer votre version de DashLord :

- Créer un nouveau repository [**à partir du template dashlord**](https://github.com/SocialGouv/dashlord)
- Éditer le fichier `dashlord.yml`
- Lancer `DashLord scans` dans l'onglet `Actions` de votre projet GitHub

Une fois les scans terminés, un rapport sera généré dans la branche `gh-pages` du repository. Vous devez aller dans l'onglet `Settings` du repository pour activer la fonctionnalité "GitHub Pages" et choisir la source `gh-pages`. Ceci permet de publier le rapport sur `https://[organisation].github.io/[repository]` (publiquement).

### GitHub actions

- Le workflow `DashLord scans` permet de lancer un scan sur les URLs, il est executé lors d'un changement dans le fichier `dashlord.yml`
- Le workflow `DashLord report` est lancé à la fin de chaque `DashLord scans` et produit le rapport sous forme de site web.

Ces workflows sont également déclenchables manuellement dans l'onglet "Actions"

## Customisation

- Le fichier [`dashlord.yml`](./dashlord.yml) permet de paramétrer les urls et quelques options du tableau de bord
- Le workflow [`scans.yml`](./github/workflows/scans.yml) permet d'activer/désactiver certains scanners
- Le workflow [`report.yml`](./github/workflows/report.yml) permet de modifier le rapport généré en se basant sur [SocialGouv/dashlord-report-action](https://github.com/SocialGouv/dashlord-report-action).

## Outils

| outil                                                                         | description                                                           |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)       | Audit automatique de page web (best-practices a11y, webperf, seo...)  |
| [OWASP Zed Attack Proxy](https://www.zaproxy.org/docs/docker/baseline-scan)   | Scan de vulnérabilités passif "baseline"                              |
| [testssl.sh](https://testssl.sh)                                              | Évaluation du niveau de confiance d'un certificat SSL                 |
| [Mozilla HTTP observatory](https://www.zaproxy.org/docs/docker/baseline-scan) | Évalue le niveau de qualité/sécurité de la page web et de son serveur |
| [Third parties](https://github.com/SocialGouv/thirdparties)                   | Liste tous les cookies et scripts externes                            |
| [GeoIP2](https://www.maxmind.com/en/geoip-demo)                               | Géolocalisation des ressources de la page web                         |
| [Nuclei](https://nuclei.projectdiscovery.io)                                  | Détection d'erreurs de configuration courantes                        |
| [Wappalyzer](https://www.wappalyzer.com)                                      | Détection des technologies web, Javascript, CMS, outillage...         |

## Contribute

Vous pouvez contribuer en remontant des issues de qualité, en améliorant la documentation, ou en ajoutant du code.

🤗 Toutes les suggestions sont bienvenues.

### Dev

DashLord fonctionne en deux étapes :

1. **Acquisition des données** : Pour chaque URL, chaque outil est exécuté et génère un fichier JSON qui sera versionné dans le dépôt
2. **Génération du rapport** : À partir des données existantes, l'action [dashlord-report-action](https://github.com/SocialGouv/dashlord-report-action) aggrège, compresse les résultats et produit un rapport web statique.

### Related repos

| Repo                                                                                        | desc                                                       |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [SocialGouv/dashlord-nuclei-action](https://github.com/SocialGouv/dashlord-nuclei-action)   | Dump nuclei result                                         |
| [SocialGouv/dashlord-actions](https://github.com/SocialGouv/dashlord-actions)   | basic Github actions result                                         |
| [SocialGouv/thirdparties-action](https://github.com/SocialGouv/thirdparties-action)         | Dump third party scripts scan result                       |
| [SocialGouv/wappalyzer-action](https://github.com/SocialGouv/wappalyzer-action)             | Dump Wappalyzer scan result                                |
| [SocialGouv/thirdparties](https://github.com/SocialGouv/thirdparties)                       | thirdparty scripts database                                |

### Ajouter un scanner

1. Créer une action github qui produit un JSON (cf exemple ci-dessus)
2. Ajouter le support pour ce type de données dans [dashlord-report-action repo](https://github.com/SocialGouv/dashlord-report-action)

### Tester sa feature
1. Une fois la feature développée en local, ouvrir la PR
2. Lancer la Github Action dans l'onglet "Actions" en précisant :
    - la branche sur laquelle lancer l'action -> il s'agit de la branche qui contient votre feature
    - s'il s'agit de l'action "Scans", préciser l'adresse que vous souhaitez scanner : le scan de toutes les URLs du dashlord.yml est très long sinon.