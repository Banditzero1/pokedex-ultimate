"use client";
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function About() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
      <Card sx={{ maxWidth: 650, width: '100%', p: 4, borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #e5e7eb' }}>
        <CardContent>
          <Typography variant="h3" gutterBottom fontWeight="extrabold" align="center" sx={{ color: '#111827' }}>
            Pokedex Ultimate
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: '#6b7280', mb: 5 }}>Version 1.0.0</Typography>
          
          <Box mt={3} mb={5} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <Typography variant="body1"><strong>Developer:</strong> [สิงหราช แสงหิรัญ]</Typography>
            <Typography variant="body1"><strong>Student ID:</strong> [673450202-3]</Typography>
            <Typography variant="body1"><strong>Course:</strong> [Front-end Web Programming]</Typography>
            <Typography variant="body1"><strong>Program:</strong> [visual studio]</Typography>
            <Typography variant="body1" sx={{ gridColumn: 'span 2' }}><strong>University:</strong> [วิทยาเขตหนองคาย]</Typography>
          </Box>

          <Box textAlign="center">
            <Button 
              variant="contained" 
              startIcon={<GitHubIcon />}
              href="https://github.com/your-username/pokedex-ultimate" 
              target="_blank"
              sx={{ 
                  backgroundColor: '#dc2626', // สีแดงโมเดิร์น
                  fontWeight: '600',
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderRadius: '999px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  '&:hover': { backgroundColor: '#b91c1c' }
              }}
            >
              View Source Code on GitHub
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}