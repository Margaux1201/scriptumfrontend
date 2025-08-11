import { useRouter } from "next/router";
import styles from "../../../../styles/Chapter.module.css";
import Header from "../../../../components/Header";
import Link from "next/link";
import Image from "next/image";

const ChapterDetail = () => {
  const router = useRouter();
  const { slug, chapterSlug } = router.query;

  interface Chapter {
    title: string | null;
    type: string;
    chapterNumber: number | null;
    slug: string;
  }

  const chapterEnDure: Chapter[] = [
    {
      title: null,
      type: "Prologue",
      chapterNumber: null,
      slug: "Prologue",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 1,
      slug: "Chapitre-1",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 2,
      slug: "Chapitre-2",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 3,
      slug: "Chapitre-3",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 4,
      slug: "Chapitre-4",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 5,
      slug: "Chapitre-5",
    },
    {
      title: null,
      type: "Chapitre",
      chapterNumber: 6,
      slug: "Chapitre-6",
    },
    {
      title: null,
      type: "Epilogue",
      chapterNumber: null,
      slug: "Epilogue",
    },
  ];

  interface Chapter2 {
    title: string | null;
    content: string;
    type: string;
    chapterNumber: number | null;
  }

  const chapterEnDure2: Chapter2 = {
    title: null,
    content: `Le sujet demeurait stable, malgré les multiples fractures subies quelques minutes auparavant. Ce n’était pas le premier cobaye qui s’évadait avant le traitement expérimental. Une femme d’âge mûr entra dans la sombre pièce, la mine imperturbable. Elle s’approcha du pauvre homme attaché sur une table en acier. Il se démena pour se libérer de ses sangles en dépit de ses membres brisés lorsque sa ravisseuse se pencha contre son oreille.

    — Allons, rien ne sert de s’affoler. Tout se passera vite, chuchota Docteure Kathleen Marks avant de s’adresser à un de ses subordonnés. Donnez-moi le sérum Amarok !

    Un infirmier couvert d’un masque médical lui tendit une seringue remplie d’un liquide rouge au reflet noir luisant. Le cobaye, terrifié, se débattit de plus belle, en vain. Kathleen saisit le produit qu’elle injecta dans la poitrine du captif. Ce dernier émit un sanglot pendant que l’étrange fluide s’insinuait dans son organisme quand une douleur sourde se propagea en lui. Une brûlure intense rongea sa chair, ses muscles, ses os. Le prisonnier gesticula dans un hurlement déchirant avant de s’interrompre sous les convulsions qui secouaient son corps. Il s’effondra sous le regard attentif de la scientifique qui extirpa un bloc-notes de sa blouse immaculée dans un soupir contrarié, un stylo entre ses doigts.

    — Sujet 44… A réagit avec virulence au sérum 07 lors d’une inoculation avec seringue… A survécu 34 secondes… Aucune amélioration dans les résultats… Record tenu : 2 heures 23 minutes et 30 secondes avant arrêt cardiaque… Revenir sur une administration du produit par voie orale.

    Elle rangea le calepin dans sa poche, retira ses lunettes puis désigna le cadavre d’un geste dédaigneux de la main tandis qu’elle quittait l’obscure clinique.

    — Vous pouvez l’emmener aux morts une fois qu’il se réveillera. Pas avant, si vous ne voulez pas les rejoindre !

    Elle traversa un couloir luxueux, indifférente aux soldats et aux chercheurs qui la saluaient avec respect. Des traces brunâtres parsemaient les murs ainsi que le sol somptueux du Capitole, mais Kathleen restait de marbre devant ces rappels macabres qui remontaient à bien longtemps. Elle jeta un œil à travers les hautes fenêtres sur les ruines de l’Union Square. Des carcasses de véhicule gisaient au beau milieu de la route où erraient des silhouettes titubantes. Le Memorial Ulysses S. Grant avait disparu sous le lierre qui le recouvrait tandis que le Peace Monument était réduit en un triste tas de gravats. Quant à l’obélisque du Washington Monument, seule une partie décharnée subsistait et verdissait au fil des années.

    Des cris mêlés à des pleurs étouffés résonnaient à travers les murs dorés, mais Docteure Marks n’y prêta pas attention. Elle emprunta une cage d’escalier qui déboucha dans un couloir, tout aussi fastueux que le précédent. Au bout se trouvait une porte gardée par deux hommes, chacun armé d’un fusil d’assaut ainsi que d’un revolver. Ceux-ci s’écartèrent à l’approche de leur supérieure qui entra dans son bureau sans leur accorder un regard.

    Une baie vitrée s’élevait au fond de la pièce, offrant une vue imprenable sur la Cour Suprême et la Bibliothèque du Congrès, ou du moins, ce qu’il en restait. Un tapis sombre recouvrait le parquet clair et occupait une large partie de la salle, tout comme la table en marbre qui trônait en son centre. La scientifique contourna cette dernière pour rejoindre un simple bureau en verre où se dressait un ordinateur. Elle s’installa sur son siège en cuir noir, dos au paysage chaotique de la ville, sortit son carnet puis le jeta sur une multitude de dossiers qui jonchaient le fin support transparent. 

    Elle libéra ses cheveux blancs de sa pince qu’elle déposa sur la pile d’archives, ses yeux gris rivés sur son bloc-notes. C’était son dernier candidat pour ce sérum. Son ancienne équipe devait à nouveau se réunir pour poursuivre leurs recherches. Leurs premières tentatives avaient tourné au fiasco et les avaient menés à leur dissolution. Depuis, chaque membre avait gagné en connaissance, mais aussi en influence. Ils reprendraient donc du service, puis lui livreraient les expériences les plus fructueuses pour la constitution de son armée. Toutefois, chaque avancée scientifique nécessitait des cobayes, choisis avec soin par une personne de confiance. Restait à savoir où les trouver.

    Elle récupéra un plan des États-Unis dans le tiroir du haut de son bureau qu’elle déplia sur son imposante table. Elle se dirigea vers son immense bibliothèque où était entreposé un grand nombre de livres antiques, effrités par le temps. Entre deux bouquins trônait un large coffret en teck qu’elle porta jusqu’à la carte. Elle déverrouilla la boite à l’aide d’une petite clef accrochée autour de son cou et en sortit une dague en argent avec un pommeau noir serti d’une pierre blanche ainsi qu’un pendentif en cristal. Elle s’entailla la main puis saisit le collier en récitant une incantation en langue ancienne. Son sang coula sur la gemme qui tournoya au-dessus de la table. La salle se chargea d’une énergie magnétique. Le lustre suspendu au plafond émit quelques clignotements pendant que l’ordinateur grésillait par-dessus son épaule. Cette dernière, concentrée, psalmodia de plus en plus vite. Le mouvement du pendule projeta son sang sur la carte avant de s’immobiliser. L’écran se tut, les lumières s’éteignirent tandis que cette étrange aura se dissipait. Docteure Marks posa le pendentif sur le meuble en marbre. Elle relia les cinq gouttes écarlates sur le papier en plusieurs lignes distinctes jusqu’à former une étoile.

    Soudain, un homme en tenue militaire entra en trombe dans la pièce. Son corps était élancé, son teint presque cadavérique. Une fine barbe aussi noire que ses cheveux couleur d’encre encadrait son visage creux et entourait sa bouche en un bouc soigné. Une lueur emplie de colère traversa ses iris d’un bleu glacial tandis qu’il s’avançait vers sa cheffe.

    — Madame, un patient est au milieu des morts, il a tenté de…
    Il s’interrompit devant l’étrange rituel qui se déroulait, mais n’émit aucune remarque. Il observa sa supérieure qui ne semblait pas perturbée par son irruption, focalisée sur sa carte. 

    — Laissez-le là-bas, alors. Il servira d’exemple pour les prochains, déclara-t-elle enfin avant de poser un doigt au centre de l’étoile. Savez-vous s’il y a un camp de survivants au désert Mojave ?

    — Oui, Madame. C’est l’un des plus peuplés du pays, un endroit plutôt sûr, répondit le militaire avec un léger accent russe. Ils ont une bonne visibilité sur ce qui les entoure et les morts s’y font rares.

    Il dévisagea sa cheffe devenue bien pensive. Il referma la porte du bureau afin que personne ne les écoute puis adressa un regard entendu à Kathleen Marks.

    — Vous voulez que je m’occupe d’une nouvelle cible ?

    — Non, je veux que vous vous y rendiez avec quelques hommes. Un membre de notre ancienne équipe scientifique se trouve là-bas. Faites-lui parvenir nos sérums. Il se chargera du reste.

    — Et s’il y a un témoin ?

    — Il n’y aura pas de témoin, annonça-t-elle en le fixant avec insistance. Vous avez toujours effacé vos traces, n’est-ce pas, Lieutenant Kasik ?

    L’intéressé détourna les yeux avec nervosité avant de se reprendre aussitôt.

    — Bien sûr, Madame.

    — Encore une chose. Une fois sur place, rien ne vous empêche de tester vous-mêmes nos avancées sur quelques sujets que vous croiserez, au lieu de les éliminer. On ne sait jamais… L’un d’eux pourrait avoir une compatibilité avec Amarok.

    — Vos désirs sont des ordres, Madame.

    Il quitta le bureau d’un pas rapide et lança des instructions aux gardes pendant que sa supérieure se dirigeait vers la baie vitrée, attirée par des cris à glacer le sang. Une grande cour encadrée par d’immenses grillages en acier s’étalait au pied de l’édifice, remplie de cadavres rongés par la putréfaction, de membres humains ainsi que d’êtres titubants aux corps décharnés. Malgré la cloison en verre qui séparait la scientifique de ce site morbide, les effluves purulents de viandes avariées lui parvenaient avec une intensité écœurante. Dans cette fosse, un patient couvert de sang martelait la porte du Capitole avec frénésie, suppliant pour qu’on lui ouvre. Les créatures se jetèrent sur lui et le dévorèrent sous ses hurlements de détresse. « Pauvre idiot ! La Grande Pandémie n’épargne pas les faibles dans ton genre. » Se dit Kathleen face à ce macabre spectacle. « Mon armée sera forte, puissante, impitoyable. Lorsqu’elle sera prête, plus personne ne pourra me renverser, pas même la Mort. ».

    Quelques instants plus tard, l’inconnu se releva dans un râle d’agonie en dépit des tripes qui s’échappaient de son abdomen. Il tituba dans la cour parmi les autres zombies qui l’avaient déchiqueté.
    `,
    type: "Prologue",
    chapterNumber: null,
  };

  interface Book {
    title: string;
    author: string;
    url: string;
    isSaga: boolean;
    sagaName: string | null;
    sagaNumber: number | null;
  }

  const bookEnDure2: Book = {
    title: "Les Sérums du Chaos",
    author: "Emily Ivesson",
    url: "/assets/images/Evolved_Les_sérums_du_chaos.png",
    isSaga: true,
    sagaName: "Evolved",
    sagaNumber: 1,
  };

  const handleBookClick = (): void => {
    router.push(`/book/${slug}`);
  };

  // fonction pour naviguer vers la page chapitre cliqué
  const handleChapterClick = (str: string): void => {
    router.push(`/book/${slug}/chapter/${str}`);
  };

  // Liste des boutons de chapitre
  const chapters = chapterEnDure.map((oneChapter, i) => (
    <button
      key={i}
      className={styles.chapterButton}
      onClick={() => handleChapterClick(oneChapter.slug)}
    >
      {oneChapter.type} {oneChapter.chapterNumber}
    </button>
  ));

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.chapterPart}>
          {!chapterEnDure2.title ? (
            <h1>
              {chapterEnDure2.type} {chapterEnDure2.chapterNumber}
            </h1>
          ) : (
            <h1>{chapterEnDure2.title}</h1>
          )}
          <div className={styles.chapterLine}></div>
          <p
            className={styles.contentChapter}
            style={{ whiteSpace: "pre-line" }}
          >
            {chapterEnDure2.content}
          </p>
        </div>
        <div className={styles.rightPart}>
          <Image
            src={bookEnDure2.url}
            width={200}
            height={300}
            alt={bookEnDure2.title}
          />
          {bookEnDure2.isSaga && (
            <h2>
              {bookEnDure2.sagaName} - Tome {bookEnDure2.sagaNumber}
            </h2>
          )}
          <h2>{bookEnDure2.title}</h2>
          <h3>{bookEnDure2.author}</h3>
          <button onClick={handleBookClick}>Voir le détail du livre</button>
          <button>Découvrir l'univers</button>
          <div>{chapters}</div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail;
