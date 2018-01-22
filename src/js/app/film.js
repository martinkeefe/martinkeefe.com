import html from 'choo/html'
import raw from 'choo/html/raw'
import {$q} from './lib'

//import '../../css/fa-svg-with-js.css'
//import '../lib/fontawesome-all.min'



const FILMS = [
    //{date:"2017-01-06", title:"Railroad Tigers", link:"https://en.wikipedia.org/wiki/Railroad_Tigers",
    //  youtube:"xzyE4m1BDkI", imdb:"tt4687848", netflix:"80138469", tomato:"", zooqle:"", paradiso:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Railroad_Tigers_poster.jpeg/180px-Railroad_Tigers_poster.jpeg",
    //  text:"In December 1941, Japan expands the occupation of neighbouring countries to Southeast Asia. The railway from Tianjin to Nanjing in East China became a key military transportation route, heavily guarded by Japanese soldiers. A railroad worker leads a team of freedom fighters using his knowledge of the train network. He and his men sabotage it, ambushing Japanese soldiers and stealing supplies to feed the starving Chinese."},


    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2016-01-08", title:"The Hateful Eight", series:"", link:"https://en.wikipedia.org/wiki/The_Hateful_Eight", seen:"",
        imdb:"tt3460252", youtube:"6_UI1GzaWv0", tomato:"the_hateful_eight", zooqle:"the-hateful-eight-ti4", netflix:"80064515", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/The_Hateful_Eight.jpg/180px-The_Hateful_Eight.jpg",
        text:"Written and directed by Quentin Tarantino. In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters."},

    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2016-01-29", title:"Youth", series:"", link:"https://en.wikipedia.org/wiki/Youth_(2015_film)", seen:"",
        imdb:"tt3312830", youtube:"-T7CM4di_0c", tomato:"youth_2015", zooqle:"youth-prh", netflix:"80053610", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Youth_poster.jpg/180px-Youth_poster.jpg",
        text:"A retired orchestra conductor is on vacation with his daughter and his film director best friend in the Alps when he receives an invitation from Queen Elizabeth II to perform for Prince Philip's birthday."},

    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2016-02-05", title:"Dad’s Army", series:"", link:"https://en.wikipedia.org/wiki/Dad%27s_Army_(2016_film)", seen:"",
        imdb:"tt4104054", youtube:"HaxkLVtRY1U", tomato:"dads_army", zooqle:"dad-s-army-ux7", netflix:"", paradiso:"dads-army-192500",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Dads_army_poster.jpg/180px-Dads_army_poster.jpg",
        text:"The Walmington-on-Sea Home Guard platoon deal with a visiting female journalist and a German spy as World War II draws to its conclusion."},

    {date:"2016-02-10", title:"Deadpool", series:"X-Men #8", link:"https://en.wikipedia.org/wiki/Deadpool_(film)", seen:"love",
        imdb:"tt1431045", youtube:"FyKWUTwSYAs", tomato:"deadpool", zooqle:"deadpool-uzy", netflix:"", paradiso:"deadpool-180366",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Deadpool_poster.jpg/180px-Deadpool_poster.jpg",
        text:"A fast-talking mercenary with a morbid sense of humor is subjected to a rogue experiment that leaves him with accelerated healing powers and a quest for revenge."},

    //{date:"2016-03-03", title:"London Has Fallen", series:"Fallen #2", link:"https://en.wikipedia.org/wiki/London_Has_Fallen", seen:"",
    //    imdb:"tt3300542", youtube:"3AsOdX7NcJs", tomato:"london_has_fallen", zooqle:"london-has-fallen-vnr", netflix:"70301344", paradiso:"london-has-fallen-188450",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/26/London_Has_Fallen_poster.jpg/220px-London_Has_Fallen_poster.jpg",
    //    text:"In London for the Prime Minister’s funeral, Mike Banning discovers a plot to assassinate all the attending world leaders."},

    {date:"2016-03-04", title:"Hail, Caesar!", series:"", link:"https://en.wikipedia.org/wiki/Hail,_Caesar!", seen:"like",
        imdb:"tt0475290", youtube:"kMqeoW3XRa0", tomato:"hail_caesar_2016", zooqle:"hail-caesar--uya", netflix:"80074084", paradiso:"hail-caesar-187220",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Hail%2C_Caesar%21_poster.png/180px-Hail%2C_Caesar%21_poster.png",
        text:"Written, produced, edited, and directed by Joel and Ethan Coen. A Hollywood fixer in the 1950s works to keep the studio’s stars in line."},

    {date:"2016-03-25", title:"Batman v Superman: Dawn of Justice", series:"DC Extended Universe #2", link:"https://en.wikipedia.org/wiki/Batman_v_Superman:_Dawn_of_Justice", seen:"ok",
        imdb:"tt2975590", youtube:"fis-9Zqu2Ro", tomato:"batman_v_superman_dawn_of_justice", zooqle:"batman-v-superman-dawn-of-justice-to4", netflix:"80081793", paradiso:"batman-v-superman-dawn-of-justice-181265",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Batman_v_Superman_poster.jpg/180px-Batman_v_Superman_poster.jpg",
        text:"Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs."},

    {date:"2016-03-25", title:"Disorder", series:"", lang:"fr", fr_title:"Maryland", link:"https://en.wikipedia.org/wiki/Disorder_(2015_film)", seen:"",
        imdb:"tt4085084", youtube:"fG_qYZm2Is0", tomato:"disorder_2016", zooqle:"disorder-7c", netflix:"80058251", paradiso:"disorder-181130",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Maryland_%28Disorder%29_film_poster.png/180px-Maryland_%28Disorder%29_film_poster.png",
        text:"Vincent is an ex-soldier with PTSD who is hired to protect the wife and child of a wealthy Lebanese businessman while he’s out of town. Despite the apparent tranquility in Maryland, Vincent perceives an external threat."},

    //{date:"2016-04-04", title:"The Huntsman: Winter’s War", series:"", link:"https://en.wikipedia.org/wiki/The_Huntsman:_Winter%27s_War", seen:"",
    //    imdb:"tt2381991", youtube:"_W65ndip7MM", tomato:"the_huntsman_winters_war", zooqle:"the-huntsman-winter-s-war-23rm", netflix:"80085316", paradiso:"the-huntsman-winters-war-188176",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/The_Huntsman_%E2%80%93_Winter%27s_War_poster.jpg/180px-The_Huntsman_%E2%80%93_Winter%27s_War_poster.jpg",
    //    text:"Eric and fellow warrior Sara, raised as members of ice Queen Freya’s army, try to conceal their forbidden love as they fight to survive the wicked intentions of both Freya and her sister Ravenna."},

    {date:"2016-04-08", title:"Midnight Special", series:"", link:"https://en.wikipedia.org/wiki/Midnight_Special_(film)", seen:"",
        imdb:"tt2649554", youtube:"1zuQTmVCEn4", tomato:"midnight_special_2015", zooqle:"midnight-special-nmn", netflix:"80058398", paradiso:"midnight-special-180359",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Midnight_Special_%28film%29_poster.jpg/180px-Midnight_Special_%28film%29_poster.jpg",
        text:"A father and son go on the run, pursued by the government and a cult drawn to the child’s special powers."},

    {date:"2016-04-15", title:"The Jungle Book", series:"", link:"https://en.wikipedia.org/wiki/The_Jungle_Book_(2016_film)", seen:"",
        imdb:"tt3040964", youtube:"5mkm22yO-bs", tomato:"the_jungle_book_2016", zooqle:"the-jungle-book-23ro", netflix:"80084660", paradiso:"the-jungle-book-186329",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/The_Jungle_Book_%282016%29.jpg/180px-The_Jungle_Book_%282016%29.jpg",
        text:"After a threat from the tiger Shere Khan forces him to flee the jungle, a man-cub named Mowgli embarks on a journey of self discovery with the help of panther, Bagheera, and free spirited bear, Baloo."},

    {date:"2016-04-15", title:"Criminal", series:"", link:"https://en.wikipedia.org/wiki/Criminal_(2016_film)", seen:"",
        imdb:"tt3014866", youtube:"JNfRQ4NBjUU", tomato:"criminal_2016", zooqle:"criminal-379m", netflix:"80043574", paradiso:"criminal-192974",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Criminal_2016_poster.jpg/180px-Criminal_2016_poster.jpg",
        text:"In a last-ditch effort to stop a diabolical plot, a dead CIA operative’s memories, secrets, and skills are implanted into a death-row inmate in hopes that he will complete the operative’s mission."},

    //{date:"2016-04-15", title:"Our Little Sister", lang:"jp", jp_title:"海街diary", series:"", link:"https://en.wikipedia.org/wiki/Our_Little_Sister", seen:"",
    //    imdb:"tt3756788", youtube:"NtTeSQFce2A", tomato:"", zooqle:"our-little-sister-3r6n", netflix:"80057568", paradiso:"",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Our_Little_Sister_poster.jpeg/180px-Our_Little_Sister_poster.jpeg",
    //    text:"A story that revolves around three sisters who live in their grandmother’s home and the arrival of their thirteen-year-old half sister."},

    {date:"2016-04-29", title:"Captain America: Civil War", series:"Marvel Cinematic Universe #13", link:"https://en.wikipedia.org/wiki/Captain_America:_Civil_War", seen:"like",
        imdb:"tt3498820", youtube:"xnv__ogkt0M", tomato:"captain_america_civil_war", zooqle:"captain-america-civil-war-jm", netflix:"80088567", paradiso:"captain-america-civil-war-184329",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Captain_America_Civil_War_poster.jpg/180px-Captain_America_Civil_War_poster.jpg",
        text:"Political involvement in the Avengers’ activities causes a rift between Captain America and Iron Man."},

    {date:"2016-05-13", title:"Whiskey Tango Foxtrot", series:"", link:"https://en.wikipedia.org/wiki/Whiskey_Tango_Foxtrot_(film)", seen:"love",
        imdb:"tt3553442", youtube:"dxAcIWDi8ps", tomato:"whiskey_tango_foxtrot", zooqle:"whiskey-tango-foxtrot-vv3", netflix:"80090726", paradiso:"whiskey-tango-foxtrot-188614",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Whiskey_Tango_Foxtrot_poster.png/180px-Whiskey_Tango_Foxtrot_poster.png",
        text:"Based on the memoir <i>The Taliban Shuffle: Strange Days in Afghanistan and Pakistan</i> by Kim Barker.", note:"Faultless."},

    {date:"2016-05-13", title:"Our Kind of Traitor", series:"", link:"https://en.wikipedia.org/wiki/Our_Kind_of_Traitor_(film)", seen:"",
        imdb:"tt1995390", youtube:"N5k4FBGtbMs", tomato:"our_kind_of_traitor_2016", zooqle:"our-kind-of-traitor-3bld", netflix:"", paradiso:"our-kind-of-traitor-193443",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Our_Kind_of_Traitor_%28film%29.png/180px-Our_Kind_of_Traitor_%28film%29.png",
        text:"Based on the 2010 novel by John le Carré. A couple finds themselves lured into a Russian oligarch’s plans to defect, and are soon positioned between the Russian Mafia and the British Secret Service, neither of whom they can trust."},

    {date:"2016-05-18", title:"X-Men: Apocalypse", series:"X-Men #9", link:"https://en.wikipedia.org/wiki/X-Men:_Apocalypse", seen:"like",
        imdb:"tt3385516", youtube:"PfBVIHgQbYk", tomato:"x_men_apocalypse", zooqle:"x-men-apocalypse-nei", netflix:"80092417", paradiso:"x-men-apocalypse-181204",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/04/X-Men_-_Apocalypse.jpg/180px-X-Men_-_Apocalypse.jpg",
        text:"After the re-emergence of the world’s first mutant, world-destroyer Apocalypse, the X-Men must unite to defeat his extinction level plan."},

    {date:"2016-05-27", title:"Love & Friendship", series:"", link:"https://en.wikipedia.org/wiki/Love_%26_Friendship", seen:"",
        imdb:"tt3068194", youtube:"8MaSK3POHI0", tomato:"love_and_friendship", zooqle:"love-friendship-tql", netflix:"80097350", paradiso:"love-and-friendship-195191",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Love_%26_Friendship_poster.png/180px-Love_%26_Friendship_poster.png",
        text:"Based on Jane Austen’s <i>Lady Susan</i>. Lady Susan Vernon takes up temporary residence at her in-laws’ estate and, while there, is determined to be a matchmaker for her daughter Frederica – and herself too, naturally."},

    {date:"2016-05-27", title:"Money Monster", series:"", link:"https://en.wikipedia.org/wiki/Money_Monster", seen:"",
        imdb:"tt2241351", youtube:"qr_nGAbFkmk", tomato:"money_monster", zooqle:"money-monster-23rl", netflix:"80084089", paradiso:"money-monster-191728",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Money_Monster_poster.png/180px-Money_Monster_poster.png",
        text:"Financial TV host Lee Gates and his producer Patty are put in an extreme situation when an irate investor takes them and their crew as hostage."},

    {date:"2016-06-03", title:"The Nice Guys", series:"", link:"https://en.wikipedia.org/wiki/The_Nice_Guys", seen:"like",
        imdb:"tt3799694", youtube:"GQR5zsLHbYw", tomato:"the_nice_guys", zooqle:"the-nice-guys-3chf", netflix:"80049284", paradiso:"the-nice-guys-188587",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_Nice_Guys_poster.png/180px-The_Nice_Guys_poster.png",
        text:"In 1970s Los Angeles, a mismatched pair of private eyes investigate a missing girl and the mysterious death of a porn star."},

    {date:"2016-06-04", title:"Now You See Me 2", series:"Now You See Me #2", link:"https://en.wikipedia.org/wiki/Now_You_See_Me_2", seen:"",
        imdb:"tt3110958", youtube:"4I8rVcSQbic", tomato:"now_you_see_me_2", zooqle:"now-you-see-me-2-3qx", netflix:"80093138", paradiso:"now-you-see-me-2-188461",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Now_You_See_Me_2_poster.jpg/180px-Now_You_See_Me_2_poster.jpg",
        text:"The Four Horsemen resurface, and are forcibly recruited by a tech genius to pull off their most impossible heist yet."},

    //{date:"2016-06-08", title:"Maggie’s Plan", series:"", link:"https://en.wikipedia.org/wiki/Maggie%27s_Plan", seen:"",
    //    imdb:"tt3471098", youtube:"XbJ49IUyCcA", tomato:"maggies_plan_2016", zooqle:"maggie-s-plan-3r5u", netflix:"80081370", paradiso:"maggies-plan-192797",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Maggie%27s_Plan_Poster.jpg/180px-Maggie%27s_Plan_Poster.jpg",
    //    text:"Maggie wants to have a baby, raising him on her own, but when she gets romantically involved with John, a married man, things get complicated and all the balance of Maggie’s plans may collapse."},

    {date:"2016-06-24", title:"The Secret Life of Pets", series:"", link:"https://en.wikipedia.org/wiki/The_Secret_Life_of_Pets", seen:"",
        imdb:"tt2709768", youtube:"UZ4WBlveGfw", tomato:"the_secret_life_of_pets", zooqle:"the-secret-life-of-pets-3rao", netflix:"80095314", paradiso:"the-secret-life-of-pets-186303",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/64/The_Secret_Life_of_Pets_poster.jpg/180px-The_Secret_Life_of_Pets_poster.jpg",
        text:"The quiet life of a terrier named Max is upended when his owner takes in Duke, a stray whom Max instantly dislikes."},

    {date:"2016-07-01", title:"Absolutely Fabulous: The Movie", series:"", link:"https://en.wikipedia.org/wiki/Absolutely_Fabulous:_The_Movie", seen:"",
        imdb:"tt2112096", youtube:"Dj3ZWhlmexw", tomato:"absolutely_fabulous_the_movie", zooqle:"absolutely-fabulous-the-movie-48c4", netflix:"80100166", paradiso:"absolutely-fabulous-the-movie-196960",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Absolutely_Fabulous_The_Movie.jpg/180px-Absolutely_Fabulous_The_Movie.jpg",
        text:"After attracting both media and police attention for accidentally knocking Kate Moss into the River Thames, Edina and Patsy hide out in the south of France."},

    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2016-07-22", title:"Star Trek Beyond", series:"Star Trek #13", link:"https://en.wikipedia.org/wiki/Star_Trek_Beyond", seen:"love",
        imdb:"tt2660888", youtube:"XRVD32rnzOw", tomato:"star_trek_beyond", zooqle:"star-trek-beyond-3plk", netflix:"80096630", paradiso:"star-trek-beyond-188914",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Star_Trek_Beyond_poster.jpg/180px-Star_Trek_Beyond_poster.jpg",
        text:"The U.S.S. Enterprise crew explores the furthest reaches of uncharted space, where they encounter a new ruthless enemy, who puts them, and everything the Federation stands for, to the test."},

    {date:"2016-07-22", title:"Don’t Think Twice", series:"", link:"https://en.wikipedia.org/wiki/Don%27t_Think_Twice", seen:"",
        imdb:"tt4972062", youtube:"9RFTpObS95U", tomato:"dont_think_twice", zooqle:"don-t-think-twice-4d4m", netflix:"", paradiso:"dont-think-twice-196338",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Don%27t_Think_Twice_%28film%29.png/180px-Don%27t_Think_Twice_%28film%29.png",
        text:"When a member of a popular New York City improv troupe gets a huge break, the rest of the group - all best friends - start to realize that not everyone is going to make it after all."},

    //{date:"2016-07-25", title:"Batman: The Killing Joke", series:"DCU Original Movies #26", link:"https://en.wikipedia.org/wiki/Batman:_The_Killing_Joke_(film)", seen:"",
    //    imdb:"tt4853102", youtube:"VeNi4PfNMqI", tomato:"batman_the_killing_joke", zooqle:"batman-the-killing-joke-4dmx", netflix:"80107414", paradiso:"batman-the-killing-joke-196718",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Batman-The_Killing_Joke_%28film%29.jpg/180px-Batman-The_Killing_Joke_%28film%29.jpg",
    //    text:"As Batman hunts for the escaped Joker, the Clown Prince of Crime attacks the Gordon family to prove a diabolical point mirroring his own fall into madness."},

    {date:"2016-07-27", title:"Jason Bourne", series:"Bourne #5", link:"https://en.wikipedia.org/wiki/Jason_Bourne_(film)", seen:"love",
        imdb:"tt4196776", youtube:"F4gJsKZvqE4", tomato:"jason_bourne", zooqle:"jason-bourne-4e6m", netflix:"80098202", paradiso:"jason-bourne-192244",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Jason_Bourne_%28film%29.jpg/180px-Jason_Bourne_%28film%29.jpg",
        text:"The CIA's most dangerous former operative is drawn out of hiding to uncover more explosive truths about his past."},

    {date:"2016-08-05", title:"Suicide Squad", series:"DC Extended Universe #3", link:"https://en.wikipedia.org/wiki/Suicide_Squad_(film)", seen:"like",
        imdb:"tt1386697", youtube:"CmRih_VtVAs", tomato:"suicide_squad_2016", zooqle:"suicide-squad-3r00", netflix:"80091595", paradiso:"suicide-squad-184442",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Suicide_Squad_%28film%29_Poster.png/180px-Suicide_Squad_%28film%29_Poster.png",
        text:"A secret government agency recruits some of the most dangerous incarcerated super-villains to form a defensive task force. Their first mission: save the world from the apocalypse."},

    {date:"2016-08-26", title:"Popstar: Never Stop Never Stopping", series:"", link:"https://en.wikipedia.org/wiki/Popstar:_Never_Stop_Never_Stopping", seen:"",
        imdb:"tt3960412", youtube:"AHC7guX-FCk", tomato:"popstar_never_stop_never_stopping", zooqle:"popstar-never-stop-never-stopping-3vvb", netflix:"", paradiso:"popstar-never-stop-never-stopping-193119",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Popstar_Lonely_Island.jpg/180px-Popstar_Lonely_Island.jpg",
        text:"When it becomes clear that his solo album is a failure, a former boy band member does everything in his power to maintain his celebrity status."},

    {date:"2016-08-26", title:"War Dogs", series:"", link:"https://en.wikipedia.org/wiki/War_Dogs_(2016_film)", seen:"",
        imdb:"tt2005151", youtube:"Rwh9c_E3dJk", tomato:"war_dogs_2016", zooqle:"war-dogs-w8i", netflix:"", paradiso:"war-dogs-193275",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/52/War_Dogs_2016_poster.jpg/180px-War_Dogs_2016_poster.jpg",
        text:"Loosely based on the true story of two young men, David Packouz and Efraim Diveroli, who won a three hundred million dollar contract from the Pentagon to arm America's allies in Afghanistan."},

    {date:"2016-09-02", title:"Equity", series:"", link:"https://en.wikipedia.org/wiki/Equity_(film)", seen:"",
        imdb:"tt3958780", youtube:"Xg2TSp5tJy4", tomato:"equity", zooqle:"equity-uyl", netflix:"80097143", paradiso:"equity-196848",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Equity_%28film%29.jpg/180px-Equity_%28film%29.jpg",
        text:"Senior investment banker Naomi Bishop is threatened by a financial scandal and must untangle a web of corruption."},

    {date:"2016-09-02", title:"Café Society", series:"", link:"https://en.wikipedia.org/wiki/Caf%C3%A9_Society_(film)", seen:"",
        imdb:"tt4513674", youtube:"Rl4X6pFfmTI", tomato:"cafe_society_2016", zooqle:"café-society-tqi", netflix:"", paradiso:"cafe-society-196339",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Cafe_Society.jpg/180px-Cafe_Society.jpg",
        text:"In the 1930s, a Bronx native moves to Hollywood and falls in love with a young woman who is seeing a married man."},

    {date:"2016-09-02", title:"Things to Come", lang:"fr", fr_title:"L’Avenir", series:"", link:"https://en.wikipedia.org/wiki/Things_to_Come_(2016_film)", seen:"",
        imdb:"tt4120176", youtube:"UhErAqJ8HGE", tomato:"things_to_come_2016", zooqle:"things-to-come-ugs", netflix:"80099975", paradiso:"things-to-come-198470",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/L%27Avenir.jpg/180px-L%27Avenir.jpg",
        text:"A philosophy teacher soldiers through the death of her mother, getting fired from her job, and dealing with a husband who is cheating on her."},

    {date:"2016-09-09", title:"Hell or High Water", series:"", link:"https://en.wikipedia.org/wiki/Hell_or_High_Water_(film)", seen:"",
        imdb:"tt2582782", youtube:"zZrhCMt5234", tomato:"hell_or_high_water", zooqle:"hell-or-high-water-3tlo", netflix:"80108616", paradiso:"hell-or-high-water-196241",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Hell_or_High_Water_film_poster.png/180px-Hell_or_High_Water_film_poster.png",
        text:"A divorced father and his ex-con older brother resort to a desperate scheme in order to save their family’s ranch in West Texas."},

    {date:"2016-09-09", title:"Anthropoid", series:"", link:"https://en.wikipedia.org/wiki/Anthropoid_(film)", seen:"",
        imdb:"tt4190530", youtube:"blAKCJcXC5c", tomato:"anthropoid", zooqle:"anthropoid-4pxh", netflix:"80114667", paradiso:"anthropoid-196906",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Anthropoid_%28film%29.png/180px-Anthropoid_%28film%29.png",
        text:"Based on the extraordinary true story of Operation Anthropoid, the WWII mission to assassinate SS General Reinhard Heydrich, the main architect behind the Final Solution and the Reich's third in command after Hitler and Himmler."},

    {date:"2016-09-09", title:"Kubo and the Two Strings", series:"", link:"https://en.wikipedia.org/wiki/Kubo_and_the_Two_Strings", seen:"",
        imdb:"tt4302938", youtube:"vex0gPFnBvM", tomato:"kubo_and_the_two_strings_2016", zooqle:"kubo-and-the-two-strings-3r64", netflix:"80099365", paradiso:"kubo-and-the-two-strings-188886",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Kubo_and_the_Two_Strings_poster.png/180px-Kubo_and_the_Two_Strings_poster.png",
        text:"A young boy named Kubo must locate a magical suit of armour worn by his late father in order to defeat a vengeful spirit from the past."},

    {date:"2016-09-16", title:"The Infiltrator", series:"", link:"https://en.wikipedia.org/wiki/The_Infiltrator_(2016_film)", seen:"",
        imdb:"tt1355631", youtube:"FirMAUYOp-U", tomato:"the_infiltrator", zooqle:"the-infiltrator-tx9", netflix:"80100648", paradiso:"the-infiltrator-193790",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/The_Infiltrator_%282016_film%29.png/180px-The_Infiltrator_%282016_film%29.png",
        text:"A U.S. Customs official uncovers a money laundering scheme involving Colombian drug lord Pablo Escobar."},

    {date:"2016-09-16", title:"Bridget Jones’s Baby", series:"Bridget Jones #3", link:"https://en.wikipedia.org/wiki/Bridget_Jones%27s_Baby", seen:"",
        imdb:"tt1473832", youtube:"mJsvmscPY9w", tomato:"bridget_joness_baby_2016", zooqle:"bridget-jones-s-baby-52gb", netflix:"80103579", paradiso:"bridget-joness-baby-196909",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Bridget_Jones%27s_Baby_poster.jpg/180px-Bridget_Jones%27s_Baby_poster.jpg",
        text:"Bridget's focus on single life and her career is interrupted when she finds herself pregnant, but with one hitch ... she can only be fifty percent sure of the identity of her baby’s father."},

    {date:"2016-09-23", title:"Little Men", series:"", link:"https://en.wikipedia.org/wiki/Little_Men_(2016_film)", seen:"",
        imdb:"tt4919484", youtube:"Dk9-5M-PerQ", tomato:"little_men_2016", zooqle:"little-men-4t72", netflix:"80098203", paradiso:"little-men-196256",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Little_Men_%282016_film%29.png/180px-Little_Men_%282016_film%29.png",
        text:"A new pair of best friends have their bond tested by their parents' battle over a dress shop lease."},

    //{date:"2016-09-29", title:"Miss Peregrine’s Home for Peculiar Children", series:"", link:"https://en.wikipedia.org/wiki/Miss_Peregrine%27s_Home_for_Peculiar_Children_(film)", seen:"",
    //    imdb:"tt1935859", youtube:"tV_IhWE4LP0", tomato:"miss_peregrines_home_for_peculiar_children", zooqle:"miss-peregrine-s-home-for-peculiar-children-56aq", netflix:"80079257", paradiso:"//miss-peregrines-home-for-peculiar-children-187192",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Miss_Peregrine_Film_Poster.jpg/180px-Miss_Peregrine_Film_Poster.jpg",
    //    text:"Directed by Tim Burton. When Jacob discovers clues to a mystery that stretches across time, he finds Miss Peregrine’s Home for Peculiar Children. But the danger deepens after he gets to know the residents and learns about their special powers."},

    //{date:"2016-10-05", title:"The Girl on the Train", series:"", link:"https://en.wikipedia.org/wiki/The_Girl_on_the_Train_(2016_film)", seen:"",
    //    imdb:"tt3631112", youtube:"", tomato:"", zooqle:"the-girl-on-the-train-3twr", netflix:"80105068", paradiso:"",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/34/The_Girl_on_The_Train.jpg/180px-The_Girl_on_The_Train.jpg",
    //    text:"Based on Paula Hawkins’ 2015 novel. A divorcee becomes entangled in a missing persons investigation that promises to send shockwaves throughout her life."},

    {date:"2016-10-14", title:"Little Sister", series:"", link:"https://en.wikipedia.org/wiki/Little_Sister_(2016_film)", seen:"",
        imdb:"tt5434870", youtube:"o6QUuw1Kpik", tomato:"little_sister_2016", zooqle:"little-sister-38z1", netflix:"80106504", paradiso:"little-sister-201653",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/LittleSisterPoster.jpg/180px-LittleSisterPoster.jpg",
        text:"Young nun Colleen is avoiding all contact from her family, returning to her childhood home in Asheville NC, she finds her old room exactly how she left it: painted black and covered in goth/metal posters."},

    {date:"2016-10-21", title:"Queen of Katwe", series:"", link:"https://en.wikipedia.org/wiki/Queen_of_Katwe", seen:"",
        imdb:"tt4341582", youtube:"z4l3-_yub5A", tomato:"queen_of_katwe_2016", zooqle:"queen-of-katwe-55e1", netflix:"80106180", paradiso:"queen-of-katwe-196219",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Queen_of_Katwe_poster.jpg/180px-Queen_of_Katwe_poster.jpg",
        text:"A Ugandan girl sees her world rapidly change after being introduced to the game of chess."},

    {date:"2016-10-21", title:"Keeping Up with the Joneses", series:"", link:"https://en.wikipedia.org/wiki/Keeping_Up_with_the_Joneses_(film)", seen:"",
        imdb:"tt2387499", youtube:"nPfYXXg65qA", tomato:"keeping_up_with_the_joneses", zooqle:"keeping-up-with-the-joneses-xkt", netflix:"80082849", paradiso:"keeping-up-with-the-joneses-196873",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Keeping_Up_with_the_Joneses_%28film%29.png/180px-Keeping_Up_with_the_Joneses_%28film%29.png",
        text:"A suburban couple becomes embroiled in an international espionage plot when they discover that their seemingly perfect new neighbors are government spies."},

    {date:"2016-10-25", title:"Doctor Strange", series:"Marvel Cinematic Universe #14", link:"https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film)", seen:"love",
        imdb:"tt1211837", youtube:"Lt-U_t2pUHI", tomato:"doctor_strange_2016", zooqle:"doctor-strange-3qty", netflix:"80108237", paradiso:"doctor-strange-187195",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Doctor_Strange_poster.jpg/180px-Doctor_Strange_poster.jpg",
        text:"While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts."},

     {date:"2016-11-04", title:"The Accountant", series:"", link:"https://en.wikipedia.org/wiki/The_Accountant_(2016_film)", seen:"",
        imdb:"tt2140479", youtube:"3KQX2sIhQJY", tomato:"the_accountant_2016", zooqle:"the-accountant-uiz", netflix:"80071227", paradiso:"the-accountant-196240",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/The_Accountant_%282016_film%29.png/180px-The_Accountant_%282016_film%29.png",
        text:"As a math savant uncooks the books for a new client, the Treasury Department closes in on his activities, and the body count starts to rise."},

   {date:"2016-11-10", title:"Arrival", series:"", link:"https://en.wikipedia.org/wiki/Arrival_(film)", seen:"like",
        imdb:"tt2543164", youtube:"ZLO4X6UI8OY", tomato:"arrival_2016", zooqle:"arrival-txa", netflix:"80117799", paradiso:"arrival-198946",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Arrival%2C_Movie_Poster.jpg/180px-Arrival%2C_Movie_Poster.jpg",
        text:"When twelve mysterious spacecrafts appear around the world, linguistics professor Louise Banks is tasked with interpreting the language of the apparent alien visitors."},

    {date:"2016-11-18", title:"Fantastic Beasts and Where to Find Them", series:"Fantastic Beasts #1", link:"https://en.wikipedia.org/wiki/Fantastic_Beasts_and_Where_to_Find_Them_(film)", seen:"love",
        imdb:"tt3183660", youtube:"VYZ3U1inHA4", tomato:"fantastic_beasts_and_where_to_find_them", zooqle:"fantastic-beasts-and-where-to-find-them-3qj9", netflix:"80111501", paradiso:"fantastic-beasts-and-where-to-find-them-188908",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Fantastic_Beasts_and_Where_to_Find_Them_poster.png/180px-Fantastic_Beasts_and_Where_to_Find_Them_poster.png",
        text:"The adventures of writer Newt Scamander in New York’s secret community of witches and wizards seventy years before Harry Potter reads his book in school."},

    {date:"2016-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"",
        poster:"",
        text:""},

    //{date:"2016-11-25", title:"Allied", series:"", link:"https://en.wikipedia.org/wiki/Allied_(film)", seen:"",
    //    imdb:"tt3640424", youtube:"Jlp94-C31cY", tomato:"allied", zooqle:"allied-5bjd", netflix:"80112565", paradiso:"allied-199036",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Allied_%28film%29.png/180px-Allied_%28film%29.png",
    //    text:"In 1942, a Canadian intelligence officer in North Africa encounters a female French Resistance fighter on a deadly mission behind enemy lines. When they reunite in London, their relationship is tested by the pressures of war."},

    {date:"2016-11-25", title:"Paterson", series:"", link:"https://en.wikipedia.org/wiki/Paterson_(film)", seen:"",
        imdb:"tt5247022", youtube:"E8_L9kqie7s", tomato:"paterson", zooqle:"paterson-3wxu", netflix:"", paradiso:"paterson-200648",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Paterson_%28film%29.png/180px-Paterson_%28film%29.png",
        text:"Directed by Jim Jarmusch. A quiet observation of the triumphs and defeats of daily life, along with the poetry evident in its smallest details."},

    {date:"2016-12-02", title:"Sully", series:"", link:"https://en.wikipedia.org/wiki/Sully_(film)", seen:"",
        imdb:"tt3263904", youtube:"mjKEXxO2KNE", tomato:"sully", zooqle:"sully-4tg9", netflix:"80103102", paradiso:"sully-196169",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Sully_xxlg.jpeg/180px-Sully_xxlg.jpeg",
        text:"Directed by Clint Eastwood. The story of Chesley Sullenberger, an American pilot who became a hero after landing his damaged plane on the Hudson River in order to save the flight’s passengers and crew."},

    {date:"2016-12-06", title:"Nerdland", series:"", link:"https://en.wikipedia.org/wiki/Nerdland", seen:"",
        imdb:"tt5574372", youtube:"Mwhd65BKIFM", tomato:"nerdland_2016", zooqle:"nerdland-37rh", netflix:"80148227", paradiso:"nerdland-203356",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Nerdland_poster.jpg/180px-Nerdland_poster.jpg",
        text:"The story of two best friends whose dreams of success and stardom have fizzled, so they decide to become famous in one day - at all costs."},

    {date:"2016-12-09", title:"Snowden", series:"", link:"https://en.wikipedia.org/wiki/Snowden_(film)", seen:"",
        imdb:"tt3774114", youtube:"QlSAiI3xMh4", tomato:"snowden", zooqle:"snowden-3a6o", netflix:"80064514", paradiso:"snowden-183902",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Snowden_film_poster.jpg/180px-Snowden_film_poster.jpg",
        text:"Directed by Oliver Stone. The NSA’s illegal surveillance techniques are leaked to the public by one of the agency’s employees, Edward Snowden, in the form of thousands of classified documents distributed to the press."},

    {date:"2016-12-15", title:"Rogue One: A Star Wars Story", series:"Star Wars #8", link:"https://en.wikipedia.org/wiki/Rogue_One", seen:"love",
        imdb:"tt3748528", youtube:"frdj1zb9sMY", tomato:"rogue_one_a_star_wars_story", zooqle:"rogue-one-5eu7", netflix:"80108239", paradiso:"rogue-one-a-star-wars-story-187194",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Rogue_One%2C_A_Star_Wars_Story_poster.png/180px-Rogue_One%2C_A_Star_Wars_Story_poster.png",
        text:"The daughter of an Imperial scientist joins the Rebel Alliance in a risky move to steal the Death Star plans."},

    {date:"2016-12-21", title:"Passengers", series:"", link:"https://en.wikipedia.org/wiki/Passengers_(2016_film)", seen:"dislike",
        imdb:"tt1355644", youtube:"7BWWWQzTpNU", tomato:"passengers_2016", zooqle:"passengers-5f8z", netflix:"", paradiso:"passengers-201518",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Passengers_2016_film_poster.jpg/180px-Passengers_2016_film_poster.jpg",
        text:"A spacecraft traveling to a distant colony planet and transporting thousands of people has a malfunction in its sleep chambers. As a result, two passengers are awakened 90 years early.",
        note:"So nearly an enjoyable romp with great visuals but it's poisoned by the act of violence at its core. Shame that the writer can't tell the difference between romance and abuse."},







    //--------------------------------------------------------------------------


    {date:"2017-01-12", title:"La La Land", series:"", link:"https://en.wikipedia.org/wiki/La_La_Land_(film)", seen:"",
        imdb:"tt3783958", youtube:"0pdqf4P9MB8", tomato:"la_la_land", zooqle:"la-la-land-5c22", netflix:"80095365", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/La_La_Land_%28film%29.png/180px-La_La_Land_%28film%29.png",
        text:"While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future."},

    //{date:"2017-01-13", title:"Live by Night", series:"", link:"https://en.wikipedia.org/wiki/Live_by_Night_(film)", seen:"",
    //    imdb:"tt2361317", youtube:"CtFZcAuH-qI", tomato:"live_by_night", zooqle:"live-by-night-3qje", netflix:"80091140", paradiso:"",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Live_by_Night_%28film%29.png/180px-Live_by_Night_%28film%29.png",
    //    text:"A group of Boston-bred gangsters set up shop in balmy Florida during the Prohibition era, facing off against the competition and the Ku Klux Klan."},

    {date:"2017-01-13", title:"Sleepless", link:"https://en.wikipedia.org/wiki/Sleepless_(2017_film)", seen:"",
        youtube:"grqVFoJ3jJg", imdb:"tt2072233", netflix:"", tomato:"sleepless_2017", zooqle:"sleepless-5iba", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Sleepless_%282017_film%29.jpg/180px-Sleepless_%282017_film%29.jpg",
        text:"A remake of the French thriller <i>Sleepless Night</i>. A cop with a connection to the criminal underworld scours a nightclub in search of his kidnapped son."},

    {date:"2017-01-20", title:"Detour", link:"https://en.wikipedia.org/wiki/Detour_(2016_film)", seen:"",
        youtube:"V5rTEM-kkbk", imdb:"tt4372390", netflix:"80117765", tomato:"detour_2017", zooqle:"detour-38te", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Detour_%282016_film%29.png/180px-Detour_%282016_film%29.png",
        text:"A young law student blindly enters into a pact with a man who offers to kill his stepfather, whom he feels is responsible for the accident that sent his mother into a coma."},

    {date:"2017-01-20", title:"The Red Turtle", link:"https://en.wikipedia.org/wiki/The_Red_Turtle", seen:"",
        youtube:"Sw7BggqBpTk", imdb:"tt3666024", netflix:"", tomato:"the_red_turtle", zooqle:"the-red-turtle-110", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/The_Red_Turtle.png/180px-The_Red_Turtle.png",
        text:"A Studio Ghibli coproduction. A man is shipwrecked on a deserted island and encounters a red turtle, which changes his life. The film has no dialogue."},

    {date:"2017-01-27", title:"T2 Trainspotting", link:"https://en.wikipedia.org/wiki/T2_Trainspotting", seen:"",
        youtube:"EsozpEE543w", imdb:"tt2763304", netflix:"", tomato:"t2_trainspotting", zooqle:"t2-trainspotting-tqh", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/T2_%E2%80%93_Trainspotting_poster.jpg/180px-T2_%E2%80%93_Trainspotting_poster.jpg",
        text:"After 20 years abroad, Mark Renton returns to Scotland and reunites with his old friends Sick Boy, Spud, and Begbie."},

    {date:"2017-02-03", title:"War on Everyone", link:"https://en.wikipedia.org/wiki/War_on_Everyone", seen:"",
        youtube:"XQ2L1heHHnk", imdb:"tt3708886", netflix:"80103374", tomato:"war_on_everyone", zooqle:"war-on-everyone-36tu",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/45/War_on_Everyone.png/180px-War_on_Everyone.png",
        text:"Two corrupt cops set out to blackmail and frame every criminal unfortunate enough to cross their path. Events, however, are complicated by the arrival of someone who appears to be even more dangerous than they are."},

    {date:"2017-02-03", title:"Growing Up Smith", link:"https://en.wikipedia.org/wiki/Growing_Up_Smith", seen:"",
        youtube:"88Qpf8M1z7U", imdb:"tt1105355", netflix:"", tomato:"growing_up_smith", zooqle:"growing-up-smith-5iie", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Growing_Up_Smith_poster.jpg/180px-Growing_Up_Smith_poster.jpg",
        text:"In 1979, an Indian family moves to America with hopes of living the American Dream. While their 10-year-old boy Smith falls head-over-heels for the girl next door, his desire to become a “good old boy” propels him further away from his family’s ideals than ever before."},

    {date:"2017-02-10", title:"20th Century Women", series:"", link:"https://en.wikipedia.org/wiki/20th_Century_Women", seen:"",
        imdb:"tt4385888", youtube:"6JnFaltqnAY", tomato:"20th_century_women", zooqle:"20th-century-women-5fe6", netflix:"80134080", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/20th_Century_Women.png/180px-20th_Century_Women.png",
        text:"The story of a teenage boy, his mother, and two other women who help raise him among the love and freedom of Southern California of 1979."},

    {date:"2017-02-10", title:"The Lego Batman Movie", series:"Lego Movie #2", link:"https://en.wikipedia.org/wiki/The_Lego_Batman_Movie", seen:"love",
        youtube:"rGQUKzSDhrg", imdb:"tt4116284", netflix:"80131731", tomato:"the_lego_batman_movie", zooqle:"the-lego-batman-movie-4d5c", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/61/The_Lego_Batman_Movie_PromotionalPoster.jpg/180px-The_Lego_Batman_Movie_PromotionalPoster.jpg",
        text:"A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick."},

    {date:"2017-02-10", title:"John Wick: Chapter 2", series:"John Wick #2", link:"https://en.wikipedia.org/wiki/John_Wick:_Chapter_2", seen:"",
        youtube:"mGPk9e03230", imdb:"tt4425200", netflix:"", tomato:"john_wick_chapter_2", zooqle:"john-wick-chapter-2-5j6d", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/31/John_Wick_Chapter_Two.png/180px-John_Wick_Chapter_Two.png",
        text:"After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life."},

    {date:"2017-02-17", title:"Hidden Figures", series:"", link:"https://en.wikipedia.org/wiki/Hidden_Figures", seen:"",
        imdb:"tt4846340", youtube:"5wfrDhgUMGI", tomato:"hidden_figures", zooqle:"hidden-figures-5fe4", netflix:"80123775", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/The_official_poster_for_the_film_Hidden_Figures%2C_2016.jpg/180px-The_official_poster_for_the_film_Hidden_Figures%2C_2016.jpg",
        text:"The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program."},

    {date:"2017-02-17", title:"The Founder", series:"", link:"https://en.wikipedia.org/wiki/The_Founder", seen:"",
        imdb:"tt4276820", youtube:"oprJX5BomEc", tomato:"the_founder", zooqle:"the-founder-4ook", netflix:"80101899", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/68/The_Founder_poster.png/180px-The_Founder_poster.png",
        text:"The story of Ray Kroc, a salesman who turned two brothers’ innovative fast food eatery, McDonald's, into the biggest restaurant business in the world, with a combination of ambition, persistence, and ruthlessness."},

    {date:"2017-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    //{date:"2017-02-17", title:"The Great Wall", link:"https://en.wikipedia.org/wiki/The_Great_Wall_(film)",
    //  youtube:"", imdb:"tt2034800", netflix:"", tomato:"", zooqle:"", paradiso:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/The_Great_Wall_%28film%29.png/180px-The_Great_Wall_%28film%29.png",
    //  text:"European mercenaries searching for black powder become embroiled in the defense of the Great Wall of China against a horde of monstrous creatures."},

    //{date:"2017-02-24", title:"Rock Dog", link:"https://en.wikipedia.org/wiki/Rock_Dog",
    //  youtube:"UVwFM2PukSE", imdb:"tt2822672", netflix:"", tomato:"", zooqle:"", zooqle:"rock-dog-56wz", paradiso:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Rock_Dog_2016_Teaser_Poster.jpg/180px-Rock_Dog_2016_Teaser_Poster.jpg",
    //  text:"When a radio falls from the sky into the hands of a wide-eyed Tibetan Mastiff, he leaves home to fulfill his dream of becoming a musician, setting into motion a series of completely unexpected events."},

    //{date:"2017-02-24", title:"Collide", link:"https://en.wikipedia.org/wiki/Collide_(film)",
    //  youtube:"p7yt_t3nZKA", imdb:"tt2126235", netflix:"", tomato:"", zooqle:"collide-10w", paradiso:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Collide_film_poster.jpg/180px-Collide_film_poster.jpg",
    //  text:"With Anthony Hopkins and Ben Kingsley. An American backpacker gets involved with a ring of drug smugglers as their driver, though he winds up on the run from his employers on a Cologne high-speed Autobahn."},

    {date:"2017-03-03", title:"Logan", series:"X-Men #10", link:"https://en.wikipedia.org/wiki/Logan_(film)", seen:"",
        youtube:"ny3hScFgCIQ", imdb:"tt3315342", netflix:"80149316", tomato:"logan_2017", zooqle:"logan-5jvh", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Logan_2017_poster.jpg/180px-Logan_2017_poster.jpg",
        text:"In the near future, a weary Logan cares for an ailing Professor X, somewhere on the Mexican border. However, Logan’s attempts to hide from the world, and his legacy, are upended when a young mutant arrives, pursued by dark forces."},

    {date:"2017-03-03", title:"The Last Word", link:"https://en.wikipedia.org/wiki/The_Last_Word_(2017_film)", seen:"",
        youtube:"UtnnejXW14w", imdb:"tt5023260", netflix:"80154681", tomato:"the_last_word_2017", zooqle:"the-last-word-5ksp", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Last_Word.jpg/180px-The_Last_Word.jpg",
        text:"Shirley MacLaine is Harriet, a retired businesswoman who tries to control everything around her. When she decides to write her own obituary, a young journalist takes up the task of finding out the truth resulting in a life-altering friendship."},

    //{date:"2017-03-10", title:"I.T.", series:"", link:"https://en.wikipedia.org/wiki/I.T._(film)", seen:"",
    //    imdb:"tt2679552", youtube:"hfnDTvbtDUI", tomato:"it_2016", zooqle:"i-t--55dx", netflix:"80130987", paradiso:"",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/I.T._Poster.jpg/180px-I.T._Poster.jpg",
    //    text:"A self-proclaimed millionaire, has his life turned upside down after firing his I.T. consultant."},

    {date:"2017-03-10", title:"The Sense of an Ending", link:"https://en.wikipedia.org/wiki/The_Sense_of_an_Ending_(film)", seen:"",
        youtube:"8TbmL_iQbxA", imdb:"tt4827986", netflix:"", tomato:"the_sense_of_an_ending_2017", zooqle:"the-sense-of-an-ending-5lbm", paradiso:"the-sense-of-an-ending-205175",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BYzI5ZDM2NjYtNmVhMS00Y2Q4LTg5ZWUtZjUwOGNkZDJhNGY2L2ltYWdlXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"A man becomes haunted by his past and is presented with a mysterious legacy that causes him to re-think his current situation in life."},

    {date:"2017-03-31", title:"Ghost in the Shell", link:"https://en.wikipedia.org/wiki/Ghost_in_the_Shell_(2017_film)", seen:"like",
        youtube:"G4VmJcZR0Yg", imdb:"tt1219827", netflix:"", tomato:"ghost_in_the_shell_2017", zooqle:"ghost-in-the-shell-5mny", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Ghost_in_the_Shell_%282017_film%29.png/180px-Ghost_in_the_Shell_%282017_film%29.png",
        text:"In the near future, Major is the first of her kind: A human saved from a terrible crash, who is cyber-enhanced to be a perfect soldier devoted to stopping the world’s most dangerous criminals."},

    //{date:"2017-03-31", title:"The Boss Baby", link:"https://en.wikipedia.org/wiki/The_Boss_Baby",
    //  youtube:"k397HRbTtWI", imdb:"tt3874544", netflix:"", tomato:"", zooqle:"", paradiso:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/The_Boss_Baby_poster.jpg/180px-The_Boss_Baby_poster.jpg",
    //  text:"A suit-wearing, briefcase-carrying baby pairs up with his 7-year old brother to stop the dastardly plot of the CEO of Puppy Co."},

    {date:"2017-03-31", title:"Carrie Pilby", link:"https://en.wikipedia.org/wiki/Carrie_Pilby_(film)", seen:"",
        youtube:"nLiUc1OKKQk", imdb:"tt2989524", netflix:"80147760", tomato:"carrie_pilby", zooqle:"carrie-pilby-tqj", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Carrie_Pilby_%28film%29.jpg/180px-Carrie_Pilby_%28film%29.jpg",
        text:"A person of high intelligence struggles to make sense of the world as it relates to morality, relationships, sex and leaving her apartment."},

    {date:"2017-04-07", title:"Going in Style", link:"https://en.wikipedia.org/wiki/Going_in_Style_(2017_film)", seen:"like",
        youtube:"hcdTN5soeQw", imdb:"tt2568862", netflix:"", tomato:"going_in_style_2017", zooqle:"going-in-style-5pjx", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Going_in_Style_2017_film_poster.jpg/180px-Going_in_Style_2017_film_poster.jpg",
        text:"Desperate to pay the bills and come through for their loved ones, three lifelong pals risk it all by embarking on a daring bid to knock off the very bank that absconded with their money.",
        note:"Some great actors having fun and I do like a heist movie but nearly didn't make it past the very dumb grocery store episode."},

    {date:"2017-04-07", title:"Colossal", link:"https://en.wikipedia.org/wiki/Colossal_(film)", seen:"",
        youtube:"fqcZtz8VXXE", imdb:"tt4680182", netflix:"80158202", tomato:"colossal", zooqle:"colossal-48cd", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Colossal_%28film%29.png/180px-Colossal_%28film%29.png",
        text:"Gloria is an out-of-work party girl forced to leave her life in New York City and move back home. When reports surface that a giant creature is destroying Seoul, she gradually comes to the realization that she is somehow connected to this phenomenon."},

    //{date:"2017-04-14", title:"Spark", link:"https://en.wikipedia.org/wiki/Spark_(2016_film)",
    //  youtube:"sE7DYcn8X-0", imdb:"tt3228088", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spark_Poster_2017.jpg/180px-Spark_Poster_2017.jpg",
    //  text:"Spark, a teenage monkey and his friends, Chunk and Vix, are on a mission to regain Planet Bana - a kingdom overtaken by the evil overlord Zhong."},

    {date:"2017-04-14", title:"My Entire High School Sinking Into the Sea", link:"https://en.wikipedia.org/wiki/My_Entire_High_School_Sinking_Into_the_Sea", seen:"",
        youtube:"zepBuHGkiWc", imdb:"tt5538568", netflix:"", tomato:"my_entire_high_school_sinking_into_the_sea", zooqle:"", paradiso:"my-entire-high-school-sinking-into-the-sea-209281",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/75/My_Entire_High_School_Sinking_Into_the_Sea.jpg/180px-My_Entire_High_School_Sinking_Into_the_Sea.jpg",
        text:"An earthquake causes a high school to float into the sea, where it slowly sinks like a shipwreck."},

    {date:"2017-04-14", title:"Norman: The Moderate Rise and Tragic Fall of a New York Fixer", link:"https://en.wikipedia.org/wiki/Norman:_The_Moderate_Rise_and_Tragic_Fall_of_a_New_York_Fixer", seen:"",
        youtube:"TZMCfZq3qc4", imdb:"tt4191702", netflix:"80142493", tomato:"norman_2017", zooqle:"norman-tbg", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Norman_The_Moderate_Rise_and_Tragic_Fall_of_a_New_York_Fixer.png/180px-Norman_The_Moderate_Rise_and_Tragic_Fall_of_a_New_York_Fixer.png",
        text:"Richard Gere is Norman Oppenheimer, a small time operator who befriends a young politician at a low point in his life. Three years later, when the politician becomes an influential world leader, Norman’s life dramatically changes for better and worse."},

    {date:"2017-04-21", title:"Rules Don’t Apply", series:"", link:"https://en.wikipedia.org/wiki/Rules_Don%27t_Apply", seen:"",
        imdb:"tt1974420", youtube:"a_QiAunKtxo", tomato:"rules_dont_apply", zooqle:"rules-don-t-apply-tro", netflix:"", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Rules_Don%27t_Apply.png/180px-Rules_Don%27t_Apply.png",
        text:"Directed by Warren Beatty. The unconventional love story of an aspiring actress, her ambitious driver, and their eccentric boss, the legendary billionaire Howard Hughes."},

    {date:"2017-04-28", title:"The Circle", link:"https://en.wikipedia.org/wiki/The_Circle_(2017_film)", seen:"",
        youtube:"zH0E69gtQtI", imdb:"tt4287320", netflix:"80098473", tomato:"the_circle_2017", zooqle:"the-circle-5r4n", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/The_Circle_%282017_film%29.png/180px-The_Circle_%282017_film%29.png",
        text:"A woman lands a dream job at a powerful tech company called the Circle, only to uncover an agenda that will affect the lives of all of humanity."},

    {date:"2017-04-28", title:"Sleight", link:"https://en.wikipedia.org/wiki/Sleight", seen:"",
        youtube:"ORL1d7GWoBc", imdb:"tt4573516", netflix:"", tomato:"sleight", zooqle:"sleight-v3i", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Sleight_film_poster.jpg/180px-Sleight_film_poster.jpg",
        text:"A young street magician is left to care for his little sister after their parents passing, and turns to illegal activities to keep a roof over their heads. When he gets in too deep, his sister is kidnapped, and he is forced to use his magic and brilliant mind to save her."},

    {date:"2017-04-28", title:"Buster’s Mal Heart", link:"https://en.wikipedia.org/wiki/Buster%27s_Mal_Heart", seen:"hate",
        youtube:"K9S9F5DRhbg", imdb:"tt5173032", netflix:"80152442", tomato:"busters_mal_heart", zooqle:"buster-s-mal-heart-4xrd", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Buster%27s_Mal_Heart_poster.jpg/180px-Buster%27s_Mal_Heart_poster.jpg",
        text:"A family man’s chance encounter with a conspiracy-obsessed drifter leaves him on the run from the police and an impending event known as The Inversion.",
        note:"Somehow managed half an hour of this pretentious psychological nonsense. It became so obvious that something horrible had happened that I went and watched some paint dry instead."},

    {date:"2017-05-05", title:"Guardians of the Galaxy Vol. 2", series:"Marvel Cinematic Universe #15", link:"https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_Vol._2", seen:"like",
        youtube:"rEpsPXUt4R0", imdb:"tt3896198", netflix:"80156386", tomato:"guardians_of_the_galaxy_vol_2", zooqle:"guardians-of-the-galaxy-vol-2-vo2", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/95/GotG_Vol2_poster.jpg/180px-GotG_Vol2_poster.jpg",
        text:"The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill’s true parentage."},

    {date:"2017-05-05", title:"Mindhorn", series:"", link:"https://en.wikipedia.org/wiki/Mindhorn", seen:"",
        imdb:"tt4799064", youtube:"lA5njebTiZY", tomato:"mindhorn", zooqle:"mindhorn-5rnm", netflix:"80157866", paradiso:"mindhorn-201819",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Mindhorn.png/180px-Mindhorn.png",
        text:"A has-been actor best known for playing the title character in the 1980s detective series “Mindhorn” must work with the police when a serial killer says that he will only speak with Detective Mindhorn, whom he believes to be a real person."},

    {date:"2017-05-05", title:"Take Me", link:"https://en.wikipedia.org/wiki/Take_Me_(film)", seen:"",
        youtube:"mo3A0whi0tI", imdb:"tt6598626", netflix:"", tomato:"take_me_2017", zooqle:"take-me-5sxp", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Take_Me_film.jpg/180px-Take_Me_film.jpg",
        text:"Ray is a fledgling entrepreneur who specializes in high-end simulated abductions. He jumps at the chance when a mysterious client contracts him for a weekend kidnapping with a handsome payday at the end. But the job isn't all that it seems."},

    {date:"2017-05-05", title:"Like Crazy", lang:"it", it_title:"La pazza gioia", link:"https://en.wikipedia.org/wiki/Like_Crazy_(2016_film)", seen:"",
        youtube:"qCCIjYzedPY", imdb:"tt4621872", netflix:"80116340", tomato:"like_crazy_2017", zooqle:"like-crazy-vvg", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/La_pazza_gioia_film_poster.jpg/180px-La_pazza_gioia_film_poster.jpg",
        text:"Donatella and Beatrice reside in a psychiatric facility in Tuscany. They have very different life stories, but a chance to escape brings them together in an adventure that will change their lives forever and will help them realize the beauty in imperfection."},

    {date:"2017-05-19", title:"King Arthur: Legend of the Sword", link:"https://en.wikipedia.org/wiki/King_Arthur:_Legend_of_the_Sword", seen:"",
        youtube:"jIM4-HLtUM0", imdb:"tt1972591", netflix:"", tomato:"king_arthur_legend_of_the_sword", zooqle:"king-arthur-legend-of-the-sword-5m31", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/King_Arthur_LotS_poster.jpg/180px-King_Arthur_LotS_poster.jpg",
        text:"Robbed of his birthright, Arthur comes up the hard way in the back alleys of the city. But once he pulls the sword from the stone, he is forced to acknowledge his true legacy - whether he likes it or not.  "},

    //{date:"2017-05-19", title:"Snatched", link:"https://en.wikipedia.org/wiki/Snatched_(2017_film)", seen:"",
    //  youtube:"PsBWnst8f7w", imdb:"tt2334871", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Snatched2017poster.jpg/180px-Snatched2017poster.jpg",
    //  text:"When her boyfriend dumps her before their exotic vacation, a young woman persuades her ultra-cautious mother to travel with her to paradise, with unexpected results."},

    {date:"2017-05-26", title:"Pirates of the Caribbean: Dead Men Tell No Tales", series:"Pirates of the Caribbean #5", link:"https://en.wikipedia.org/wiki/Pirates_of_the_Caribbean:_Dead_Men_Tell_No_Tales", seen:"love",
        youtube:"a5V5C8mEVzY", imdb:"tt1790809", netflix:"80149092", tomato:"pirates_of_the_caribbean_dead_men_tell_no_tales", zooqle:"pirates-of-the-caribbean-dead-men-tell-no-tales-37rq.html", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Pirates_of_the_Caribbean%2C_Dead_Men_Tell_No_Tales.jpg/180px-Pirates_of_the_Caribbean%2C_Dead_Men_Tell_No_Tales.jpg",
        text:"Captain Jack Sparrow searches for the trident of Poseidon while being pursued by an undead sea captain and his crew."},

    {date:"2017-06-01", title:"Wonder Woman", series:"DC Extended Universe #4", link:"https://en.wikipedia.org/wiki/Wonder_Woman_(2017_film)", seen:"love",
        youtube:"1Q8fG0TtVAY", imdb:"tt0451279", netflix:"", tomato:"wonder_woman_2017", zooqle:"wonder-woman-5tpy", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Wonder_Woman_%282017_film%29.jpg/180px-Wonder_Woman_%282017_film%29.jpg",
        text:"When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny."},

    //{date:"2017-06-09", title:"The Mummy", link:"https://en.wikipedia.org/wiki/The_Mummy_(2017_film)", seen:"",
    //    youtube:"IjHgzkQM2Sg", imdb:"tt2345759", netflix:"", tomato:"the_mummy_2017", zooqle:"the-mummy-5v89", paradiso:"",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_Mummy_%282017%29.jpg/180px-The_Mummy_%282017%29.jpg",
    //    text:"An ancient Egyptian princess is awakened from her crypt beneath the desert, bringing with her malevolence grown over millennia, and terrors that defy human comprehension."},

    {date:"2017-06-16", title:"Slack Bay", lang:"fr", fr_title:"Ma Loute", link:"https://en.wikipedia.org/wiki/Slack_Bay", seen:"dislike",
        youtube:"rhNZMXJF3Gg", imdb:"tt4726636", netflix:"80107682", tomato:"slack_bay_2017", zooqle:"slack-bay-3p2l", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Ma_Loute.jpg/180px-Ma_Loute.jpg",
        text:"In 1910 a well-to-do extended family visits their summer house for their annual seaside holidays. They come across a police investigation looking into several disappearances of tourists in the area.",
        note:"The trailer made this look fun but it's not. Absurd story with ludicrous OTT characters. Looks gorgeous but very disapointing."},

    {date:"2017-06-28", title:"Baby Driver", link:"https://en.wikipedia.org/wiki/Baby_Driver", seen:"",
        youtube:"z2z857RSfhk", imdb:"tt3890160", netflix:"", tomato:"baby_driver", zooqle:"baby-driver-5xa2", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Baby_Driver_poster.jpg/180px-Baby_Driver_poster.jpg",
        text:"After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail."},

    {date:"2017-06-28", title:"Okja", link:"https://en.wikipedia.org/wiki/Okja", seen:"",
        youtube:"AjCebKn4iic", imdb:"tt3967856", netflix:"80091936", tomato:"okja", zooqle:"okja-5x2v", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Okja.png/180px-Okja.png",
        text:"A young girl risks everything to prevent a powerful, multinational company from kidnapping her best friend - a fascinating beast named Okja."},

    {date:"2017-06-30", title:"Despicable Me 3", link:"https://en.wikipedia.org/wiki/Despicable_Me_3", series:"Despicable Me #4", seen:"ok",
        youtube:"euz-KBBfAAo", imdb:"tt3469046", netflix:"", tomato:"despicable_me_3", zooqle:"despicable-me-3-5xag", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjUyNzQ2MTg3Ml5BMl5BanBnXkFtZTgwNzE4NDM3MTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Gru meets his long-lost charming, cheerful, and more successful twin brother Dru who wants to team up with him for one last criminal heist."},

    {date:"2017-06-30", title:"The Little Hours", link:"https://en.wikipedia.org/wiki/The_Little_Hours", seen:"",
        youtube:"x-k7GY-0ugs", imdb:"tt5666304", netflix:"80171023", tomato:"the_little_hours", zooqle:"the-little-hours-5x8r", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/11/The_Little_Hours_poster.jpg/180px-The_Little_Hours_poster.jpg",
        text:"Based on stories from <i>The Decameron</i>. In the Middle Ages, a young servant fleeing from his master takes refuge at a convent full of emotionally unstable nuns. Introduced as a deaf mute man, he must fight to hold his cover as the nuns try to resist temptation."},

    {date:"2017-06-30", title:"2:22", link:"https://en.wikipedia.org/wiki/2:22_(2017_film)", seen:"",
        youtube:"I6DKNWM6EVo", imdb:"tt1131724", netflix:"", tomato:"222_2017", zooqle:"2-22-5ggl", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/66/2%2C22_2017_Film_Poster.jpg/180px-2%2C22_2017_Film_Poster.jpg",
        text:"A man's life is derailed when an ominous pattern of events repeats itself in exactly the same manner every day, ending at precisely 2:22 p.m."},

    {date:"2017-07-05", title:"Spider-Man: Homecoming", series:"Marvel Cinematic Universe #16", link:"https://en.wikipedia.org/wiki/Spider-Man:_Homecoming", seen:"like",
        youtube:"n9DwoQ7HWvI", imdb:"tt2250912", netflix:"", tomato:"spider_man_homecoming", zooqle:"spider-man-homecoming-5r89", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Spider-Man_Homecoming_poster.jpg/180px-Spider-Man_Homecoming_poster.jpg",
        text:"Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City."},

    {date:"2017-07-14", title:"The Death of Louis XIV", lang:"fr", fr_title:"La Mort de Louis XIV", link:"https://en.wikipedia.org/wiki/The_Death_of_Louis_XIV", seen:"",
        youtube:"BzfNF1t5DTk", imdb:"tt5129510", netflix:"", tomato:"the_death_of_louis_xiv_2017", zooqle:"the-death-of-louis-xiv-uk3", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/La_Mort_de_Louis_XIV.jpg/180px-La_Mort_de_Louis_XIV.jpg",
        text:"Upon returning from a hunting expedition, King Louis XIV feels a sharp pain in his leg. He begins to die, surrounded by loyal followers in the royal chambers."},

    {date:"2017-07-21", title:"Dunkirk", link:"https://en.wikipedia.org/wiki/Dunkirk_(2017_film)", seen:"",
        youtube:"F-eMt3SrfFU", imdb:"tt5013056", netflix:"", tomato:"dunkirk_2017", zooqle:"dunkirk-5yrp", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Dunkirk_Film_poster.jpg/180px-Dunkirk_Film_poster.jpg",
        text:"Written and directed by Christopher Nolan. Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army, and evacuated during a fierce battle in World War II."},

    //{date:"2017-07-28", title:"Wakefield", link:"https://en.wikipedia.org/wiki/Wakefield_(film)",
    //  youtube:"E00DODio0Wk", imdb:"tt5195412", netflix:"", tomato:"", zooqle:"", paradiso:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Wakefield_poster.jpg/180px-Wakefield_poster.jpg",
    //  text:"A man's nervous breakdown causes him to leave his wife and live in his attic for several months."},

    {date:"2017-08-02", title:"Valerian and the City of a Thousand Planets", link:"https://en.wikipedia.org/wiki/Valerian_and_the_City_of_a_Thousand_Planets", seen:"ok",
        youtube:"_shrCoqWh9k", imdb:"tt2239822", netflix:"", tomato:"valerian_and_the_city_of_a_thousand_planets", zooqle:"valerian-and-the-city-of-a-thousand-planets-5ysf", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Valerian_and_the_City_of_a_Thousand_Planets.jpg/180px-Valerian_and_the_City_of_a_Thousand_Planets.jpg",
        text:"Written and directed by Luc Besson and based on the French science fiction comics series <i>Valérian and Laureline</i>. A dark force threatens Alpha, a vast metropolis and home to species from a thousand planets. Special operatives Valerian and Laureline must race to identify the marauding menace and safeguard not just Alpha, but the future of the universe.",
        note:"Fantastic visuals but this could have been so much better with a decent script and leads that could actually act. Stirling effort by Clive Owen against overwhelming odds."},

    {date:"2017-08-09", title:"Atomic Blonde", link:"https://en.wikipedia.org/wiki/Atomic_Blonde", seen:"like",
        youtube:"yIUube1pSC0", imdb:"tt2406566", netflix:"", tomato:"atomic_blonde_2017", zooqle:"atomic-blonde-59sd", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Atomic_Blonde_poster.jpg/180px-Atomic_Blonde_poster.jpg",
        text:"An undercover MI6 agent is sent to Berlin during the Cold War to investigate the murder of a fellow agent and recover a missing list of double agents."},

    {date:"2017-08-16", title:"Napping Princess", lang:"jp", jp_title:"ひるね姫 〜知らないワタシの物語〜", link:"https://en.wikipedia.org/wiki/Napping_Princess", seen:"",
        youtube:"ifUu8zA3Sf8", imdb:"tt5731132", netflix:"", tomato:"napping_princess", zooqle:"ancien-and-the-magic-tablet-5lwf", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Hirune_Hime_Shiranai_Watashi_no_Monogatari_poster.jpeg/180px-Hirune_Hime_Shiranai_Watashi_no_Monogatari_poster.jpeg",
        text:"In the near future, a high school senior discovers that events in her waking life begin to parallel events in her dreams."},

    {date:"2017-08-17", title:"The Hitman’s Bodyguard", link:"https://en.wikipedia.org/wiki/The_Hitman%27s_Bodyguard", seen:"",
        youtube:"IpKmt4MpctM", imdb:"tt1959563", netflix:"80119311", tomato:"the_hitmans_bodyguard", zooqle:"the-hitman-s-bodyguard-60rr", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/HitmansBodyguard.jpg/180px-HitmansBodyguard.jpg",
        text:"The world's top bodyguard gets a new client, a hit man who must testify at the International Criminal Court. They must put their differences aside and work together to make it to the trial on time."},

    {date:"2017-08-25", title:"Logan Lucky", link:"https://en.wikipedia.org/wiki/Logan_Lucky", seen:"like",
        youtube:"aPzvKH8AVf0", imdb:"tt5439796", netflix:"80175621", tomato:"logan_lucky", zooqle:"logan-lucky-60s3", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Logan_Lucky.png/180px-Logan_Lucky.png",
        text:"Directed by Steven Soderbergh. Two brothers attempt to pull off a heist during a NASCAR race in North Carolina."},

    {date:"2017-08-25", title:"Beach Rats", link:"https://en.wikipedia.org/wiki/Beach_Rats", seen:"",
        youtube:"df0TQJBkPP4", imdb:"tt6303866", netflix:"", tomato:"beach_rats_2017", zooqle:"beach-rats-619l", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Beach_Rats_2017_Teaser_Poster.jpg/180px-Beach_Rats_2017_Teaser_Poster.jpg",
        text:"A Brooklyn teenager spends his days experimenting with drugs and looking online for older men to meet with."},

    {date:"2017-08-25", title:"American Made", link:"https://en.wikipedia.org/wiki/American_Made_(film)", seen:"like",
        youtube:"AEBIJRAkujM", imdb:"tt3532216", netflix:"", tomato:"american_made_2017", zooqle:"american-made-60rx", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/American_Made_%28film%29.jpg/180px-American_Made_%28film%29.jpg",
        text:"The story of Barry Seal, an American pilot who became a drug-runner for the CIA in the 1980s in a clandestine operation that would be exposed as the Iran-Contra Affair."},

    {date:"2017-09-08", title:"Wind River", link:"https://en.wikipedia.org/wiki/Wind_River_(film)", seen:"",
        youtube:"gg7ZknrV7gM", imdb:"tt5362988", netflix:"", tomato:"wind_river_2017", zooqle:"wind-river-5fwx", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Wind_River_%282017_film%29.png/180px-Wind_River_%282017_film%29.png",
        text:"A veteran tracker with the Fish and Wildlife Service helps to investigate the murder of a young Native American woman, and uses the case as a means of seeking redemption for an earlier act of irresponsibility which ended in tragedy."},

    {date:"2017-09-15", title:"Victoria & Abdul", link:"https://en.wikipedia.org/wiki/Victoria_%26_Abdul", seen:"",
        youtube:"SCLcSLxlKkM", imdb:"tt5816682", netflix:"", tomato:"victoria_and_abdul", zooqle:"victoria-abdul-62uc", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/36/VictoriaAndAbdulPoster.jpg/180px-VictoriaAndAbdulPoster.jpg",
        text:"Queen Victoria strikes up an unlikely friendship with a young Indian clerk named Abdul Karim."},

    {date:"2017-09-20", title:"Kingsman: The Golden Circle", series:"Kingsman #2", link:"https://en.wikipedia.org/wiki/Kingsman:_The_Golden_Circle", seen:"ok",
        youtube:"6Nxc-3WpMbg", imdb:"tt4649466", netflix:"", tomato:"kingsman_the_golden_circle", zooqle:"kingsman-the-golden-circle-3uu1", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Kingsman_The_Golden_Circle.png/180px-Kingsman_The_Golden_Circle.png",
        text:"When their headquarters are destroyed and the world is held hostage, the Kingsman’s journey leads them to the discovery of an allied spy organization in the US. These two elite secret organizations must band together to defeat a common enemy."},

    {date:"2017-09-29", title:"Mark Felt: The Man Who Brought Down the White House", link:"https://en.wikipedia.org/wiki/Mark_Felt:_The_Man_Who_Brought_Down_the_White_House", seen:"",
        youtube:"DfBccnAcuwg", imdb:"tt5175450", netflix:"", tomato:"mark_felt_the_man_who_brought_down_the_white_house", zooqle:"mark-felt-the-man-who-brought-down-the-white-house-644l", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/59/MarkFeltPoster.jpg/180px-MarkFeltPoster.jpg",
        text:"The story of Mark Felt, who under the name “Deep Throat” helped journalists Bob Woodward and Carl Bernstein uncover the Watergate scandal in 1972."},

    {date:"2017-09-29", title:"Goodbye Christopher Robin", link:"https://en.wikipedia.org/wiki/Goodbye_Christopher_Robin", seen:"",
        youtube:"IsAlKzokl-8", imdb:"tt1653665", netflix:"", tomato:"goodbye_christopher_robin", zooqle:"goodbye-christopher-robin-64kw", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Goodbye_Christopher_Robin.png/180px-Goodbye_Christopher_Robin.png",
        text:"A behind-the-scenes look at the life of author A. A. Milne and the creation of the Winnie the Pooh stories inspired by his son C. R. Milne."},

    {date:"2017-10-05", title:"Blade Runner 2049", link:"https://en.wikipedia.org/wiki/Blade_Runner_2049", seen:"love",
        youtube:"gCcx85zbxz4", imdb:"tt1856101", netflix:"", tomato:"blade_runner_2049", zooqle:"blade-runner-2049-5v8o", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Blade_Runner_2049_poster.png/180px-Blade_Runner_2049_poster.png",
        text:"A young blade runner’s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who’s been missing for thirty years."},

    {date:"2017-10-07", title:"Outrage Coda", lang:"jp", jp_title:"アウトレイジ 最終章", series:"Outrage #3", link:"https://en.wikipedia.org/wiki/Outrage_Coda", seen:"",
        youtube:"ZQxj3sz6XCI", imdb:"tt6293042", netflix:"", tomato:"outrage_coda", zooqle:"outrage-coda-65bv", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMmQyMDhhNjMtMjQyMS00OTE2LTg2ZTktMzA2M2ZiZmZkZDZhXkEyXkFqcGdeQXVyNzg0OTg0OTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"A sequel to Kitano’s 2012 film, <i>Beyond Outrage</i>, and completes Kitano’s Outrage trilogy started in 2010."},

    {date:"2017-10-13", title:"The Lego Ninjago Movie", series:"Lego Movie #3", link:"https://en.wikipedia.org/wiki/The_Lego_Ninjago_Movie", seen:"",
        youtube:"sZSYYiATFTI", imdb:"tt3014284", netflix:"", tomato:"the_lego_ninjago_movie", zooqle:"the-lego-ninjago-movie-63nl", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/The_Lego_Ninjago_Movie.jpg/180px-The_Lego_Ninjago_Movie.jpg",
        text:"Shunned by everyone for being the son of an evil warlord, a teenager seeks to defeat him with the help of his fellow ninjas."},

    {date:"2017-10-13", title:"Loving Vincent", link:"https://en.wikipedia.org/wiki/Loving_Vincent", seen:"",
        youtube:"CGzKnyhYDQI", imdb:"tt3262342", netflix:"", tomato:"loving_vincent", zooqle:"loving-vincent-3bn2", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Loving_Vincent.png/180px-Loving_Vincent.png",
        text:"In a story depicted in oil painted animation, a young man comes to the last hometown of painter Vincent van Gogh to deliver the troubled artist’s final letter and ends up investigating his final days there."},

    {date:"2017-10-13", title:"The Snowman", link:"https://en.wikipedia.org/wiki/The_Snowman_(2017_film)", seen:"like",
        youtube:"BF2Ksrxu_QY", imdb:"tt1758810", netflix:"", tomato:"the_snowman_2017", zooqle:"the-snowman-65qc", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/08/The_Snowman_%282017%29_poster.jpg/180px-The_Snowman_%282017%29_poster.jpg",
        text:"Based on the 2007 novel by Jo Nesbø. Detective Harry Hole investigates the disappearance of a woman whose scarf is found wrapped around an ominous-looking snowman."},

    {date:"2017-10-24", title:"Thor: Ragnarok", series:"Marvel Cinematic Universe #17", link:"https://en.wikipedia.org/wiki/Thor:_Ragnarok", seen:"",
        youtube:"ue80QwXMRHg", imdb:"tt3501632", netflix:"", tomato:"thor_ragnarok_2017", zooqle:"thor-ragnarok-d3", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Thor_Ragnarok_poster.jpg/180px-Thor_Ragnarok_poster.jpg",
        text:"Imprisoned, the mighty Thor finds himself in a lethal gladiatorial contest against the Hulk, his former ally. Thor must fight for survival and race against time to prevent the all-powerful Hela from destroying his home and the Asgardian civilization."},

    {date:"2017-10-27", title:"Call Me by Your Name", link:"https://en.wikipedia.org/wiki/Call_Me_by_Your_Name_(film)", seen:"",
        youtube:"Z9AYPxH5NTM", imdb:"tt5726616", netflix:"", tomato:"call_me_by_your_name", zooqle:"call-me-by-your-name-5fuj", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/CallMeByYourName2017.png/180px-CallMeByYourName2017.png",
        text:"In Northern Italy in 1983, seventeen year-old Elio begins a relationship with visiting Oliver, his father’s research assistant, with whom he bonds over his emerging sexuality, their Jewish heritage, and the beguiling Italian landscape."},

    {date:"2017-11-03", title:"Murder on the Orient Express", link:"https://en.wikipedia.org/wiki/Murder_on_the_Orient_Express_(2017_film)", seen:"",
        youtube:"Mq4m3yAoW8E", imdb:"tt3402236", netflix:"", tomato:"murder_on_the_orient_express_2017", zooqle:"murder-on-the-orient-express-69is", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Murder_on_the_Orient_Express_teaser_poster.jpg/180px-Murder_on_the_Orient_Express_teaser_poster.jpg",
        text:"When a murder occurs on the train he’s travelling on, celebrated detective Hercule Poirot is recruited to solve the case."},

    {date:"2017-11-03", title:"LBJ", link:"https://en.wikipedia.org/wiki/LBJ_(film)", seen:"",
        youtube:"fyFI6OpDEG4", imdb:"tt4778988", netflix:"", tomato:"lbj", zooqle:"lbj-5fug", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/LBJ_%28film%29.png/180px-LBJ_%28film%29.png",
        text:"The story of U.S. President Lyndon Baines Johnson from his young days in West Texas to the White House."},

    {date:"2017-11-10", title:"Paddington 2", series:"Paddington #2", link:"https://en.wikipedia.org/wiki/Paddington_2", seen:"",
        youtube:"52x5HJ9H8DM", imdb:"tt4468740", netflix:"", tomato:"paddington_2", zooqle:"paddington-2-5c8w", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMmYwNWZlNzEtNjE4Zi00NzQ4LWI2YmUtOWZhNzZhZDYyNmVmXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy’s 100th birthday, only for the gift to be stolen."},

    {date:"2017-11-17", title:"Justice League", series:"DC Extended Universe #5", link:"https://en.wikipedia.org/wiki/Justice_League_(film)", seen:"",
        youtube:"r9-DM9uBtVI", imdb:"tt0974015", netflix:"", tomato:"justice_league_2017", zooqle:"justice-league-5r03", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Justice_League_film_poster.jpg/180px-Justice_League_film_poster.jpg",
        text:"Fueled by his restored faith in humanity and inspired by Superman’s selfless act, Bruce Wayne enlists the help of his newfound ally, Diana Prince, to face an even greater enemy."},

    {date:"2017-11-10", title:"The Florida Project", link:"https://en.wikipedia.org/wiki/The_Florida_Project", seen:"",
        youtube:"WwQ-NH1rRT4", imdb:"tt5649144", netflix:"", tomato:"the_florida_project", zooqle:"the-florida-project-65a4", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/The_Florida_Project.jpg/180px-The_Florida_Project.jpg",
        text:"Set over one summer, the film follows precocious six-year-old Moonee as she courts mischief and adventure with her ragtag playmates and bonds with her rebellious but caring mother, all while living in the shadows of Disney World."},

    {date:"2017-11-10", title:"Professor Marston and the Wonder Women", link:"https://en.wikipedia.org/wiki/Professor_Marston_and_the_Wonder_Women", seen:"",
        youtube:"r991pr4Fohk", imdb:"tt6133130", netflix:"", tomato:"professor_marston_and_the_wonder_women", zooqle:"professor-marston-and-the-wonder-women-666s", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Professor_Marston_and_the_Wonder_Women.png/180px-Professor_Marston_and_the_Wonder_Women.png",
        text:"The story of psychologist William Moulton Marston, and his polyamorous relationship with his wife and his mistress who would inspire his creation of the superheroine, Wonder Woman."},

    {date:"2017-11-21", title:"Crooked House", link:"https://en.wikipedia.org/wiki/Crooked_House_(film)", seen:"",
        youtube:"FfLpwich4AE", imdb:"tt1869347", netflix:"", tomato:"crooked_house", zooqle:"crooked-house-62u0", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Crooked_House_film_poster.jpg/180px-Crooked_House_film_poster.jpg",
        text:"In Agatha Christie’s most twisted tale, a spy-turned-private-detective is lured by his former lover to catch her grandfather’s murderer before Scotland Yard exposes dark family secrets."},

    {date:"2017-11-24", title:"Battle of the Sexes", link:"https://en.wikipedia.org/wiki/Battle_of_the_Sexes_(film)", seen:"",
        youtube:"5AWP1K7FaFI", imdb:"tt4622512", netflix:"", tomato:"battle_of_the_sexes", zooqle:"battle-of-the-sexes-5fuy", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Battle_of_the_Sexes_%28film%29.png/180px-Battle_of_the_Sexes_%28film%29.png",
        text:"The true story of the 1973 tennis match between World number one Billie Jean King and ex-champ and serial hustler Bobby Riggs."},

    {date:"2017-11-24", title:"Suburbicon", link:"https://en.wikipedia.org/wiki/Suburbicon", seen:"",
        youtube:"IYga2m0V2O0", imdb:"tt0491175", netflix:"", tomato:"suburbicon", zooqle:"suburbicon-5fw1", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Suburbicon.jpg/180px-Suburbicon.jpg",
        text:"As a 1950s suburban community self-destructs, a home invasion has sinister consequences for one seemingly normal family."},

    {date:"2017-12-01", title:"The Man Who Invented Christmas", link:"https://en.wikipedia.org/wiki/The_Man_Who_Invented_Christmas_(film)", seen:"",
        youtube:"UxcnYR3mcPU", imdb:"tt6225520", netflix:"", tomato:"the_man_who_invented_christmas", zooqle:"the-man-who-invented-christmas-69nj", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/The_Man_Who_Invented_Christmas.png/180px-The_Man_Who_Invented_Christmas.png",
        text:"The journey that led to Charles Dickens’ creation of <i>A Christmas Carol</i>, a timeless tale that would redefine the holiday."},

    {date:"2017-", title:"", series:"", link:"", seen:"",
        imdb:"", youtube:"", tomato:"", zooqle:"", netflix:"", paradiso:"",
        poster:"",
        text:""},

    {date:"2017-12-08", title:"Brigsby Bear", link:"https://en.wikipedia.org/wiki/Brigsby_Bear", seen:"",
        youtube:"N4AULA7-WfM", imdb:"tt5805752", netflix:"", tomato:"brigsby_bear_2017", zooqle:"brigsby-bear-5z86", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Brigsby_Bear.png/180px-Brigsby_Bear.png",
        text:"Brigsby Bear Adventures is a children’s TV show produced for an audience of one: James. When the show abruptly ends, James’s life changes forever, and he sets out to finish the story himself."},

    {date:"2017-12-14", title:"Star Wars: The Last Jedi", series:"Star Wars #9", link:"https://en.wikipedia.org/wiki/Star_Wars:_The_Last_Jedi", seen:"love",
        youtube:"Q0CbN8sfihY", imdb:"tt2527336", netflix:"", tomato:"star_wars_the_last_jedi", zooqle:"star-wars-episode-viii-the-last-jedi-uf6", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Star_Wars_The_Last_Jedi.jpg/180px-Star_Wars_The_Last_Jedi.jpg",
        text:"Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order."},

    {date:"2017-12-18", title:"The Foreigner", link:"https://en.wikipedia.org/wiki/The_Foreigner_(2017_film)", seen:"",
        youtube:"FI3_6AvnoL8", imdb:"tt1615160", netflix:"80185765", tomato:"the_foreigner_2017", zooqle:"the-foreigner-5fuq", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/05/The_Foreigner_%282017_film%29.jpg/180px-The_Foreigner_%282017_film%29.jpg",
        text:"A humble businessman with a buried past seeks justice when his daughter is killed in an act of terrorism. A cat-and-mouse conflict ensues with a government official, whose past may hold clues to the killers' identities."},

    {date:"2017-12-22", title:"Bright", link:"https://en.wikipedia.org/wiki/Bright_(film)", seen:"",
        youtube:"6EZCBSsBxko", imdb:"tt5519340", netflix:"80119234", tomato:"bright", zooqle:"bright-6g18", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/BrightPoster.jpeg/180px-BrightPoster.jpeg",
        text:"Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for."},


    //--------------------------------------------------------------------------


    {date:"2018-01-05", title:"All the Money in the World", link:"https://en.wikipedia.org/wiki/All_the_Money_in_the_World", seen:"",
        youtube:"KXHrCBkIxQQ", imdb:"tt5294550", netflix:"", tomato:"all_the_money_in_the_world_2017", zooqle:"all-the-money-in-the-world-6d75", paradiso:"all-the-money-in-the-world-218082",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/All_the_Money_in_the_World.png/180px-All_the_Money_in_the_World.png",
        text:"The story of the kidnapping of 16-year-old John Paul Getty III and the desperate attempt by his devoted mother to convince his billionaire grandfather Jean Paul Getty to pay the ransom."},

    {date:"2018-01-12", title:"Three Billboards Outside Ebbing, Missouri", link:"https://en.wikipedia.org/wiki/Three_Billboards_Outside_Ebbing,_Missouri", seen:"",
        youtube:"Jit3YhGx5pU", imdb:"http://www.imdb.com/title/tt5027774/", netflix:"", tomato:"three_billboards_outside_ebbing_missouri", zooqle:"three-billboards-outside-ebbing-missouri-5fuf", paradiso:"three-billboards-outside-ebbing-missouri-217723",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Three_Billboards_Outside_Ebbing%2C_Missouri.png/180px-Three_Billboards_Outside_Ebbing%2C_Missouri.png",
        text:"A mother personally challenges the local authorities to solve her daughter’s murder when they fail to catch the culprit."},

    {date:"2018-01-12", title:"Darkest Hour", link:"https://en.wikipedia.org/wiki/Darkest_Hour_(film)", seen:"",
        youtube:"LtJ60u7SUSw", imdb:"tt4555426", netflix:"", tomato:"darkest_hour_2017", zooqle:"darkest-hour-6azu", paradiso:"darkest-hour-215303",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Darkest_Hour_poster.png/180px-Darkest_Hour_poster.png",
        text:"During the early days of World War II, the fate of Western Europe hangs on the newly-appointed British Prime Minister Winston Churchill, who must decide whether to negotiate with Hitler, or fight on against incredible odds."},

    {date:"2018-01-18", title:"Mary and the Witch’s Flower", lang:"jp", jp_title:"メアリと魔女の花", link:"https://en.wikipedia.org/wiki/Mary_and_the_Witch%27s_Flower", seen:"",
        youtube:"VqUKano2Hm4", imdb:"tt6336356", netflix:"", tomato:"mary_and_the_witchs_flower", zooqle:"mary-and-the-witch-s-flower-5xxb", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Mary_and_the_witch%27s_flower_poster.jpg/180px-Mary_and_the_witch%27s_flower_poster.jpg",
        text:"Based on <i>The Little Broomstick</i> by Mary Stewart, this is Studio Ponoc’s first feature film. It tells a story of a girl who finds a mysterious flower that can give her the power to become a witch for one night only."},

    {date:"2018-01-19", title:"Den of Thieves", link:"https://en.wikipedia.org/wiki/Den_of_Thieves_(film)", seen:"",
        youtube:"FKd_ks0rdAM", imdb:"tt1259528", netflix:"", tomato:"den_of_thieves", zooqle:"den-of-thieves-6fy7", paradiso:"den-of-thieves-220186",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Den_of_Thieves_poster.jpg/180px-Den_of_Thieves_poster.jpg",
        text:"A gritty Los Angeles crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff’s Department and the state’s most successful bank robbery crew as the outlaws plan a seemingly impossible heist on the Federal Reserve Bank of downtown Los Angeles."},

    {date:"2018-01-19", title:"The Post", link:"https://en.wikipedia.org/wiki/The_Post_(film)", seen:"",
        youtube:"nrXlY6gzTTM", imdb:"tt6294822", netflix:"", tomato:"the_post", zooqle:"the-post-6d7d", paradiso:"the-post-220249",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/The_Post_%28film%29.png/180px-The_Post_%28film%29.png",
        text:"A cover-up that spanned four U.S. Presidents pushed the country’s first female newspaper publisher and a hard-driving editor to join an unprecedented battle between journalist and government."},

    {date:"2018-01-24", title:"Downsizing", link:"https://en.wikipedia.org/wiki/Downsizing_(film)", seen:"",
        youtube:"UCrBICYM0yM", imdb:"tt1389072", netflix:"", tomato:"downsizing", zooqle:"downsizing-6d7o", paradiso:"downsizing-217339",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Downsizing.png/180px-Downsizing.png",
        text:"A social satire in which a man realizes he would have a better life if he were to shrink himself to five inches tall, allowing him to live in wealth and splendor."},

    {date:"2018-01-26", title:"Last Flag Flying", link:"https://en.wikipedia.org/wiki/Last_Flag_Flying", seen:"",
        youtube:"VmS4lTZ34uk", imdb:"tt6018306", netflix:"", tomato:"last_flag_flying", zooqle:"last-flag-flying-6ajr", paradiso:"last-flag-flying-217463",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Last_Flag_Flying.png/180px-Last_Flag_Flying.png",
        text:"Thirty years after they served together in Vietnam, a former Navy Corpsman Larry “Doc” Shepherd re-unites with his old buddies, former Marines Sal Nealon and Reverend Richard Mueller, to bury his son, a young Marine killed in the Iraq War."},

    {date:"2018-01-26", title:"Early Man", link:"https://en.wikipedia.org/wiki/Early_Man_(film)", seen:"",
        youtube:"GC5FIWUFfUY", imdb:"tt4701724", netflix:"", tomato:"early_man", zooqle:"early-man-6g6l", paradiso:"early-man-220197",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BOWVkMzhlMmItMDY0NC00NDY5LWIzZjctMzdmNGEwNGY2YmVmXkEyXkFqcGdeQXVyNTUxNDUxOTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"An Ardman Animation directed by Nick Park. Set at the dawn of time when prehistoric creatures and woolly mammoths roamed the earth, a caveman named Dug, along with his pet sidekick Hognob and Goona, unites his tribe to save their valley home when it is claimed by Lord Nooth and his Bronze Age City."},

    {date:"2018-02-02", title:"Roman J. Israel, Esq.", link:"https://en.wikipedia.org/wiki/Roman_J._Israel,_Esq.", seen:"",
        youtube:"CItEtnp3nPY", imdb:"tt6000478", netflix:"", tomato:"roman_j_israel_esq", zooqle:"roman-j-israel-esq-69iq", paradiso:"roman-j-israel-esq-217653",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Roman_J._Israel%2C_Esq..png/180px-Roman_J._Israel%2C_Esq..png",
        text:"Roman J. Israel, Esq., a driven, idealistic defense attorney, finds himself in a tumultuous series of events that lead to a crisis and the necessity for extreme action."},

    {date:"2018-02-09", title:"Peter Rabbit", link:"https://en.wikipedia.org/wiki/Peter_Rabbit_(film)", seen:"",
        youtube:"7Pa_Weidt08", imdb:"tt5117670", netflix:"", tomato:"peter_rabbit_2018", zooqle:"peter-rabbit-6hp5", paradiso:"peter-rabbit-218408",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Peter-rabbit-teaser.jpg/180px-Peter-rabbit-teaser.jpg",
        text:"Peter Rabbit's feud with Mr. McGregor reaches new heights as both compete for the affections of a kind animal lover who lives next door."},

    {date:"2018-02-14", title:"The Shape of Water", link:"https://en.wikipedia.org/wiki/The_Shape_of_Water_(film)", seen:"",
        youtube:"XFYWazblaUA", imdb:"tt5580390", netflix:"", tomato:"the_shape_of_water_2017", zooqle:"the-shape-of-water-6c88", paradiso:"the-shape-of-water-215544",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/37/The_Shape_of_Water_%28film%29.png/180px-The_Shape_of_Water_%28film%29.png",
        text:"Written and directed by Guillermo del Toro. At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity."},

    {date:"2018-02-16", title:"Black Panther", series:"Marvel Comic Universe #18", link:"https://en.wikipedia.org/wiki/Black_Panther_(film)", seen:"",
        youtube:"xjDjIWPwcPU", imdb:"tt1825683", netflix:"", tomato:"black_panther_2018", zooqle:"black-panther-trc", paradiso:"black-panther-212983",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Black_Panther_film_poster.jpg/180px-Black_Panther_film_poster.jpg",
        text:"After the events of <i>Captain America: Civil War</i>, King T’Challa returns home to Wakanda. But when two enemies conspire to bring down the kingdom, T’Challa must team up, as the Black Panther, with CIA agent Everett K. Ross and members of the Dora Milaje—Wakanda’s special forces—to prevent a world war."},

    {date:"2018-02-23", title:"I, Tonya", link:"https://en.wikipedia.org/wiki/I,_Tonya", seen:"",
        youtube:"iZbTLdDHRvs", imdb:"tt5580036", netflix:"", tomato:"i_tonya", zooqle:"i-tonya-6c8b", paradiso:"i-tonya-219573",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/15/I%2C_Tonya.png/180px-I%2C_Tonya.png",
        text:"Competitive ice skater Tonya Harding rises amongst the ranks at the U.S. Figure Skating Championships, but her future in the activity is thrown into doubt when her ex-husband intervenes."},

    {date:"2018-02-23", title:"Game Night", link:"https://en.wikipedia.org/wiki/Game_Night_(film)", seen:"",
        youtube:"fNtLIcyjsnI", imdb:"tt2704998", netflix:"", tomato:"game_night_2018", zooqle:"", paradiso:"game-night-220274",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Game_Night_%28film%29.png/180px-Game_Night_%28film%29.png",
        text:"A group of friends meet regularly for their game night, and one night they find themselves investigating an actual murder mystery."},

    {date:"2018-02-23", title:"Annihilation", link:"https://en.wikipedia.org/wiki/Annihilation_(film)", seen:"",
        youtube:"89OP78l9oF0", imdb:"tt2798920", netflix:"", tomato:"annihilation", zooqle:"annihilation-5fui", paradiso:"annihilation-218722",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Annihilation_%28film%29.png/180px-Annihilation_%28film%29.png",
        text:"Based on the 2014 novel by Jeff VanderMeer. A group of soldiers enters an environmental disaster zone and only one comes back out alive, though he is grievously injured. In an attempt to save his life, his wife Lena, a biologist, volunteers for a second expedition into the zone to figure out what happened to him."},

    {date:"2018-03-02", title:"Red Sparrow", link:"https://en.wikipedia.org/wiki/Red_Sparrow", seen:"",
        youtube:"PmUL6wMpMWw", imdb:"tt2873282", netflix:"", tomato:"red_sparrow", zooqle:"", paradiso:"red-sparrow-218081",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Red_Sparrow.png/180px-Red_Sparrow.png",
        text:"Based on the 2013 novel by Jason Matthews, it tells of a Russian intelligence officer and a CIA agent, the American mole in Russia, whom she should expose."},

    {date:"2018-03-02", title:"Pickings", link:"https://en.wikipedia.org/wiki/Pickings_(film)", seen:"",
        youtube:"y1f_PS3zA8Y", imdb:"tt4789822", netflix:"", tomato:"pickings", zooqle:"", paradiso:"",
        poster:"https://resizing.flixster.com/Oe6sXQo0-4BdqWRYmXvRQXeYcaQ=/206x305/v1.bTsxMjQyMDk4MztqOzE3NjAzOzEyMDA7NjMxOzk0Ng",
        text:"When a short-tempered mobster and his gang of thugs try to shake down a neighborhood bar, they’re soon confronted with the wrath of its owner - a mysterious southern woman with a dangerous past."},

    {date:"2018-03-09", title:"Thoroughbreds", link:"https://en.wikipedia.org/wiki/Thoroughbreds_(2017_film)", seen:"",
        youtube:"TPcV_3D3V2A", imdb:"tt5649108", netflix:"", tomato:"thoroughbreds_2018", zooqle:"", paradiso:"thoroughbreds-221010",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Thoroughbreds_%282017_film%29.png/180px-Thoroughbreds_%282017_film%29.png",
        text:"Two upper-class teenage girls in suburban Connecticut rekindle their unlikely friendship after years of growing apart. Together, they hatch a plan to solve both of their problems-no matter what the cost."},

    {date:"2018-03-09", title:"The Leisure Seeker", link:"https://en.wikipedia.org/wiki/The_Leisure_Seeker", seen:"",
        youtube:"VGGKsVFslJ8", imdb:"tt3741632", netflix:"", tomato:"the_leisure_seeker", zooqle:"the-leisure-seeker-6b3i", paradiso:"the-leisure-seeker-222415",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Leisure_Seeker.png/180px-The_Leisure_Seeker.png",
        text:"Based on the 2009 novel by Michael Zadoorian, it stars Donald Sutherland and Helen Mirren as a runaway couple who embark on a cross-country journey from Boston to the Florida Keys in their vintage camper to escape from the suffocating care of their doctors and grown children."},

    {date:"2018-03-09", title:"A Wrinkle In Time", link:"https://en.wikipedia.org/wiki/A_Wrinkle_in_Time_(2018_film)", seen:"",
        youtube:"E4U3TeY2wtM", imdb:"tt1620680", netflix:"", tomato:"a_wrinkle_in_time_2018", zooqle:"", paradiso:"a-wrinkle-in-time-215381",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/AWrinkleInTimeTeaser.jpg/180px-AWrinkleInTimeTeaser.jpg",
        text:"Based on the 1962 novel by Madeleine L’Engle. After learning her astrophysicist father is being held captive on a distant planet deep in the grip of a universe-spanning evil, Meg Murry works with her highly intelligent younger brother, her classmate, and three astral travelers to save him."},

    {date:"2018-03-16", title:"Entebbe", link:"https://en.wikipedia.org/wiki/Entebbe_(film)", seen:"",
        youtube:"kuTBea8_-LY", imdb:"tt5466186", netflix:"", tomato:"7_days_in_entebbe_2018", zooqle:"", paradiso:"7-days-in-entebbe-221287",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Entebbe_poster.png/180px-Entebbe_poster.png",
        text:"In 1976, four terrorists hijack Air France Flight 139 en route from Tel Aviv to Paris via Athens and hold the passengers hostage after a forced landing in Entebbe in the hope of forcing Israel to release members of PFLP-EO imprisoned by the Mossad."},

    {date:"2018-03-23", title:"Isle of Dogs", link:"https://en.wikipedia.org/wiki/Isle_of_Dogs_(film)", seen:"",
        youtube:"dt__kig8PVU", imdb:"tt5104604", netflix:"", tomato:"isle_of_dogs_2018", zooqle:"", paradiso:"isle-of-dogs-218744",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/23/IsleOfDogsFirstLook.jpg/180px-IsleOfDogsFirstLook.jpg",
        text:"Written and directed by Wes Anderson. Set in a dystopian future Japan in which dogs have been quarantined on the remote eponymous island due to “canine flu”, this follows five local dogs that are fed up with their isolated existence until a boy ventures to the island to search for his dog."},

    {date:"2018-03-30", title:"Ready Player One", link:"https://en.wikipedia.org/wiki/Ready_Player_One_(film)", seen:"",
        youtube:"cSp1dM2Vj48", imdb:"tt1677720", netflix:"", tomato:"ready_player_one", zooqle:"", paradiso:"ready-player-one-215568",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Ready_Player_One_%28film%29.png/180px-Ready_Player_One_%28film%29.png",
        text:"Directed by Steven Spielberg, written by Zak Penn and Ernest Cline, and based on Cline’s 2011 novel. Set in a near-future dystopian Earth, where the population spends most of its time in an interconnected virtual space called the OASIS."},

    {date:"2018-04-06", title:"Wonderstruck", link:"https://en.wikipedia.org/wiki/Wonderstruck_(film)", seen:"",
        youtube:"o1vV0oorclg", imdb:"tt5208216", netflix:"", tomato:"wonderstruck", zooqle:"wonderstruck-66e4", paradiso:"wonderstruck-216543",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Wonderstruck_film_poster.jpg/180px-Wonderstruck_film_poster.jpg",
        text:"The story of a young boy in the Midwest is told simultaneously with a tale about a young girl in New York from fifty years ago as they both seek the same mysterious connection."},

    {date:"2018-04-06", title:"Chappaquiddick", link:"https://en.wikipedia.org/wiki/Chappaquiddick_(film)", seen:"",
        youtube:"qG-c8DtOm9g", imdb:"tt5270948", netflix:"", tomato:"chappaquiddick", zooqle:"", paradiso:"chappaquiddick-221833",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Chappaquiddick_%28film%29.png/180px-Chappaquiddick_%28film%29.png",
        text:"In 1969, Massachusetts Senator Ted Kennedy in Chappaquiddick drives his car into the water. His passenger, the young campaign strategist Mary Jo Kopechne, is killed in the car accident. Nevertheless, Kennedy does not immediately decide to call the police. He returns to his hotel and calls in the help of his dominant father to save his political career."},

    {date:"2018-04-13", title:"The New Mutants", series:"X-Men #11", link:"https://en.wikipedia.org/wiki/The_New_Mutants_(film)", seen:"",
        youtube:"bu9e410C__I", imdb:"tt4682266", netflix:"", tomato:"the_new_mutants", zooqle:"the-new-mutants-5qtr", paradiso:"the-new-mutants-219233",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/TheNewMutantsPoster.jpeg/180px-TheNewMutantsPoster.jpeg",
        text:"Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves."},

    {date:"2018-04-13", title:"Beirut", link:"https://en.wikipedia.org/wiki/Beirut_(film)", seen:"",
        youtube:"", imdb:"tt4669264", netflix:"", tomato:"beirut", zooqle:"", paradiso:"beirut-222396",
        poster:"https://resizing.flixster.com/0MdKJjRjn-59uUGVc0gbTvgJw30=/206x305/v1.bTsxMjY0MTk2MjtwOzE3NjA2OzEyMDA7NjcyOzk5Nw",
        text:"In 1980s Beirut, a former U.S. diplomat returns to service to save a colleague from the group responsible for the death of his family."},

    {date:"2018-05-04", title:"Avengers: Infinity War", series:"Marvel Comic Universe #19", link:"https://en.wikipedia.org/wiki/Avengers:_Infinity_War", seen:"",
        youtube:"6ZfuNTqbHE8", imdb:"tt4154756", netflix:"", tomato:"avengers_infinity_war", zooqle:"avengers-infinity-war-379w", paradiso:"avengers-infinity-war-206880",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Avengers_Infinity_War.jpg/180px-Avengers_Infinity_War.jpg",
        text:"The sequel to 2012’s <i>Marvel’s The Avengers</i> and 2015’s <i>Avengers: Age of Ultron</i>. Four years after the events of <i>Guardians of the Galaxy Vol. 2</i>, the Avengers have been torn apart following the events of <i>Captain America: Civil War</i>. When Thanos arrives on Earth to collect the Infinity Stones for a gauntlet that will allow him to bend reality to his will, the Avengers must join forces with the Guardians of the Galaxy to stop him."},

    {date:"2018-05-25", title:"Solo: A Star Wars Story", series:"Star Wars #10", link:"https://en.wikipedia.org/wiki/Solo:_A_Star_Wars_Story", seen:"",
        youtube:"", imdb:"tt3778644", netflix:"", tomato:"solo_a_star_wars_story", zooqle:"", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNzg1OWY4OWYtYzY5NC00ODg5LWIxM2EtZjdjNjE4N2NmYzE4XkEyXkFqcGdeQXVyMjg5NDMwMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Directed by Ron Howard. Han Solo and Chewbacca’s adventures before joining the Rebellion, including their early encounters with Lando Calrissian."},

    {date:"2018-06-01", title:"Deadpool 2", series:"X-Men #12", link:"https://en.wikipedia.org/wiki/Deadpool_2", seen:"",
        youtube:"wLeGWcVeIZ4", imdb:"tt5463162", netflix:"", tomato:"deadpool_2", zooqle:"untitled-deadpool-sequel-5qay", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Deadpool_2_poster.jpg/180px-Deadpool_2_poster.jpg",
        text:"After surviving a near fatal bovine attack, a disfigured cafeteria chef struggles to fulfill his dream of becoming Mayberry’s hottest bartender while also learning to cope with his lost sense of taste. Searching to regain his spice for life, as well as a flux capacitor, he must battle ninjas, the yakuza, and a pack of sexually aggressive canines, as he journeys around the world to discover the importance of family, friendship, and flavor – finding a new taste for adventure and earning the coveted coffee mug title of World’s Best Lover."},

    {date:"2018-06-08", title:"Ocean’s 8", link:"https://en.wikipedia.org/wiki/Ocean%27s_8", seen:"",
        youtube:"NANn6DrAkZo", imdb:"tt5164214", netflix:"", tomato:"oceans_8", zooqle:"", paradiso:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/OceansEightPoster.jpeg/180px-OceansEightPoster.jpeg",
        text:"Danny Ocean's estranged sister, Debbie, attempts to pull off the heist of the century at New York City’s star-studded annual Met Gala. Her first stop is to assemble the perfect crew."},

    {date:"2018-06-15", title:"Incredibles 2", link:"https://en.wikipedia.org/wiki/Incredibles_2", seen:"",
        youtube:"J1ZMSu24lAw", imdb:"tt3606756", netflix:"", tomato:"incredibles_2", zooqle:"incredibles-2-3qk0", paradiso:"incredibles-2-220661",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/27/The_Incredibles_2.jpg/180px-The_Incredibles_2.jpg",
        text:"The Parr family struggles to maintain normal lives while Helen Parr, also known as Elastigirl, is out fighting crime. Meanwhile, Helen’s husband Bob Parr, also known as Mr. Incredible, remains at home watching their children Violet, Dash, and discovering Jack-Jack’s secret powers. However, they, along with Frozone will have to battle a new villain, The Underminer with a sinister plot."},

    {date:"2018-07-06", title:"Ant-Man and the Wasp", series:"Marvel Comic Universe #20", link:"https://en.wikipedia.org/wiki/Ant-Man_and_the_Wasp", seen:"",
        youtube:"", imdb:"tt5095030", netflix:"", tomato:"ant_man_and_the_wasp", zooqle:"", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNWM4MWExOTUtNDk1MS00YmRhLWI0NzItZmY3MDE2ZjZkOGIwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR3,0,182,268_AL_.jpg",
        text:"Set after the events of <i>Captain America: Civil War</i>, Scott Lang tries to balance his home life as a father with his responsibilities as Ant-Man, when Hope van Dyne and Hank Pym present him with a new mission, requiring him to team up with van Dyne as the new Wasp."},

    //{date:"2018-07-20", title:"Alita: Battle Angel", link:"https://en.wikipedia.org/wiki/Alita:_Battle_Angel",
    //  youtube:""},

    {date:"2018-08-03", title:"Christopher Robin", link:"https://en.wikipedia.org/wiki/Christopher_Robin_(film)", seen:"",
        youtube:"", imdb:"tt4575576", netflix:"", tomato:"christopher_robin", zooqle:"", paradiso:"",
        text:"Not to be confused with <i>Goodbye Christopher Robin</i>. Inspired by A. A. Milne’s book <i>Winnie-the-Pooh</i> it is a live-action adaptation of the Disney franchise. Christopher Robin is now all grown up and has lost all sense of imagination. Pooh and his friends re-enter Christopher’s life to help him find it again."},

    {date:"2018-08-03", title:"The Equalizer 2", link:"https://en.wikipedia.org/wiki/The_Equalizer_2", seen:"",
        youtube:"", imdb:"tt3766354", netflix:"", tomato:"the_equalizer_2", zooqle:"", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BN2E0OWE1OTYtOWM0MS00YThkLWI3N2ItNDY1OWM4NGNlMTZjXkEyXkFqcGdeQXVyMjI4MjA3NDY@._V1_UY268_CR3,0,182,268_AL_.jpg",
        text:"A sequel to 2014 film <i>The Equalizer</i>, based on the TV series."},

    {date:"2018-08-17", title:"Captive State", link:"https://en.wikipedia.org/wiki/Captive_State_(film)", seen:"",
        youtube:"", imdb:"tt5968394", netflix:"", tomato:"captive_state", zooqle:"", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BODE5ODM5Mjc5MF5BMl5BanBnXkFtZTgwNjQ5OTIzMjI@._V1_UY268_CR110,0,182,268_AL_.jpg",
        text:"Set in a Chicago neighborhood nearly a decade after an occupation by an extra-terrestrial force, Captive State explores the lives on both sides of the conflict - the collaborators and dissidents."},

    {date:"2018-09-12", title:"Johnny English 3", series:"Johnny English #3", link:"https://en.wikipedia.org/wiki/Johnny_English_3", seen:"",
        youtube:"", imdb:"tt6921996", netflix:"", tomato:"johnny_english_3", zooqle:"", paradiso:"",
        poster:"",
        text:"Johnny English returns to save the world again."},

    {date:"2018-10-05", title:"Smallfoot", link:"https://en.wikipedia.org/wiki/Smallfoot_(film)", seen:"",
        youtube:"qUHoP7F8pdk", imdb:"tt6182908", netflix:"", tomato:"smallfoot", zooqle:"", paradiso:"smallfoot-220936",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Smallfoot_%28film%29.png/180px-Smallfoot_%28film%29.png",
        text:"Migo is a Yeti who is convinced that the elusive creatures known as “Smallfoots” (actually Humans) really do exist."},

    {date:"2018-10-05", title:"Venom", series:"Sony’s Marvel Universe #1", link:"https://en.wikipedia.org/wiki/Venom_(2018_film)", seen:"",
        youtube:"", imdb:"tt1270797", netflix:"", tomato:"venom_2018", zooqle:"", paradiso:"",
        poster:"https://www.iceposter.com/thumbs/MOV_deb63422_b.jpg",
        text:"Intended to be the first film in Sony’s Marvel Universe, a new shared universe featuring the Marvel characters to which Sony possessed the film rights, though Sony also intends for the film to share the world of <i>Spider-Man: Homecoming</i>, which is set in the Marvel Comic Universe. "},

    {date:"2018-10-19", title:"The Girl in the Spider’s Web", series:"Millenium #4", link:"https://en.wikipedia.org/wiki/The_Girl_in_the_Spider%27s_Web_(film)", seen:"",
        youtube:"", imdb:"tt5177088", netflix:"", tomato:"the_girl_in_the_spiders_web", zooqle:"", paradiso:"",
        text:"Based on the novel by David Lagercrantz. Computer hacker Lisbeth Salander and journalist Mikael Blomkvist find themselves caught in a web of spies, cyber criminals and corrupt government officials."},

    {date:"2018-11-02", title:"First Man", link:"https://en.wikipedia.org/wiki/First_Man_(film)", seen:"",
        youtube:"", imdb:"tt1213641", netflix:"", tomato:"first_man", zooqle:"", paradiso:"",
        poster:"",
        text:"The riveting true story of NASA’s mission to land a man on the moon, focusing on Neil Armstrong and the years 1961–1969."},

    {date:"2018-11-02", title:"X-Men: Dark Phoenix", series:"X-Men #13", link:"https://en.wikipedia.org/wiki/X-Men:_Dark_Phoenix", seen:"",
        youtube:"", imdb:"tt6565702", netflix:"", tomato:"x_men_dark_phoenix", zooqle:"", paradiso:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BZWUyMWVlMjEtNjRkYS00YjNlLThmODItYzc1MTQ5NzBiOGM2XkEyXkFqcGdeQXVyNjY5NDczMTk@._V1_UY268_CR11,0,182,268_AL_.jpg",
        text:"Set in the 1990s after the events of <i>X-Men: Apocalypse</i>, the X-Men have become a household name and a public sensation. Professor X encourages the team to do more as superheroes. One mission takes them into space and an accident greatly empowers Jean Grey, but at the cost of losing control of herself and acting irrationally. Meanwhile, an alien shapeshifter seeks to use Jean for her own intentions, believing her to be “the Phoenix”."},

    {date:"2018-11-16", title:"Fantastic Beasts: The Crimes of Grindelwald", series:"Fantastic Beasts #2", link:"https://en.wikipedia.org/wiki/Fantastic_Beasts:_The_Crimes_of_Grindelwald", seen:"",
        youtube:"", imdb:"tt4123430", netflix:"", tomato:"fantastic_beasts_the_crimes_of_grindelwald", zooqle:"", paradiso:"",
        poster:"https://www.warnerbros.com/sites/default/files/styles/key_art_270x400/public/movies/media/browser/FB_Crimes_of_Grindelwald_keyart1.jpg?itok=uWUxPyZC",
        text:"Directed by David Yates, with a script by J. K. Rowling. The second installment of the <i>Fantastic Beasts and Where to Find Them</i> series follows the adventures of Newt Scamander."},

    {date:"2018-12-14", title:"Mortal Engines", link:"https://en.wikipedia.org/wiki/Mortal_Engines_(film)", seen:"",
        youtube:"fupYIggOq38", imdb:"tt1571234", netflix:"", tomato:"mortal_engines", zooqle:"", paradiso:"mortal-engines-221736",
        poster:"https://cdn-2.cinemaparadiso.co.uk/1801060500252_l.jpg",
        text:"Based on the 2002 novel by Philip Reeve. Millennia after much of the world was destroyed, civilization has adopted a new way of living. Gigantic moving cities now roam the Earth, chasing and devouring smaller traction towns for resources. A low-class citizen of the moving city of London, finds himself fighting for survival after he encounters a fugitive."},

    {date:"2018-12-21", title:"Aquaman", series:"DC Extended Universe #6", link:"https://en.wikipedia.org/wiki/Aquaman_(film)", seen:"",
        youtube:"w9hGjyzNTAw", imdb:"tt1477834", netflix:"", tomato:"aquaman_2018", zooqle:"", paradiso:"",
        poster:"https://pre00.deviantart.net/4328/th/pre/f/2017/113/2/e/aquaman_movie_poster_by_jackjack671120-db6wqbr.jpg",
        text:"Following the events of <i>Justice League</i>, Arthur Curry / Aquaman, the reluctant ruler of the underwater kingdom of Atlantis, is caught between surface dwellers that are always polluting the globe and his own people who are ready to invade the surface. He must balance both the nations and deal with new enemies from within the kingdom while learning more about his heritage."},

    //{date:"2018-", title:"", link:"",
    //  youtube:""},
    //{date:"2018-", title:"", link:"",
    //  youtube:""},
];

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const IMG = {
    imdb: require('../../img/icons8-imdb-48.png'),
    youtube: require('../../img/icons8-play-button-48.png'),
    tomato: require('../../img/icons8-tomato-48.png'),
    netflix: require('../../img/icons8-netflix-48.png'),
    zooqle: require('../../img/zq-logo.png'),
    //paradiso: require('../../img/paradiso.png'),
    fr: require('../../img/icons8-france-48.png'),
    de: require('../../img/icons8-germany-48.png'),
    it: require('../../img/icons8-italy-48.png'),
    jp: require('../../img/icons8-japan-48.png'),
};
const COLOR = {
    love: "#0FB",
    like: "#0A0",
    ok: "#BB0",
    dislike: "#F80",
    hate: "#D00",
}

function rate(seen) {
    return html`
        <svg width="14" height="19">
            <rect width="14" height="14" style="fill:${COLOR[seen]}" />
        </svg>`
}

export default function(year)
{
    const tbl = html`<table class="films"></table>`;

    FILMS.forEach(film => {
        const date = film.date.split('-');

        if (date.length == 3 && date[0] === year) {
            const poster = film.poster ? html`<img src="${film.poster}" width="96">` : '';

            const links = [];
            //if (film.link) {
            //  links.push(`<a href="${film.link}"><i class="fab fa-wikipedia-w"></i></a>`);
            //}
            if (film.imdb) {
                //links.push(`<a href="http://www.imdb.com/title/${film.imdb}/"><i class="fab fa-imdb"></i></a>`);
                links.push(`<a href="http://www.imdb.com/title/${film.imdb}/"><img src="${IMG.imdb}" height="16"></a>`);
            }
            if (film.youtube) {
                //links.push(`<a href="${film.trailer}"><i class="fab fa-youtube"></i></a>`);
                links.push(`<a href="https://www.youtube.com/watch?v=${film.youtube}"><img src="${IMG.youtube}" height="16"></a>`);
            }
            if (film.tomato) {
                //const rt = film.tomato.split('|');
                links.push(`<a href="https://www.rottentomatoes.com/m/${film.tomato}"><img src="${IMG.tomato}" height="16"></a>`);
            }
            if (film.zooqle) {
                links.push(`<a href="https://zooqle.com/movie/${film.zooqle}.html"><img src="${IMG.zooqle}" height="18"></a>`);
            }
            if (film.netflix) {
                links.push(`<a href="http://unogs.com/video/?v=${film.netflix}"><img src="${IMG.netflix}" width="46"></a>`);
            }
            //if (film.paradiso) {
            //    links.push(`<a href="https://www.cinemaparadiso.co.uk/rentals/${film.paradiso}.html"><img src="${IMG.paradiso}" width="46"></a>`);
            //}

            let title = html`<a href="${film.link}"><i>${film.title}</i></a>`;

            if (film.lang) {
                if (film.lang === 'jp') {
                    title = html`<td>${title} <img style="vertical-align: baseline;padding-left:5px" src="${IMG.jp}" height="13"> ${film[film.lang+'_title'] || ''}</td>`;
                }
                else {
                    title = html`<td>${title} <img style="vertical-align: baseline;padding-left:5px" src="${IMG[film.lang]}" height="13"> <i>${film[film.lang+'_title'] || ''}</i></td>`;
                }
            }
            else {
                title = html`<td>${title}</td>`;
            }

            const seen = film.seen ? rate(film.seen) : '';
            const note = film.note ? html`<p class="small"><i>${film.note}</i></p>` : '';

            tbl.appendChild(html`
                <tr>
                    <td nowrap>${MONTH[Number(date[1])-1]} ${Number(date[2])}</td>
                    <td rowspan="2">${poster}</td>
                    ${title}
                    <td nowrap style="text-align: right">${film.series} ${seen}</td>
                </tr>`);
            tbl.appendChild(html`
                <tr style="height: 100%">
                    <td class="links">${raw(links.join(' '))}</td>
                    <td colspan="2"><p class="small">${raw(film.text || '')}</p>${note}</td>
                </tr>`);
        }
    });

    return [
        html`<h1>${year} Film Picks</h1>`,
        html`<p>This is my selection of films I might want to watch. It is <i>not</i> any sort of value judgment or recommendation. Here is a key to
                the links in the left-hand column:</p>`,
        html`<dl class="films">
                <dt><img src="${IMG.imdb}" height="16"></dt>
                <dd>Goes to film's page at IMDB.</dd>
                <dt><img src="${IMG.youtube}" height="16"></dt>
                <dd>Goes to a trailer on YouTube.</dd>
                <dt><img src="${IMG.tomato}" height="16"></dt>
                <dd>Goes to film’s page at Rotten Tomatoes.</dd>
                <dt><img src="${IMG.netflix}" width="46"></dt>
                <dd>Goes to a site that tell’s you in which counties the film is available on Netflix.</dd>
                <dt><img src="${IMG.zooqle}" height="18"></dt>
                <dd>Goes to a site listing bitTorrents of the film. Caution: You should know what you're doing if you use this. <i>Never</i> use the direct download links!</dd>
            </dl>`,
        html`<p>Once I've seen a film I record my reaction like this: ${rate('love')}=love, ${rate('like')}=like, ${rate('ok')}=ok, ${rate('dislike')}=dislike, ${rate('hate')}=hate.
             Sometimes I add a note about my reaction.</p>`,
        tbl
    ];
}
//                <dt><img src="${IMG.paradiso}" width="45"></dt>
//                <dd>Goes to a UK site that rents out DVDs and Blu-rays. Operates in same way as LoveFilm did before Amazon closed it.</dd>
