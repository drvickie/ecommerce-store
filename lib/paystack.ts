export function generateReference() {
  return `PS_${Date.now()}_${Math.floor(Math.random() * 1000000)}`
}
