import styles from "./UiHeader.module.scss";

const UiHeader = () => {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        Typing trainer
      </a>
    </header>
  );
};

export default UiHeader;
