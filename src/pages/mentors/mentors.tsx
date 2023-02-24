import React from 'react';
import HACKLOGO from "../../assets/mentors/hacklogo.svg";
import DEERE from "../../assets/prizes/deere.svg";
import BATS from "../../assets/sponsors/bats.svg";
import BLUEHILL from "../../assets/prizes/BlueHill.svg";
import CARDANO from "../../assets/sponsors/Cardano.svg";
import CAT from "../../assets/sponsors/Caterpillar.svg";
import ILLINI from "../../assets/mentors/block_uiuc.svg";

import jaimeC from "../../assets/mentors/headshots/jaime_caso.svg";
import brianC from "../../assets/mentors/headshots/brian_coari.svg";
import adamL from "../../assets/mentors/headshots/adam_letizia.svg";
import adamB from "../../assets/mentors/headshots/adam_brunner.svg";
import jasonK from "../../assets/mentors/headshots/jason_kolberg.svg";
import maxOC from "../../assets/mentors/headshots/max_o_cull.svg";
import ginoPC from "../../assets/mentors/headshots/gino_p_corrales-delgado.svg";
import rohanM from "../../assets/mentors/headshots/rohan_minocha.svg";
import zachP from "../../assets/mentors/headshots/zach_pratt.svg";
import ryanH from "../../assets/mentors/headshots/ryan_huellen.svg";
import adamR from "../../assets/mentors/headshots/adam_rusch.svg";
import joshC from "../../assets/mentors/headshots/joshua_carrington.svg";
import himanshuM from "../../assets/mentors/headshots/himanshu_minocha.svg";
import robertoM from "../../assets/mentors/headshots/roberto_morano.svg";

 const mentors = [
   {
    sectionTitle: 'General',
    mentorData: [
    {
        picture: jaimeC,
        name: 'Jaime Caso',
        bio: [
            <p key={0}>Senior Frontend Develop at Cardano Foundation.
            Cardano Wallet Developer.
            Stake Pool Operator.</p>,
        ],
    },
    {
        picture: brianC,
        name: 'Brian Coari',
        bio: [
          <p key={0}>Profession: Senior Software Engineer. Education: Master's in Data Science. Hobbies: Mensa events, board games.</p>,
        ],
    },
    {
        picture: DEERE,
        name: 'Steve Stone',
        bio: [
          <p key={0}>I've worked at John Deere for over 22 years in software engineering and architecture.  I'm currently a Site Reliability Engineer for John Deere.</p>,
        ],
    },
    {
        picture: DEERE,
        name: 'Damir Temir',
        bio: [
          <p key={0}>Part-Time Software Engineer at John Deere (Observability)</p>,
        ],
    },
    {
        picture: DEERE,
        name: 'Hongshi Guo',
        bio: [
          <p key={0}>Embedded Architect at ISG</p>,
        ],
    },
    {
        picture: DEERE,
        name: 'Adam',
        bio: [
          <p key={0}>Have worked at John Deere doing front end development for 2 years and worked in a couple other companies developing front ends, services, regulatory systems, automated ui tests, and running towards whatever system seems to be on fire for almost a decade..</p>,
        ],
    },
    {
        picture: adamL,
        name: 'Adam Letizia',
        bio: [
          <p key={0}></p>,
        ],
    },
    {
        picture: adamB,
        name: 'Adam Brunner',
        bio: [
          <p key={0}>I am a Principal Software Engineer at John Deere. I am a UIUC 2011 Alumni from Grainger Computer Science. I have been with Deere since graduation.</p>,
        ],
    },
    {
        picture: jasonK,
        name: 'Jason Kolberg',
        bio: [
          <p key={0}>Front end software engineer with John Deere</p>,
        ],
    },
    {
        picture: maxOC,
        name: 'Max O\'Cull',
        bio: [
          <p key={0}>Computer Scientist and Applied Statistician with experience in machine learning, web, Linux, and decentralized embedded systems.</p>,
        ],
    },
    {
        picture: ginoPC,
        name: 'Gino P Corrales',
        bio: [
          <p key={0}>Gino Corrales is an Identity Access Management (IAM) Support Team Lead for Caterpillar Inc. for the last ten years. IAM is part of the Cybersecurity Division and covers the whole Caterpillar corporation worldwide. Gino was always passionate for mobile wearables, security and software development technologies. Prior to joining Caterpillar, Gino was a mobile developer for State Farm at the University of Illinois Research Park and was responsible for leading a group of interns for almost two years. Gino earned a Computer Science degree from ISU and realized studies of Systems Engineering back at his hometown's university - Universidad Catolica de Santa Maria - in Arequipa, Peru.</p>,
        ],
    },
    {
        picture: CAT,
        name: 'Robert Casuso',
        bio: [
          <p key={0}>18 year tenure, at Caterpillar.  I'm in the infosec space.  Specificially in relation to network/border .</p>,
        ],
    },
    {
        picture: CAT,
        name: 'Jing Du',
        bio: [
          <p key={0}>Data Scientist with 5 year experience</p>,
        ],
    },
    {
        picture: rohanM,
        name: 'Rohan Minocha',
        bio: [
          <p key={0}>Co-founder/CTO of BlueHill Payments </p>,
        ],
    },
    {
        picture: zachP,
        name: 'Zach Pratt',
        bio: [
          <p key={0}>I taught myself how to program when I was 13 and it's been both my hobby and my job since I was 18 years old. I love the creative energy of hackathons and bringing ideas to life. Programming is both my hobby and my job. </p>,
        ],
    },
    {
        picture: ryanH,
        name: 'Ryan Huellen',
        bio: [
          <p key={0}>Hi there! My name is Ryan Huellen! I’m a part-time software engineer for John Deere Financial and currently a student over at Iowa State University. I have a passion for developer enablement and during my free time enjoy wakeboarding! </p>,
        ],
    },
    {
        picture: DEERE,
        name: 'Ahmed Sebak',
        bio: [
          <p key={0}> </p>,
        ],
    },
    {
        picture: DEERE,
        name: 'Eduardo Nascimento',
        bio: [
          <p key={0}>I have been working with Embedded Software for 23 years. During this time I also had experience with web software technologies. Today I am working on my Master's Degree in Artificial Intelligence.
          </p>,
        ],
    },
    {
        picture: adamR,
        name: 'Adam Rusch',
        bio: [
          <p key={0}>Teaching Assistant Professor in the School of Information Sciences.  Studies blockchain from a sociotechnical perspective, examining the intersection of users, technology, and information.
          </p>,
        ],
    },
    {
        picture: joshC,
        name: 'Josh Carrington',
        bio: [
          <p key={0}>I'm an Illinois State University grad. Majored in Cybersecurity, Minored in Philosophy. I work as a system admin for Caterpillar.
          </p>,
        ],
    },
    {
        picture: himanshuM,
        name: 'Himanshu Minocha',
        bio: [
          <p key={0}>CEO & Co-Founder @BlueHill Payments Backed by Y Combinator (S22)
          </p>,
        ],
    },
    {
        picture: robertoM,
        name: 'Roberto C. Morano',
        bio: [
          <p key={0}>Roberto C. Morano is a seasoned sysadmin and DevOps advocate with more than 15 years of experience in software engineering. 

          He has been involved in the Cardano community since the Byron era, contributing to projects like Yoroi and pioneering as successful, funded proposer in Cardano Catalyst.
          
          What technical areas are you comfortable mentoring in?: Cardano general knowledge (UTXO model, transactions, metadata, libraries...), specialized on backend services deployment. 
          </p>,
        ],
    },
     
    ],
   },
   {
     sectionTitle: 'Before',
     sectionFaqs: [
       {
         question: 'What should I bring?',
         answer: [
           <p key={0}>You should bring a student ID, reusable water bottle, change of clothing, personal items such as toiletries, laptop, and charger. Due to safety considerations, please do not bring desktop computers, extra monitors, weapons, or alcoholic beverages.</p>,
         ],
       },
       {
         question: 'Is there anything to do other than code?',
         answer: [
           <p key={0}>Absolutely! There will be a bunch of fun mini-events this year, including a Shark Tank competition, keynotes, and opportunities to connect with company representatives. Check out the full schedule when it is posted on our site!</p>,
         ],
       },
       
       {
         question: 'Will there be food?',
         answer: [
           <p key={0}>Snacks, drinks, and all meals will be provided for the entire weekend. If you have a dietary restriction, please make sure to mention it when you register. We’ll have a wide variety of food available throughout the weekend, including vegetarian and vegan options. We will use our mobile apps to make announcements when food arrives.</p>,
         ],
       },
       {
         question: 'Where do I sleep?',
         answer: [
           <p key={0}>HackIllinois won’t be able to provide sleeping rooms, so you must find separate lodging on-campus or off-campus.</p>,
         ],
       },
       
     ],
   },
   {
     sectionTitle: 'During',
     sectionFaqs: [
       {
         question: 'Do I need a team? How do I find one?',
         answer: [
           <p key={0}>No, you are not required to have a team to participate. You are encouraged to work with mentors and other participants in order to get the full experience. If you do have a team, please keep it to a maximum of 4 people.</p>,
         ],
       },
       {
         question: 'Do I have to go to the opening/ending ceremony?',
         answer: [
           <p key={0}>Yes! Swag, prize, and food information will be covered at the opening ceremony. Prizes will be announced at the ending ceremony.</p>,
         ],
       },
       {
         question: 'Can I work on my own projects?',
         answer: [
           <p key={0}>Yes, feel free to work on your own project, people in past years have won creating projects from scratch! However, the benefit of working on a HackIllinois project track is that you get guidance and the opportunity to communicate with experts in the field.</p>,
         ],
       },
       {
        question: 'What facilities, floors, and rooms are available to work in?',
        answer: [
          <p key={0}>Working space will be available in Siebel Computer Science and CIF.</p>,
        ],
      },
      {
        question: 'How can I stay updated during the event?',
        answer: [
          <p key={0}>Please download our mobile apps beforehand and check Discord for notifications!</p>,
        ],
      },
     ],
   },
 ];

 export default mentors;
