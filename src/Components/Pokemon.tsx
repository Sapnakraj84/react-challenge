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
import { PokemonDetails } from './PokemonDetails';


const rowsPerPage = 5;

export const PokemonStyledTable = () => {
    const [page, setPage] = React.useState(1);
    const { data, isLoading, isError, error } = usePokemons();

    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);
    const [displayData, setdisplayData] = useState<IPokemon[]>([]);

    // Update displayData whenever data or page changes
    useEffect(() => {
      if(data){
          setdisplayData(data?.results.slice(
                          (page - 1) * rowsPerPage,
                          page * rowsPerPage
                        ));
      }

    },[data, page]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (isError) {
        return <div>Error: {(error as Error).message}</div>;
    }


    // handler methods for pagination and back button click
    const handleFirstPageClick = () => setPage(1);
    const handleLastPageClick = () => setPage(pageCount);
    const handleNextPageClick = () => setPage((prev) => prev + 1);
    const handlePrevPageClick = () => setPage((prev) => prev -1);
    const pageCount = Math.ceil(data?.results.length / rowsPerPage);
    
    const handleBackClick = () => {
      setSelectedPokemon(null);
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
        sx={{
        maxWidth: 400,
        margin: 'auto',
        borderRadius: 0,
        boxShadow: 'none',
        border: '1px solid #ccc',
        }}
    >
        <Table>
        <TableHead>
            <TableRow sx={{ backgroundColor: '#a8cef3' }}>
            <TableCell
                sx={{
                fontWeight: 'bold',
                color: 'black',
                borderBottom: 'none',
                }}
            >
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
                <TableCell sx={{ borderBottom: 'none' }}>{pokemon.name}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>

        {/* Pagination Footer */}
   <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0ecfb',
          padding: 1,
        }}
      >
        {/* Disable button if on first page */}
        <IconButton onClick={handleFirstPageClick} disabled={page === 1}>
          <FirstPageIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handlePrevPageClick} disabled={page === 1}>
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
        
        {/* Display current page and total pages */}
        <Typography variant="body2" sx={{ mx: 2 }}>
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
