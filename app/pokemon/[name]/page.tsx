"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Typography, Button, Grid, Card, CardMedia, Chip, CircularProgress, Stack, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ฟังก์ชันกำหนดสีประเภทโปเกม่อนที่ละเอียดขึ้น
const getTypeColor = (type: string) => {
    switch (type) {
        case 'fire': return '#f97316'; // ส้ม
        case 'water': return '#3b82f6'; // ฟ้า
        case 'grass': return '#22c55e'; // เขียว
        case 'electric': return '#eab308'; // เหลือง
        case 'poison': return '#a855f7'; // ม่วง
        default: return '#6b7280'; // เทา
    }
}

// ฟังก์ชันกำหนดสีแถบสถานะ (Stats Bar)
const getStatColor = (statName: string) => {
    switch (statName) {
        case 'hp': return '#4ade80'; // เขียว HP
        case 'attack': return '#f87171'; // แดง Attack
        case 'defense': return '#60a5fa'; // ฟ้า Defense
        default: return '#9ca3af'; // เทา
    }
}

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const name = params.name;
  
  const [pokemon, setPokemon] = useState<any>(null);
  const [evolution, setEvolution] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(pokeRes.data);

        const speciesRes = await axios.get(pokeRes.data.species.url);
        const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
        
        let evoChain: string[] = [];
        let evoData = evoRes.data.chain;
        do {
          evoChain.push(evoData.species.name);
          evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        
        setEvolution(evoChain);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [name]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="70vh"><CircularProgress color="primary" /></Box>;
  if (!pokemon) return <Typography align="center" variant="h5" sx={{ color: '#6b7280', mt: 10 }}>Pokemon details not found.</Typography>;

  const primaryType = pokemon.types[0]?.type.name;
  const heroBgColor = getTypeColor(primaryType);

  return (
    <Box>
      <Button 
        variant="outlined" 
        onClick={() => router.back()} 
        startIcon={<ArrowBackIcon />}
        sx={{ 
            mb: 4, 
            color: '#374151', 
            borderColor: '#e5e7eb', 
            fontWeight: '600',
            textTransform: 'none',
            borderRadius: '999px',
            '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' }
        }}
      >
        Back to Pokedex
      </Button>

      {/* Hero Section */}
      <Box sx={{ 
          backgroundColor: heroBgColor, 
          borderRadius: '24px', 
          p: { xs: 4, md: 8 }, 
          mb: 6, 
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px'
      }}>
          <Typography variant="h1" fontWeight="extrabold" sx={{ 
              position: 'absolute', 
              color: 'white', 
              opacity: 0.08, 
              fontSize: { xs: '6rem', md: '10rem' },
              textTransform: 'uppercase',
              userSelect: 'none',
              zIndex: 0
          }}>
              {pokemon.name}
          </Typography>

          <CardMedia
            component="img"
            image={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            sx={{ 
                width: { xs: '200px', md: '300px' }, 
                height: 'auto',
                position: 'relative', 
                zIndex: 1, 
                filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))'
            }}
          />
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" textTransform="capitalize" fontWeight="bold" sx={{ color: '#111827' }}>
            {pokemon.name}
          </Typography>
          
          <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
            {pokemon.types.map((t: any) => {
              const typeColor = getTypeColor(t.type.name);
              return (
              <Chip 
                key={t.type.name} 
                label={t.type.name} 
                sx={{ 
                    textTransform: 'capitalize', 
                    backgroundColor: typeColor, 
                    color: 'white', 
                    fontWeight: '600',
                    px: 1
                }} 
              />
              );
            })}
          </Stack>
          
          <Box mt={4} textAlign="center" sx={{ backgroundColor: 'white', p: 3, borderRadius: '16px', border: '1px solid #e5e7eb' }}>
             <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#374151' }}>Pokemon Cry</Typography>
             <audio controls src={pokemon.cries?.latest}>
                Your browser does not support the audio element.
             </audio>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Base Stats */}
          <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#111827' }}>Base Stats</Typography>
            <Stack spacing={2.5} sx={{ mt: 3 }}>
                {pokemon.stats.map((s: any) => {
                  const statColor = getStatColor(s.stat.name);
                  const progressValue = (s.base_stat / 255) * 100;
                  return (
                  <Box key={s.stat.name}>
                    <Typography variant="body1" textTransform="capitalize" sx={{ color: '#374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '500' }}>{s.stat.name}</span>
                      <strong style={{ fontSize: '1.1rem', color: '#111827' }}>{s.base_stat}</strong>
                    </Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={progressValue} 
                        sx={{ 
                            height: '10px', 
                            borderRadius: '5px', 
                            mt: 1, 
                            backgroundColor: '#f3f4f6', 
                            '.MuiLinearProgress-bar': { backgroundColor: statColor }
                        }} 
                    />
                  </Box>
                  );
                })}
            </Stack>
          </Box>

          {/* Evolution */}
          <Box mt={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#111827' }}>Evolution Line</Typography>
            <Box display="flex" gap={2} mt={2} flexWrap="wrap" sx={{ backgroundColor: 'white', p: 3, borderRadius: '16px', border: '1px solid #e5e7eb' }}>
              {evolution.map((evoName) => (
                <Chip 
                  key={evoName} 
                  label={evoName} 
                  color={evoName === name ? "primary" : "default"} 
                  onClick={() => router.push(`/pokemon/${evoName}`)}
                  sx={{ 
                    textTransform: 'capitalize', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    border: evoName === name ? `2px solid #dc2626` : 'none'
                  }}
                  variant={evoName === name ? "outlined" : "filled"}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}