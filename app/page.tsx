"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, Typography, CardMedia, Pagination, Skeleton, Box, Stack, Chip } from '@mui/material';

// ฟังก์ชันสำหรับกำหนดสีพื้นหลังของการ์ดโปเกม่อนตามประเภทหลัก
const getTypeCardColor = (type: string) => {
    switch (type) {
        case 'fire': return '#fee2e2';
        case 'water': return '#e0f2fe';
        case 'grass': return '#d1fae5';
        case 'electric': return '#fef9c3';
        case 'poison': return '#f5e1ff';
        default: return '#f3f4f6';
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
      <Typography variant="h3" align="left" sx={{ fontWeight: 'bold', color: '#111827', mb: 5 }}>
        Pokedex Ultimate
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: '999px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{ '.MuiPaginationItem-root': { fontWeight: '500' } }} />
        </Box>
      </Box>

      {/* เปลี่ยนจาก Grid เป็น Box CSS Grid เพื่อความเสถียร 100% */}
      <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, 
          gap: 4 
      }}>
        {loading
          ? Array.from(new Array(20)).map((_, index) => (
              <Card key={index} sx={{ borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
                <Skeleton variant="rectangular" height={240} animation="wave" />
                <CardContent sx={{ p: 3 }}>
                  <Skeleton variant="text" height={40} width="80%" animation="wave" />
                  <Skeleton variant="text" height={24} width="40%" animation="wave" sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            ))
          : pokemonList.map((pokemon) => {
              const primaryType = pokemon.types[0]?.type.name;
              const cardBgColor = getTypeCardColor(primaryType);

              return (
                <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ 
                      borderRadius: '16px', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      transition: '0.3s ease-in-out',
                      border: `2px solid transparent`,
                      height: '100%',
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
                      <Typography variant="h6" align="left" sx={{ textTransform: 'capitalize', color: '#111827', fontWeight: 'bold', mt: 0.5 }}>
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
              );
          })}
      </Box>
    </Box>
  );
}