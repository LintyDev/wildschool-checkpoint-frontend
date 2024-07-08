import { useGetCountriesQuery } from "@/graphql/generated/schema";
import Link from "next/link";

function ListCountries() {
  const { loading, data } = useGetCountriesQuery({
    fetchPolicy: 'no-cache'
  });

  if (loading) {
    return <div>Chargement des données...</div>
  }
  return (
    <div className="countries">
      {data?.countries.map((c) => {
        return (
          <Link key={c.id} className="countries-card" href={`/country/${c.code}`}>
            <p>{c.name}</p>
            <p className="country-flag">{c.emoji}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default ListCountries;