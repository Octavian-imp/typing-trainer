import ResultTyping from "./components/modules/resultTypings/ResultTyping";
import TypingForm from "./components/modules/typingForm/TypingForm";
import UiHeader from "./components/ui/header/UiHeader";
import styles from "./App.module.scss";
function App() {
  return (
    <div className={styles.app}>
      <UiHeader />
      <TypingForm />
      <ResultTyping />
    </div>
  );
}

export default App;
