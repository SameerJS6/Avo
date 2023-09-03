import { useAuth } from "../context/AuthContext";

type Props = {};

export default function Toast({}: Props) {
  const {
    showAlert: { type, message },
  } = useAuth();
  return (
    <div className="toast z-10 toast-top toast-end">
      <div
        className={`${
          type === "error"
            ? "bg-red-600 text-error-content"
            : "bg-success text-success-content"
        } alert alert-info capitalize z-10`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
