import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CountryInput } from "@/types";
import { useAddCountryMutation, useGetContinentsQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

function AddCountry() {
  const router = useRouter();
  const { data, loading } = useGetContinentsQuery();
  const [addCountry] = useAddCountryMutation();
  const schema = yup.object({
    name: yup.string().max(50).required('Name is required'),
    emoji: yup.string().max(4).required('Emoji is required'),
    code: yup.string().max(3).required('Code is required'),
    continent: yup.object().shape({
      id: yup.number().required('Continent ID is required')
    }).required('Continent is required')
  });

  const { register, formState: { errors }, handleSubmit } = useForm<CountryInput>({resolver: yupResolver(schema)})

  const onSubmit = (data: CountryInput) => {
    console.log(data)
    addCountry({ variables: { data }}).then((r) => {
      console.log('reload')
      router.reload();
    });
  }

  if(loading) {
    return <div>Chargement en cours...</div>
  }

  return (
    <div className="add-country">
      <p>Add country :</p>
      <form className="form-country" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name"/>
        <p>{errors.name?.message}</p>
        <input {...register("emoji")} placeholder="Emoji"/>
        <p>{errors.emoji?.message}</p>
        <input {...register("code")} placeholder="Code"/>
        <p>{errors.code?.message}</p>
        <select {...register("continent.id")}>
          {data?.continents.map((c) => {
            return <option key={c.id} value={c.id}>{c.name}</option>
          })}
        </select>
        <button type="submit" >Add</button>
      </form>
    </div>
  );
}

export default AddCountry;