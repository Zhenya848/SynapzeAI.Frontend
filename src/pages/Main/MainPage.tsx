
import { FilterBlock } from "../../components/FilterBlocks/FilterBlock";
import { ImageWithTextCard } from "../../components/ImageWithTextCard";

export function MainPage() {
  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div style={{alignItems: "flex-start",  display: 'flex', justifyContent: "left"}}> 
      <FilterBlock />

      <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: 'left', margin: '20px' }} >
        {cards.map((card, index) => (
          <ImageWithTextCard 
            key={index}
            imageUrl={"https://get.wallhere.com/photo/cat-whiskers-look-mammal-vertebrate-cat-like-mammal-small-to-medium-sized-cats-tabby-cat-domestic-short-haired-cat-bengal-european-shorthair-pixie-bob-american-shorthair-muzzle-toyger-lying-on-the-floor-629260.jpg"} 
            title={"Кот"} 
            description={"Это кот"} 
          />
        ))}

      </div>
    </div>
  );
}
      
