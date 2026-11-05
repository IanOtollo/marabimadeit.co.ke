"use client";

export function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("mmi-open-consent"))}
      className="hover:text-primary"
    >
      Cookie settings
    </button>
  );
}
