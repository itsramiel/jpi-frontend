"use client";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

import { isEmail, isPhoneNumber } from "./ContactForm/utils";

import { Button, Input, TextAreaInput } from "./ContactForm/components";
import { useSendMessage } from "./ContactForm/hooks";

export const ContactForm = () => {
  const { isLoading, sendMessage } = useSendMessage();
  const t = useTranslations("conatct.form");
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      contactInfo: "",
      message: "",
    },
  });

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((args) => {
        sendMessage(
          args,
          () => {
            reset();
          },
          () => {
            console.log("failed");
          }
        );
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
      <Button className="self-start" loading={isLoading}>
        {t("submitBtn")}
      </Button>
    </form>
  );
};
