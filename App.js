import ApplicationStartingPoint from './ApplicationStaringPoint';
import {
  AllQuestionsProvider,
  UserConfigProvider,
  AccessControllProvider,
  SurvayListProvider,
  SurvayLogProvider,
} from './components/context/AllContext';

export default function App() {
  return (
    <UserConfigProvider>
      <AllQuestionsProvider>
        <AccessControllProvider>
          <SurvayListProvider>
            <SurvayLogProvider>
              <ApplicationStartingPoint />
            </SurvayLogProvider>
          </SurvayListProvider>
        </AccessControllProvider>
      </AllQuestionsProvider>
    </UserConfigProvider>
  );
}
