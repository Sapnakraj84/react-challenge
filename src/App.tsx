import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonStyledTable from 'Components/Pokemon';



const App = (): React.ReactNode => {
  return <div>
    <QueryClientProvider client={new QueryClient()}>
      <PokemonStyledTable />
    </QueryClientProvider>
  </div>;
};

export default App;
