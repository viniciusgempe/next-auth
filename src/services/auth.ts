import { v4 } from "uuid";

export type SignRequestType = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signRequest(data: SignRequestType) {
  await delay();
  return {
    token: v4(),
    user: {
      name: "John Doe",
      email: "vinicius@gempe.dev",
      avartar_url: "https://github.com/viniciusgempe.png",
    },
  };
}

export async function recoverUser() {
  await delay();
  return {
      name: "John Doe",
      email: "vinicius@gempe.dev",
      avartar_url: "https://github.com/viniciusgempe.png",
  };
}
