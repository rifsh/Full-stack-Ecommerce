import { Injectable, inject } from '@angular/core';
import { ProductModel } from '../models/allproducts.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSrvcService } from './user-srvc.service';
import { CartResponseModel } from '../models/response-model';
import { ToastrService } from 'ngx-toastr';
import { ObjectId } from 'mongoose';
import * as io from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class UserProductsService {
  http: HttpClient = inject(HttpClient);
  srvc: UserSrvcService = inject(UserSrvcService);
  toast: ToastrService = inject(ToastrService);

  totalPrice: number = 0
  cartIconCount: number;

  // private subject: WebSocketSubject

  // constructor(private socket: ) { }

  allProductsSrvc: ProductModel[] = [
    {
      id: 1, title: 'Jurassic Park', author: 'Michael Crichton', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind’s most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/jurassicpark.jpg', price: 200, quandity: 1
    },
    {
      id: 2, title: 'The Da Vinci Code', author: 'Dan Brown', type: 'action',
      dessc: `While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.`,
      image: '../../assets/all books/davinci-code.jpg', price: 900, quandity: 1
    },
    {
      id: 3, title: 'Divergent', author: 'Veronica Roth', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind’s most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/divergent.jpg', price: 600, quandity: 1
    },
    {
      id: 4, title: 'The Lord of the Rings', author: 'Michael Crichton', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind’s most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/lord-of-the-rings.jpg', price: 1200, quandity: 1
    },
    {
      id: 10, title: 'The Jinn-Bot of Shantiport', author: 'Samit Basu', type: 'sci-fi',
      dessc: `Shantiport was supposed to be a gateway to the stars. But the city is sinking, and its colonist rulers arent helping anyone but themselves.`,
      image: '../../assets/all books/the-jinnbot-sc-fi.jpg', price: 1000, quandity: 1
    },
    {
      id: 5, title: 'The Bourne Identity', author: 'Robert Ludlum', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankinds most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/rebert-lolum.jpg', price: 100, quandity: 1
    },
    {
      id: 6, title: 'The Count of Cristo', author: 'Alexandre Dumas', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankinds most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/the count.jpg', price: 350, quandity: 1
    },
    {
      id: 7, title: 'Dune', author: 'Frank Herbert', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankinds most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/dune.jpg', price: 240, quandity: 1
    },
    {
      id: 8, title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', type: 'action',
      dessc: `An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them—for a price.`,
      image: '../../assets/all books/the feeloship.jpg', price: 560, quandity: 1
    },
    // sci-fi//
    {
      id: 9, title: 'Beholder', author: 'Ryan La Sala', type: 'sci-fi',
      dessc: `"Beholder is a resplendent monster of power, secrets, wealth, and murderous interior design." - Andrew Joseph White, New York Times bestselling author of Hell Followed With Us"A top-notch horror novel."`,
      image: '../../assets/all books/beholder-scifi.jpg', price: 900, quandity: 1
    },

    {
      id: 11, title: 'Phantom', author: 'Helen Power', type: 'sci-fi',
      dessc: `"Would you sell your hand for a million dollars? Regan “Roz” Osbourne is broke. Her ex-boyfriend won’t take no for an answer, and no one is taking her art work seriously. So when a mysterious stranger offers her a million dollars and safety from her unstable ex in exchange for her left hand, she can’t afford to refuse. Immediately following the amputation, she’s racked with insufferable phantom limb pain`,
      image: '../../assets/all books/phantom-sci-fi.jpg', price: 300, quandity: 1
    },
    {
      id: 12, title: 'Julia', author: 'Sandra Newman', type: 'sci-fi',
      dessc: `London, chief city of Airstrip One, the third most populous province of Oceana. It's 1984 and Julia Worthing works as a mechanic fixing the novel-writing machines in the Fiction Department at the Ministry of Truth. Under the ideology of IngSoc and the rule of the Party and its leader Big Brother, Julia is a model citizen - cheerfully cynical, believing in nothing and caring not at all about politics.`,
      image: '../../assets/all books/julia-si-fi.jpg', price: 400, quandity: 1
    },
    {
      id: 21, title: 'A Haunting on the Hill', author: 'Elizabeth Hand', type: 'horror',
      dessc: `From three-time Shirley Jackson, World Fantasy, and Nebula Award-winning author Elizabeth Hand comes the first-ever authorized novel to return to the world of Shirley Jackson's  The Haunting of Hill House:  a suspenseful, contemporary, and terrifying story of longing and isolation all its own.`,
      image: '../../assets/all books/a hunting on the hill-horror.jpg', price: 1900, quandity: 1
    },
    {
      id: 13, title: 'Silent City', author: 'Sarah Davis-Goff', type: 'sci-fi',
      dessc: `The story of young female warrior who must start a revolution if she and those she loves are to survive.`,
      image: '../../assets/all books/silent city-si-fi.jpg', price: 700, quandity: 1
    },
    {
      id: 14, title: 'All These Sunken Souls', author: 'Circe Moskowitz', type: 'sci-fi',
      dessc: `We are all familiar with tropes of the horror genre: slasher and victims, demon and the possessed. Bloody screams, haunted visions, and the peddler of wares we aren’t sure we can trust. In this young adult horror anthology, `,
      image: '../../assets/all books/allthesesunkensouls-si-fi.jpg', price: 200, quandity: 1
    },
    {
      id: 15, title: 'These Burning Stars', author: 'Bethany Jacobs', type: 'sci-fi',
      dessc: `A dangerous cat-and-mouse quest for revenge. An empire that spans star systems, built on the bones of a genocide. A carefully hidden secret that could collapse worlds, hunted by three women with secrets of their own. All collide in this twisty, explosive space opera debut, perfect for readers of Arkady Martine and Kameron Hurley.`,
      image: '../../assets/all books/burningstars-si-fi.jpg', price: 900, quandity: 1
    },
    {
      id: 16, title: 'The Quiet Room', author: 'Terry Miles', type: 'sci-fi',
      dessc: `The lore and legends around the underground game known as Rabbits gain new dimensions in this twisty tale set in the world of the hit Rabbits podcast.`,
      image: '../../assets/all books/thequiteroom-si-fi.jpg', price: 500, quandity: 1
    },
    {
      id: 17, title: 'Generation Ship', author: 'Michael Mammay', type: 'sci-fi',
      dessc: `In this riveting, stand-alone novel from Michael Mammay, author of  Planetside,  the beginning of a new human colony must face tyrannical leaders, revolution, crippling instability, and an unknown alien planet that could easily destroy them all. In 2108, Colony Ship  Voyager  departed Earth for the planet of Promissa with 18,000 of the world’s best and brightest on board.`,
      image: '../../assets/all books/generationship-scifi.jpg', price: 1450, quandity: 1
    },
    // horror
    {
      id: 18, title: 'Starling House', author: 'Alix E. Harrow', type: 'horror',
      dessc: `A grim and gothic new tale from author Alix E. Harrow about a small town haunted by secrets that can't stay buried and the sinister house that sits at the crossroads of it all.Eden, Kentucky, is just another dying, bad-luck town, known only for the legend of E. Starling, the reclusive nineteenth-century author and illustrator who wrote The Underland--and disappeared.`,
      image: '../../assets/all books/starlinghouse-horoor.jpg', price: 1780, quandity: 1
    },
    {
      id: 19, title: 'The Reformatory', author: 'Tananarive Due', type: 'horror',
      dessc: `A gripping, page-turning novel set in Jim Crow Florida that follows Robert Stephens Jr. as he’s sent to a segregated reform school that is a chamber of terrors where he sees the horrors of racism and injustice, for the living, and the dead.`,
      image: '../../assets/all books/reformatory-horror.jpg', price: 1511, quandity: 1
    },
    {
      id: 20, title: 'The Witches of Bone Hill', author: 'Ava Morgyn', type: 'horror',
      dessc: `Cordelia Bone's meticulously crafted life and career in Dallas are crashing down around her thanks to a philandering husband with criminal debts.`,
      image: '../../assets/all books/thewithes-horror.jpg', price: 1523, quandity: 1
    },

    {
      id: 22, title: 'Out There Screaming', author: 'Jordan Peele', type: 'horror',
      dessc: `The visionary writer and director of Get Out, Us, and Nope, and founder of Monkeypaw Productions, curates this groundbreaking anthology of all-new stories of Black horror, exploring not only the terrors of the supernatural but the chilling reality of injustice that haunts our nation.`,
      image: '../../assets/all books/outther scream-horror.jpg', price: 1623, quandity: 1
    },
    {
      id: 23, title: 'Edenville', author: 'Sam Rebelein', type: 'horror',
      dessc: `An unsettling, immersive, and wildly entertaining debut novel from an exciting new voice in horror for fans of Paul Tremblay and Stephen Graham Jones.`,
      image: '../../assets/all books/edenvilla-horror.jpg', price: 1890, quandity: 1
    },
    {
      id: 24, title: 'Becoming the Boogeyman', author: 'Richard Chizmar', type: 'horror',
      dessc: `A riveting, haunting sequel to the New York Times bestselling thriller Chasing the Boogeyman—a tale of obsession and the adulation of evil, exploring modern society’s true-crime obsession with unflinching honesty, sparing no one from the glare of the spotlight.`,
      image: '../../assets/all books/the boogeyman-horror.jpg', price: 1250, quandity: 1
    },
    {
      id: 25, title: 'Bittersweet in the Hollow', author: 'Kate Pearsall', type: 'horror',
      dessc: `In this beautifully dark and enthralling YA, four sisters with unusual talents investigate a mysterious disappearance in their secluded Appalachian town. For fans of House of Hollow and Wilder Girls!`,
      image: '../../assets/all books/bittersweet-horror.jpg', price: 2650, quandity: 1
    },
    {
      id: 26, title: 'all that consumes us-horror', author: 'Erica Waters', type: 'horror',
      dessc: `Ninth House meets The Dead and the Dark in this gothic dark academia novel that delves into the human capacity for great love, great art, and great evil.   Magni animi numquam moriuntur. Great minds never die.`,
      image: '../../assets/all books/all that consumes us-horror.jpg', price: 3250, quandity: 1
    },
    {
      id: 27, title: 'Nestlings(horrifically)', author: 'Nat Cassidy', type: 'horror',
      dessc: `Nat Cassidy is at his razor-sharp best again with his horror novel Nestlings , which harnesses the creeping paranoia of Rosemary's Baby and the urban horror of Salem's Lot , set in an exclusive New York City residential building.`,
      image: '../../assets/all books/nestlings-horror.jpg', price: 2150, quandity: 1
    },
    {
      id: 28, title: 'The Dead Take the A Train', author: 'Cassandra Khaw', type: 'horror',
      dessc: `Bestselling authors Cassandra Khaw and Richard Kadrey have teamed up to deliver a dark new story with magic, monsters, and mayhem, perfect for fans of Neil Gaiman and Joe Hill.`,
      image: '../../assets/all books/dead take the train-horror.jpg', price: 1430, quandity: 1
    },
    {
      id: 29, title: 'Last to Leave the Room', author: 'Caitlin Starling', type: 'horror',
      dessc: `A new novel of genre-busting speculative horror from the acclaimed author of The Death of Jane Lawrence.`,
      image: '../../assets/all books/last tto leave the room-horror.jpg', price: 1250, quandity: 1
    },
    // history
    {
      id: 30, title: 'The Sisterhood', author: 'Liza Mundy', type: 'history',
      dessc: `A thrilling and monumental new history of the CIA that reveals how women have always played crucial, often unacknowledged roles in American spycraft, a hidden “sisterhood” of spies, analysts, operatives, and manhunters who, over a half-century, kept the free world safe and, more than once, saved it—from the New York Times bestselling author of Code Girls`,
      image: '../../assets/all books/sister-hood-history.jpg', price: 1310, quandity: 1
    },
    {
      id: 31, title: 'Eve', author: 'Cat Bohannon', type: 'history',
      dessc: `THE REAL ORIGIN OF OUR SPECIES: a myth-busting, eye-opening landmark account of how humans evolved, offering a paradigm shift in our thinking about what the female body is, how it came to be, and how this evolution still shapes all our lives today`,
      image: '../../assets/all books/eve-history.jpg', price: 250, quandity: 1
    },
    {
      id: 32, title: `The Nutmeg Curse`, author: 'Amitav Ghosh', type: 'history',
      dessc: `In this ambitious successor to The Great Derangement, acclaimed writer Amitav Ghosh finds the origins of our contemporary climate crisis in Western colonialism’s violent exploitation of human life and the natural environment.`,
      image: '../../assets/all books/amitav ghosh-history.jpg', price: 950, quandity: 1
    },
    {
      id: 33, title: `The Nutmeg's Curse`, author: 'Amitav Ghosh', type: 'history',
      dessc: `In this ambitious successor to The Great Derangement, acclaimed writer Amitav Ghosh finds the origins of our contemporary climate crisis in Western colonialism’s violent exploitation of human life and the natural environment.`,
      image: '../../assets/all books/amitav ghosh-history.jpg', price: 950, quandity: 1
    },
    {
      id: 34, title: `Emperor of Rome`, author: 'Mary Beard', type: 'history',
      dessc: `A sweeping account of the social and political world of the Roman emperors by “the world’s most famous classicist” ( Guardian ). In her international bestseller SPQR , Mary Beard told the thousand-year story of ancient Rome. Now she shines her spotlight on the emperors who ruled the Roman empire, from Julius Caesar (assassinated 44 BCE) to Alexander Severus (assassinated 235 CE).`,
      image: '../../assets/all books/eperor of rome-history.jpg', price: 2621, quandity: 1
    },
    {
      id: 35, title: `Behind the Door`, author: 'Amy Price', type: 'history',
      dessc: `The disturbing true story of the notorious Cecil Hotel in downtown LA, by its general manager for a decade and star of the controversial Netflix documentary series  Crime The Vanishing at the Cecil Hotel`,
      image: '../../assets/all books/behind-door-history.jpg', price: 1121, quandity: 1
    },
    {
      id: 36, title: `Surely You Can't Be Serious`, author: 'David Zucker', type: 'history',
      dessc: `Surely You Can't Be Serious is an in-depth and hysterical look at the making of 1980's comedy classic Airplane! by the legendary writers and directors of the hit film.`,
      image: '../../assets/all books/airplae-history.jpg', price: 1121, quandity: 1
    },
    {
      id: 37, title: `Silk Route `, author: 'David Zucker', type: 'history',
      dessc: `Surely You Can't Be Serious is an in-depth and hysterical look at the making of 1980's comedy classic Airplane! by the legendary writers and directors of the hit film.`,
      image: '../../assets/all books/silk-route-original-history.webp', price: 1351, quandity: 1
    },
    {
      id: 38, title: `Keralacharithra Silpikal`, author: 'David Zucker', type: 'history',
      dessc: `Surely You Can't Be Serious is an in-depth and hysterical look at the making of 1980's comedy classic Airplane! by the legendary writers and directors of the hit film.`,
      image: '../../assets/all books/keralacharithra-silpikal-history.webp', price: 2411, quandity: 1
    },
    {
      id: 39, title: `Chinayileyum Bhutanileyum Nadodikathakal `, author: 'David Zucker', type: 'history',
      dessc: `Surely You Can't Be Serious is an in-depth and hysterical look at the making of 1980's comedy classic Airplane! by the legendary writers and directors of the hit film.`,
      image: '../../assets/all books/chinayileyum-bhutanileyum-history.webp', price: 1551, quandity: 1
    },


  ]

  //Product functions
  getProducts() {
    return this.http.get('http://localhost:3000/api/users/products');
  }
  fleteringProductsAction(productCategory: string): Observable<object> {
    return this.http.get(`http://localhost:3000/api/users/${productCategory}/category`);
  }
  viewProducts(id: string, prdctSrvctype?: string) {
    return this.http.get(`http://localhost:3000/api/users/products_Id/${id}`);
  }
  CartFunction(productId?: string) {
    const userId: string = localStorage.getItem('userId');
    const prdctId = { productId: productId }
    return this.http.post(`http://localhost:3000/api/users/${userId}/cart`, prdctId).subscribe((res: CartResponseModel) => {
      if (res.message === 'Product is already present in the cart') {
        this.toast.info(res.message);
      } else {
        this.toast.success(res.message);
      }
      this.totalPrice = res.totalPrice;

    }, (err) => {
      console.log(err);
      this.toast.warning('Something went wrong');
    });
  }
  fetchCartProducts() {
    const userId: string = localStorage.getItem('userId');
    return this.http.get(`http://localhost:3000/api/users/${userId}/cart`);

  }
  quandityIncr(productId: ObjectId) {
    const userId: string = localStorage.getItem('userId');
    return this.http.get(`http://localhost:3000/api/users/${userId}/increment`)
  }
  deleteCartProducts(productId: string, userId: string) {
    const prdctId = { productId: productId }
    return this.http.post(`http://localhost:3000/api/users/${userId}/deletecart`, prdctId)
  }
  paymentSection():Observable<object> {
    return this.http.get('http://localhost:3000/api/users/65a1065d66be826823822295/payment')
  }

}
