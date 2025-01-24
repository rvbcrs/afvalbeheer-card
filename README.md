# Afvalbeheer Card

Een custom card voor Home Assistant die afvalophaal data weergeeft van het Afvalbeheer component. De card detecteert automatisch de afvalverwerker die geconfigureerd is in het Afvalbeheer component.

## Installatie

### HACS

1. Ga naar HACS in je Home Assistant installatie
2. Klik op "Frontend"
3. Klik op de 3 puntjes rechtsboven
4. Selecteer "Custom repositories"
5. Voeg deze repository URL toe
6. Selecteer categorie "Lovelace"
7. Klik op "Add"

### Handmatig

1. Download `afvalbeheer-card.js` uit de laatste release
2. Upload het bestand naar `/www/community/afvalbeheer-card/` in je Home Assistant installatie
3. Voeg de resource toe in je dashboard:

```yaml
resources:
  - url: /community_plugin/afvalbeheer-card/afvalbeheer-card.js
    type: module
```

## Gebruik

Voeg de card toe aan je dashboard:

```yaml
type: custom:afvalbeheer-card
```
