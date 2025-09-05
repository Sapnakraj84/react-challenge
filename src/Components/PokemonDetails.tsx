import { usePokemonDetails } from "Service/pokemonService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
} from '@mui/material';
import { IPokemonAbility } from "Interface/pokemonModel";

export const PokemonDetails = ({handleBackClick, pokemonName, pokemonUrl}: {handleBackClick: () => void; pokemonName: string; pokemonUrl: string}) => {
  
  const { data, isLoading, isError, error } = usePokemonDetails(pokemonUrl);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

 return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Selected Pokemon: <span>{pokemonName}</span>
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#a8cef3' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Ability</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ability Effect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.abilities.map((ability: IPokemonAbility, index: number) => (
              <TableRow
                key={index}
               >
                <TableCell>{ability?.ability?.name}</TableCell>
                <TableCell>{ability?.ability?.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography sx={{ mt: 2 }}>
        <Link href="#" onClick={handleBackClick} color="primary" underline="hover">
          Back to list view
        </Link>
      </Typography>
    </div>
  );
};
