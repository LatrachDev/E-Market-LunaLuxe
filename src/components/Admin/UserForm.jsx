import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().oneOf(["user", "seller", "admin"]).required(),
//    password: { type: String },
});

export default function UserForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("fullname")} placeholder="Nom" />
      {errors.name && <p>{errors.fullname.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <select {...register("role")}>
        <option value="user">User</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>
      {errors.role && <p>{errors.role.message}</p>}

      <button type="submit">Enregistrer</button>
    </form>
  );
}
