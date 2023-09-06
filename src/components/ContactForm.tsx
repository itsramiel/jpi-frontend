"use client";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

import { isEmail, isPhoneNumber } from "./ContactForm/utils";

import { Button, Input, TextAreaInput } from "./ContactForm/components";

export const ContactForm = () => {
  const t = useTranslations("conatct.form");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      contactInfo: "",
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
          name="contactInfo"
          control={control}
          rules={{
            required: t("inputs.errors.required"),
            validate: (contactInfo) => {
              if (!isEmail(contactInfo) && !isPhoneNumber(contactInfo)) {
                return t("inputs.errors.invalidContact");
              }
              return true;
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              fieldLabel={t("inputs.labels.contactInfo")}
              required
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
};
