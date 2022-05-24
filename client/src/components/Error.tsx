type ErrorProps = {
  errorMessage?: string;
};

const Error = ({
  errorMessage = "Could not find employees.",
}: ErrorProps): JSX.Element => <h2 className="fetch-error">{errorMessage}</h2>;

export default Error;
