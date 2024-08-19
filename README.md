# Flex Marketplace Public API
The Flex Marketplace Public API is designed to provide essential details and functionalities related to NFTs on the Starknet blockchain. This API enables users to access detailed information about individual NFTs, collections, and related activities stored in our database. It serves as a bridge for developers looking to integrate their applications with the Starknet ecosystem, enabling seamless access to NFT data and interactions.

## Packages
The repository is structured as follows:
* `api-service`: Manage the services, controllers, and modules of the APIs.
* `shared`: Contains shared code used by multiple services.
* `web3-service`: Contains code for querying on-chain data from the blockchain, used by multiple services.

## API Endpoints
The following is a list of available API endpoints. Detailed documentation, including request and response structures, can be found in this documentation:
* Documentation: [API Docs](https://docs.hyperflex.wiki/)

### NFT

| Method |  Endpoint  | Description |
|:-----:|:------:|:------------:|
|**GET**|`/nfts/get-nfts`| Retrieve a list of NFTs. |
|**GET**|`/nfts/get-nft`| Retrieve detail of a specific NFT. |
|**GET**|`/nfts/get-holders` | Retrieve a list of holders for a specific NFT collection. |
|**GET**|`/nfts/get-owner-balance`| Retrieve a list of NFTs owned by a specific owner. |

### Activity

| Method |  Endpoint  | Description |
|:-----:|:------:|:------------:|
|**GET**| `/activities` | Retrieve a list of activities for a specific NFT. |

### NFT Collection

| Method |  Endpoint  | Description |
|:-----:|:------:|:------------:|
|**GET**|`/nft-collection/get-collections`|Retrieve a list of NFT collections.|
|**GET**|`/nft-collection/get-collection`|Retrieve detail of a specific NFT collection.|

## Technologies Used
The Flex Marketplace Public API is built using the following technologies:
* **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
* **MongoDB**: A NoSQL database for storing NFT data and related metadata.
* **Starknet.js**: A JavaScript library for interacting with the Starknet blockchain.
* **RESTful API**: The API is designed following RESTful principles, providing predictable and resource-oriented endpoints.

## License
Flex Marketplace Public API is open-source software licensed under the [MIT](https://github.com/Flex-NFT-Marketplace/Flex-Marketplace-Public-API)
