# bus-buzz (Linjuri 1945)

Solidabiksen koodihaaste huhtikuu 2020 ja aikamatka historiallisen euroopan halki linja-autolla!
Valitettavasti jopa kokeneemmilla matkaajilla alkaa yli parin viikon matkalla esiintymään kevyitä sivuoireita.

## Toimintaperiaatteita

Tavoitteena oli löytää lyhin reitti lähtödatassa annettujen pisteiden välillä. En ajatellut
lähteä keksimään pyörää uusiksi, joten optimointiin valikoitui Dijkstran algoritmi (tai 
ainakin se mitä siitä tajusin..), jonka perusteella kirjoitin oman toteutukseni.
Ideana on siis käydä läpi lähtöpisteestä lähtien jokainen solmupiste
ja solmupisteestä lähtevät yksittäiset reitinpätkät kunnes kaikki aineistossa olevat solmupisteet
on käyty läpi ja näin löydetty lyhin reitti alusta loppuun.

Sen verran optimoin, että jos on jo löydetty reitti alusta loppuun ja se on lyhyempi
kuin tarkastelussa oleva matka alusta tarkasteltavalle pisteelle niin tarkastelua ei sen pisteen
osalta tehdä. Näin pienellä aineistolla on aivan sama laskea jokainen reittikin mutta jos
datan koko kasvaa niin jossain vaiheessa selaimesta loppuu paukut..

Lisäksi vaikka vaihdoissa ei menekään aikaa ja joku varmasti tykkää nähdä eri bussiyhtiöitä
niin linjoja valitessa reittiä käydään läpi alusta
loppuun ja mennään aina maksimimatka samaa linjaa. Näin saadaan bussien vaihdot reitillä minimoitua.
Tästä johtuen päinvastaisilla matkoilla voi tulla vaihtoja eri kohtiin. Samaan yhteyteen voisi
toteuttaa esim vaihtoaikoja tai reitin kustannuksia laskevan metodin.

## Käytetyt tekniikat

Projektin pohja [Angular CLI](https://github.com/angular/angular-cli) versio 9.1.1.

Ulkoasu/layout/tyylittely [Bootstrap](https://getbootstrap.com/)

Ikonit tarjosi [FortAwesome](https://github.com/FortAwesome/angular-fontawesome) (Font Awesome Angularille)

Visualisointikirjastona [Cytoscape JS](https://js.cytoscape.org/)

## From zero to hero

```
git clone https://github.com/koni123/bus-buzz.git
```
```
npm i
```
```
ng serve TAI ng serve --open
```
```
http://localhost:4200
```
