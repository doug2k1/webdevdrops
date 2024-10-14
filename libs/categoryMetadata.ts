export const categoryMetadata: Record<
  string,
  { colors: { bg: string; text: string } }
> = {
  Aprendizado: { colors: { bg: 'bg-red-500', text: 'text-white' } },
  'Full Stack': { colors: { bg: 'bg-indigo-500', text: 'text-white' } },
  JavaScript: { colors: { bg: 'bg-yellow-300', text: 'text-black' } },
  'Node.js': { colors: { bg: 'bg-green-600', text: 'text-white' } },
  React: { colors: { bg: 'bg-blue-500', text: 'text-white' } },
  fallback: { colors: { bg: 'bg-gray-800', text: 'text-white' } },
}
