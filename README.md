# Opdracht 1.2 - Fork je OBA
De opdracht was om je OBA applicatie te testen en te leren over Progressive Enhancement, Feature Detection en Fallback. En hoe je een toegankelijke website maakt. 
> Het web is namelijk voor iedereen.

## Features
1. Afbeeldingen uitzetten
1. Custom fonts uitzetten
1. Kleur uitzetten & kleurenblindheid instellen
1. Muis/Trackpad werkt niet
1. Breedband internet
1. Javascript (volledig)
1. Cookies niet accepteren & localStorage doet het niet

## Devices
![IMG_20200312_122438](https://user-images.githubusercontent.com/8554238/76530786-86df8180-6474-11ea-85f3-bc3ce49ac5f8.jpg)

- ipod touch
    - Safari
    - ios 6.1.6
    - Mozilla/5.0 (Ipod, CPU OS 6_1_6 like Mac OS X)
    - AppleWebkit/536.26 (KHTML, like Gecko)
    - Version/6.0 Mobile/10B500 Safari/8536.25
- Search input auto zoom on safari
- De Javascript en CSS werden niet ingeladen, waardoor alleen de HTML achterbleef. Gelukkig is de HTML semantisch, maar de zoekfunctie was helaas met Javascript. En werkte die niet.

- ipad mini
    - Safari
    - ios 9.3.5
    - Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X)
    - AppleWebkit/601.1.46 (KHTML, like Gecko)
    - Version/9.0 Mobile/13g36 Safari/601.1

    - De javascript werkte niet/niet helemaal op de ipad mini. De data die ik ophaal met behulp van de fetch, deed het in ieder geval niet.

- Nexus 5
    - Chrome 75
    - android 6.0.1
    - Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5)
    - AppleWebkit/537.36 (KHTML, like Gecko)
    - Chrome/75.0.3770.143 Mobile Safari/537.36
- Vrijwel alle hoofdfunctionaliteiten van de applicatie werkten prima, dus het ophalen van de data. Het is ook niet zo'n oude telefoon dus is het geen verassing dat het hier prima werkt.

## Browsers

Om te beginnen heb ik bij het uitzetten/instellen van de onderstaande functies
1. Afbeeldingen uitzetten
1. Custom fonts uitzetten
1. Kleur uitzetten & kleurenblindheid instellen
vrijwel geen tot amper problemen ondervonden.

### Afbeeldingen uitzetten
Er zijn geen problemen ondervonden tijdens het uitschakelen van de afbeeldingen. Wel ben ik de alt vergeten wat super belangrijk is voor deze applicatie, want het zijn afbeeldingen van boeken!
<img width="1439" alt="Screenshot 2020-03-13 at 13 37 36" src="https://user-images.githubusercontent.com/8554238/76622026-f4e97e80-6530-11ea-8175-d91f47257602.png">

### Kleur uitzetten & kleurenblindheid instellen
Ik houd er vaak al rekening mee, maar het kan wel wat "strenger" naar mijn mening. Contrast is iets wat ik vaak als ontwerper in me achterhoofd hou, maar toch iets lastig blijf. Over het algemeen ziet het er prima uit, maar zal ik wat voorzichtiger zijn met de lichte grijstinten.
![kleurenblind test](https://user-images.githubusercontent.com/8554238/76526043-387ab480-646d-11ea-9b6c-df5ffd8e70b9.png)
<img width="1187" alt="Screenshot 2020-03-13 at 13 23 03" src="https://user-images.githubusercontent.com/8554238/76622031-f5821500-6530-11ea-88a4-81367b628dec.png">

### Custom fonts uitzetten
Mijn vuistregel is altijd maximaal 2 verschillende fonts, liefst 1. En ik heb eigenlijk geen probleem ondervonden met custom fonts, want OBA maakt gebruik van Arial dit zit geloof ik als default op computers. Daarnaast maak ik gebruik van een aantal fallbacks.

Hieronder zijn een aantal functies die vrijwel op elke browser het zelfde reageerd.
1. Breedband internet
1. Javascript (volledig)

### Breedband internet
De afbeelingen zijn niet heel groot, maar er is wel een kleinere versie beschikbaar om te gebruiken als thumbnail. Dit is iets waar ik volgende keer wel langer bij stil zal staan. Verder laad de pagina redelijk, je ziet wel de afbeelding rustig inladen.

### 1. Javascript (volledig)
Click functies werken niet meer. De html en css werken wel. :target selector doen het ook, waardoor je toch kunt navigeren naar een andere pagina.
<img width="1440" alt="Screenshot 2020-03-13 at 13 38 06" src="https://user-images.githubusercontent.com/8554238/76622017-f1ee8e00-6530-11ea-895b-e77ee618d171.png">

## Verschillen per browsers

### Chrome
1. Muis/Trackpad werkt niet
    1. Form input en links werken zonder muis/trackpad, maar de tabs (click) van een werkstuk werkt het niet.
1. Cookies niet accepteren & localStorage doet het niet
    1.  Het creëeren van een werkstuk werkte niet meer, wij maakten gebruik van de localstorage om de ergens data op te slaan waardoor dit dus niet meer zal werken.
    
### Safari
1. Afbeeldingen uitzetten
    1. Alle afbeeldingen van boeken gaan weg, maar 1 blijft gewoon staan.
1. Muis/Trackpad werkt niet
    1. Pakt alleen inputs, maar geen a tags
1. Cookies niet accepteren & localStorage doet het niet
    1.  Het creëeren van een werkstuk werkte niet meer, wij maakten gebruik van de localstorage om de ergens data op te slaan waardoor dit dus niet meer zal werken.

### Firefox

1. Muis/Trackpad werkt niet
    1. Firefox pakt niet de articles met a tags, dit blijkt een instelling te zijn die bekend is in de communitie. En het aanpassen hiervan zal alleen maar problemen opleveren, er wordt [geadviseerd](https://stackoverflow.com/questions/49743138/enable-tabbing-through-links-on-page-containing-input-elements) om dit niet aan te passen.
1. Cookies niet accepteren & localStorage doet het niet
    1. Het creëeren van een werkstuk werkte niet meer, wij maakten gebruik van de localstorage om de ergens data op te slaan waardoor dit dus niet meer zal werken.
    
## Screenreaders
<img width="1440" alt="Screenshot 2020-03-12 at 15 32 32" src="https://user-images.githubusercontent.com/8554238/76533287-1dfa0880-6478-11ea-95a7-486a52c9d1e3.png">

Over het algemeen doet de screenreader redelijk, alleen ik merk dat de benamingen van knoppen en groter rol speelde dan ik had gedacht. "+ bronnenlijst" wordt letterlijk gelezen als "plus bronnenlijst", het was in eerste instantie een hack om ervoor te zorgen dat de buttons niet "afbraken" zoals je hieronder kunt zien. Maar achteraf gezien is dit een slechte manier van denken.

<img width="147" alt="Screenshot 2020-03-12 at 15 38 16" src="https://user-images.githubusercontent.com/8554238/76532902-901e1d80-6477-11ea-9060-afc431f40700.png">

## Verbetering
- Afbeeldingen een alt text meegeven. Kleinere afbeelding opvragen van de API, in plaats van de grootste/beste versie.
- Als er geen javascript is de formulier onder elkaar.
- Serverside pagina renderen of progressive enhancement toepassen. Dus ervoor zorgen dat de website niet volledig afhankelijk is van Javascript.
- Zoekfunctie/formulier zou ook moeten werken zonder Javascript.
- Betere benaming van functies, i.p.v "+ bronnenlijst" gewoon  "toevoegen aan bronnenlijst".

## Conclusie
Over het algemeen zijn er geen grote problemen ondervonden, alhoewel de pagina's op dit moment clientside gerenderd worden. Maar naast dat gaan er niet heel veel dingen mis, tot mijn verbazing. De browsers waar ik het getest had reageerden over het algemeen vrij het zelfde.

Wel was het best apart/lastig om de screenreader aan de praat te krijgen. Meer in de zin van 1 ik had geen idee waar die zat (wel eens perongeluk geactiveerd door een verkeerde command, oops 😅), maar geen idee ook hoe ik die werkt (de commands).

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
