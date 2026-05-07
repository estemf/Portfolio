"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight, Check, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "sent" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(data: { name: string; email: string; message: string }): FieldErrors {
    const e: FieldErrors = {};
    if (data.name.trim().length < 2) e.name = t("validation.name_min");
    if (!validateEmail(data.email)) e.email = t("validation.email_invalid");
    if (data.message.trim().length < 10) e.message = t("validation.message_min");
    else if (data.message.trim().length > 5000) e.message = t("validation.message_max");
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const fieldErrors = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const disabled = status !== "idle";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label={t("name")}
          name="name"
          disabled={disabled}
          error={errors.name}
          onChange={() => errors.name && setErrors((p) => ({ ...p, name: undefined }))}
        />
        <Field
          label={t("email")}
          name="email"
          type="email"
          disabled={disabled}
          error={errors.email}
          onChange={() => errors.email && setErrors((p) => ({ ...p, email: undefined }))}
        />
      </div>
      <Field
        label={t("message")}
        name="message"
        textarea
        disabled={disabled}
        error={errors.message}
        onChange={() => errors.message && setErrors((p) => ({ ...p, message: undefined }))}
      />

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {t("error")}
        </p>
      )}

      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        disabled={disabled}
        className="btn-primary self-start disabled:opacity-60 cursor-pointer"
      >
        {status === "sent" ? (
          <>{t("sent")} <Check className="w-4 h-4" /></>
        ) : status === "loading" ? (
          t("sending")
        ) : (
          <>{t("send")} <ArrowUpRight className="w-4 h-4" /></>
        )}
      </motion.button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  disabled = false,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: () => void;
}) {
  const baseClass = `bg-surface border rounded-2xl px-4 py-3 text-base focus:outline-none transition-colors font-sans disabled:opacity-50 ${
    error
      ? "border-red-500 focus:border-red-500"
      : "border-border-strong/40 focus:border-accent"
  }`;

  return (
    <label className="flex flex-col gap-2 group">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-focus-within:text-accent transition-colors">
        / {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          disabled={disabled}
          rows={6}
          onChange={onChange}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          disabled={disabled}
          onChange={onChange}
          className={`${baseClass} rounded-full px-5`}
        />
      )}
      {error && (
        <span className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </span>
      )}
    </label>
  );
}
