// export function addCommas(x: number): string {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }

export function addCommas(x: number): string {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'INR'
  }).format(x);
}
