import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Provider, Contract, Account } from 'starknet';
import axios from 'axios';

@Injectable()
export class Web3Service {
  logger = new Logger(Web3Service.name);

  getProvider(rpc: string) {
    const provider = new Provider({ nodeUrl: rpc });
    return provider;
  }

  async getContractInstance(
    abi: any,
    contractAddress: string,
    rpc: string,
  ): Promise<Contract> {
    const provider = this.getProvider(rpc);
    const contractInstance = new Contract(abi, contractAddress, provider);
    return contractInstance;
  }

  getAccountInstance(address: string, privateKey: string, rpc: string) {
    const provider = this.getProvider(rpc);
    const accountInstance = new Account(provider, address, privateKey);
    return accountInstance;
  }

  async getBlockTime(rpc: string, blockNumber: number) {
    try {
      const provider = this.getProvider(rpc);
      const block = await provider.getBlock(blockNumber);
      return block.timestamp * 1e3;
    } catch (error) {
      throw new HttpException('Fetch failed', HttpStatus.BAD_GATEWAY);
    }
  }

  async getBlockNumber(rpc: string) {
    try {
      const provider = this.getProvider(rpc);
      const block = await provider.getBlockNumber();
      return block;
    } catch (error) {
      throw new HttpException('Fetch failed', HttpStatus.BAD_GATEWAY);
    }
  }

  async getTransaction(rpc: string, hash: string) {
    try {
      const req = await axios.post(rpc, {
        jsonrpc: '2.0',
        id: 67,
        method: 'starknet_getTransactionReceipt',
        params: [hash],
      });
      return req.data;
    } catch (error) {
      throw new HttpException('Fetch failed', HttpStatus.BAD_GATEWAY);
    }
  }
}
