"use client";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    // เปลี่ยนสีแดงให้ดูโมเดิร์นขึ้น (Crimson Red) และลบเงา
    <AppBar position="sticky" sx={{ backgroundColor: '#dc2626', boxShadow: 'none', borderBottom: '1px solid #e5e7eb' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Pokédex Ultimate
        </Typography>
        {/* จัดกลุ่มปุ่มให้อยู่ทางขวา */}
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} href="/" sx={{ color: 'white', fontWeight: '500' }}>Home</Button>
            <Button color="inherit" component={Link} href="/about" sx={{ color: 'white', fontWeight: '500' }}>About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}