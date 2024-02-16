import styles from './page.module.scss';
const Prizes = () => {
    return ( <div>
        <p className={styles.title}>
            Prizes
        </p>
        <div className={styles.body}>
            <div className={styles.cat}>
                <img src='/prizes/cat.svg' />
            </div>
            <div className={styles.content}>
                <div className={styles.cupboard}>
                    Hello testing
                </div>
            </div>
        </div>
    </div>  );
}
 
export default Prizes;