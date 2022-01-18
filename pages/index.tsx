import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

const inputStyle: string = "w-96 py-4 my-4 block  px-2 rounded";

type Contacts = {
  name: string;
  email: string;
};

const Home: NextPage = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contacts>();
  const onSubmit = (data: Contacts) => {
    setContacts((contacts) => contacts.concat(data));

    console.log(contacts);
    reset();
  };

  return (
    <main className="flex h-screen w-full flex-col lg:flex-row">
      <div className="h-max w-full  bg-gray-800 p-4 lg:w-max lg:h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl text-white">Add a Contact</h1>
          <input
            type="text"
            placeholder="name"
            className={inputStyle}
            {...register("name")}
          />
          <input
            type="text"
            placeholder="email"
            className={inputStyle}
            {...register("email")}
          />
          <button
            type="submit"
            className="w-full bg-blue-700 py-4 text-white text-xl rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="p-4 flex flex-col w-full">
        {contacts.reverse().map((contact) => {
          return (
            <div
              key={contact.name}
              className="rounded border-solid border border-gray-300 my-1 w-full p-2"
            >
              <p>
                <span>Name:</span> {contact.name}
              </p>
              <p>
                <span>Email:</span> {contact.email}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
