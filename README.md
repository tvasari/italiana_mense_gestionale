Applicazione web gestionale per Italiana Mense srl sviluppata utilizzando React.js e Material-UI. Al momento l’applicazione è in versione statica, ma è in via di sviluppo tutto il lato back end.
L’applicazione è stata strutturata partendo dall’idea che i dati possano essere inseriti, letti, aggiornati e cancellati (CRUD)  e che ci sia una struttura gerarchica degli utenti registrati limitando i permessi come necessario al fine di proteggere l’integrità dei dati.
Eccetto che nelle pagine di accesso e registrazione, è costantemente presente una barra laterale per la navigazione divisa in categorie e sotto categorie, da questa è possibile accedere a tutte le aree operative dell’applicazione :
•	Storico delle presenze per mese e per anno e divise per azienda e tipo di attestazione della presenza.
•	Menù attuale e storico dei menù passati con annesso collegamento ai dettagli dei costi di ogni singolo pasto di ogni singolo giorno accessibile cliccando sul rispettivo giorno della settimana. Per storico è compreso un riepilogo mensile.
•	Ristorazione, dove è possibile gestire i piatti e gli ingredienti registrati e le loro relative informazioni. Gli elementi registrati in questa categoria saranno poi disponibili per creare i nuovi menù e per elencare le scorte di magazzino.
•	Nell’area magazzino è possibile registrare un nuovo magazzino, controllare le scorte attuali e vedere uno storico delle passate. Per aggiungere delle scorte di dovrà aggiungere un DDT (Documento Di Trasporto) nell’area relativa, sarà possibile riesaminare i DDT in un loro storico dedicato. Alla fine di ogni mese verrà elaborato(funzione ancora da implementare) un documento scaricabile o visualizzabile che riepiloga le rimanenze del mese passato.
•	Nelle statistiche ci si può informare degli andamenti dei costi divisi per pasto. Si potrà scegliere tra una visuale di tutto l’anno divisa per mesi o di un mese solo divisa per settimane.
•	Per la registrazione è richiesta una conferma tramite email

##########################################################################################################################

Fake Server:
json-server --watch db.json --port 3001