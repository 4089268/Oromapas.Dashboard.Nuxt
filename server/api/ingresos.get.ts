import type { Ingreso } from '~/types/dashboard'

export default defineEventHandler((): Ingreso[] => {
  return [
    { id: '1', mes: 'Jun 2024', anio: 2024, total: 1_245_800, categorias: { tarifas: 1_100_000, reconexiones: 85_000, multas: 60_800 } },
    { id: '2', mes: 'Jul 2024', anio: 2024, total: 1_318_400, categorias: { tarifas: 1_180_000, reconexiones: 78_000, multas: 60_400 } },
    { id: '3', mes: 'Ago 2024', anio: 2024, total: 1_289_200, categorias: { tarifas: 1_150_000, reconexiones: 82_000, multas: 57_200 } },
    { id: '4', mes: 'Sep 2024', anio: 2024, total: 1_356_600, categorias: { tarifas: 1_220_000, reconexiones: 76_000, multas: 60_600 } },
    { id: '5', mes: 'Oct 2024', anio: 2024, total: 1_401_000, categorias: { tarifas: 1_265_000, reconexiones: 89_000, multas: 47_000 } },
    { id: '6', mes: 'Nov 2024', anio: 2024, total: 1_378_500, categorias: { tarifas: 1_240_000, reconexiones: 83_000, multas: 55_500 } },
    { id: '7', mes: 'Dic 2024', anio: 2024, total: 1_512_300, categorias: { tarifas: 1_370_000, reconexiones: 91_000, multas: 51_300 } },
    { id: '8', mes: 'Ene 2025', anio: 2025, total: 1_234_700, categorias: { tarifas: 1_090_000, reconexiones: 87_000, multas: 57_700 } },
    { id: '9', mes: 'Feb 2025', anio: 2025, total: 1_298_100, categorias: { tarifas: 1_155_000, reconexiones: 84_000, multas: 59_100 } },
    { id: '10', mes: 'Mar 2025', anio: 2025, total: 1_367_400, categorias: { tarifas: 1_225_000, reconexiones: 88_000, multas: 54_400 } },
    { id: '11', mes: 'Abr 2025', anio: 2025, total: 1_412_900, categorias: { tarifas: 1_275_000, reconexiones: 79_000, multas: 58_900 } },
    { id: '12', mes: 'May 2025', anio: 2025, total: 1_487_600, categorias: { tarifas: 1_320_000, reconexiones: 92_000, multas: 75_600 } }
  ]
})
