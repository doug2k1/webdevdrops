import { MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md'

const MAX_RATING = 5

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 1,
})

interface Props {
  rating: number
}

export function RatingStars({ rating }: Props) {
  const fullStars = Math.floor(rating)
  const fractional = rating - fullStars
  let nextStar = <MdStarHalf />

  if (fractional < 0.25) {
    nextStar = <MdStarBorder />
  } else if (fractional > 0.75) {
    nextStar = <MdStar />
  }

  const emptyStars = Math.max(0, Math.floor(MAX_RATING - fullStars - 1))

  return (
    <span className="inline-flex items-center text-lg text-yellow-600">
      <span className="pr-1 text-sm font-bold text-yellow-600">
        {numberFormatter.format(rating)}
      </span>
      {Array.from(Array(fullStars).keys()).map((e, i) => (
        <MdStar key={i} />
      ))}

      {nextStar}

      {Array.from(Array(emptyStars).keys()).map((e, i) => (
        <MdStarBorder key={i} />
      ))}
    </span>
  )
}
