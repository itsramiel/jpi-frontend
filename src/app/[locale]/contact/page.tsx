"use client";

import { Button, Input, TextAreaInput } from "@/components";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { IoCallSharp, IoMailSharp } from "react-icons/io5";

export default function Contact() {
  const t = useTranslations("conatct");

  return (
    <div className="flex flex-col lg:flex-row gap-8 my-16">
      <main className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-950 text-4xl font-bold">
            {t("form.title")}
          </h1>
          <h2 className="text-gray-600 font-medium">{t("form.description")}</h2>
        </div>
        <Form />
      </main>
      <aside className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-950 text-4xl font-bold">
            {t("ourContacts.title")}
          </h1>
          <h2 className="text-gray-600 font-medium">
            {t("ourContacts.description")}
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
  const t = useTranslations("conatct.form");
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
      onSubmit={handleSubmit(() => {
        // add logic to send message once we found how we'll do that
      })}
    >
      <div className="flex flex-col gap-2 max-w-sm">
        <Controller
          name="email"
          control={control}
          rules={{
            required: t("inputs.errors.required"),
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: t("inputs.errors.invalidEmail"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              fieldLabel={t("inputs.labels.email")}
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
              message: t("inputs.errors.invalidPhoneNumber"),
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              fieldLabel={t("inputs.labels.phoneNumber")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          rules={{
            required: t("inputs.errors.required"),
          }}
          render={({ field, fieldState: { error } }) => (
            <TextAreaInput
              {...field}
              fieldLabel={t("inputs.labels.message")}
              required
              error={error?.message}
            />
          )}
        />
      </div>
      <Button className="self-start">{t("submitBtn")}</Button>
    </form>
  );
}
