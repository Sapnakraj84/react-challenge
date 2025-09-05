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
import "./pokemonDetails.css"

export const PokemonDetails = ({handleBackClick, pokemonName, pokemonUrl}: {handleBackClick: () => void; pokemonName: string; pokemonUrl: string}) => {
  
  const { data, isLoading, isError, error } = usePokemonDetails(pokemonUrl);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

 return (
    <div className="detailsContainer">
      <Typography variant="subtitle1" style={{ marginBottom: 16 }}>
        Selected Pokemon: <span>{pokemonName}</span>
      </Typography>

      <TableContainer >
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 'bold' }}>Ability</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Ability Effect</TableCell>
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

      <Typography className="backLink">
        <Link href="#" onClick={handleBackClick} color="primary" underline="hover">
          Back to list view
        </Link>
      </Typography>
    </div>
  );
};
