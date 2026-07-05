"use client";
import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Stack, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function About() {
  const router = useRouter();

  return (
    <Box sx={{ py: 4, maxWidth: '800px', mx: 'auto' }}>
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

      <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: '#ef4444', height: '140px' }} />
        <CardContent sx={{ position: 'relative', pt: 0, px: 4, pb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '-60px', mb: 2 }}>
            <Avatar 
              sx={{ width: 120, height: 120, border: '4px solid white', bgcolor: '#3b82f6', fontSize: '2rem', fontWeight: 'bold' }}
            >
              PK
            </Avatar>
          </Box>

          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#111827' }}>
            ข้อมูลผู้พัฒนา (Developer Profile)
          </Typography>

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', pb: 1.5 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: '600' }}>ชื่อ-นามสกุล:</Typography>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: '700' }}>[สิงหราช แสงหิรัญ]</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', pb: 1.5 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: '600' }}>รหัสนักศึกษา:</Typography>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: '700' }}>[673450202-3]</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', pb: 1.5 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: '600' }}>สาขาวิชา:</Typography>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: '700' }}>[cis]</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1.5 }}>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: '600' }}>มหาวิทยาลัย:</Typography>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: '700' }}>[วิทยาเขตหนองคาย]</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}