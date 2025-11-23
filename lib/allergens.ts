export const ALLERGENS: { [key: string]: string } = {
  "1": "Obilniny obsahujúce lepok",
  "2": "Kôrovce a výrobky z nich",
  "3": "Vajcia a výrobky z nich",
  "4": "Ryby a výrobky z nich",
  "5": "Arašidy a výrobky z nich",
  "6": "Sójové zrná a výrobky z nich",
  "7": "Mlieko a výrobky z neho",
  "8": "Orechy",
  "9": "Zeler a výrobky z neho",
  "10": "Horčica a výrobky z nej",
  "11": "Sezamové semená a výrobky z nich",
  "12": "Oxid siričitý a siričitany",
  "13": "Vlčí bôb a výrobky z neho",
  "14": "Mäkkýše a výrobky z nich"
};

export function getAllergenNames(allergenIds: string[]): string[] {
  return allergenIds.map(id => ALLERGENS[id] || id);
}
