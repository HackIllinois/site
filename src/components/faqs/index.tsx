import React, { useState } from 'react';

 import BALLOON_DURING from 'assets/home/faqs/balloon_during.svg'
 import BALLOON_AFTER from 'assets/home/faqs/balloon_after.svg'
 import BALLOON_BEFORE from 'assets/home/faqs/balloon_before.svg'

 import faqs from './faqs';

 import styles from './styles.module.scss';

 const FAQs: React.FC = () => {
   const [faqSectionIndex, setFaqSectionIndex] = useState(0);
   const balloonStates = [BALLOON_DURING, BALLOON_BEFORE, BALLOON_AFTER];

   return (
     <section className={styles.faq}>
       <div className={styles.faqContainer}>
         <div className={styles.faqContainerItem1}>
           <img className={styles.balloons} src={balloonStates[faqSectionIndex]} alt=""/>
           <div className={styles.duringBalloon} onClick={() => setFaqSectionIndex(0)}/>
           <div className={styles.beforeBalloon} onClick={() => setFaqSectionIndex(1)}/>
           <div className={styles.afterBalloon} onClick={() => setFaqSectionIndex(2)}/>
         </div>
         <div className={styles.faqContainerItem2}>
           <div className={styles.faqContent}>
             {faqs[faqSectionIndex].sectionFaqs.map(({ question, answer }, i) => (
             <div key={i} className={styles.faqContentColumn}>
               <h3>{question}</h3>
               {answer}
             </div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 };

 export default FAQs;