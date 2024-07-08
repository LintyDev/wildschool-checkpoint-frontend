import { useGetCountryByCodeLazyQuery } from "@/graphql/generated/schema";
import { useEffect } from "react";

function GetCountry({ code }: { code: string }) {
  const [getCountry, { loading, data }] = useGetCountryByCodeLazyQuery();

  useEffect(() => {
    if (code) {
      getCountry({ variables: { code } });
      console.log(data);
    }
  }, [code, data]);

  return (
    <div className="country">
      <p className="country-flag-big">{data?.country.emoji}</p>
      <p>{data?.country.name}</p>
      <p>{data?.country.continent?.name}</p>
    </div>
  )
}

export default GetCountry;