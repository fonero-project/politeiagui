import React from "react";
import Markdown from "./snew/Markdown";
import modalConnector from "../connectors/modal";
import PaywallAlert from "./Paywall/PaywallAlert";
import UserBadge from "./UserBadge";

const aboutText = `
# About Politeia

Fonero is an autonomous digital currency. With a hybrid consensus system,
it is built to be a decentralized, sustainable, and self-ruling currency
where stakeholders make the rules.

Politeia (Pi) is a censorship-resistant blockchain-anchored public proposal
system, which empowers users to submit their own projects for self-funding
from FNO's block subsidy. Pi ensures the ecosystem remains sustainable and
thrives.

[Learn More about Politeia](https://docs.fonero.org/governance/politeia/politeia/)
`;

const resourcesText = `
## Resources

 * [Website](https://fonero.org/) & [Blog](https://blog.fonero.org/)
 * [Politeia blog post](https://blog.fonero.org/2017/10/25/Politeia/)
 * [Fonero Constitution](https://docs.fonero.org/getting-started/constitution/)
 * [Whitepaper/Technical Brief (pdf)](https://fonero.org/dtb001.pdf)
 * [Documentation](https://docs.fonero.org/)
 * [Getting Started](https://fonero.org/#guide)
 * [Source Code on Github](https://github.com/fonero-project/)
 * [Network Status](https://stats.fonero.org/) & [Block Explorer](https://mainnet.fonero.org/)
 * [Voting Status](https://voting.fonero.org/)
 * [Downloads Overview](https://fonero.org/downloads/)
`;

const SidebarText = props => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <UserBadge />
    <PaywallAlert />
    <Markdown
      body={aboutText}
      filterXss={false}
      confirmWithModal={null}
      displayExternalLikWarning={false}
      {...props}
    />
    <Markdown
      body={resourcesText}
      filterXss={false}
      displayExternalLikWarning={false}
      {...props}
    />
  </div>
);
export default modalConnector(SidebarText);
