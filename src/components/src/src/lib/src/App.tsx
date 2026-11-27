import { ActivitySection } from "./components/ActivitySection";
import { translations } from "./lib/i18n";

export default function App() {
  return (
    <main>
      <ActivitySection
        t={translations}
        isRtl={false}
      />
    </main>
  );
}
