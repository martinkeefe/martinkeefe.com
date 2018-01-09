import html from 'choo/html'
import raw from 'choo/html/raw'
import {$q} from './lib'

import '../../css/fa-svg-with-js.css'
import '../lib/fontawesome-all.min'



const FILMS = [
	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},

	{date:'2017-', title:"", link:"", trailer:"", imdb:"",
		poster:"",
		text:""},




	//--------------------------------------------------------------------------

	{date:'2018-01-18', title:"Mary and the Witch's Flower", link:"https://en.wikipedia.org/wiki/Mary_and_the_Witch%27s_Flower", trailer:"https://www.youtube.com/watch?v=VqUKano2Hm4", imdb:"http://www.imdb.com/title/tt6336356/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Mary_and_the_witch%27s_flower_poster.jpg/180px-Mary_and_the_witch%27s_flower_poster.jpg",
		text:"Based on <i>The Little Broomstick</i> by Mary Stewart, this is Studio Ponoc's first feature film. It tells a story of a girl who finds a mysterious flower that can give her the power to become a witch for one night only."},

	{date:'2018-01-19', title:"Den of Thieves", link:"https://en.wikipedia.org/wiki/Den_of_Thieves_(film)", trailer:"https://www.youtube.com/watch?v=FKd_ks0rdAM", imdb:"http://www.imdb.com/title/tt1259528/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Den_of_Thieves_poster.jpg/180px-Den_of_Thieves_poster.jpg",
		text:"A gritty Los Angeles crime saga which follows the intersecting and often personally connected lives of an elite unit of the LA County Sheriff's Department and the state's most successful bank robbery crew as the outlaws plan a seemingly impossible heist on the Federal Reserve Bank of downtown Los Angeles."},

	{date:'2018-01-26', title:"Early Man", link:"https://en.wikipedia.org/wiki/Early_Man_(film)", trailer:"https://www.youtube.com/watch?v=GC5FIWUFfUY", imdb:"http://www.imdb.com/title/tt4701724/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BOWVkMzhlMmItMDY0NC00NDY5LWIzZjctMzdmNGEwNGY2YmVmXkEyXkFqcGdeQXVyNTUxNDUxOTI@._V1_UX182_CR0,0,182,268_AL_.jpg",
		text:"An Ardman Animation directed by Nick Park. Set at the dawn of time when prehistoric creatures and woolly mammoths roamed the earth, a caveman named Dug, along with his pet sidekick Hognob and Goona, unites his tribe to save their valley home when it is claimed by Lord Nooth and his Bronze Age City."},

	{date:'2018-02-09', title:"Peter Rabbit", link:"https://en.wikipedia.org/wiki/Peter_Rabbit_(film)", trailer:"https://www.youtube.com/watch?v=7Pa_Weidt08", imdb:"http://www.imdb.com/title/tt5117670/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Peter-rabbit-teaser.jpg/180px-Peter-rabbit-teaser.jpg",
		text:"Peter Rabbit's feud with Mr. McGregor reaches new heights as both compete for the affections of a kind animal lover who lives next door."},

	{date:'2018-02-16', title:"Black Panther", link:"https://en.wikipedia.org/wiki/Black_Panther_(film)", trailer:"https://www.youtube.com/watch?v=xjDjIWPwcPU", series:"Marvel Comic Universe #18", imdb:"http://www.imdb.com/title/tt1825683/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Black_Panther_film_poster.jpg/180px-Black_Panther_film_poster.jpg",
		text:"After the events of <i>Captain America: Civil War</i>, King T’Challa returns home to Wakanda. But when two enemies conspire to bring down the kingdom, T’Challa must team up, as the Black Panther, with CIA agent Everett K. Ross and members of the Dora Milaje—Wakanda's special forces—to prevent a world war."},

	{date:'2018-02-23', title:"Game Night", link:"https://en.wikipedia.org/wiki/Game_Night_(film)", trailer:"https://www.youtube.com/watch?v=fNtLIcyjsnI", imdb:"http://www.imdb.com/title/tt2704998/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Game_Night_%28film%29.png/180px-Game_Night_%28film%29.png",
		text:"A group of friends meet regularly for their game night, and one night they find themselves investigating an actual murder mystery."},

	{date:'2018-02-23', title:"Annihilation", link:"https://en.wikipedia.org/wiki/Annihilation_(film)", trailer:"https://www.youtube.com/watch?v=89OP78l9oF0", imdb:"http://www.imdb.com/title/tt2798920/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Annihilation_%28film%29.png/180px-Annihilation_%28film%29.png",
		text:"Based on the 2014 novel by Jeff VanderMeer. A group of soldiers enters an environmental disaster zone and only one comes back out alive, though he is grievously injured. In an attempt to save his life, his wife Lena, a biologist, volunteers for a second expedition into the zone to figure out what happened to him."},

	{date:'2018-03-02', title:"Red Sparrow", link:"https://en.wikipedia.org/wiki/Red_Sparrow", trailer:"https://www.youtube.com/watch?v=PmUL6wMpMWw", imdb:"http://www.imdb.com/title/tt2873282/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Red_Sparrow.png/180px-Red_Sparrow.png",
		text:"Based on the 2013 novel by Jason Matthews, it tells of a Russian intelligence officer and a CIA agent, the American mole in Russia, whom she should expose."},

	{date:'2018-03-02', title:"Pickings", link:"https://en.wikipedia.org/wiki/Pickings_(film)", trailer:"https://www.youtube.com/watch?v=y1f_PS3zA8Y", imdb:"http://www.imdb.com/title/tt4789822/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Pickingsmovieposteru.jpg/180px-Pickingsmovieposteru.jpg",
		text:"When a short-tempered mobster and his gang of thugs try to shake down a neighborhood bar, they're soon confronted with the wrath of its owner - a mysterious southern woman with a dangerous past."},

	{date:'2018-03-09', title:"Thoroughbreds", link:"https://en.wikipedia.org/wiki/Thoroughbreds_(2017_film)", trailer:"https://www.youtube.com/watch?v=TPcV_3D3V2A", imdb:"http://www.imdb.com/title/tt5649108/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Thoroughbreds_%282017_film%29.png/180px-Thoroughbreds_%282017_film%29.png",
		text:"Two upper-class teenage girls in suburban Connecticut rekindle their unlikely friendship after years of growing apart. Together, they hatch a plan to solve both of their problems-no matter what the cost."},

	{date:'2018-03-09', title:"The Leisure Seeker", link:"https://en.wikipedia.org/wiki/The_Leisure_Seeker", trailer:"https://www.youtube.com/watch?v=VGGKsVFslJ8", imdb:"http://www.imdb.com/title/tt3741632/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Leisure_Seeker.png/180px-The_Leisure_Seeker.png",
		text:"Based on the 2009 novel by Michael Zadoorian, it stars Donald Sutherland and Helen Mirren as a runaway couple who embark on a cross-country journey from Boston to the Florida Keys in their vintage camper to escape from the suffocating care of their doctors and grown children."},

	{date:'2018-03-09', title:"A Wrinkle In Time", link:"https://en.wikipedia.org/wiki/A_Wrinkle_in_Time_(2018_film)", trailer:"https://www.youtube.com/watch?v=E4U3TeY2wtM", imdb:"http://www.imdb.com/title/tt1620680/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/AWrinkleInTimeTeaser.jpg/180px-AWrinkleInTimeTeaser.jpg",
		text:"Based on the 1962 novel by Madeleine L'Engle. After learning her astrophysicist father is being held captive on a distant planet deep in the grip of a universe-spanning evil, Meg Murry works with her highly intelligent younger brother, her classmate, and three astral travelers to save him."},

	{date:'2018-03-16', title:"Entebbe", link:"https://en.wikipedia.org/wiki/Entebbe_(film)", trailer:"https://www.youtube.com/watch?v=kuTBea8_-LY", imdb:"http://www.imdb.com/title/tt5466186/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Entebbe_poster.png/180px-Entebbe_poster.png",
		text:"In 1976, four terrorists hijack Air France Flight 139 en route from Tel Aviv to Paris via Athens and hold the passengers hostage after a forced landing in Entebbe in the hope of forcing Israel to release members of PFLP-EO imprisoned by the Mossad."},

	{date:'2018-03-23', title:"Isle of Dogs", link:"https://en.wikipedia.org/wiki/Isle_of_Dogs_(film)", trailer:"https://www.youtube.com/watch?v=dt__kig8PVU", imdb:"http://www.imdb.com/title/tt5104604/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/23/IsleOfDogsFirstLook.jpg/180px-IsleOfDogsFirstLook.jpg",
		text:"Written and directed by Wes Anderson. Set in a dystopian future Japan in which dogs have been quarantined on the remote eponymous island due to “canine flu”, this follows five local dogs that are fed up with their isolated existence until a boy ventures to the island to search for his dog."},

	{date:'2018-03-30', title:"Ready Player One", link:"https://en.wikipedia.org/wiki/Ready_Player_One_(film)", trailer:"https://www.youtube.com/watch?v=cSp1dM2Vj48",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Ready_Player_One_%28film%29.png/180px-Ready_Player_One_%28film%29.png", imdb:"http://www.imdb.com/title/tt1677720/",
		text:"Directed by Steven Spielberg, written by Zak Penn and Ernest Cline, and based on Cline's 2011 novel. Set in a near-future dystopian Earth, where the population spends most of its time in an interconnected virtual space called the OASIS."},

	{date:'2018-04-06', title:"Chappaquiddick", link:"https://en.wikipedia.org/wiki/Chappaquiddick_(film)", trailer:"https://www.youtube.com/watch?v=qG-c8DtOm9g", imdb:"http://www.imdb.com/title/tt5270948/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Chappaquiddick_%28film%29.png/180px-Chappaquiddick_%28film%29.png",
		text:"In 1969, Massachusetts Senator Ted Kennedy in Chappaquiddick drives his car into the water. His passenger, the young campaign strategist Mary Jo Kopechne, is killed in the car accident. Nevertheless, Kennedy does not immediately decide to call the police. He returns to his hotel and calls in the help of his dominant father to save his political career."},

	{date:'2018-04-13', title:"The New Mutants", link:"https://en.wikipedia.org/wiki/The_New_Mutants_(film)", trailer:"https://www.youtube.com/watch?v=bu9e410C__I", series:"X-Men #11", imdb:"http://www.imdb.com/title/tt4682266/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/TheNewMutantsPoster.jpeg/180px-TheNewMutantsPoster.jpeg",
		text:"Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves."},

	{date:'2018-04-13', title:"Beirut", link:"https://en.wikipedia.org/wiki/Beirut_(film)", trailer:"", imdb:"http://www.imdb.com/title/tt4669264/",
		poster:"",
		text:"In 1980s Beirut, a former U.S. diplomat returns to service to save a colleague from the group responsible for the death of his family."},

	{date:'2018-05-04', title:"Avengers: Infinity War", link:"https://en.wikipedia.org/wiki/Avengers:_Infinity_War", trailer:"https://www.youtube.com/watch?v=6ZfuNTqbHE8", series:"Marvel Comic Universe #19", imdb:"http://www.imdb.com/title/tt4154756/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Avengers_Infinity_War.jpg/180px-Avengers_Infinity_War.jpg",
		text:"The sequel to 2012's <i>Marvel's The Avengers</i> and 2015's <i>Avengers: Age of Ultron</i>. Four years after the events of <i>Guardians of the Galaxy Vol. 2</i>, the Avengers have been torn apart following the events of <i>Captain America: Civil War</i>. When Thanos arrives on Earth to collect the Infinity Stones for a gauntlet that will allow him to bend reality to his will, the Avengers must join forces with the Guardians of the Galaxy to stop him."},

	{date:'2018-05-25', title:"Solo: A Star Wars Story", link:"https://en.wikipedia.org/wiki/Solo:_A_Star_Wars_Story", trailer:"", series:"Star Wars #10", imdb:"http://www.imdb.com/title/tt3778644/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNzg1OWY4OWYtYzY5NC00ODg5LWIxM2EtZjdjNjE4N2NmYzE4XkEyXkFqcGdeQXVyMjg5NDMwMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
		text:"Directed by Ron Howard. Han Solo and Chewbacca's adventures before joining the Rebellion, including their early encounters with Lando Calrissian."},

	{date:'2018-06-01', title:"Deadpool 2", link:"https://en.wikipedia.org/wiki/Deadpool_2", trailer:"https://www.youtube.com/watch?v=wLeGWcVeIZ4", series:"X-Men #12", imdb:"http://www.imdb.com/title/tt5463162/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Deadpool_2_poster.jpg/180px-Deadpool_2_poster.jpg",
		text:"After surviving a near fatal bovine attack, a disfigured cafeteria chef struggles to fulfill his dream of becoming Mayberry’s hottest bartender while also learning to cope with his lost sense of taste. Searching to regain his spice for life, as well as a flux capacitor, he must battle ninjas, the yakuza, and a pack of sexually aggressive canines, as he journeys around the world to discover the importance of family, friendship, and flavor – finding a new taste for adventure and earning the coveted coffee mug title of World’s Best Lover."},

	{date:'2018-06-08', title:"Ocean's 8", link:"https://en.wikipedia.org/wiki/Ocean%27s_8", trailer:"https://www.youtube.com/watch?v=NANn6DrAkZo", imdb:"http://www.imdb.com/title/tt5164214/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/OceansEightPoster.jpeg/180px-OceansEightPoster.jpeg",
		text:"Danny Ocean's estranged sister, Debbie, attempts to pull off the heist of the century at New York City's star-studded annual Met Gala. Her first stop is to assemble the perfect crew."},

	{date:'2018-06-15', title:"Incredibles 2", link:"https://en.wikipedia.org/wiki/Incredibles_2", trailer:"https://www.youtube.com/watch?v=J1ZMSu24lAw", imdb:"http://www.imdb.com/title/tt3606756/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/2/27/The_Incredibles_2.jpg/180px-The_Incredibles_2.jpg",
		text:"The Parr family struggles to maintain normal lives while Helen Parr, also known as Elastigirl, is out fighting crime. Meanwhile, Helen's husband Bob Parr, also known as Mr. Incredible, remains at home watching their children Violet, Dash, and discovering Jack-Jack's secret powers. However, they, along with Frozone will have to battle a new villain, The Underminer with a sinister plot."},

	{date:'2018-07-06', title:"Ant-Man and the Wasp", link:"https://en.wikipedia.org/wiki/Ant-Man_and_the_Wasp", trailer:"", series:"Marvel Comic Universe #20", imdb:"http://www.imdb.com/title/tt5095030/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNWM4MWExOTUtNDk1MS00YmRhLWI0NzItZmY3MDE2ZjZkOGIwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY268_CR3,0,182,268_AL_.jpg",
		text:"Set after the events of <i>Captain America: Civil War</i>, Scott Lang tries to balance his home life as a father with his responsibilities as Ant-Man, when Hope van Dyne and Hank Pym present him with a new mission, requiring him to team up with van Dyne as the new Wasp."},

	//{date:'2018-07-20', title:"Alita: Battle Angel", link:"https://en.wikipedia.org/wiki/Alita:_Battle_Angel", trailer:""},

	{date:'2018-08-03', title:"Christopher Robin", link:"https://en.wikipedia.org/wiki/Christopher_Robin_(film)", trailer:"", imdb:"http://www.imdb.com/title/tt4575576/",
		text:"Not to be confused with <i>Goodbye Christopher Robin</i>. Inspired by A. A. Milne's book <i>Winnie-the-Pooh</i> it is a live-action adaptation of the Disney franchise. Christopher Robin is now all grown up and has lost all sense of imagination. Pooh and his friends re-enter Christopher's life to help him find it again."},

	{date:'2018-08-03', title:"The Equalizer 2", link:"https://en.wikipedia.org/wiki/The_Equalizer_2", trailer:"", imdb:"http://www.imdb.com/title/tt3766354/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BN2E0OWE1OTYtOWM0MS00YThkLWI3N2ItNDY1OWM4NGNlMTZjXkEyXkFqcGdeQXVyMjI4MjA3NDY@._V1_UY268_CR3,0,182,268_AL_.jpg",
		text:"A sequel to 2014 film <i>The Equalizer</i>, based on the TV series."},

	{date:'2018-08-17', title:"Captive State", link:"https://en.wikipedia.org/wiki/Captive_State_(film)", trailer:"", imdb:"http://www.imdb.com/title/tt5968394/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BODE5ODM5Mjc5MF5BMl5BanBnXkFtZTgwNjQ5OTIzMjI@._V1_UY268_CR110,0,182,268_AL_.jpg",
		text:"Set in a Chicago neighborhood nearly a decade after an occupation by an extra-terrestrial force, Captive State explores the lives on both sides of the conflict - the collaborators and dissidents."},

	{date:'2018-09-12', title:"Johnny English 3", link:"https://en.wikipedia.org/wiki/Johnny_English_3", trailer:"", series:"Johnny English #3", imdb:"http://www.imdb.com/title/tt6921996/",
		poster:"",
		text:"Johnny English returns to save the world again."},

	{date:'2018-10-05', title:"Smallfoot", link:"https://en.wikipedia.org/wiki/Smallfoot_(film)", trailer:"https://www.youtube.com/watch?v=qUHoP7F8pdk", imdb:"http://www.imdb.com/title/tt6182908/",
		poster:"https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Smallfoot_%28film%29.png/180px-Smallfoot_%28film%29.png",
		text:"Migo is a Yeti who is convinced that the elusive creatures known as “Smallfoots” (actually Humans) really do exist."},

	{date:'2018-10-05', title:"Venom", link:"https://en.wikipedia.org/wiki/Venom_(2018_film)", trailer:"", series:"Sony's Marvel Universe #1", imdb:"http://www.imdb.com/title/tt1270797/",
		poster:"https://www.iceposter.com/thumbs/MOV_deb63422_b.jpg",
		text:"Intended to be the first film in Sony's Marvel Universe, a new shared universe featuring the Marvel characters to which Sony possessed the film rights, though Sony also intends for the film to share the world of <i>Spider-Man: Homecoming</i>, which is set in the Marvel Comic Universe. "},

	{date:'2018-10-19', title:"The Girl in the Spider's Web", link:"https://en.wikipedia.org/wiki/The_Girl_in_the_Spider%27s_Web_(film)", trailer:"", series:"Millenium #4", imdb:"http://www.imdb.com/title/tt5177088/",
		text:"Based on the novel by David Lagercrantz. Computer hacker Lisbeth Salander and journalist Mikael Blomkvist find themselves caught in a web of spies, cyber criminals and corrupt government officials."},

	{date:'2018-11-02', title:"First Man", link:"https://en.wikipedia.org/wiki/First_Man_(film)", trailer:"", imdb:"http://www.imdb.com/title/tt1213641/",
		poster:"",
		text:"The riveting true story of NASA’s mission to land a man on the moon, focusing on Neil Armstrong and the years 1961–1969."},

	{date:'2018-11-02', title:"X-Men: Dark Phoenix", link:"https://en.wikipedia.org/wiki/X-Men:_Dark_Phoenix", trailer:"", series:"X-Men #13", imdb:"http://www.imdb.com/title/tt6565702/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BZWUyMWVlMjEtNjRkYS00YjNlLThmODItYzc1MTQ5NzBiOGM2XkEyXkFqcGdeQXVyNjY5NDczMTk@._V1_UY268_CR11,0,182,268_AL_.jpg",
		text:"Set in the 1990s after the events of <i>X-Men: Apocalypse</i>, the X-Men have become a household name and a public sensation. Professor X encourages the team to do more as superheroes. One mission takes them into space and an accident greatly empowers Jean Grey, but at the cost of losing control of herself and acting irrationally. Meanwhile, an alien shapeshifter seeks to use Jean for her own intentions, believing her to be “the Phoenix”."},

	{date:'2018-11-16', title:"Fantastic Beasts: The Crimes of Grindelwald", link:"https://en.wikipedia.org/wiki/Fantastic_Beasts:_The_Crimes_of_Grindelwald", trailer:"", series:"Fantastic Beasts #2", imdb:"http://www.imdb.com/title/tt4123430/",
		poster:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/FantasticBeastsTheCrimesofGrindelwaldPoster.jpg/180px-FantasticBeastsTheCrimesofGrindelwaldPoster.jpg",
		text:"Directed by David Yates, with a script by J. K. Rowling. The second installment of the <i>Fantastic Beasts and Where to Find Them</i> series follows the adventures of Newt Scamander."},

	{date:'2018-12-14', title:"Mortal Engines", link:"https://en.wikipedia.org/wiki/Mortal_Engines_(film)", trailer:"https://www.youtube.com/watch?v=fupYIggOq38", imdb:"http://www.imdb.com/title/tt1571234/",
		poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4NTEzNzU1NF5BMl5BanBnXkFtZTgwMTg4NTA0NDM@._V1_UX182_CR0,0,182,268_AL_.jpg",
		text:"Based on the 2002 novel by Philip Reeve. Millennia after much of the world was destroyed, civilization has adopted a new way of living. Gigantic moving cities now roam the Earth, chasing and devouring smaller traction towns for resources. A low-class citizen of the moving city of London, finds himself fighting for survival after he encounters a fugitive."},

	{date:'2018-12-21', title:"Aquaman", link:"https://en.wikipedia.org/wiki/Aquaman_(film)", trailer:"https://www.youtube.com/watch?v=w9hGjyzNTAw", series:"DC Extended Universe #6", imdb:"http://www.imdb.com/title/tt1477834/",
		poster:"https://pre00.deviantart.net/4328/th/pre/f/2017/113/2/e/aquaman_movie_poster_by_jackjack671120-db6wqbr.jpg",
		text:"Following the events of <i>Justice League</i>, Arthur Curry / Aquaman, the reluctant ruler of the underwater kingdom of Atlantis, is caught between surface dwellers that are always polluting the globe and his own people who are ready to invade the surface. He must balance both the nations and deal with new enemies from within the kingdom while learning more about his heritage."},

	//{date:'2018-', title:"", link:"", trailer:""},
	//{date:'2018-', title:"", link:"", trailer:""},
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export default function(year)
{
    const tbl = html`<table id="films"></table>`;

    FILMS.forEach(film => {
    	const date = film.date.split('-');

    	if (date[0] === year) {
	    	const poster = film.poster ? html`<img src="${film.poster}" width="96">` : '';

	    	const links = [];
	    	//if (film.link) {
	    	//	links.push(`<a href="${film.link}"><i class="fab fa-wikipedia-w"></i></a>`);
	    	//}
	    	if (film.imdb) {
	    		links.push(`<a href="${film.imdb}"><i class="fab fa-imdb"></i></a>`);
	    	}
	    	if (film.trailer) {
	    		links.push(`<a href="${film.trailer}"><i class="fab fa-youtube"></i></a>`);
	    	}

	    	tbl.appendChild(html`
	    		<tr>
		    		<td rowspan="2" nowrap>${MONTHS[Number(date[1])-1]} ${Number(date[2])}</td>
		    		<td rowspan="2">${poster}</td>
		    		<td><a href="${film.link}"><i>${film.title}</i></a></td>
		    		<td nowrap style="text-align: right">${film.series}</td>
		    		<td nowrap style="font-size: 20px">${raw(links.join(' '))}</td>
		    	</tr>`);
	    	tbl.appendChild(html`
	    		<tr style="height: 100%">
	    			<td colspan="3"><p class="small">${raw(film.text || '')}</p></td>
	    		</tr>`);
	    }
    });

    return [
    	html`<h1>${year} Film Picks</h1>`,
    	tbl
    ];
}
