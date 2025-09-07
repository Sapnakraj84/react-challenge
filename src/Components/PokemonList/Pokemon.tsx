import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { usePokemons } from 'Service/pokemonService';
import { IPokemon } from 'Interface/pokemonModel';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PokemonDetails } from 'Components/PokemonDetails/PokemonDetails';
import "./pokemon.css"

const rowsPerPage = 5;

export const PokemonStyledTable = () => {
    const [page, setPage] = React.useState(1);
    const [offset,setOffset] = useState(0);
    const { data, isLoading, isError, error } = usePokemons(rowsPerPage,offset);

    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);
    const [displayData, setdisplayData] = useState<IPokemon[]>([]);
    const pageCount = Math.ceil(data?.count / rowsPerPage);    

    // Update displayData whenever data or page changes
    useEffect(() => {
      if(data){
          setdisplayData(data?.results);
      }

    },[data, page]);

    // handler methods for pagination and back button click
    const handleFirstPageClick = useCallback(() => {
      setPage(1);
      setOffset(0);
    }, []);

    const handleLastPageClick = useCallback(() => {
      setPage(pageCount);
      setOffset((pageCount - 1) * rowsPerPage);
    }, [pageCount]);

    const handleNextPageClick = useCallback(() => {
      setPage((prev) => prev + 1);
      setOffset((prev) => prev + rowsPerPage);
    }, []);

    const handlePrevPageClick = useCallback(() => {
      setPage((prev) => prev - 1);
      setOffset((prev) => prev - rowsPerPage);
    }, []);

    const handleBackClick = () => {
      setSelectedPokemon(null);
    }
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isError) {
        return <div>Error: {(error as Error).message}</div>;
    }
    return (
<>
 {/* Conditional rendering if a pokemon is selected display details otherwise display list */}
      {selectedPokemon?      
       <div>
          <PokemonDetails handleBackClick={handleBackClick} pokemonName={selectedPokemon.name} pokemonUrl={selectedPokemon.url} />        
        </div> : 
        <TableContainer
        component={Paper}
        className="tableContainer"
        >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>
                Pokemon Name
            </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {displayData?.length>0 && displayData.map((pokemon: IPokemon, index:number) => (
            <TableRow
                key={pokemon.id}
                style={{
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                }}
                onClick={() => setSelectedPokemon(pokemon)}
            >
                <TableCell style={{ borderBottom: 'none' }}>{pokemon.name}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>

        {/* Pagination Footer */}
   <Box
  className="pagination-footer"
      >
        {/* Disable button if on first page */}
        <IconButton onClick={handleFirstPageClick} disabled={page === 1}>
          <FirstPageIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handlePrevPageClick} disabled={page === 1}>
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
        
        {/* Display current page and total pages */}
        <Typography variant="body2" style={{ marginLeft: 2 }}>
          Page {page} of {pageCount}
        </Typography>

        {/* Disable button if on last page */}
        <IconButton onClick={handleNextPageClick} disabled={page === pageCount}>
          <NavigateNextIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handleLastPageClick} disabled={page === pageCount}>
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Box>
    </TableContainer>}
</>
    
    );
};

export default PokemonStyledTable;
