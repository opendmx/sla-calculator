# Manuel d'utilisateur du Calculateur SLA

**Version 1.0** | **Langue : Français**

## Table des matières

1. [Introduction](#introduction)
2. [Premiers pas](#premiers-pas)
3. [Aperçu de l'interface principale](#aperçu-de-linterface-principale)
4. [Paramètres du calculateur](#paramètres-du-calculateur)
5. [Options avancées](#options-avancées)
6. [Comprendre les résultats](#comprendre-les-résultats)
7. [Exemples pratiques](#exemples-pratiques)
8. [Dépannage](#dépannage)

---

## Introduction

Bienvenue au Calculateur SLA ! Cet outil vous aide à calculer les métriques de temps de disponibilité et d'indisponibilité pour les **Accords de Niveau de Service (SLA)**. Que vous gériez une infrastructure critique, planifiez des fenêtres de maintenance ou définissiez des attentes de service, ce calculateur fournit des mesures précises pour vos besoins de disponibilité.

### Qu'est-ce qu'un SLA ?

Un **Accord de Niveau de Service (SLA)** est un engagement entre un fournisseur de services et un client qui définit le niveau de service attendu. Les SLA sont généralement exprimés en pourcentage (par exemple, 99,9 %, 99,99 %) représentant la garantie de temps de disponibilité minimum.

### Fonctionnalités principales

- ✅ Calculs en temps réel pour plusieurs périodes
- ✅ Options de configuration avancées (week-ends, heures ouvrables)
- ✅ Analyse d'impact sur le temps de travail
- ✅ Support des paramètres URL pour partager les configurations
- ✅ Persistance automatique des paramètres
- ✅ Design réactif pour ordinateur et mobile

---

## Premiers pas

### Accès au calculateur

1. **Ouvrez votre navigateur web** (Chrome, Firefox, Safari, Edge)
2. **Naviguez vers** l'URL du Calculateur SLA ou ouvrez `index.html` localement
3. Le calculateur se charge instantanément avec les paramètres par défaut (99,9 % SLA)

### Flux d'utilisation de base

1. Entrez votre pourcentage SLA souhaité
2. Consultez les calculs d'indisponibilité instantanés pour toutes les périodes
3. Configurez éventuellement les paramètres avancés
4. Examinez et partagez les résultats

---

## Aperçu de l'interface principale

![Interface principale](screenshots/screenshot-01-main-view.png)

### Sections de l'interface

L'interface du calculateur comprend trois sections principales :

#### 1. Paramètres du calculateur (Section supérieure)
- **Saisie de l'objectif SLA** : Entrez votre pourcentage SLA souhaité
- **Bascule des options avancées** : Afficher/masquer les options de configuration supplémentaires

#### 2. Temps d'indisponibilité autorisés (Section centrale)
Affiche les temps d'indisponibilité autorisés pour différentes périodes :
- **Par minute** : Temps d'indisponibilité autorisé dans une minute
- **Par heure** : Temps d'indisponibilité autorisé dans une heure
- **Quotidien** : Temps d'indisponibilité autorisé par jour
- **Hebdomadaire** : Temps d'indisponibilité autorisé par semaine
- **Mensuel** : Temps d'indisponibilité autorisé par mois (30 jours)
- **Trimestriel** : Temps d'indisponibilité autorisé par trimestre (90 jours)
- **Annuel** : Temps d'indisponibilité autorisé par an (365 jours)

#### 3. Guide complet (Section inférieure)
Contenu éducatif expliquant :
- Comment fonctionnent les calculs SLA
- Descriptions des fonctionnalités avancées
- Exemples d'utilisation réels
- Méthodes et formules de calcul

---

## Paramètres du calculateur

### Objectif SLA (%)

![Champ objectif SLA](screenshots/screenshot-01-main-view.png)

**Emplacement** : En haut de la section Paramètres du calculateur

**Description** : Le champ de saisie principal où vous entrez votre pourcentage d'Accord de Niveau de Service souhaité.

**Comment l'utiliser** :
1. Cliquez sur le champ de saisie
2. Tapez votre pourcentage SLA souhaité (par exemple, 99,9, 99,95, 99,99)
3. Utilisez des points décimaux pour des valeurs précises (jusqu'à deux décimales)
4. Plage valide : 0 à 100

**Valeurs SLA courantes** :
- **99,9 %** (« Trois neuf ») = 8h 45m d'indisponibilité par an
- **99,95 %** = 4h 23m d'indisponibilité par an
- **99,99 %** (« Quatre neuf ») = 52m 36s d'indisponibilité par an
- **99,999 %** (« Cinq neuf ») = 5m 15s d'indisponibilité par an

**Mises à jour en temps réel** : Les résultats se mettent à jour automatiquement pendant que vous tapez, sans besoin d'appuyer sur un bouton.

**Conseils** :
- Des pourcentages plus élevés signifient moins de temps d'indisponibilité autorisé
- La norme de l'industrie pour les services cloud est généralement de 99,9 % ou plus
- Considérez la criticité de votre service lors du choix d'un SLA

---

## Options avancées

### Accès aux options avancées

![Options avancées développées](screenshots/screenshot-02-advanced-options.png)

**Comment ouvrir** :
1. Localisez la bascule « Afficher les options avancées » dans la section Paramètres du calculateur
2. Cliquez sur la bascule pour développer les options de configuration avancées
3. Cliquez à nouveau pour réduire et masquer les options avancées

### Aperçu des paramètres avancés

Lorsqu'ils sont développés, vous verrez trois options de configuration principales :

#### 1. Inclure les week-ends

**Objectif** : Contrôle si les week-ends sont inclus dans les calculs SLA.

**État par défaut** : ✅ Activé (Coché)

**Comment l'utiliser** :
1. Cliquez sur l'interrupteur à côté de « Inclure les week-ends »
2. Vert = Activé (week-ends inclus)
3. Gris = Désactivé (week-ends exclus)

**Lorsqu'activé (par défaut)** :
- Les calculs utilisent le temps calendaire 24/7
- Tous les jours de la semaine sont inclus
- Convient aux services fonctionnant en continu
- Exemple : 99,9 % annuel = 8h 45m d'indisponibilité

**Lorsque désactivé** :
- Les calculs utilisent uniquement les jours ouvrables (lundi-vendredi)
- Réduit le temps d'indisponibilité autorisé proportionnellement
- Convient aux services fonctionnant uniquement pendant les heures de bureau
- Exemple : 99,9 % annuel = 6h 15m d'indisponibilité (jours ouvrables uniquement)

**Cas d'usage** :
- **Activer pour** : Services cloud, sites e-commerce, systèmes de santé, support 24/7
- **Désactiver pour** : Applications de bureau, outils internes, systèmes d'entreprise

---

#### 2. Analyser l'impact sur le temps de travail

![Impact sur le temps de travail activé](screenshots/screenshot-03-work-time-impact.png)

**Objectif** : Montre comment l'indisponibilité affecte la productivité pendant les heures de travail spécifiées.

**État par défaut** : ❌ Désactivé (Non coché)

**Concept important** : 
> ⚠️ **Point clé** : Ce paramètre ne change PAS votre temps d'indisponibilité autorisé. Votre calcul SLA utilise toujours le temps calendaire (norme de l'industrie). Cette fonctionnalité montre l'**impact commercial** si toute l'indisponibilité se produisait pendant les heures de travail.

**Comment l'utiliser** :
1. Cliquez sur l'interrupteur à côté de « Analyser l'impact sur le temps de travail »
2. Lorsqu'activé, des paramètres supplémentaires d'horaire de travail apparaissent en dessous
3. Configurez vos paramètres d'horaire de travail

**Lorsqu'activé** :
- Les résultats affichent un pourcentage supplémentaire « Impact travail »
- Montre la disponibilité dans le pire des cas si l'indisponibilité survient pendant les heures de travail
- Utile pour comprendre l'impact commercial
- N'affecte pas le calcul SLA de base

**Format d'affichage** :
```
00:00:43:12
Impact travail : 99,58 % disponible
```

**Comprendre l'impact travail** :
- **Calcul de base** : Utilise toujours le temps calendaire 24/7 (43,2 minutes pour 99,9 % mensuel)
- **Impact travail** : Montre la disponibilité effective pendant votre semaine de travail de 40 heures si toute l'indisponibilité se produisait pendant les heures de travail
- **Exemple** : 43 minutes d'indisponibilité dans une semaine de travail de 40 heures = 99,58 % de disponibilité pendant le temps de travail

---

### Paramètres d'horaire de travail

Lorsque « Analyser l'impact sur le temps de travail » est activé, ces paramètres supplémentaires apparaissent :

#### A. Heures de travail par semaine

**Objectif** : Définit le total des heures de travail hebdomadaires pour les calculs d'impact.

**Valeur par défaut** : 40 heures

**Plage** : 1 à 168 heures

**Comment l'utiliser** :
1. Cliquez sur le champ de saisie
2. Tapez le nombre total d'heures de travail par semaine
3. Appuyez sur Entrée ou cliquez en dehors du champ pour appliquer

**Configurations courantes** :
- **40 heures** : Semaine de travail standard à temps plein (8 heures/jour × 5 jours)
- **50 heures** : Semaine de travail étendue
- **20 heures** : Horaire à temps partiel
- **168 heures** : Opérations 24/7 (toutes les heures d'une semaine)

**Exemple d'impact** :
Pour 99,9 % SLA avec 43,2 minutes d'indisponibilité autorisée par mois :
- **40h/semaine** : 99,58 % de disponibilité pendant le temps de travail
- **50h/semaine** : 99,43 % de disponibilité pendant le temps de travail
- **168h/semaine** : 99,9 % (identique au SLA de base)

---

#### B. Heure de début de travail

**Objectif** : Définit quand votre équipe ou vos utilisateurs commencent le travail chaque jour.

**Valeur par défaut** : 8:00

**Options disponibles** : 00:00 à 23:00 (incréments horaires)

**Comment l'utiliser** :
1. Cliquez sur le menu déroulant
2. Faites défiler les heures disponibles
3. Sélectionnez votre heure de début de travail

**Scénarios courants** :
- **9:00** : Heures de bureau standard
- **8:00** : Début de bureau tôt
- **23:00** : Début de travail de nuit
- **6:00** : Opérations matinales

**Remarque** : Ce paramètre est utilisé uniquement pour les calculs d'impact sur le temps de travail et ne modifie pas votre calcul SLA de base.

---

#### C. Heure de fin de travail

**Objectif** : Définit quand votre équipe ou vos utilisateurs terminent le travail chaque jour.

**Valeur par défaut** : 18:00

**Options disponibles** : 01:00 à 00:00 (incréments horaires)

**Comment l'utiliser** :
1. Cliquez sur le menu déroulant
2. Faites défiler les heures disponibles
3. Sélectionnez votre heure de fin de travail

**Scénarios courants** :
- **17:00** : Fermeture de bureau standard
- **18:00** : Heures de bureau étendues
- **7:00** : Fin de travail de nuit
- **15:00** : Horaire de fermeture anticipée

**Support après minuit** : Vous pouvez définir une heure de fin avant l'heure de début pour indiquer des équipes de nuit (par exemple, Début : 23:00, Fin : 7:00).

---

## Comprendre les résultats

### Disposition des cartes de résultats

Chaque période affiche :
1. **Nom de la période** : Par minute, Par heure, Quotidien, Hebdomadaire, Mensuel, Trimestriel, Annuel
2. **Valeur d'indisponibilité** : Formatée comme JJ:HH:MM:SS (Jours:Heures:Minutes:Secondes)
3. **Impact travail** (si activé) : Pourcentage de disponibilité pendant le temps de travail

### Lecture des valeurs d'indisponibilité

**Format** : `JJ:HH:MM:SS`

**Exemples** :
- `00:00:00:04` = 4 secondes
- `00:00:01:26` = 1 minute et 26 secondes
- `00:00:43:12` = 43 minutes et 12 secondes
- `00:08:45:36` = 8 heures, 45 minutes et 36 secondes
- `01:02:11:02` = 1 jour, 2 heures, 11 minutes et 2 secondes

### Interprétation des résultats

**Exemple SLA 99,9 % (par défaut)** :
- **Annuel** : 8h 45m d'indisponibilité autorisée sur toute l'année
- **Mensuel** : 43m 12s d'indisponibilité autorisée par mois
- **Quotidien** : 1m 26s d'indisponibilité autorisée par jour
- **Par heure** : 4 secondes d'indisponibilité autorisée par heure

**Ce que cela signifie** :
Si votre service subit plus d'indisponibilité que ce qui est affiché, vous avez violé votre engagement SLA pour cette période.

### Interprétation de l'impact travail

Lorsque « Analyser l'impact sur le temps de travail » est activé :

**Exemple d'affichage** :
```
Mensuel
00:00:43:12
Impact travail : 99,58 % disponible
```

**Signification** :
- **Ligne du haut** : 43 minutes 12 secondes d'indisponibilité autorisée (SLA de base)
- **Ligne du bas** : Si toutes les 43 minutes se produisaient pendant votre semaine de travail de 40 heures, vous auriez 99,58 % de disponibilité pendant les heures de travail

**Cas d'usage** :
- Planifier la maintenance en dehors des heures de travail vs pendant les heures de travail
- Comprendre l'impact commercial des pannes
- Communiquer la disponibilité aux parties prenantes en termes commerciaux

---

## Exemples pratiques

### Exemple 1 : Application web standard (SLA 99,9 %)

**Scénario** : Vous exploitez une application SaaS avec un engagement de disponibilité de 99,9 %.

**Configuration** :
1. Définir l'objectif SLA : `99,9`
2. Laisser « Inclure les week-ends » activé
3. Ne pas activer « Analyser l'impact sur le temps de travail »

**Résultats** :
- **Annuel** : 8h 45m d'indisponibilité autorisée
- **Mensuel** : 43m d'indisponibilité autorisée
- **Quotidien** : 1m 26s d'indisponibilité autorisée

**Planification** :
- Vous pouvez avoir jusqu'à 8 heures 45 minutes d'indisponibilité par an
- Idéal pour des fenêtres de maintenance mensuelles d'environ 30 minutes
- Les micro-pannes quotidiennes doivent rester en dessous de 90 secondes

---

### Exemple 2 : Application de bureau avec impact heures de bureau

**Scénario** : Système CRM interne utilisé pendant les heures de bureau (9h-17h, jours ouvrables).

**Configuration** :
1. Définir l'objectif SLA : `99,9`
2. Cliquer sur « Afficher les options avancées »
3. Désactiver « Inclure les week-ends »
4. Activer « Analyser l'impact sur le temps de travail »
5. Définir Heures de travail par semaine : `40`
6. Définir Heure de début de travail : `9:00`
7. Définir Heure de fin de travail : `17:00`

**Résultats** :
- **Annuel** : 6h 15m d'indisponibilité autorisée (jours ouvrables uniquement)
- **Impact travail mensuel** : 99,58 % disponible pendant les heures de travail

**Interprétation** :
- Votre SLA permet 6h 15m d'indisponibilité sur les jours ouvrables uniquement
- Si toute l'indisponibilité survient pendant les heures de travail, les utilisateurs connaissent une disponibilité de 99,58 %
- Planifiez la maintenance pour les soirées ou les week-ends pour minimiser l'impact sur le travail

---

### Exemple 3 : Système haute disponibilité (SLA 99,99 %)

**Scénario** : Système de traitement des paiements critique nécessitant une disponibilité de quatre neuf.

**Configuration** :
1. Définir l'objectif SLA : `99,99`
2. Laisser « Inclure les week-ends » activé
3. Ne pas activer « Analyser l'impact sur le temps de travail »

**Résultats** :
- **Annuel** : 52m 36s d'indisponibilité autorisée
- **Mensuel** : 4m 23s d'indisponibilité autorisée
- **Quotidien** : 8,6 secondes d'indisponibilité autorisée

**Planification** :
- Exigences de disponibilité très strictes
- Budget d'indisponibilité annuel de moins d'1 heure
- Les pannes mensuelles doivent être inférieures à 5 minutes
- Nécessite une architecture robuste et une réponse rapide aux incidents

---

### Exemple 4 : Fabrication en équipe de nuit

**Scénario** : Systèmes d'atelier fonctionnant en équipe de nuit (23h-7h).

**Configuration** :
1. Définir l'objectif SLA : `99,95`
2. Cliquer sur « Afficher les options avancées »
3. Laisser « Inclure les week-ends » activé
4. Activer « Analyser l'impact sur le temps de travail »
5. Définir Heures de travail par semaine : `40`
6. Définir Heure de début de travail : `23:00`
7. Définir Heure de fin de travail : `7:00`

**Résultats** :
- **Annuel** : 4h 23m d'indisponibilité autorisée (calcul 24/7)
- **Impact travail** : Montre la disponibilité pendant les heures d'équipe de nuit

**Cas d'usage** :
- Comprendre l'impact sur la production de l'indisponibilité pendant les heures d'exploitation
- Planifier la maintenance pendant l'équipe de jour lorsque la production est arrêtée

---

## Dépannage

### Problèmes courants

#### Problème : Les options avancées ne s'affichent pas

**Symptôme** : Cliquer sur « Afficher les options avancées » ne fait rien.

**Solution** : 
- Assurez-vous que JavaScript est activé dans votre navigateur
- Actualisez la page (F5 ou Ctrl+R)
- Essayez un autre navigateur
- Videz le cache du navigateur

---

#### Problème : Les nombres ne se mettent pas à jour

**Symptôme** : Modifier l'objectif SLA ne met pas à jour les résultats.

**Solution** :
- Vérifiez que vous entrez un nombre valide (0-100)
- Assurez-vous que JavaScript est activé
- Actualisez la page
- Vérifiez la console du navigateur pour les erreurs (F12 → onglet Console)

---

#### Problème : L'impact travail ne s'affiche pas

**Symptôme** : « Analyser l'impact sur le temps de travail » est activé mais aucun impact travail affiché.

**Solution** :
- Vérifiez que la bascule « Analyser l'impact sur le temps de travail » est ACTIVÉE (vert)
- Vérifiez que les Paramètres d'horaire de travail sont visibles sous la bascule
- Assurez-vous que Heures de travail par semaine est supérieur à 0
- Vérifiez que les heures de début et de fin de travail sont définies

---

#### Problème : Les paramètres ne sont pas sauvegardés

**Symptôme** : La configuration se réinitialise lors de la fermeture du navigateur.

**Solution** :
- Activez localStorage dans les paramètres du navigateur
- Vérifiez que vous n'êtes pas en mode Privé/Incognito
- Vérifiez que le quota de stockage du navigateur n'est pas dépassé
- Essayez un autre navigateur

---

### Compatibilité des navigateurs

**Navigateurs pris en charge** :
- ✅ Google Chrome (dernière version)
- ✅ Mozilla Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Microsoft Edge (dernière version)
- ✅ Opera (dernière version)

**Fonctionnalités de navigateur requises** :
- JavaScript activé
- Support CSS Grid et Flexbox
- Fonctionnalités JavaScript ES6
- API localStorage
- API URL pour l'analyse des paramètres

---

### Obtenir de l'aide

**Questions ou problèmes ?**

1. **Consultez ce manuel** pour des explications détaillées
2. **Consultez la section Guide complet** sur la page du calculateur
3. **Vérifiez la console du navigateur** pour les messages d'erreur (F12 → Console)
4. **Contactez le support** avec des détails d'erreur spécifiques

---

## Raccourcis clavier

- **Tab** : Naviguer entre les champs de saisie
- **Entrée** : Appliquer les modifications dans les champs de saisie
- **Espace** : Basculer les options de case à cocher lorsqu'elles sont ciblées
- **Ctrl/Cmd + R** : Actualiser la page

---

## Paramètres URL (Avancé)

Vous pouvez partager des configurations spécifiques en utilisant des paramètres URL :

**Exemples** :

> **Remarque** : Dans les paramètres URL, les nombres décimaux doivent utiliser le point (.) au lieu de la virgule (par exemple, 99.9 au lieu de 99,9), car c'est le format technique pour les URLs.

```
# Préréglage SLA simple
https://votre-domaine.com/?sla=99.95

# Avec heures de bureau activées
https://votre-domaine.com/?sla=99.9&business=true&workHours=40

# Avec week-ends exclus
https://votre-domaine.com/?sla=99.99&weekends=false

# Configuration complète
https://votre-domaine.com/?sla=99.95&business=true&workHours=50&workStart=8&workEnd=18&weekends=true
```

**Paramètres pris en charge** :
- `sla` : Pourcentage SLA (par exemple, 99,9, 99,95)
- `business` : Activer l'impact sur le temps de travail (true/false)
- `workHours` : Heures de travail par semaine (1-168)
- `workStart` : Heure de début de travail (0-23)
- `workEnd` : Heure de fin de travail (0-23)
- `weekends` : Inclure les week-ends (true/false)

---

## Meilleures pratiques

### Choix d'un SLA

1. **Considérer la criticité du service** : SLA plus élevé pour les systèmes critiques
2. **Équilibrer coût vs disponibilité** : Les SLA plus élevés nécessitent plus d'investissement en infrastructure
3. **Normes de l'industrie** : Recherchez ce que proposent les concurrents
4. **Faisabilité technique** : Assurez-vous que votre architecture peut supporter le SLA

### Utilisation du calculateur

1. **Commencer avec des valeurs courantes** : 99,9 % ou 99,95 % pour la plupart des services
2. **Activer l'impact travail** pour les applications orientées utilisateur
3. **Exclure les week-ends** pour les services uniquement professionnels
4. **Partager les configurations** via les paramètres URL
5. **Examiner les valeurs annuelles** pour la planification à long terme

### Planification de la maintenance

1. **Vérifier l'allocation mensuelle** : Planifier la maintenance dans votre budget d'indisponibilité
2. **Utiliser l'analyse d'impact travail** : Planifier en dehors des heures de travail lorsque possible
3. **Suivre l'indisponibilité réelle** : Comparer avec les engagements SLA
4. **Communiquer de manière proactive** : Avertir les utilisateurs avant la maintenance planifiée

---

## Annexe : Tableau de référence SLA

| SLA % | Indisponibilité annuelle | Indisponibilité mensuelle | Indisponibilité quotidienne | Cas d'usage courants |
|-------|-------------------------|---------------------------|----------------------------|---------------------|
| 90% | 36j 12h | 3j 0h | 2h 24m | Environnements de développement/test |
| 95% | 18j 6h | 1j 12h | 1h 12m | Outils internes |
| 99% | 3j 15h 36m | 7h 18m | 14m 24s | Services web de base |
| 99,5% | 1j 19h 48m | 3h 39m | 7m 12s | Applications web standard |
| 99,9% | 8h 45m 36s | 43m 12s | 1m 26s | Services critiques pour l'entreprise |
| 99,95% | 4h 22m 48s | 21m 36s | 43s | Services haute disponibilité |
| 99,99% | 52m 34s | 4m 23s | 8,6s | Systèmes critiques |
| 99,999% | 5m 15s | 26s | 0,86s | Systèmes ultra haute disponibilité |

---

**Version du document** : 1.0  
**Dernière mise à jour** : 2024  
**Langue** : Français

---

Pour les autres langues :
- [Manuel anglais (English)](manual.md)
- [Manuel allemand (Deutsch)](manual.de.md)
