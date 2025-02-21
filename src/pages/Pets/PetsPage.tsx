import { PetCard } from "../../components/PetCard"

const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function PetsPage() {
    return (
        <div>
            {cards.map(() => (
                <PetCard 
                        imageUrl="https://get.wallhere.com/photo/cat-whiskers-look-mammal-vertebrate-cat-like-mammal-small-to-medium-sized-cats-tabby-cat-domestic-short-haired-cat-bengal-european-shorthair-pixie-bob-american-shorthair-muzzle-toyger-lying-on-the-floor-629260.jpg"
                        nameCardInfo="Пушок"
                        attitudeTowardsPeople="Хорошее"
                        ageInfo="1 год 6 месяцев"
                        attitudeTowardsAnimals="Боится"
                        isVactinated={false}
                        telephoneNumber="+79163883351"></PetCard>
            ))}
        </div>
    )
}