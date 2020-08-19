Na podstawie doświadczeń ze wcześniejszych rekrutacji postanowiłem dodać plik w którym będę opisywał podjęte decyzje i ewentualnie napotkane problemy.

Podjęte decyzje, napotkane problemy i ich rozwiązania:

1. Zdecydowałem się na przechowywanie ścieżek do podstron jako consty w jednym pliku w celu ułatwienia zachoania spójności kodu i łatwości zarządzania ścieżkami.

2. Zapominałem wcześniej wspomnieć że wybrałem wersję Bootstrapa która umożliwia korzystanie z kontrolek jak z Reactowych komponentów co moim zdaniem mocno podnosi czytelność kodu.

3. Uznałem, że dodawanie Reduxa nie ma sensu w tym projekcie i stworzyłem własny state w App.js za pomocą Context API i hooka useReducer.

4. Zdecydowałem się również na stworzenie lokalnej konfiguracji inputów i przeniesienie walidacji po za komponent UserInfoPage. Dzięki konfiguracji można bardzo łatwo rozeznać się jaka jest walidacja i jakie są dane dozwolone w poszczególnych inputach, a oprócz tego można bezpośrednio wyrenerować listę inputów.

5. Zrobiłem state wpełni globlanym aby nawigacja również miała do niego dostęp.

6. Żeby wprowadzić warstwę serwisu wspomnianą w poleceniu zdecydowałem się na ponbranie obrazka za pomocą axiosa. Nie odrazu znalazłem w jaki sposób go wyświetlić.