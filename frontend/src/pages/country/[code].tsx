import GetCountry from "@/components/GetCountry";
import { useRouter } from "next/router";

function Country() {
  const router = useRouter();

  return (
    <div>
      <GetCountry code={router.query.code as string} />
    </div>
  )
}

export default Country;