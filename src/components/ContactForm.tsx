"use client";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

import { isEmail, isPhoneNumber } from "./ContactForm/utils";

import {
  AlertMessage,
  Button,
  Input,
  TextAreaInput,
} from "./ContactForm/components";
import { useSendMessage } from "./ContactForm/hooks";
import { useRef } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

export const ContactForm = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { state, sendMessage } = useSendMessage();
  const t = useTranslations("conatct.form");
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
        <div className="flex flex-col gap-4">
          {state === "error" ? (
            <AlertMessage>
              An error occured. Please try again later.
            </AlertMessage>
          ) : null}
          <Button className="self-start" loading={state === "loading"}>
            {t("submitBtn")}
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
              Message received
            </p>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium">
              We will get back to you as soon as possible
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end p-2 md:p-3 lg:p-4 bg-gray-50 border-t border-t-gray-300">
          <Button size="sm" onClick={() => dialogRef.current?.close()}>
            close
          </Button>
        </div>
      </dialog>
    </>
  );
};
