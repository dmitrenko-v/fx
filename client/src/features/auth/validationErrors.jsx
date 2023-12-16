import { ErrorMessage } from "@hookform/error-message";
export const errorMessages = (errors, field) => {
  return (
    <ErrorMessage
      errors={errors}
      name={field}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p className="field-error-message" key={type}>
            {message}
          </p>
        ))
      }
    />
  );
};
