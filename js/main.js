const herajs = require('@herajs/client');
const crypto = require('@herajs/crypto');

// Given 
const aergoClient = new herajs.AergoClient();
const aergoContract = herajs.Contract;
const contractAddress = 'AmhWbcQ6ZNsMbM1q7CLwGSXehj95Ci7MLU1HMK19DHoc7uKEew5y';
const encodeType = 'base58';

// pki
const fromAddress = 'AmPvtHGaHamygf7XDdVTcVBt7TYeTJMDnaA4xU8JWodFtfAZVwod';
const fromPrivateKey = '47adcpYS6CKn7HfS89PcjGCy3h3jmkPaFWZ1wUzPFtMaSDFRyPQTDz5w4FvzS8AzxSMtJhyhQ';
const identity = crypto.identifyFromPrivateKey(fromPrivateKey);

const main = async () => {
  // smart contract 구조 불러오기
  const abi  = await aergoClient.getABI(contractAddress);
  const contract = aergoContract.fromAbi(abi);
  contract.setAddress(contractAddress);
  contract.loadAbi(abi);

  // 스마트 컨트랙트 실행
  // save는 smartcontract에 예시로 작성함 함수 -> 조회하려는 형태로 변환해서 사용할 것
  const callTx = contract.set(1, '치와와', '여', 3, '서울', '3000', 1).asTransaction({
    //id,
    //breed:breed, sex:sex, age:age, area:area, price:price, owner_id:owner_id,
    from: fromAddress
  });
  const transactionId = await executeContract(callTx);
  console.log(transactionId);

  // 스마트컨트랙트 조회
  // findAll은 smartcontract에 예시로 작성함 함수 -> 조회하려는 형태로 변환해서 사용할 것
  const queryResult = await aergoClient.queryContract(contract.findAll()); 
  console.log(queryResult)
}

// async function executeContract() { ... } 와 동일
const executeContract = async (callTx) => {
  // 트랜잭션 생성 로직
  const transaction = {
    nonce: await aergoClient.getNonce(fromAddress) + 1,
    chainIdHash: await aergoClient.getChainIdHash(encodeType),
    from: callTx.from,
    to: callTx.to.encoded,
    payload: callTx.payload,
    amount: '0',
    sign: '',
    hash: ''
  };

  transaction.sign = await crypto.signTransaction(transaction, identity.keyPair);
  transaction.hash = await crypto.hashTransaction(transaction, encodeType);
  
  // 생성된 트랜잭션 전송
  const transactionId = await aergoClient.sendSignedTransaction(transaction);
  return transactionId;
}

// main 함수 실행
main();