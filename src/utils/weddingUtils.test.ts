import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanWhatsappNumber,
  generateAdminWhatsappRsvpUrl,
  calculateTimeRemaining,
  formatIndonesianDate,
  THEME_CONFIGS,
} from './weddingUtils';

test('cleanWhatsappNumber converts Indonesian phone formats', () => {
  assert.equal(cleanWhatsappNumber('081234567890'), '6281234567890');
  assert.equal(cleanWhatsappNumber('+62 812-3456-7890'), '6281234567890');
  assert.equal(cleanWhatsappNumber('81234567890'), '6281234567890');
});

test('generateAdminWhatsappRsvpUrl encodes message correctly', () => {
  const url = generateAdminWhatsappRsvpUrl(
    '081234567890',
    'Budi Santoso',
    'hadir',
    2,
    'Selamat menempuh hidup baru!',
    'Dewi',
    'Rangga'
  );

  assert.ok(url.startsWith('https://wa.me/6281234567890?text='));
  assert.ok(url.includes(encodeURIComponent('Budi Santoso')));
  assert.ok(url.includes(encodeURIComponent('2 Orang')));
  assert.ok(url.includes(encodeURIComponent('Rangga & Dewi')));
});

test('calculateTimeRemaining returns remaining units for future date', () => {
  const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();
  const res = calculateTimeRemaining(futureDate);
  assert.equal(res.isPast, false);
  assert.ok(res.days >= 1);
});

test('calculateTimeRemaining marks past date correctly', () => {
  const pastDate = new Date(Date.now() - 1000 * 60).toISOString();
  const res = calculateTimeRemaining(pastDate);
  assert.equal(res.isPast, true);
  assert.equal(res.days, 0);
  assert.equal(res.hours, 0);
});

test('formatIndonesianDate formats correctly', () => {
  const formatted = formatIndonesianDate('2026-11-28');
  assert.ok(formatted.includes('November') || formatted.includes('2026'));
});

test('THEME_CONFIGS contains all 5 required cultural and modern themes', () => {
  assert.ok(THEME_CONFIGS.jawa);
  assert.ok(THEME_CONFIGS.sunda);
  assert.ok(THEME_CONFIGS.minang);
  assert.ok(THEME_CONFIGS.casual);
  assert.ok(THEME_CONFIGS.islamic);
  assert.equal(THEME_CONFIGS.jawa.attireColors.groomBeskap, '#1c1917');
  assert.equal(THEME_CONFIGS.sunda.attireColors.brideDress, '#ffffff');
});
