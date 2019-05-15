import fetchMock from "fetch-mock";
import * as ea from "../external_api";
import {
  assertGETOnRouteIsCalled,
  assertPOSTOnRouteIsCalled
} from "./support/helpers";
describe("test external api lib (lib/api.js)", () => {
  const FAKE_TESTNET_ADDRESS = "T_fake_address";
  const FAKE_MAINNET_ADDRESS = "M_fake_address";
  const fnodataTestnetUrl = "https://testnet.fonero.org/api";
  const fnodataExplorerUrl = "https://explorer.fonero.org/api";
  const faucetUrl = "https://faucet.fonero.org/requestfaucet";

  test("get height from fnod data", async () => {
    await assertGETOnRouteIsCalled(
      `${fnodataTestnetUrl}/block/best/height`,
      ea.getHeightByFnodata,
      [true]
    );
    // console.log(fetchMock.spy());
    await assertGETOnRouteIsCalled(
      `${fnodataExplorerUrl}/block/best/height`,
      ea.getHeightByFnodata,
      [false]
    );
  });

  test("get payment by address from fno data", async () => {
    fetchMock.restore();
    await assertGETOnRouteIsCalled(
      `${fnodataTestnetUrl}/address/${FAKE_TESTNET_ADDRESS}/raw`,
      ea.getPaymentsByAddressFnodata,
      [FAKE_TESTNET_ADDRESS]
    );
    await assertGETOnRouteIsCalled(
      `${fnodataExplorerUrl}/address/${FAKE_MAINNET_ADDRESS}/raw`,
      ea.getPaymentsByAddressFnodata,
      [FAKE_MAINNET_ADDRESS]
    );
  });

  test("pay with faucet", async () => {
    await assertPOSTOnRouteIsCalled(faucetUrl, ea.payWithFaucet, [
      FAKE_TESTNET_ADDRESS,
      10
    ]);
  });
});
