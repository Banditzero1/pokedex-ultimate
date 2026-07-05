"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Grid, Card, CardContent, Typography, CardMedia, Pagination, Skeleton, Box, Stack, Chip } from '@mui/material';

// ฟังก์ชันสำหรับกำหนดสีพื้นหลังของการ์ดโปเกม่อนตามประเภทหลัก
const getTypeCardColor = (type: string) => {
    switch (type) {
        case 'fire': return '#fee2e2'; // สีแดงอ่อน
        case 'water': return '#e0f2fe'; // สีฟ้าอ่อน
        case 'grass': return '#d1fae5'; // สีเขียวอ่อน
        case 'electric': return '#fef9c3'; // สีเหลืองอ่อน
        case 'poison': return '#f5e1ff'; // สีม่วงอ่อน
        default: return '#f3f4f6'; // สีเทาอ่อน (ค่าเริ่มต้น)
    }
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20;
  const totalPages = Math.ceil(1351 / limit); 

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        
        const detailedData = await Promise.all(
          response.data.results.map(async (poke: any) => {
            const pokeDetail = await axios.get(poke.url);
            return pokeDetail.data;
          })
        );
        setPokemonList(detailedData);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
      setLoading(false);
    };

    fetchPokemon();
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" align="left" sx={{ color: '#111827', mb: 5 }}>
        Pokedex Ultimate
      </Typography>
      
      <Box display="flex" justifyContent="center" mb={6}>
        <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: '999px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{ '.MuiPaginationItem-root': { fontWeight: '500' } }} />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(20)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
                  <Skeleton variant="rectangular" height={240} animation="wave" />
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" height={40} width="80%" animation="wave" />
                    <Skeleton variant="text" height={24} width="40%" animation="wave" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : pokemonList.map((pokemon) => {
              const primaryType = pokemon.types[0]?.type.name;
              const cardBgColor = getTypeCardColor(primaryType);

              return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ 
                      borderRadius: '16px', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      transition: '0.3s ease-in-out',
                      border: `2px solid transparent`,
                      '&:hover': { 
                          transform: 'translateY(-5px)', 
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                          borderColor: '#dc2626',
                      } 
                  }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={pokemon.sprites.other['official-artwork'].front_default}
                      alt={pokemon.name}
                      sx={{ 
                          objectFit: 'contain', 
                          p: 4, 
                          backgroundColor: cardBgColor,
                          transition: 'background-color 0.3s ease',
                      }}
                    />
                    <CardContent sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
                      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: '500' }}>
                        #{pokemon.id.toString().padStart(3, '0')}
                      </Typography>
                      <Typography variant="h6" align="left" textTransform="capitalize" color="#111827" fontWeight="bold" sx={{ mt: 0.5 }}>
                        {pokemon.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                        {pokemon.types.map((t: any) => (
                           <Chip 
                            key={t.type.name} 
                            label={t.type.name} 
                            size="small"
                            sx={{ 
                                textTransform: 'capitalize', 
                                backgroundColor: '#fee2e2', 
                                color: '#991b1b', 
                                fontWeight: '600',
                            }} 
                           />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              );
          })}
      </Grid>
    </Box>
  );
}