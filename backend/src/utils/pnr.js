const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generatePNR() {
  let code = ''
  for (let i = 0; i < 6; i += 1) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return code
}
