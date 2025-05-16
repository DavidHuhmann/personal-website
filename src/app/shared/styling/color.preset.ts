import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const ColorPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#02A237',
      100: '#059E38',
      200: '#089B39',
      300: '#0B983A',
      400: '#0F953B',
      500: '#12913C',
      600: '#158E3D',
      700: '#188B3F',
      800: '#1C8740',
      900: '#1F8441',
      950: '#228142',
    },
  },
});
