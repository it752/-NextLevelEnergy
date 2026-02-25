export interface JobOffer {
	id: string;
	title: string;
	department: string;
	salary: string;
	location: string;
	description: string;
	responsibilities: string[];
	requirements: string[];
}

export const jobOffers: JobOffer[] = [
	{
		id: 'przedstawiciel-handlowy-oze',
		title: 'Przedstawiciel Handlowy ds. OZE',
		department: 'Sprzedaż',
		salary: '8 000 - 25 000 zł',
		location: 'Cala Polska',
		description:
			'Dołącz do struktur sprzedażowych i zostań twarzą transformacji energetycznej w Polsce. Szukamy osób zaangażowanych, nastawionych na cel i gotowych na ponadprzeciętne zyski w modelu B2B i B2C.',
		responsibilities: [
			'Aktywne pozyskiwanie klientów na rynku B2B / B2C',
			'Przeprowadzanie audytów energetycznych',
			'Doradztwo w zakresie rozwiązań odnawialnych źródeł energii',
			'Prowadzenie negocjacji i przygotowywanie ofert handlowych',
			'Utrzymywanie długofalowych relacji biznesowych',
		],
		requirements: [
			'Wysokie umiejętności komunikacyjne i negocjacyjne',
			'Doświadczenie w sprzedaży (mile widziana branża OZE)',
			'Nastawienie na realizację celów biznesowych',
			'Prawo jazdy kat. B',
			'Gotowość do pracy w terenie',
		],
	},
	{
		id: 'doradca-klienta-biznesowego',
		title: 'Doradca Klienta Biznesowego',
		department: 'Sprzedaż',
		salary: '12 000 - 30 000 zł',
		location: 'Trójmiasto / Warszawa',
		description:
			'Eksperckie stanowisko doradcze skierowane wyłącznie na sektor przedsiębiorstw średnich i dużych (MŚP i Enterprise).',
		responsibilities: [
			'Analiza profili energetycznych przedsiębiorstw',
			'Projektowanie dedykowanych rozwiązań OZE dla biznesu',
			'Współpraca z zarządami i dyrektorami finansowymi',
			'Monitorowanie i raportowanie wyników sprzedażowych',
		],
		requirements: [
			'Minimum 3-letnie doświadczenie w sprzedaży B2B',
			'Znajomość specyfiki rynku energetycznego (mile widziana)',
			'Umiejętność prezentowania danych finansowych (ROI, LCOE)',
			'Samodzielność w organizacji pracy własnej',
		],
	},
	{
		id: 'inzynier-projektant-pv',
		title: 'Inżynier Projektant Instalacji',
		department: 'Inżynieria',
		salary: '9 000 - 15 000 zł',
		location: 'Gdańsk',
		description:
			'Kluczowe stanowisko zaplecza inżynieryjnego. Twoim zadaniem będzie tworzenie koncepcji i projektów instalacji PV, magazynów energii i stacji ładowania EV.',
		responsibilities: [
			'Sporządzanie projektów koncepcyjnych i wykonawczych PV',
			'Wykonywanie analiz nasłonecznienia i doborów sprzętowych',
			'Wsparcie techniczne dla działu handlowego',
			'Weryfikacja warunków przyłączeniowych i dokumentacji',
		],
		requirements: [
			'Wykształcenie techniczne (Kierunki: Elektrotechnika, OZE itp.)',
			'Dobra znajomość programów CAD (AutoCAD, PVSyst, PV*SOL)',
			'Uprawnienia SEP do 1kV (mile widziane)',
			'Zdolność analitycznego myślenia',
		],
	},
	{
		id: 'koordynator-ds-montazu',
		title: 'Koordynator Działu Montaży',
		department: 'Montaż',
		salary: '7 000 - 12 000 zł',
		location: 'Polska Północna',
		description:
			'Osoba odpowiedzialna za sprawny i bezproblemowy przebieg procesu inwestycyjnego od podpisania umowy do uruchomienia instalacji.',
		responsibilities: [
			'Planowanie i koordynacja pracy ekip monterskich',
			'Zamawianie komponentów i zarządzanie logistyką na obiekty',
			'Odbiory techniczne instalacji fotowoltaicznych',
			'Dbanie o przestrzeganie procedur BHP',
		],
		requirements: [
			'Zdolności organizacyjne i umiejętność pracy pod presją czasu',
			'Doświadczenie na podobnym stanowisku',
			'Znajomość prawa budowlanego (w podstawowym zakresie)',
			'Czynne prawo jazdy kat. B',
		],
	},
];
