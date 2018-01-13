import html from 'choo/html'
import raw from 'choo/html/raw'
import {$q} from './lib'

import '../../css/fa-svg-with-js.css'
import '../lib/fontawesome-all.min'



const FILMS = [
    //{date:'2017-01-06', title:"Railroad Tigers", link:"https://en.wikipedia.org/wiki/Railroad_Tigers",
    //  youtube:"xzyE4m1BDkI", imdb:"tt4687848", netflix:"80138469", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Railroad_Tigers_poster.jpeg/180px-Railroad_Tigers_poster.jpeg",
    //  text:"In December 1941, Japan expands the occupation of neighbouring countries to Southeast Asia. The railway from Tianjin to Nanjing in East China became a key military transportation route, heavily guarded by Japanese soldiers. A railroad worker leads a team of freedom fighters using his knowledge of the train network. He and his men sabotage it, ambushing Japanese soldiers and stealing supplies to feed the starving Chinese."},

    {date:'2017-01-13', title:"Sleepless", link:"https://en.wikipedia.org/wiki/Sleepless_(2017_film)",
        youtube:"grqVFoJ3jJg", imdb:"tt2072233", netflix:"", tomato:"sleepless_2017", zooqle:"sleepless-5iba",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Sleepless_%282017_film%29.jpg/180px-Sleepless_%282017_film%29.jpg",
        text:"A remake of the French thriller <i>Sleepless Night</i>. A cop with a connection to the criminal underworld scours a nightclub in search of his kidnapped son."},

    {date:'2017-01-20', title:"Detour", link:"https://en.wikipedia.org/wiki/Detour_(2016_film)",
        youtube:"V5rTEM-kkbk", imdb:"tt4372390", netflix:"80117765", tomato:"detour_2017", zooqle:"detour-38te",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Detour_%282016_film%29.png/180px-Detour_%282016_film%29.png",
        text:"A young law student blindly enters into a pact with a man who offers to kill his stepfather, whom he feels is responsible for the accident that sent his mother into a coma."},

    {date:'2017-01-20', title:"The Red Turtle", link:"https://en.wikipedia.org/wiki/The_Red_Turtle",
        youtube:"Sw7BggqBpTk", imdb:"tt3666024", netflix:"", tomato:"the_red_turtle", zooqle:"the-red-turtle-110",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/The_Red_Turtle.png/180px-The_Red_Turtle.png",
        text:"A Studio Ghibli coproduction. A man is shipwrecked on a deserted island and encounters a red turtle, which changes his life. The film has no dialogue."},

    {date:'2017-01-27', title:"T2 Trainspotting", link:"https://en.wikipedia.org/wiki/T2_Trainspotting",
        youtube:"EsozpEE543w", imdb:"tt2763304", netflix:"", tomato:"t2_trainspotting", zooqle:"t2-trainspotting-tqh",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/T2_%E2%80%93_Trainspotting_poster.jpg/180px-T2_%E2%80%93_Trainspotting_poster.jpg",
        text:"After 20 years abroad, Mark Renton returns to Scotland and reunites with his old friends Sick Boy, Spud, and Begbie."},

    {date:'2017-02-03', title:"War on Everyone", link:"https://en.wikipedia.org/wiki/War_on_Everyone",
        youtube:"XQ2L1heHHnk", imdb:"tt3708886", netflix:"80103374", tomato:"war_on_everyone", zooqle:"war-on-everyone-36tu",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/45/War_on_Everyone.png/180px-War_on_Everyone.png",
        text:"Two corrupt cops set out to blackmail and frame every criminal unfortunate enough to cross their path. Events, however, are complicated by the arrival of someone who appears to be even more dangerous than they are."},

    {date:'2017-02-03', title:"Growing Up Smith", link:"https://en.wikipedia.org/wiki/Growing_Up_Smith",
        youtube:"88Qpf8M1z7U", imdb:"tt1105355", netflix:"", tomato:"growing_up_smith", zooqle:"growing-up-smith-5iie",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Growing_Up_Smith_poster.jpg/180px-Growing_Up_Smith_poster.jpg",
        text:"In 1979, an Indian family moves to America with hopes of living the American Dream. While their 10-year-old boy Smith falls head-over-heels for the girl next door, his desire to become a “good old boy” propels him further away from his family's ideals than ever before."},

    {date:'2017-02-10', title:"The Lego Batman Movie", series:"Lego Movie #2", link:"https://en.wikipedia.org/wiki/The_Lego_Batman_Movie",
        youtube:"rGQUKzSDhrg", imdb:"tt4116284", netflix:"80131731", tomato:"the_lego_batman_movie", zooqle:"the-lego-batman-movie-4d5c",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/61/The_Lego_Batman_Movie_PromotionalPoster.jpg/180px-The_Lego_Batman_Movie_PromotionalPoster.jpg",
        text:"A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick."},

    {date:'2017-02-10', title:"John Wick: Chapter 2", series:"John Wick #2", link:"https://en.wikipedia.org/wiki/John_Wick:_Chapter_2",
        youtube:"mGPk9e03230", imdb:"tt4425200", netflix:"", tomato:"john_wick_chapter_2", zooqle:"john-wick-chapter-2-5j6d",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/31/John_Wick_Chapter_Two.png/180px-John_Wick_Chapter_Two.png",
        text:"After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life."},

    //{date:'2017-02-17', title:"The Great Wall", link:"https://en.wikipedia.org/wiki/The_Great_Wall_(film)",
    //  youtube:"", imdb:"tt2034800", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/The_Great_Wall_%28film%29.png/180px-The_Great_Wall_%28film%29.png",
    //  text:"European mercenaries searching for black powder become embroiled in the defense of the Great Wall of China against a horde of monstrous creatures."},

    //{date:'2017-02-24', title:"Rock Dog", link:"https://en.wikipedia.org/wiki/Rock_Dog",
    //  youtube:"UVwFM2PukSE", imdb:"tt2822672", netflix:"", tomato:"", zooqle:"", zooqle:"rock-dog-56wz",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Rock_Dog_2016_Teaser_Poster.jpg/180px-Rock_Dog_2016_Teaser_Poster.jpg",
    //  text:"When a radio falls from the sky into the hands of a wide-eyed Tibetan Mastiff, he leaves home to fulfill his dream of becoming a musician, setting into motion a series of completely unexpected events."},

    //{date:'2017-02-24', title:"Collide", link:"https://en.wikipedia.org/wiki/Collide_(film)",
    //  youtube:"p7yt_t3nZKA", imdb:"tt2126235", netflix:"", tomato:"", zooqle:"collide-10w",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Collide_film_poster.jpg/180px-Collide_film_poster.jpg",
    //  text:"With Anthony Hopkins and Ben Kingsley. An American backpacker gets involved with a ring of drug smugglers as their driver, though he winds up on the run from his employers on a Cologne high-speed Autobahn."},

    {date:'2017-03-03', title:"Logan", series:"X-Men #10", link:"https://en.wikipedia.org/wiki/Logan_(film)",
        youtube:"ny3hScFgCIQ", imdb:"tt3315342", netflix:"80149316", tomato:"logan_2017", zooqle:"logan-5jvh",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Logan_2017_poster.jpg/180px-Logan_2017_poster.jpg",
        text:"In the near future, a weary Logan cares for an ailing Professor X, somewhere on the Mexican border. However, Logan's attempts to hide from the world, and his legacy, are upended when a young mutant arrives, pursued by dark forces."},

    {date:'2017-03-03', title:"The Last Word", link:"https://en.wikipedia.org/wiki/The_Last_Word_(2017_film)",
        youtube:"UtnnejXW14w", imdb:"tt5023260", netflix:"80154681", tomato:"the_last_word_2017", zooqle:"the-last-word-5ksp",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Last_Word.jpg/180px-The_Last_Word.jpg",
        text:"Shirley MacLaine is Harriet, a retired businesswoman who tries to control everything around her. When she decides to write her own obituary, a young journalist takes up the task of finding out the truth resulting in a life-altering friendship."},

    {date:'2017-03-10', title:"The Sense of an Ending", link:"https://en.wikipedia.org/wiki/The_Sense_of_an_Ending_(film)",
        youtube:"8TbmL_iQbxA", imdb:"tt4827986", netflix:"", tomato:"the_sense_of_an_ending_2017", zooqle:"the-sense-of-an-ending-5lbm",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BYzI5ZDM2NjYtNmVhMS00Y2Q4LTg5ZWUtZjUwOGNkZDJhNGY2L2ltYWdlXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"A man becomes haunted by his past and is presented with a mysterious legacy that causes him to re-think his current situation in life."},

    {date:'2017-03-31', title:"Ghost in the Shell", link:"https://en.wikipedia.org/wiki/Ghost_in_the_Shell_(2017_film)",
        youtube:"G4VmJcZR0Yg", imdb:"tt1219827", netflix:"", tomato:"ghost_in_the_shell_2017", zooqle:"ghost-in-the-shell-5mny",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Ghost_in_the_Shell_%282017_film%29.png/180px-Ghost_in_the_Shell_%282017_film%29.png",
        text:"In the near future, Major is the first of her kind: A human saved from a terrible crash, who is cyber-enhanced to be a perfect soldier devoted to stopping the world's most dangerous criminals."},

    //{date:'2017-03-31', title:"The Boss Baby", link:"https://en.wikipedia.org/wiki/The_Boss_Baby",
    //  youtube:"k397HRbTtWI", imdb:"tt3874544", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/The_Boss_Baby_poster.jpg/180px-The_Boss_Baby_poster.jpg",
    //  text:"A suit-wearing, briefcase-carrying baby pairs up with his 7-year old brother to stop the dastardly plot of the CEO of Puppy Co."},

    {date:'2017-03-31', title:"Carrie Pilby", link:"https://en.wikipedia.org/wiki/Carrie_Pilby_(film)",
        youtube:"nLiUc1OKKQk", imdb:"tt2989524", netflix:"80147760", tomato:"carrie_pilby", zooqle:"carrie-pilby-tqj",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Carrie_Pilby_%28film%29.jpg/180px-Carrie_Pilby_%28film%29.jpg",
        text:"A person of high intelligence struggles to make sense of the world as it relates to morality, relationships, sex and leaving her apartment."},

    {date:'2017-04-07', title:"Going in Style", link:"https://en.wikipedia.org/wiki/Going_in_Style_(2017_film)",
        youtube:"hcdTN5soeQw", imdb:"tt2568862", netflix:"", tomato:"going_in_style_2017", zooqle:"going-in-style-5pjx",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Going_in_Style_2017_film_poster.jpg/180px-Going_in_Style_2017_film_poster.jpg",
        text:"Desperate to pay the bills and come through for their loved ones, three lifelong pals risk it all by embarking on a daring bid to knock off the very bank that absconded with their money."},

    {date:'2017-04-07', title:"Colossal", link:"https://en.wikipedia.org/wiki/Colossal_(film)",
        youtube:"fqcZtz8VXXE", imdb:"tt4680182", netflix:"80158202", tomato:"colossal", zooqle:"colossal-48cd",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Colossal_%28film%29.png/180px-Colossal_%28film%29.png",
        text:"Gloria is an out-of-work party girl forced to leave her life in New York City and move back home. When reports surface that a giant creature is destroying Seoul, she gradually comes to the realization that she is somehow connected to this phenomenon."},

    //{date:'2017-04-14', title:"Spark", link:"https://en.wikipedia.org/wiki/Spark_(2016_film)",
    //  youtube:"sE7DYcn8X-0", imdb:"tt3228088", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spark_Poster_2017.jpg/180px-Spark_Poster_2017.jpg",
    //  text:"Spark, a teenage monkey and his friends, Chunk and Vix, are on a mission to regain Planet Bana - a kingdom overtaken by the evil overlord Zhong."},

    {date:'2017-04-14', title:"My Entire High School Sinking Into the Sea", link:"https://en.wikipedia.org/wiki/My_Entire_High_School_Sinking_Into_the_Sea",
        youtube:"zepBuHGkiWc", imdb:"tt5538568", netflix:"", tomato:"my_entire_high_school_sinking_into_the_sea", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/75/My_Entire_High_School_Sinking_Into_the_Sea.jpg/180px-My_Entire_High_School_Sinking_Into_the_Sea.jpg",
        text:"An earthquake causes a high school to float into the sea, where it slowly sinks like a shipwreck."},

    {date:'2017-04-14', title:"Norman: The Moderate Rise and Tragic Fall of a New York Fixer", link:"https://en.wikipedia.org/wiki/Norman:_The_Moderate_Rise_and_Tragic_Fall_of_a_New_York_Fixer",
        youtube:"TZMCfZq3qc4", imdb:"tt4191702", netflix:"80142493", tomato:"norman_2017", zooqle:"norman-tbg",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Norman_The_Moderate_Rise_and_Tragic_Fall_of_a_New_York_Fixer.png/180px-Norman_The_Moderate_Rise_and_Tragic_Fall_of_a_New_York_Fixer.png",
        text:"Richard Gere is Norman Oppenheimer, a small time operator who befriends a young politician at a low point in his life. Three years later, when the politician becomes an influential world leader, Norman's life dramatically changes for better and worse."},

    {date:'2017-04-28', title:"The Circle", link:"https://en.wikipedia.org/wiki/The_Circle_(2017_film)",
        youtube:"zH0E69gtQtI", imdb:"tt4287320", netflix:"80098473", tomato:"the_circle_2017", zooqle:"the-circle-5r4n",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/The_Circle_%282017_film%29.png/180px-The_Circle_%282017_film%29.png",
        text:"A woman lands a dream job at a powerful tech company called the Circle, only to uncover an agenda that will affect the lives of all of humanity."},

    {date:'2017-04-28', title:"Sleight", link:"https://en.wikipedia.org/wiki/Sleight",
        youtube:"ORL1d7GWoBc", imdb:"tt4573516", netflix:"", tomato:"sleight", zooqle:"sleight-v3i",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Sleight_film_poster.jpg/180px-Sleight_film_poster.jpg",
        text:"A young street magician is left to care for his little sister after their parents passing, and turns to illegal activities to keep a roof over their heads. When he gets in too deep, his sister is kidnapped, and he is forced to use his magic and brilliant mind to save her."},

    {date:'2017-04-28', title:"Buster’s Mal Heart", link:"https://en.wikipedia.org/wiki/Buster%27s_Mal_Heart",
        youtube:"K9S9F5DRhbg", imdb:"tt5173032", netflix:"80152442", tomato:"busters_mal_heart", zooqle:"buster-s-mal-heart-4xrd",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Buster%27s_Mal_Heart_poster.jpg/180px-Buster%27s_Mal_Heart_poster.jpg",
        text:"A family man’s chance encounter with a conspiracy-obsessed drifter leaves him on the run from the police and an impending event known as The Inversion."},

    {date:'2017-05-05', title:"Guardians of the Galaxy Vol. 2", series:"Marvel Cinematic Universe #15", link:"https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_Vol._2",
        youtube:"rEpsPXUt4R0", imdb:"tt3896198", netflix:"80156386", tomato:"guardians_of_the_galaxy_vol_2", zooqle:"guardians-of-the-galaxy-vol-2-vo2",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/95/GotG_Vol2_poster.jpg/180px-GotG_Vol2_poster.jpg",
        text:"The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill’s true parentage."},

    {date:'2017-05-05', title:"Take Me", link:"https://en.wikipedia.org/wiki/Take_Me_(film)",
        youtube:"mo3A0whi0tI", imdb:"tt6598626", netflix:"", tomato:"take_me_2017", zooqle:"take-me-5sxp",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Take_Me_film.jpg/180px-Take_Me_film.jpg",
        text:"Ray is a fledgling entrepreneur who specializes in high-end simulated abductions. He jumps at the chance when a mysterious client contracts him for a weekend kidnapping with a handsome payday at the end. But the job isn't all that it seems."},

    {date:'2017-05-05', title:"Like Crazy", link:"https://en.wikipedia.org/wiki/Like_Crazy_(2016_film)",
        youtube:"qCCIjYzedPY", imdb:"tt4621872", netflix:"80116340", tomato:"like_crazy_2017", zooqle:"like-crazy-vvg",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/La_pazza_gioia_film_poster.jpg/180px-La_pazza_gioia_film_poster.jpg",
        text:"Donatella and Beatrice reside in a psychiatric facility in Tuscany. They have very different life stories, but a chance to escape brings them together in an adventure that will change their lives forever and will help them realize the beauty in imperfection."},

    {date:'2017-05-19', title:"King Arthur: Legend of the Sword", link:"https://en.wikipedia.org/wiki/King_Arthur:_Legend_of_the_Sword",
        youtube:"jIM4-HLtUM0", imdb:"tt1972591", netflix:"", tomato:"king_arthur_legend_of_the_sword", zooqle:"king-arthur-legend-of-the-sword-5m31",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/King_Arthur_LotS_poster.jpg/180px-King_Arthur_LotS_poster.jpg",
        text:"Robbed of his birthright, Arthur comes up the hard way in the back alleys of the city. But once he pulls the sword from the stone, he is forced to acknowledge his true legacy - whether he likes it or not.  "},

    //{date:'2017-05-19', title:"Snatched", link:"https://en.wikipedia.org/wiki/Snatched_(2017_film)",
    //  youtube:"PsBWnst8f7w", imdb:"tt2334871", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Snatched2017poster.jpg/180px-Snatched2017poster.jpg",
    //  text:"When her boyfriend dumps her before their exotic vacation, a young woman persuades her ultra-cautious mother to travel with her to paradise, with unexpected results."},

    {date:'2017-05-26', title:"Pirates of the Caribbean: Dead Men Tell No Tales", series:"Pirates of the Caribbean #5", link:"https://en.wikipedia.org/wiki/Pirates_of_the_Caribbean:_Dead_Men_Tell_No_Tales",
        youtube:"a5V5C8mEVzY", imdb:"tt1790809", netflix:"80149092", tomato:"pirates_of_the_caribbean_dead_men_tell_no_tales", zooqle:"pirates-of-the-caribbean-dead-men-tell-no-tales-37rq.html",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Pirates_of_the_Caribbean%2C_Dead_Men_Tell_No_Tales.jpg/180px-Pirates_of_the_Caribbean%2C_Dead_Men_Tell_No_Tales.jpg",
        text:"Captain Jack Sparrow searches for the trident of Poseidon while being pursued by an undead sea captain and his crew."},

    {date:'2017-06-01', title:"Wonder Woman", series:"DC Extended Universe #4", link:"https://en.wikipedia.org/wiki/Wonder_Woman_(2017_film)",
        youtube:"1Q8fG0TtVAY", imdb:"tt0451279", netflix:"", tomato:"wonder_woman_2017", zooqle:"wonder-woman-5tpy",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Wonder_Woman_%282017_film%29.jpg/180px-Wonder_Woman_%282017_film%29.jpg",
        text:"When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny."},

    //{date:'2017-06-09', title:"The Mummy", link:"https://en.wikipedia.org/wiki/The_Mummy_(2017_film)",
    //    youtube:"IjHgzkQM2Sg", imdb:"tt2345759", netflix:"", tomato:"the_mummy_2017", zooqle:"the-mummy-5v89",
    //    poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/The_Mummy_%282017%29.jpg/180px-The_Mummy_%282017%29.jpg",
    //    text:"An ancient Egyptian princess is awakened from her crypt beneath the desert, bringing with her malevolence grown over millennia, and terrors that defy human comprehension."},

    {date:'2017-06-16', title:"Slack Bay", link:"https://en.wikipedia.org/wiki/Slack_Bay",
        youtube:"rhNZMXJF3Gg", imdb:"tt4726636", netflix:"80107682", tomato:"slack_bay_2017", zooqle:"slack-bay-3p2l",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Ma_Loute.jpg/180px-Ma_Loute.jpg",
        text:"In 1910 a well-to-do extended family visits their summer house for their annual seaside holidays. They come across a police investigation looking into several disappearances of tourists in the area."},

    {date:'2017-06-28', title:"Baby Driver", link:"https://en.wikipedia.org/wiki/Baby_Driver",
        youtube:"z2z857RSfhk", imdb:"tt3890160", netflix:"", tomato:"baby_driver", zooqle:"baby-driver-5xa2",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Baby_Driver_poster.jpg/180px-Baby_Driver_poster.jpg",
        text:"After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail."},

    {date:'2017-06-28', title:"Okja", link:"https://en.wikipedia.org/wiki/Okja",
        youtube:"AjCebKn4iic", imdb:"tt3967856", netflix:"80091936", tomato:"okja", zooqle:"okja-5x2v",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Okja.png/180px-Okja.png",
        text:"A young girl risks everything to prevent a powerful, multinational company from kidnapping her best friend - a fascinating beast named Okja."},

    {date:'2017-06-30', title:"Despicable Me 3", link:"https://en.wikipedia.org/wiki/Despicable_Me_3", series:"Despicable Me #4",
        youtube:"euz-KBBfAAo", imdb:"tt3469046", netflix:"", tomato:"despicable_me_3", zooqle:"despicable-me-3-5xag",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNjUyNzQ2MTg3Ml5BMl5BanBnXkFtZTgwNzE4NDM3MTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Gru meets his long-lost charming, cheerful, and more successful twin brother Dru who wants to team up with him for one last criminal heist.   "},

    {date:'2017-06-30', title:"The Little Hours", link:"https://en.wikipedia.org/wiki/The_Little_Hours",
        youtube:"x-k7GY-0ugs", imdb:"tt5666304", netflix:"80171023", tomato:"the_little_hours", zooqle:"the-little-hours-5x8r",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/11/The_Little_Hours_poster.jpg/180px-The_Little_Hours_poster.jpg",
        text:"Based on stories from <i>The Decameron</i>. In the Middle Ages, a young servant fleeing from his master takes refuge at a convent full of emotionally unstable nuns. Introduced as a deaf mute man, he must fight to hold his cover as the nuns try to resist temptation."},

    {date:'2017-06-30', title:"2:22", link:"https://en.wikipedia.org/wiki/2:22_(2017_film)",
        youtube:"I6DKNWM6EVo", imdb:"tt1131724", netflix:"", tomato:"222_2017", zooqle:"2-22-5ggl",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/66/2%2C22_2017_Film_Poster.jpg/180px-2%2C22_2017_Film_Poster.jpg",
        text:"A man's life is derailed when an ominous pattern of events repeats itself in exactly the same manner every day, ending at precisely 2:22 p.m."},

    {date:'2017-07-05', title:"Spider-Man: Homecoming", series:"Marvel Cinematic Universe #16", link:"https://en.wikipedia.org/wiki/Spider-Man:_Homecoming",
        youtube:"n9DwoQ7HWvI", imdb:"tt2250912", netflix:"", tomato:"spider_man_homecoming", zooqle:"spider-man-homecoming-5r89",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Spider-Man_Homecoming_poster.jpg/180px-Spider-Man_Homecoming_poster.jpg",
        text:"Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City."},

    {date:'2017-07-14', title:"The Death of Louis XIV", link:"https://en.wikipedia.org/wiki/The_Death_of_Louis_XIV",
        youtube:"BzfNF1t5DTk", imdb:"tt5129510", netflix:"", tomato:"the_death_of_louis_xiv_2017", zooqle:"the-death-of-louis-xiv-uk3",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/La_Mort_de_Louis_XIV.jpg/180px-La_Mort_de_Louis_XIV.jpg",
        text:"Upon returning from a hunting expedition, King Louis XIV feels a sharp pain in his leg. He begins to die, surrounded by loyal followers in the royal chambers."},

    {date:'2017-07-21', title:"Dunkirk", link:"https://en.wikipedia.org/wiki/Dunkirk_(2017_film)",
        youtube:"F-eMt3SrfFU", imdb:"tt5013056", netflix:"", tomato:"dunkirk_2017", zooqle:"dunkirk-5yrp",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Dunkirk_Film_poster.jpg/180px-Dunkirk_Film_poster.jpg",
        text:"Written and directed by Christopher Nolan. Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army, and evacuated during a fierce battle in World War II."},

    //{date:'2017-07-28', title:"Wakefield", link:"https://en.wikipedia.org/wiki/Wakefield_(film)",
    //  youtube:"E00DODio0Wk", imdb:"tt5195412", netflix:"", tomato:"", zooqle:"",
    //  poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Wakefield_poster.jpg/180px-Wakefield_poster.jpg",
    //  text:"A man's nervous breakdown causes him to leave his wife and live in his attic for several months."},

    {date:'2017-08-02', title:"Valerian and the City of a Thousand Planets", link:"https://en.wikipedia.org/wiki/Valerian_and_the_City_of_a_Thousand_Planets",
        youtube:"_shrCoqWh9k", imdb:"tt2239822", netflix:"", tomato:"valerian_and_the_city_of_a_thousand_planets", zooqle:"valerian-and-the-city-of-a-thousand-planets-5ysf",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Valerian_and_the_City_of_a_Thousand_Planets.jpg/180px-Valerian_and_the_City_of_a_Thousand_Planets.jpg",
        text:"Written and directed by Luc Besson and based on the French science fiction comics series <i>Valérian and Laureline</i>. A dark force threatens Alpha, a vast metropolis and home to species from a thousand planets. Special operatives Valerian and Laureline must race to identify the marauding menace and safeguard not just Alpha, but the future of the universe."},

    {date:'2017-08-09', title:"Atomic Blonde", link:"https://en.wikipedia.org/wiki/Atomic_Blonde",
        youtube:"yIUube1pSC0", imdb:"tt2406566", netflix:"", tomato:"atomic_blonde_2017", zooqle:"atomic-blonde-59sd",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Atomic_Blonde_poster.jpg/180px-Atomic_Blonde_poster.jpg",
        text:"An undercover MI6 agent is sent to Berlin during the Cold War to investigate the murder of a fellow agent and recover a missing list of double agents."},

    {date:'2017-08-16', title:"Napping Princess", link:"https://en.wikipedia.org/wiki/Napping_Princess",
        youtube:"ifUu8zA3Sf8", imdb:"tt5731132", netflix:"", tomato:"napping_princess", zooqle:"ancien-and-the-magic-tablet-5lwf",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Hirune_Hime_Shiranai_Watashi_no_Monogatari_poster.jpeg/180px-Hirune_Hime_Shiranai_Watashi_no_Monogatari_poster.jpeg",
        text:"In the near future, a high school senior discovers that events in her waking life begin to parallel events in her dreams."},

    {date:'2017-08-17', title:"The Hitman’s Bodyguard", link:"https://en.wikipedia.org/wiki/The_Hitman%27s_Bodyguard",
        youtube:"IpKmt4MpctM", imdb:"tt1959563", netflix:"80119311", tomato:"the_hitmans_bodyguard", zooqle:"the-hitman-s-bodyguard-60rr",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/HitmansBodyguard.jpg/180px-HitmansBodyguard.jpg",
        text:"The world's top bodyguard gets a new client, a hit man who must testify at the International Criminal Court. They must put their differences aside and work together to make it to the trial on time."},

    {date:'2017-08-25', title:"Logan Lucky", link:"https://en.wikipedia.org/wiki/Logan_Lucky",
        youtube:"aPzvKH8AVf0", imdb:"tt5439796", netflix:"80175621", tomato:"logan_lucky", zooqle:"logan-lucky-60s3",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Logan_Lucky.png/180px-Logan_Lucky.png",
        text:"Directed by Steven Soderbergh. Two brothers attempt to pull off a heist during a NASCAR race in North Carolina."},

    {date:'2017-08-25', title:"Beach Rats", link:"https://en.wikipedia.org/wiki/Beach_Rats",
        youtube:"df0TQJBkPP4", imdb:"http://www.imdb.com/title/tt6303866/", netflix:"", tomato:"beach_rats_2017", zooqle:"beach-rats-619l",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Beach_Rats_2017_Teaser_Poster.jpg/180px-Beach_Rats_2017_Teaser_Poster.jpg",
        text:"A Brooklyn teenager spends his days experimenting with drugs and looking online for older men to meet with."},

    {date:'2017-08-25', title:"American Made", link:"https://en.wikipedia.org/wiki/American_Made_(film)",
        youtube:"AEBIJRAkujM", imdb:"tt3532216", netflix:"", tomato:"american_made_2017", zooqle:"american-made-60rx",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/American_Made_%28film%29.jpg/180px-American_Made_%28film%29.jpg",
        text:"The story of Barry Seal, an American pilot who became a drug-runner for the CIA in the 1980s in a clandestine operation that would be exposed as the Iran-Contra Affair."},

    {date:'2017-09-08', title:"Wind River", link:"https://en.wikipedia.org/wiki/Wind_River_(film)",
        youtube:"gg7ZknrV7gM", imdb:"tt5362988", netflix:"", tomato:"wind_river_2017", zooqle:"wind-river-5fwx",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Wind_River_%282017_film%29.png/180px-Wind_River_%282017_film%29.png",
        text:"A veteran tracker with the Fish and Wildlife Service helps to investigate the murder of a young Native American woman, and uses the case as a means of seeking redemption for an earlier act of irresponsibility which ended in tragedy."},

    {date:'2017-09-15', title:"Victoria & Abdul", link:"https://en.wikipedia.org/wiki/Victoria_%26_Abdul",
        youtube:"SCLcSLxlKkM", imdb:"tt5816682", netflix:"", tomato:"victoria_and_abdul", zooqle:"victoria-abdul-62uc",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/36/VictoriaAndAbdulPoster.jpg/180px-VictoriaAndAbdulPoster.jpg",
        text:"Queen Victoria strikes up an unlikely friendship with a young Indian clerk named Abdul Karim."},

    {date:'2017-09-20', title:"Kingsman: The Golden Circle", series:"Kingsman #2", link:"https://en.wikipedia.org/wiki/Kingsman:_The_Golden_Circle",
        youtube:"6Nxc-3WpMbg", imdb:"tt4649466", netflix:"", tomato:"kingsman_the_golden_circle", zooqle:"kingsman-the-golden-circle-3uu1",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Kingsman_The_Golden_Circle.png/180px-Kingsman_The_Golden_Circle.png",
        text:"When their headquarters are destroyed and the world is held hostage, the Kingsman’s journey leads them to the discovery of an allied spy organization in the US. These two elite secret organizations must band together to defeat a common enemy."},

    {date:'2017-09-29', title:"Mark Felt: The Man Who Brought Down the White House", link:"https://en.wikipedia.org/wiki/Mark_Felt:_The_Man_Who_Brought_Down_the_White_House",
        youtube:"DfBccnAcuwg", imdb:"tt5175450", netflix:"", tomato:"mark_felt_the_man_who_brought_down_the_white_house", zooqle:"mark-felt-the-man-who-brought-down-the-white-house-644l",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/59/MarkFeltPoster.jpg/180px-MarkFeltPoster.jpg",
        text:"The story of Mark Felt, who under the name “Deep Throat” helped journalists Bob Woodward and Carl Bernstein uncover the Watergate scandal in 1972."},

    {date:'2017-09-29', title:"Goodbye Christopher Robin", link:"https://en.wikipedia.org/wiki/Goodbye_Christopher_Robin",
        youtube:"IsAlKzokl-8", imdb:"tt1653665", netflix:"", tomato:"goodbye_christopher_robin", zooqle:"goodbye-christopher-robin-64kw",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Goodbye_Christopher_Robin.png/180px-Goodbye_Christopher_Robin.png",
        text:"A behind-the-scenes look at the life of author A.A. Milne and the creation of the Winnie the Pooh stories inspired by his son C.R. Milne."},

    {date:'2017-10-05', title:"Blade Runner 2049", link:"https://en.wikipedia.org/wiki/Blade_Runner_2049",
        youtube:"gCcx85zbxz4", imdb:"tt1856101", netflix:"", tomato:"blade_runner_2049", zooqle:"blade-runner-2049-5v8o",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Blade_Runner_2049_poster.png/180px-Blade_Runner_2049_poster.png",
        text:"A young blade runner’s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who’s been missing for thirty years."},

    {date:'2017-10-07', title:"Outrage Coda", series:"Outrage #3", link:"https://en.wikipedia.org/wiki/Outrage_Coda",
        youtube:"ZQxj3sz6XCI", imdb:"tt6293042", netflix:"", tomato:"outrage_coda", zooqle:"outrage-coda-65bv",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMmQyMDhhNjMtMjQyMS00OTE2LTg2ZTktMzA2M2ZiZmZkZDZhXkEyXkFqcGdeQXVyNzg0OTg0OTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"A sequel to Kitano’s 2012 film, <i>Beyond Outrage</i>, and completes Kitano’s Outrage trilogy started in 2010."},

    {date:'2017-10-13', title:"The Lego Ninjago Movie", series:"Lego Movie #3", link:"https://en.wikipedia.org/wiki/The_Lego_Ninjago_Movie",
        youtube:"sZSYYiATFTI", imdb:"tt3014284", netflix:"", tomato:"the_lego_ninjago_movie", zooqle:"the-lego-ninjago-movie-63nl",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/The_Lego_Ninjago_Movie.jpg/180px-The_Lego_Ninjago_Movie.jpg",
        text:"Shunned by everyone for being the son of an evil warlord, a teenager seeks to defeat him with the help of his fellow ninjas."},

    {date:'2017-10-13', title:"Loving Vincent", link:"https://en.wikipedia.org/wiki/Loving_Vincent",
        youtube:"CGzKnyhYDQI", imdb:"tt3262342", netflix:"", tomato:"loving_vincent", zooqle:"loving-vincent-3bn2",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Loving_Vincent.png/180px-Loving_Vincent.png",
        text:"In a story depicted in oil painted animation, a young man comes to the last hometown of painter Vincent van Gogh to deliver the troubled artist’s final letter and ends up investigating his final days there."},

    {date:'2017-10-13', title:"The Snowman", link:"https://en.wikipedia.org/wiki/The_Snowman_(2017_film)",
        youtube:"BF2Ksrxu_QY", imdb:"tt1758810", netflix:"", tomato:"the_snowman_2017", zooqle:"the-snowman-65qc",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/08/The_Snowman_%282017%29_poster.jpg/180px-The_Snowman_%282017%29_poster.jpg",
        text:"Based on the 2007 novel by Jo Nesbø. Detective Harry Hole investigates the disappearance of a woman whose scarf is found wrapped around an ominous-looking snowman."},

    {date:'2017-10-24', title:"Thor: Ragnarok", series:"Marvel Cinematic Universe #17", link:"https://en.wikipedia.org/wiki/Thor:_Ragnarok",
        youtube:"ue80QwXMRHg", imdb:"tt3501632", netflix:"", tomato:"thor_ragnarok_2017", zooqle:"thor-ragnarok-d3",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Thor_Ragnarok_poster.jpg/180px-Thor_Ragnarok_poster.jpg",
        text:"Imprisoned, the mighty Thor finds himself in a lethal gladiatorial contest against the Hulk, his former ally. Thor must fight for survival and race against time to prevent the all-powerful Hela from destroying his home and the Asgardian civilization."},

    {date:'2017-10-27', title:"Call Me by Your Name", link:"https://en.wikipedia.org/wiki/Call_Me_by_Your_Name_(film)",
        youtube:"Z9AYPxH5NTM", imdb:"tt5726616", netflix:"", tomato:"call_me_by_your_name", zooqle:"call-me-by-your-name-5fuj",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/CallMeByYourName2017.png/180px-CallMeByYourName2017.png",
        text:"In Northern Italy in 1983, seventeen year-old Elio begins a relationship with visiting Oliver, his father’s research assistant, with whom he bonds over his emerging sexuality, their Jewish heritage, and the beguiling Italian landscape."},

    {date:'2017-11-03', title:"Murder on the Orient Express", link:"https://en.wikipedia.org/wiki/Murder_on_the_Orient_Express_(2017_film)",
        youtube:"Mq4m3yAoW8E", imdb:"tt3402236", netflix:"", tomato:"murder_on_the_orient_express_2017", zooqle:"murder-on-the-orient-express-69is",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Murder_on_the_Orient_Express_teaser_poster.jpg/180px-Murder_on_the_Orient_Express_teaser_poster.jpg",
        text:"When a murder occurs on the train he’s travelling on, celebrated detective Hercule Poirot is recruited to solve the case."},

    {date:'2017-11-03', title:"LBJ", link:"https://en.wikipedia.org/wiki/LBJ_(film)",
        youtube:"fyFI6OpDEG4", imdb:"tt4778988", netflix:"", tomato:"lbj", zooqle:"lbj-5fug",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/LBJ_%28film%29.png/180px-LBJ_%28film%29.png",
        text:"The story of U.S. President Lyndon Baines Johnson from his young days in West Texas to the White House."},

    {date:'2017-11-10', title:"Paddington 2", series:"Paddington #2", link:"https://en.wikipedia.org/wiki/Paddington_2",
        youtube:"52x5HJ9H8DM", imdb:"tt4468740", netflix:"", tomato:"paddington_2", zooqle:"paddington-2-5c8w",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMmYwNWZlNzEtNjE4Zi00NzQ4LWI2YmUtOWZhNzZhZDYyNmVmXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Paddington, now happily settled with the Brown family and a popular member of the local community, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy’s 100th birthday, only for the gift to be stolen."},

    {date:'2017-11-17', title:"Justice League", series:"DC Extended Universe #5", link:"https://en.wikipedia.org/wiki/Justice_League_(film)",
        youtube:"r9-DM9uBtVI", imdb:"tt0974015", netflix:"", tomato:"justice_league_2017", zooqle:"justice-league-5r03",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Justice_League_film_poster.jpg/180px-Justice_League_film_poster.jpg",
        text:"Fueled by his restored faith in humanity and inspired by Superman’s selfless act, Bruce Wayne enlists the help of his newfound ally, Diana Prince, to face an even greater enemy."},

    {date:'2017-11-10', title:"The Florida Project", link:"https://en.wikipedia.org/wiki/The_Florida_Project",
        youtube:"WwQ-NH1rRT4", imdb:"tt5649144", netflix:"", tomato:"the_florida_project", zooqle:"the-florida-project-65a4",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/The_Florida_Project.jpg/180px-The_Florida_Project.jpg",
        text:"Set over one summer, the film follows precocious six-year-old Moonee as she courts mischief and adventure with her ragtag playmates and bonds with her rebellious but caring mother, all while living in the shadows of Disney World."},

    {date:'2017-11-10', title:"Professor Marston and the Wonder Women", link:"https://en.wikipedia.org/wiki/Professor_Marston_and_the_Wonder_Women",
        youtube:"r991pr4Fohk", imdb:"tt6133130", netflix:"", tomato:"professor_marston_and_the_wonder_women", zooqle:"professor-marston-and-the-wonder-women-666s",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Professor_Marston_and_the_Wonder_Women.png/180px-Professor_Marston_and_the_Wonder_Women.png",
        text:"The story of psychologist William Moulton Marston, and his polyamorous relationship with his wife and his mistress who would inspire his creation of the superheroine, Wonder Woman."},

    {date:'2017-11-21', title:"Crooked House", link:"https://en.wikipedia.org/wiki/Crooked_House_(film)",
        youtube:"FfLpwich4AE", imdb:"tt1869347", netflix:"", tomato:"crooked_house", zooqle:"crooked-house-62u0",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Crooked_House_film_poster.jpg/180px-Crooked_House_film_poster.jpg",
        text:"In Agatha Christie’s most twisted tale, a spy-turned-private-detective is lured by his former lover to catch her grandfather’s murderer before Scotland Yard exposes dark family secrets."},

    {date:'2017-11-24', title:"Battle of the Sexes", link:"https://en.wikipedia.org/wiki/Battle_of_the_Sexes_(film)",
        youtube:"5AWP1K7FaFI", imdb:"tt4622512", netflix:"", tomato:"battle_of_the_sexes", zooqle:"battle-of-the-sexes-5fuy",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Battle_of_the_Sexes_%28film%29.png/180px-Battle_of_the_Sexes_%28film%29.png",
        text:"The true story of the 1973 tennis match between World number one Billie Jean King and ex-champ and serial hustler Bobby Riggs."},

    {date:'2017-11-24', title:"Suburbicon", link:"https://en.wikipedia.org/wiki/Suburbicon",
        youtube:"IYga2m0V2O0", imdb:"tt0491175", netflix:"", tomato:"suburbicon", zooqle:"suburbicon-5fw1",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Suburbicon.jpg/180px-Suburbicon.jpg",
        text:"As a 1950s suburban community self-destructs, a home invasion has sinister consequences for one seemingly normal family."},

    {date:'2017-12-01', title:"The Man Who Invented Christmas", link:"https://en.wikipedia.org/wiki/The_Man_Who_Invented_Christmas_(film)",
        youtube:"UxcnYR3mcPU", imdb:"tt6225520", netflix:"", tomato:"the_man_who_invented_christmas", zooqle:"the-man-who-invented-christmas-69nj",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/The_Man_Who_Invented_Christmas.png/180px-The_Man_Who_Invented_Christmas.png",
        text:"The journey that led to Charles Dickens’ creation of <i>A Christmas Carol</i>, a timeless tale that would redefine the holiday."},

    {date:'2017-', title:"", link:"",
        youtube:"", imdb:"", netflix:"", tomato:"", zooqle:"",
        poster:"",
        text:""},
    {date:'2017-', title:"", link:"",
        youtube:"", imdb:"", netflix:"", tomato:"", zooqle:"",
        poster:"",
        text:""},

    {date:'2017-12-08', title:"Brigsby Bear", link:"https://en.wikipedia.org/wiki/Brigsby_Bear",
        youtube:"N4AULA7-WfM", imdb:"tt5805752", netflix:"", tomato:"brigsby_bear_2017", zooqle:"brigsby-bear-5z86",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Brigsby_Bear.png/180px-Brigsby_Bear.png",
        text:"Brigsby Bear Adventures is a children’s TV show produced for an audience of one: James. When the show abruptly ends, James’s life changes forever, and he sets out to finish the story himself."},

    {date:'2017-12-14', title:"Star Wars: The Last Jedi", series:"Star Wars #9", link:"https://en.wikipedia.org/wiki/Star_Wars:_The_Last_Jedi",
        youtube:"Q0CbN8sfihY", imdb:"tt2527336", netflix:"", tomato:"star_wars_the_last_jedi", zooqle:"star-wars-episode-viii-the-last-jedi-uf6",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Star_Wars_The_Last_Jedi.jpg/180px-Star_Wars_The_Last_Jedi.jpg",
        text:"Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order."},

    {date:'2017-12-18', title:"The Foreigner", link:"https://en.wikipedia.org/wiki/The_Foreigner_(2017_film)",
        youtube:"FI3_6AvnoL8", imdb:"tt1615160", netflix:"80185765", tomato:"the_foreigner_2017", zooqle:"the-foreigner-5fuq",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/05/The_Foreigner_%282017_film%29.jpg/180px-The_Foreigner_%282017_film%29.jpg",
        text:"A humble businessman with a buried past seeks justice when his daughter is killed in an act of terrorism. A cat-and-mouse conflict ensues with a government official, whose past may hold clues to the killers' identities."},

    {date:'2017-12-22', title:"Bright", link:"https://en.wikipedia.org/wiki/Bright_(film)",
        youtube:"6EZCBSsBxko", imdb:"tt5519340", netflix:"80119234", tomato:"bright", zooqle:"bright-6g18",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/BrightPoster.jpeg/180px-BrightPoster.jpeg",
        text:"Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for."},


    //--------------------------------------------------------------------------

    {date:'2018-01-05', title:"All the Money in the World", link:"https://en.wikipedia.org/wiki/All_the_Money_in_the_World",
        youtube:"KXHrCBkIxQQ", imdb:"tt5294550", netflix:"", tomato:"all_the_money_in_the_world_2017", zooqle:"all-the-money-in-the-world-6d75",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/All_the_Money_in_the_World.png/180px-All_the_Money_in_the_World.png",
        text:"The story of the kidnapping of 16-year-old John Paul Getty III and the desperate attempt by his devoted mother to convince his billionaire grandfather Jean Paul Getty to pay the ransom."},

    {date:'2018-01-12', title:"Three Billboards Outside Ebbing, Missouri", link:"https://en.wikipedia.org/wiki/Three_Billboards_Outside_Ebbing,_Missouri",
        youtube:"Jit3YhGx5pU", imdb:"http://www.imdb.com/title/tt5027774/", netflix:"", tomato:"three_billboards_outside_ebbing_missouri", zooqle:"three-billboards-outside-ebbing-missouri-5fuf",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Three_Billboards_Outside_Ebbing%2C_Missouri.png/180px-Three_Billboards_Outside_Ebbing%2C_Missouri.png",
        text:"A mother personally challenges the local authorities to solve her daughter’s murder when they fail to catch the culprit."},

    {date:'2018-01-12', title:"Darkest Hour", link:"https://en.wikipedia.org/wiki/Darkest_Hour_(film)",
        youtube:"LtJ60u7SUSw", imdb:"tt4555426", netflix:"", tomato:"darkest_hour_2017", zooqle:"darkest-hour-6azu",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Darkest_Hour_poster.png/180px-Darkest_Hour_poster.png",
        text:"During the early days of World War II, the fate of Western Europe hangs on the newly-appointed British Prime Minister Winston Churchill, who must decide whether to negotiate with Hitler, or fight on against incredible odds."},

    {date:'2018-01-18', title:"Mary and the Witch’s Flower", link:"https://en.wikipedia.org/wiki/Mary_and_the_Witch%27s_Flower",
        youtube:"VqUKano2Hm4", imdb:"tt6336356", netflix:"", tomato:"mary_and_the_witchs_flower", zooqle:"mary-and-the-witch-s-flower-5xxb",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Mary_and_the_witch%27s_flower_poster.jpg/180px-Mary_and_the_witch%27s_flower_poster.jpg",
        text:"Based on <i>The Little Broomstick</i> by Mary Stewart, this is Studio Ponoc’s first feature film. It tells a story of a girl who finds a mysterious flower that can give her the power to become a witch for one night only."},

    {date:'2018-01-19', title:"Den of Thieves", link:"https://en.wikipedia.org/wiki/Den_of_Thieves_(film)",
        youtube:"FKd_ks0rdAM", imdb:"tt1259528", netflix:"", tomato:"den_of_thieves", zooqle:"den-of-thieves-6fy7",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Den_of_Thieves_poster.jpg/180px-Den_of_Thieves_poster.jpg",
        text:"A gritty Los Angeles crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff’s Department and the state’s most successful bank robbery crew as the outlaws plan a seemingly impossible heist on the Federal Reserve Bank of downtown Los Angeles."},

    {date:'2018-01-19', title:"The Post", link:"https://en.wikipedia.org/wiki/The_Post_(film)",
        youtube:"nrXlY6gzTTM", imdb:"tt6294822", netflix:"", tomato:"the_post", zooqle:"the-post-6d7d",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/The_Post_%28film%29.png/180px-The_Post_%28film%29.png",
        text:"A cover-up that spanned four U.S. Presidents pushed the country’s first female newspaper publisher and a hard-driving editor to join an unprecedented battle between journalist and government."},

    {date:'2018-01-24', title:"Downsizing", link:"https://en.wikipedia.org/wiki/Downsizing_(film)",
        youtube:"UCrBICYM0yM", imdb:"tt1389072", netflix:"", tomato:"downsizing", zooqle:"downsizing-6d7o",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Downsizing.png/180px-Downsizing.png",
        text:"A social satire in which a man realizes he would have a better life if he were to shrink himself to five inches tall, allowing him to live in wealth and splendor."},

    {date:'2018-01-26', title:"Last Flag Flying", link:"https://en.wikipedia.org/wiki/Last_Flag_Flying",
        youtube:"VmS4lTZ34uk", imdb:"tt6018306", netflix:"", tomato:"last_flag_flying", zooqle:"last-flag-flying-6ajr",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Last_Flag_Flying.png/180px-Last_Flag_Flying.png",
        text:"Thirty years after they served together in Vietnam, a former Navy Corpsman Larry “Doc” Shepherd re-unites with his old buddies, former Marines Sal Nealon and Reverend Richard Mueller, to bury his son, a young Marine killed in the Iraq War."},

    {date:'2018-01-26', title:"Early Man", link:"https://en.wikipedia.org/wiki/Early_Man_(film)",
        youtube:"GC5FIWUFfUY", imdb:"tt4701724", netflix:"", tomato:"early_man", zooqle:"early-man-6g6l",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BOWVkMzhlMmItMDY0NC00NDY5LWIzZjctMzdmNGEwNGY2YmVmXkEyXkFqcGdeQXVyNTUxNDUxOTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"An Ardman Animation directed by Nick Park. Set at the dawn of time when prehistoric creatures and woolly mammoths roamed the earth, a caveman named Dug, along with his pet sidekick Hognob and Goona, unites his tribe to save their valley home when it is claimed by Lord Nooth and his Bronze Age City."},

    {date:'2018-02-02', title:"Roman J. Israel, Esq.", link:"https://en.wikipedia.org/wiki/Roman_J._Israel,_Esq.",
        youtube:"CItEtnp3nPY", imdb:"tt6000478", netflix:"", tomato:"roman_j_israel_esq", zooqle:"roman-j-israel-esq-69iq",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Roman_J._Israel%2C_Esq..png/180px-Roman_J._Israel%2C_Esq..png",
        text:"Roman J. Israel, Esq., a driven, idealistic defense attorney, finds himself in a tumultuous series of events that lead to a crisis and the necessity for extreme action."},

    {date:'2018-02-09', title:"Peter Rabbit", link:"https://en.wikipedia.org/wiki/Peter_Rabbit_(film)",
        youtube:"7Pa_Weidt08", imdb:"tt5117670", netflix:"", tomato:"peter_rabbit_2018", zooqle:"peter-rabbit-6hp5",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Peter-rabbit-teaser.jpg/180px-Peter-rabbit-teaser.jpg",
        text:"Peter Rabbit's feud with Mr. McGregor reaches new heights as both compete for the affections of a kind animal lover who lives next door."},

    {date:'2018-02-14', title:"The Shape of Water", link:"https://en.wikipedia.org/wiki/The_Shape_of_Water_(film)",
        youtube:"XFYWazblaUA", imdb:"tt5580390", netflix:"", tomato:"the_shape_of_water_2017", zooqle:"the-shape-of-water-6c88",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/37/The_Shape_of_Water_%28film%29.png/180px-The_Shape_of_Water_%28film%29.png",
        text:"Written and directed by Guillermo del Toro. At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity."},

    {date:'2018-02-16', title:"Black Panther", link:"https://en.wikipedia.org/wiki/Black_Panther_(film)",
        youtube:"xjDjIWPwcPU", series:"Marvel Comic Universe #18", imdb:"tt1825683", netflix:"", tomato:"black_panther_2018", zooqle:"black-panther-trc",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Black_Panther_film_poster.jpg/180px-Black_Panther_film_poster.jpg",
        text:"After the events of <i>Captain America: Civil War</i>, King T’Challa returns home to Wakanda. But when two enemies conspire to bring down the kingdom, T’Challa must team up, as the Black Panther, with CIA agent Everett K. Ross and members of the Dora Milaje—Wakanda’s special forces—to prevent a world war."},

    {date:'2018-02-23', title:"I, Tonya", link:"https://en.wikipedia.org/wiki/I,_Tonya",
        youtube:"iZbTLdDHRvs", imdb:"tt5580036", netflix:"", tomato:"i_tonya", zooqle:"i-tonya-6c8b",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/15/I%2C_Tonya.png/180px-I%2C_Tonya.png",
        text:"Competitive ice skater Tonya Harding rises amongst the ranks at the U.S. Figure Skating Championships, but her future in the activity is thrown into doubt when her ex-husband intervenes."},

    {date:'2018-02-23', title:"Game Night", link:"https://en.wikipedia.org/wiki/Game_Night_(film)",
        youtube:"fNtLIcyjsnI", imdb:"tt2704998", netflix:"", tomato:"game_night_2018", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Game_Night_%28film%29.png/180px-Game_Night_%28film%29.png",
        text:"A group of friends meet regularly for their game night, and one night they find themselves investigating an actual murder mystery."},

    {date:'2018-02-23', title:"Annihilation", link:"https://en.wikipedia.org/wiki/Annihilation_(film)",
        youtube:"89OP78l9oF0", imdb:"tt2798920", netflix:"", tomato:"annihilation", zooqle:"annihilation-5fui",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Annihilation_%28film%29.png/180px-Annihilation_%28film%29.png",
        text:"Based on the 2014 novel by Jeff VanderMeer. A group of soldiers enters an environmental disaster zone and only one comes back out alive, though he is grievously injured. In an attempt to save his life, his wife Lena, a biologist, volunteers for a second expedition into the zone to figure out what happened to him."},

    {date:'2018-03-02', title:"Red Sparrow", link:"https://en.wikipedia.org/wiki/Red_Sparrow",
        youtube:"PmUL6wMpMWw", imdb:"tt2873282", netflix:"", tomato:"red_sparrow", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Red_Sparrow.png/180px-Red_Sparrow.png",
        text:"Based on the 2013 novel by Jason Matthews, it tells of a Russian intelligence officer and a CIA agent, the American mole in Russia, whom she should expose."},

    {date:'2018-03-02', title:"Pickings", link:"https://en.wikipedia.org/wiki/Pickings_(film)",
        youtube:"y1f_PS3zA8Y", imdb:"tt4789822", netflix:"", tomato:"pickings", zooqle:"",
        poster:"https://resizing.flixster.com/Oe6sXQo0-4BdqWRYmXvRQXeYcaQ=/206x305/v1.bTsxMjQyMDk4MztqOzE3NjAzOzEyMDA7NjMxOzk0Ng",
        text:"When a short-tempered mobster and his gang of thugs try to shake down a neighborhood bar, they’re soon confronted with the wrath of its owner - a mysterious southern woman with a dangerous past."},

    {date:'2018-03-09', title:"Thoroughbreds", link:"https://en.wikipedia.org/wiki/Thoroughbreds_(2017_film)",
        youtube:"TPcV_3D3V2A", imdb:"tt5649108", netflix:"", tomato:"thoroughbreds_2018", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Thoroughbreds_%282017_film%29.png/180px-Thoroughbreds_%282017_film%29.png",
        text:"Two upper-class teenage girls in suburban Connecticut rekindle their unlikely friendship after years of growing apart. Together, they hatch a plan to solve both of their problems-no matter what the cost."},

    {date:'2018-03-09', title:"The Leisure Seeker", link:"https://en.wikipedia.org/wiki/The_Leisure_Seeker",
        youtube:"VGGKsVFslJ8", imdb:"tt3741632", netflix:"", tomato:"the_leisure_seeker", zooqle:"the-leisure-seeker-6b3i",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Leisure_Seeker.png/180px-The_Leisure_Seeker.png",
        text:"Based on the 2009 novel by Michael Zadoorian, it stars Donald Sutherland and Helen Mirren as a runaway couple who embark on a cross-country journey from Boston to the Florida Keys in their vintage camper to escape from the suffocating care of their doctors and grown children."},

    {date:'2018-03-09', title:"A Wrinkle In Time", link:"https://en.wikipedia.org/wiki/A_Wrinkle_in_Time_(2018_film)",
        youtube:"E4U3TeY2wtM", imdb:"tt1620680", netflix:"", tomato:"a_wrinkle_in_time_2018", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/AWrinkleInTimeTeaser.jpg/180px-AWrinkleInTimeTeaser.jpg",
        text:"Based on the 1962 novel by Madeleine L’Engle. After learning her astrophysicist father is being held captive on a distant planet deep in the grip of a universe-spanning evil, Meg Murry works with her highly intelligent younger brother, her classmate, and three astral travelers to save him."},

    {date:'2018-03-16', title:"Entebbe", link:"https://en.wikipedia.org/wiki/Entebbe_(film)",
        youtube:"kuTBea8_-LY", imdb:"tt5466186", netflix:"", tomato:"7_days_in_entebbe_2018", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Entebbe_poster.png/180px-Entebbe_poster.png",
        text:"In 1976, four terrorists hijack Air France Flight 139 en route from Tel Aviv to Paris via Athens and hold the passengers hostage after a forced landing in Entebbe in the hope of forcing Israel to release members of PFLP-EO imprisoned by the Mossad."},

    {date:'2018-03-23', title:"Isle of Dogs", link:"https://en.wikipedia.org/wiki/Isle_of_Dogs_(film)",
        youtube:"dt__kig8PVU", imdb:"tt5104604", netflix:"", tomato:"isle_of_dogs_2018", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/23/IsleOfDogsFirstLook.jpg/180px-IsleOfDogsFirstLook.jpg",
        text:"Written and directed by Wes Anderson. Set in a dystopian future Japan in which dogs have been quarantined on the remote eponymous island due to “canine flu”, this follows five local dogs that are fed up with their isolated existence until a boy ventures to the island to search for his dog."},

    {date:'2018-03-30', title:"Ready Player One", link:"https://en.wikipedia.org/wiki/Ready_Player_One_(film)",
        youtube:"cSp1dM2Vj48", imdb:"tt1677720", netflix:"", tomato:"ready_player_one", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Ready_Player_One_%28film%29.png/180px-Ready_Player_One_%28film%29.png",
        text:"Directed by Steven Spielberg, written by Zak Penn and Ernest Cline, and based on Cline’s 2011 novel. Set in a near-future dystopian Earth, where the population spends most of its time in an interconnected virtual space called the OASIS."},

    {date:'2018-04-06', title:"Wonderstruck", link:"https://en.wikipedia.org/wiki/Wonderstruck_(film)",
        youtube:"o1vV0oorclg", imdb:"tt5208216", netflix:"", tomato:"wonderstruck", zooqle:"wonderstruck-66e4",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Wonderstruck_film_poster.jpg/180px-Wonderstruck_film_poster.jpg",
        text:"The story of a young boy in the Midwest is told simultaneously with a tale about a young girl in New York from fifty years ago as they both seek the same mysterious connection."},

    {date:'2018-04-06', title:"Chappaquiddick", link:"https://en.wikipedia.org/wiki/Chappaquiddick_(film)",
        youtube:"qG-c8DtOm9g", imdb:"tt5270948", netflix:"", tomato:"chappaquiddick", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Chappaquiddick_%28film%29.png/180px-Chappaquiddick_%28film%29.png",
        text:"In 1969, Massachusetts Senator Ted Kennedy in Chappaquiddick drives his car into the water. His passenger, the young campaign strategist Mary Jo Kopechne, is killed in the car accident. Nevertheless, Kennedy does not immediately decide to call the police. He returns to his hotel and calls in the help of his dominant father to save his political career."},

    {date:'2018-04-13', title:"The New Mutants", series:"X-Men #11", link:"https://en.wikipedia.org/wiki/The_New_Mutants_(film)",
        youtube:"bu9e410C__I", imdb:"tt4682266", netflix:"", tomato:"the_new_mutants", zooqle:"the-new-mutants-5qtr",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/TheNewMutantsPoster.jpeg/180px-TheNewMutantsPoster.jpeg",
        text:"Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves."},

    {date:'2018-04-13', title:"Beirut", link:"https://en.wikipedia.org/wiki/Beirut_(film)",
        youtube:"", imdb:"tt4669264", netflix:"", tomato:"beirut", zooqle:"",
        poster:"https://resizing.flixster.com/0MdKJjRjn-59uUGVc0gbTvgJw30=/206x305/v1.bTsxMjY0MTk2MjtwOzE3NjA2OzEyMDA7NjcyOzk5Nw",
        text:"In 1980s Beirut, a former U.S. diplomat returns to service to save a colleague from the group responsible for the death of his family."},

    {date:'2018-05-04', title:"Avengers: Infinity War", series:"Marvel Comic Universe #19", link:"https://en.wikipedia.org/wiki/Avengers:_Infinity_War",
        youtube:"6ZfuNTqbHE8", imdb:"tt4154756", netflix:"", tomato:"avengers_infinity_war", zooqle:"avengers-infinity-war-379w",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Avengers_Infinity_War.jpg/180px-Avengers_Infinity_War.jpg",
        text:"The sequel to 2012’s <i>Marvel’s The Avengers</i> and 2015’s <i>Avengers: Age of Ultron</i>. Four years after the events of <i>Guardians of the Galaxy Vol. 2</i>, the Avengers have been torn apart following the events of <i>Captain America: Civil War</i>. When Thanos arrives on Earth to collect the Infinity Stones for a gauntlet that will allow him to bend reality to his will, the Avengers must join forces with the Guardians of the Galaxy to stop him."},

    {date:'2018-05-25', title:"Solo: A Star Wars Story", series:"Star Wars #10", link:"https://en.wikipedia.org/wiki/Solo:_A_Star_Wars_Story",
        youtube:"", imdb:"tt3778644", netflix:"", tomato:"solo_a_star_wars_story", zooqle:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNzg1OWY4OWYtYzY5NC00ODg5LWIxM2EtZjdjNjE4N2NmYzE4XkEyXkFqcGdeQXVyMjg5NDMwMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Directed by Ron Howard. Han Solo and Chewbacca’s adventures before joining the Rebellion, including their early encounters with Lando Calrissian."},

    {date:'2018-06-01', title:"Deadpool 2", link:"https://en.wikipedia.org/wiki/Deadpool_2",
        youtube:"wLeGWcVeIZ4", series:"X-Men #12", imdb:"tt5463162", netflix:"", tomato:"deadpool_2", zooqle:"untitled-deadpool-sequel-5qay",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Deadpool_2_poster.jpg/180px-Deadpool_2_poster.jpg",
        text:"After surviving a near fatal bovine attack, a disfigured cafeteria chef struggles to fulfill his dream of becoming Mayberry’s hottest bartender while also learning to cope with his lost sense of taste. Searching to regain his spice for life, as well as a flux capacitor, he must battle ninjas, the yakuza, and a pack of sexually aggressive canines, as he journeys around the world to discover the importance of family, friendship, and flavor – finding a new taste for adventure and earning the coveted coffee mug title of World’s Best Lover."},

    {date:'2018-06-08', title:"Ocean’s 8", link:"https://en.wikipedia.org/wiki/Ocean%27s_8",
        youtube:"NANn6DrAkZo", imdb:"tt5164214", netflix:"", tomato:"oceans_8", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/OceansEightPoster.jpeg/180px-OceansEightPoster.jpeg",
        text:"Danny Ocean's estranged sister, Debbie, attempts to pull off the heist of the century at New York City’s star-studded annual Met Gala. Her first stop is to assemble the perfect crew."},

    {date:'2018-06-15', title:"Incredibles 2", link:"https://en.wikipedia.org/wiki/Incredibles_2",
        youtube:"J1ZMSu24lAw", imdb:"tt3606756", netflix:"", tomato:"incredibles_2", zooqle:"incredibles-2-3qk0",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/27/The_Incredibles_2.jpg/180px-The_Incredibles_2.jpg",
        text:"The Parr family struggles to maintain normal lives while Helen Parr, also known as Elastigirl, is out fighting crime. Meanwhile, Helen’s husband Bob Parr, also known as Mr. Incredible, remains at home watching their children Violet, Dash, and discovering Jack-Jack’s secret powers. However, they, along with Frozone will have to battle a new villain, The Underminer with a sinister plot."},

    {date:'2018-07-06', title:"Ant-Man and the Wasp", series:"Marvel Comic Universe #20", link:"https://en.wikipedia.org/wiki/Ant-Man_and_the_Wasp",
        youtube:"", imdb:"tt5095030", netflix:"", tomato:"ant_man_and_the_wasp", zooqle:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNWM4MWExOTUtNDk1MS00YmRhLWI0NzItZmY3MDE2ZjZkOGIwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR3,0,182,268_AL_.jpg",
        text:"Set after the events of <i>Captain America: Civil War</i>, Scott Lang tries to balance his home life as a father with his responsibilities as Ant-Man, when Hope van Dyne and Hank Pym present him with a new mission, requiring him to team up with van Dyne as the new Wasp."},

    //{date:'2018-07-20', title:"Alita: Battle Angel", link:"https://en.wikipedia.org/wiki/Alita:_Battle_Angel",
    //  youtube:""},

    {date:'2018-08-03', title:"Christopher Robin", link:"https://en.wikipedia.org/wiki/Christopher_Robin_(film)",
        youtube:"", imdb:"tt4575576", netflix:"", tomato:"christopher_robin", zooqle:"",
        text:"Not to be confused with <i>Goodbye Christopher Robin</i>. Inspired by A. A. Milne’s book <i>Winnie-the-Pooh</i> it is a live-action adaptation of the Disney franchise. Christopher Robin is now all grown up and has lost all sense of imagination. Pooh and his friends re-enter Christopher’s life to help him find it again."},

    {date:'2018-08-03', title:"The Equalizer 2", link:"https://en.wikipedia.org/wiki/The_Equalizer_2",
        youtube:"", imdb:"tt3766354", netflix:"", tomato:"the_equalizer_2", zooqle:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BN2E0OWE1OTYtOWM0MS00YThkLWI3N2ItNDY1OWM4NGNlMTZjXkEyXkFqcGdeQXVyMjI4MjA3NDY@._V1_UY268_CR3,0,182,268_AL_.jpg",
        text:"A sequel to 2014 film <i>The Equalizer</i>, based on the TV series."},

    {date:'2018-08-17', title:"Captive State", link:"https://en.wikipedia.org/wiki/Captive_State_(film)",
        youtube:"", imdb:"tt5968394", netflix:"", tomato:"captive_state", zooqle:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BODE5ODM5Mjc5MF5BMl5BanBnXkFtZTgwNjQ5OTIzMjI@._V1_UY268_CR110,0,182,268_AL_.jpg",
        text:"Set in a Chicago neighborhood nearly a decade after an occupation by an extra-terrestrial force, Captive State explores the lives on both sides of the conflict - the collaborators and dissidents."},

    {date:'2018-09-12', title:"Johnny English 3", series:"Johnny English #3", link:"https://en.wikipedia.org/wiki/Johnny_English_3",
        youtube:"", imdb:"tt6921996", netflix:"", tomato:"johnny_english_3", zooqle:"",
        poster:"",
        text:"Johnny English returns to save the world again."},

    {date:'2018-10-05', title:"Smallfoot", link:"https://en.wikipedia.org/wiki/Smallfoot_(film)",
        youtube:"qUHoP7F8pdk", imdb:"tt6182908", netflix:"", tomato:"smallfoot", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Smallfoot_%28film%29.png/180px-Smallfoot_%28film%29.png",
        text:"Migo is a Yeti who is convinced that the elusive creatures known as “Smallfoots” (actually Humans) really do exist."},

    {date:'2018-10-05', title:"Venom", series:"Sony’s Marvel Universe #1", link:"https://en.wikipedia.org/wiki/Venom_(2018_film)",
        youtube:"", imdb:"tt1270797", netflix:"", tomato:"venom_2018", zooqle:"",
        poster:"https://www.iceposter.com/thumbs/MOV_deb63422_b.jpg",
        text:"Intended to be the first film in Sony’s Marvel Universe, a new shared universe featuring the Marvel characters to which Sony possessed the film rights, though Sony also intends for the film to share the world of <i>Spider-Man: Homecoming</i>, which is set in the Marvel Comic Universe. "},

    {date:'2018-10-19', title:"The Girl in the Spider’s Web", series:"Millenium #4", link:"https://en.wikipedia.org/wiki/The_Girl_in_the_Spider%27s_Web_(film)",
        youtube:"", imdb:"tt5177088", netflix:"", tomato:"the_girl_in_the_spiders_web", zooqle:"",
        text:"Based on the novel by David Lagercrantz. Computer hacker Lisbeth Salander and journalist Mikael Blomkvist find themselves caught in a web of spies, cyber criminals and corrupt government officials."},

    {date:'2018-11-02', title:"First Man", link:"https://en.wikipedia.org/wiki/First_Man_(film)",
        youtube:"", imdb:"tt1213641", netflix:"", tomato:"first_man", zooqle:"",
        poster:"",
        text:"The riveting true story of NASA’s mission to land a man on the moon, focusing on Neil Armstrong and the years 1961–1969."},

    {date:'2018-11-02', title:"X-Men: Dark Phoenix", series:"X-Men #13", link:"https://en.wikipedia.org/wiki/X-Men:_Dark_Phoenix",
        youtube:"", imdb:"tt6565702", netflix:"", tomato:"x_men_dark_phoenix", zooqle:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BZWUyMWVlMjEtNjRkYS00YjNlLThmODItYzc1MTQ5NzBiOGM2XkEyXkFqcGdeQXVyNjY5NDczMTk@._V1_UY268_CR11,0,182,268_AL_.jpg",
        text:"Set in the 1990s after the events of <i>X-Men: Apocalypse</i>, the X-Men have become a household name and a public sensation. Professor X encourages the team to do more as superheroes. One mission takes them into space and an accident greatly empowers Jean Grey, but at the cost of losing control of herself and acting irrationally. Meanwhile, an alien shapeshifter seeks to use Jean for her own intentions, believing her to be “the Phoenix”."},

    {date:'2018-11-16', title:"Fantastic Beasts: The Crimes of Grindelwald", series:"Fantastic Beasts #2", link:"https://en.wikipedia.org/wiki/Fantastic_Beasts:_The_Crimes_of_Grindelwald",
        youtube:"", imdb:"tt4123430", netflix:"", tomato:"fantastic_beasts_the_crimes_of_grindelwald", zooqle:"",
        poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/FantasticBeastsTheCrimesofGrindelwaldPoster.jpg/180px-FantasticBeastsTheCrimesofGrindelwaldPoster.jpg",
        text:"Directed by David Yates, with a script by J. K. Rowling. The second installment of the <i>Fantastic Beasts and Where to Find Them</i> series follows the adventures of Newt Scamander."},

    {date:'2018-12-14', title:"Mortal Engines", link:"https://en.wikipedia.org/wiki/Mortal_Engines_(film)",
        youtube:"fupYIggOq38", imdb:"tt1571234", netflix:"", tomato:"mortal_engines", zooqle:"",
        poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4NTEzNzU1NF5BMl5BanBnXkFtZTgwMTg4NTA0NDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        text:"Based on the 2002 novel by Philip Reeve. Millennia after much of the world was destroyed, civilization has adopted a new way of living. Gigantic moving cities now roam the Earth, chasing and devouring smaller traction towns for resources. A low-class citizen of the moving city of London, finds himself fighting for survival after he encounters a fugitive."},

    {date:'2018-12-21', title:"Aquaman", link:"https://en.wikipedia.org/wiki/Aquaman_(film)",
        youtube:"w9hGjyzNTAw", series:"DC Extended Universe #6", imdb:"tt1477834", netflix:"", tomato:"aquaman_2018", zooqle:"",
        poster:"https://pre00.deviantart.net/4328/th/pre/f/2017/113/2/e/aquaman_movie_poster_by_jackjack671120-db6wqbr.jpg",
        text:"Following the events of <i>Justice League</i>, Arthur Curry / Aquaman, the reluctant ruler of the underwater kingdom of Atlantis, is caught between surface dwellers that are always polluting the globe and his own people who are ready to invade the surface. He must balance both the nations and deal with new enemies from within the kingdom while learning more about his heritage."},

    //{date:'2018-', title:"", link:"",
    //  youtube:""},
    //{date:'2018-', title:"", link:"",
    //  youtube:""},
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const IMGS = {
    imdb: require('../../img/icons8-imdb-48.png'),
    youtube: require('../../img/icons8-play-button-48.png'),
    tomato: require('../../img/icons8-tomato-48.png'),
    netflix: require('../../img/icons8-netflix-48.png'),
    zooqle: require('../../img/zq-logo.png'),
};

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
                links.push(`<a href="http://www.imdb.com/title/${film.imdb}/"><img src="${IMGS.imdb}" height="16"></a>`);
            }
            if (film.youtube) {
                //links.push(`<a href="${film.trailer}"><i class="fab fa-youtube"></i></a>`);
                links.push(`<a href="https://www.youtube.com/watch?v=${film.youtube}"><img src="${IMGS.youtube}" height="16"></a>`);
            }
            if (film.tomato) {
                //const rt = film.tomato.split('|');
                links.push(`<a href="https://www.rottentomatoes.com/m/${film.tomato}"><img src="${IMGS.tomato}" height="16"></a>`);
            }
            if (film.zooqle) {
                links.push(`<a href="https://zooqle.com/movie/${film.zooqle}.html"><img src="${IMGS.zooqle}" height="18"></a>`);
            }
            if (film.netflix) {
                links.push(`<a href="http://unogs.com/video/?v=${film.netflix}"><img src="${IMGS.netflix}" width="46"></a>`);
            }

            tbl.appendChild(html`
                <tr>
                    <td nowrap>${MONTHS[Number(date[1])-1]} ${Number(date[2])}</td>
                    <td rowspan="2">${poster}</td>
                    <td><a href="${film.link}"><i>${film.title}</i></a></td>
                    <td nowrap style="text-align: right">${film.series}</td>
                </tr>`);
            tbl.appendChild(html`
                <tr style="height: 100%">
                    <td class="links">${raw(links.join(' '))}</td>
                    <td colspan="2"><p class="small">${raw(film.text || '')}</p></td>
                </tr>`);
        }
    });

    return [
        html`<h1>${year} Film Picks</h1>`,
        html`<dl class="films">
                <dt><img src="${IMGS.imdb}" height="16"></dt>
                <dd>Goes to film's page at IMDB.</dd>
                <dt><img src="${IMGS.youtube}" height="16"></dt>
                <dd>Goes to a trailer on YouTube.</dd>
                <dt><img src="${IMGS.tomato}" height="16"></dt>
                <dd>Goes to film’s page at Rotten Tomatoes.</dd>
                <dt><img src="${IMGS.netflix}" width="46"></dt>
                <dd>Goes to a site that tell’s you in which counties the film is available on Netflix.</dd>
                <dt><img src="${IMGS.zooqle}" height="18"></dt>
                <dd>Goes to a site listing bitTorrents of the film. Caution: You should know what you're doing if you use this. <i>Never</i> use the direct download links!</dd>
             </dl>`,
        tbl
    ];
}
