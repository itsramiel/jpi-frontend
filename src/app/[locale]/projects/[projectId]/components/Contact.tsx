"use client";
import { Button, Input, TextAreaInput } from "@/components";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

export function Contact() {
  const t = useTranslations("conatct.form");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  return (
    <div className="flex flex-col gap-2 lg:items-center sticky top-4">
      <p className="text-gray-950 text-3xl font-semibold">{t("title")}</p>
      <form
        className="flex flex-col gap-8 lg:items-center"
        onSubmit={handleSubmit(() => {
          // add logic to send message once we found how we'll do that
        })}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
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
                <div className="sm: flex-1">
                  <Input
                    {...field}
                    fieldLabel={t("inputs.labels.email")}
                    required
                    error={error?.message}
                  />
                </div>
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
                <div className="sm:flex-1">
                  <Input
                    {...field}
                    fieldLabel={t("inputs.labels.phoneNumber")}
                    error={error?.message}
                  />
                </div>
              )}
            />
          </div>
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
        <Button className="max-w-md">{t("submitBtn")}</Button>
      </form>
    </div>
  );
}
