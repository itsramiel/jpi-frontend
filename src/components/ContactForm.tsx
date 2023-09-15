"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";

import { Button } from "./Button";
import { useSendMessage } from "./ContactForm/hooks";
import { isEmail, isPhoneNumber } from "./ContactForm/utils";
import { AlertMessage, Input, TextAreaInput } from "./ContactForm/components";

export const ContactForm = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { state, sendMessage } = useSendMessage();
  const t = useTranslations();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      contactInfo: "",
      message: "",
    },
  });

  return (
    <>
      <form
        className="flex flex-col gap-8 max-w-sm"
        onSubmit={handleSubmit((args) => {
          sendMessage(args, () => {
            dialogRef.current?.showModal();
            reset();
          });
        })}
      >
        <div className="flex flex-col gap-2 ">
          <Controller
            name="contactInfo"
            control={control}
            rules={{
              required: t("conatct.form.inputs.errors.required"),
              validate: (contactInfo) => {
                if (!isEmail(contactInfo) && !isPhoneNumber(contactInfo)) {
                  return t("conatct.form.inputs.errors.invalidContact");
                }
                return true;
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                fieldLabel={t("conatct.form.inputs.labels.contactInfo")}
                required
                error={error?.message}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            rules={{
              required: t("conatct.form.inputs.errors.required"),
            }}
            render={({ field, fieldState: { error } }) => (
              <TextAreaInput
                {...field}
                fieldLabel={t("conatct.form.inputs.labels.message")}
                required
                error={error?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          {state === "error" ? (
            <AlertMessage>{t("labels.errorOccured")}</AlertMessage>
          ) : null}
          <Button className="self-start" loading={state === "loading"}>
            {t("conatct.form.submitBtn")}
          </Button>
        </div>
      </form>
      <dialog
        ref={dialogRef}
        className="rounded-lg border border-gray-300 overflow-hidden backdrop:bg-gray-950/40"
      >
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 p-4 md:p-5 lg:p-6 items-center">
          <div className="p-3 rounded-full bg-green-600/20 border border-green-600/60">
            <IoCheckmarkSharp color="#16A34A" size={24} />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-950 text-xl md:text-2xl lg:3xl font-semibold">
              {t("conatct.dialog.header")}
            </p>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium">
              {t("conatct.dialog.message")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end p-2 md:p-3 lg:p-4 bg-gray-50 border-t border-t-gray-300">
          <Button size="sm" onClick={() => dialogRef.current?.close()}>
            {t("labels.close")}
          </Button>
        </div>
      </dialog>
    </>
  );
};
