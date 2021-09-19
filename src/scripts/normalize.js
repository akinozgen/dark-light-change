export default function normalize(min, max) {
   const delta = max - min;
   return val => ( (val < min? min: (val > max? max : val)) - min ) / delta;
}
