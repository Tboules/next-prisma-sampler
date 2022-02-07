import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Contact, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const inputStyle: string = "lg:w-96 py-4 my-4 block  px-2 rounded w-full";

const saveContact = async (contact: Prisma.ContactCreateInput) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const Home = ({ initialContacts }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contact>();
  const onSubmit = async (data: Contact) => {
    const res: Contact = await saveContact(data);
    console.log(res);
    setContacts((contacts) => contacts.concat(res));
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
            {...register("fullName")}
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
        {contacts?.map((contact) => {
          return (
            <div
              key={contact.id}
              className="rounded border-solid border border-gray-300 my-1 w-full p-2"
            >
              <p>
                <span>Name:</span> {contact.fullName}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const contacts = await prisma.contact.findMany();

  const props: Props = {
    initialContacts: contacts,
  };

  return {
    props,
  };
};

export default Home;

type Props = {
  initialContacts: Contact[];
};
