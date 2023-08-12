"use client";

import { Button, Input, TextAreaInput } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { IoCallSharp, IoMailSharp } from "react-icons/io5";

export default function Contact() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-16">
      <main className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-950 text-4xl font-bold">Get in touch</h1>
          <h2 className="text-gray-600 font-medium">
            We’d love to answer any questions or inquiries to help you in your
            investment journey
          </h2>
        </div>
        <Form />
      </main>
      <aside className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-950 text-4xl font-bold">
            Or reach us directly
          </h1>
          <h2 className="text-gray-600 font-medium">
            Feel free to contact us yourself by:
          </h2>
        </div>
        <ul className="flex flex-col gap-1">
          {[
            { icon: IoCallSharp, text: "+905338811865" },
            { icon: IoMailSharp, text: "coolGuy@yolked.com" },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-3">
              <item.icon color="rgba(55, 65, 81, 1)" size={18} />
              <span className="text-gray-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function Form() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="email"
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Please enter a valid email",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              fieldLabel={"Email"}
              required
              error={error?.message}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            pattern: {
              value:
                /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,5}?\)?[-.\s]?)?\d{1,5}[-.\s]?\d{1,9}$/g,
              message: "Please enter a valid phone number",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              fieldLabel="Phone Number"
              error={error?.message}
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextAreaInput
              {...field}
              fieldLabel={"Message"}
              required
              error={error?.message}
            />
          )}
        />
      </div>
      <Button className="self-start">Send Message</Button>
    </form>
  );
}
