import React from 'react';

 const faqs = [
   {
     sectionTitle: 'General',
     sectionFaqs: [
      {
        question: 'How do I participate?',
        answer: [
          <p key={0}>You must apply in order to participate in HackIllinois. The application deadline has been extended to <b>Wednesday, February 15th at 11:59 PM CST.</b> Admissions will be based on a weighted lottery, and applying early will increase your chances of admission. Decisions will be released shortly after both application deadlines, and if you’re accepted, there will be a limited time to RSVP before we reallocate your spot to another student.</p>,
        ],
     },
     {
      question: 'How can I stay updated with what is going on at the event?',
      answer: [
        <p key={0}>Please download the HackIllinois app (available shortly before the event on the App Store and Play Store)! Our website will also be continually updated with new information throughout the year. We will also be sending out reminders for various workshops and events through our mobile apps and Discord.</p>,
      ],
    },
    {
      question: 'Who can register',
      answer: [
        <p key={0}>Anyone 18 years or older and enrolled in a high school, college, or university (or left school during the current school year) can register!</p>,
      ],
    },
       {
          question: 'When and where is HackIllinois?',
          answer: [
            <p key={0}>HackIllinois will be held in-person from February 24-26th on UIUC campus.</p>,
          ],
       },
       {
         question: 'How do I get to the University of Illinois?',
         answer: [
           <p key={0}>HackIllinois will be providing a bus for students traveling from West Lafayette. If you are a University of Illinois student, please walk or utilize the MTD bus system.</p>,
         ],
       },

       {
         question: 'Do I need to have a programming background to participate?',
         answer: [
           <p key={0}>No! People of all skill levels are welcomed.</p>,
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

 export default faqs;
