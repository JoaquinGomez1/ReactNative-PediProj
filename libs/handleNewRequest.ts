import { BASE_URL } from "../constants/Common";

interface handleNewRequestParams {
  setIsLoading?: React.Dispatch<boolean>;
  setState?: React.Dispatch<any>;
  url: string;
  fetchOptions?: any; // TODO: Get type of option object
}

const handleNewRequest = async ({
  setIsLoading,
  setState,
  url,
  fetchOptions,
}: handleNewRequestParams) => {
  setIsLoading && setIsLoading(true);
  const FETCH_URL = BASE_URL + url;
  const req = fetchOptions
    ? await fetch(FETCH_URL, fetchOptions)
    : await fetch(FETCH_URL);
  try {
    const res = await req.json();

    if (req.status === 200) setState && setState(res);
    else alert(`Algo salio mal al hacer la peticion a: ${FETCH_URL}`);
  } catch (err) {
    alert(`Algo salió mal.  ${err}`);
  }

  setIsLoading && setIsLoading(false);
};

export default handleNewRequest;
