import HomeEduSection from "@/components/home-edu-section";
import Hero from "./_components/hero";
import Categories from "@/data/categories.json";

export default function Home() {
  console.log(Categories);
  
  return (
    <>
      <Hero />

      {Categories.map((category, index) => (
          <HomeEduSection categoryIndex={index} reverse={category.reverse} categoryTitle={category.title} educations={category.educations} key={category.id} />
        )
      )}


    </>
  );
}