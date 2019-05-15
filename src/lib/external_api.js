import { TESTNET, EXPLORER } from "../constants";

const getSubdomainForFnodata = isTestnet => (isTestnet ? TESTNET : EXPLORER);

const fnodataURL = isTestnet =>
  `https://${getSubdomainForFnodata(isTestnet)}.fnodata.org/api`;

export const fnoddataBlockHeightURL = isTestnet =>
  `${fnodataURL(isTestnet)}/block/best/height`;

const fnodataAddressURL = (isTestnet, address) =>
  `${fnodataURL(isTestnet)}/address/${address}/raw`;
const FAUCET_URL = "https://faucet.fonero.org/requestfaucet";

const POST = (path, params, method = "POST") => {
  let formBody = [];
  for (const key in params) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(params[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(path, {
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    method,
    body: formBody
  }).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  });
};

const getRawTransactions = url => {
  return fetch(url).then(r => {
    // work around when transactions are not paid and fnodata api returns Unprocessable Entity
    if (r.statusText === "Unprocessable Entity") {
      return null;
    }
    return r.json();
  });
};

const addressFromTestnet = addr => addr[0] === "T";

export const getHeightByFnodata = isTestnet =>
  getRawTransactions(fnoddataBlockHeightURL(isTestnet));

export const getPaymentsByAddressFnodata = address => {
  const isTestnet = addressFromTestnet(address);
  return getRawTransactions(fnodataAddressURL(isTestnet, address));
};

export const payWithFaucet = (address, amount) => {
  const data = {
    address,
    amount,
    json: true
  };

  return POST(FAUCET_URL, data);
};
