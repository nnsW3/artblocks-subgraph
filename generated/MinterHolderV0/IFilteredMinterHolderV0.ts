// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AllowedHoldersOfProjects extends ethereum.Event {
  get params(): AllowedHoldersOfProjects__Params {
    return new AllowedHoldersOfProjects__Params(this);
  }
}

export class AllowedHoldersOfProjects__Params {
  _event: AllowedHoldersOfProjects;

  constructor(event: AllowedHoldersOfProjects) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _ownedNFTAddresses(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }

  get _ownedNFTProjectIds(): Array<BigInt> {
    return this._event.parameters[2].value.toBigIntArray();
  }
}

export class PricePerTokenInWeiUpdated extends ethereum.Event {
  get params(): PricePerTokenInWeiUpdated__Params {
    return new PricePerTokenInWeiUpdated__Params(this);
  }
}

export class PricePerTokenInWeiUpdated__Params {
  _event: PricePerTokenInWeiUpdated;

  constructor(event: PricePerTokenInWeiUpdated) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _pricePerTokenInWei(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ProjectCurrencyInfoUpdated extends ethereum.Event {
  get params(): ProjectCurrencyInfoUpdated__Params {
    return new ProjectCurrencyInfoUpdated__Params(this);
  }
}

export class ProjectCurrencyInfoUpdated__Params {
  _event: ProjectCurrencyInfoUpdated;

  constructor(event: ProjectCurrencyInfoUpdated) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _currencyAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _currencySymbol(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class PurchaseToDisabledUpdated extends ethereum.Event {
  get params(): PurchaseToDisabledUpdated__Params {
    return new PurchaseToDisabledUpdated__Params(this);
  }
}

export class PurchaseToDisabledUpdated__Params {
  _event: PurchaseToDisabledUpdated;

  constructor(event: PurchaseToDisabledUpdated) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _purchaseToDisabled(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class RegisteredNFTAddress extends ethereum.Event {
  get params(): RegisteredNFTAddress__Params {
    return new RegisteredNFTAddress__Params(this);
  }
}

export class RegisteredNFTAddress__Params {
  _event: RegisteredNFTAddress;

  constructor(event: RegisteredNFTAddress) {
    this._event = event;
  }

  get _NFTAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RemovedHoldersOfProjects extends ethereum.Event {
  get params(): RemovedHoldersOfProjects__Params {
    return new RemovedHoldersOfProjects__Params(this);
  }
}

export class RemovedHoldersOfProjects__Params {
  _event: RemovedHoldersOfProjects;

  constructor(event: RemovedHoldersOfProjects) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _ownedNFTAddresses(): Array<Address> {
    return this._event.parameters[1].value.toAddressArray();
  }

  get _ownedNFTProjectIds(): Array<BigInt> {
    return this._event.parameters[2].value.toBigIntArray();
  }
}

export class UnregisteredNFTAddress extends ethereum.Event {
  get params(): UnregisteredNFTAddress__Params {
    return new UnregisteredNFTAddress__Params(this);
  }
}

export class UnregisteredNFTAddress__Params {
  _event: UnregisteredNFTAddress;

  constructor(event: UnregisteredNFTAddress) {
    this._event = event;
  }

  get _NFTAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class IFilteredMinterHolderV0__getPriceInfoResult {
  value0: boolean;
  value1: BigInt;
  value2: string;
  value3: Address;

  constructor(
    value0: boolean,
    value1: BigInt,
    value2: string,
    value3: Address
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    return map;
  }

  getIsConfigured(): boolean {
    return this.value0;
  }

  getTokenPriceInWei(): BigInt {
    return this.value1;
  }

  getCurrencySymbol(): string {
    return this.value2;
  }

  getCurrencyAddress(): Address {
    return this.value3;
  }
}

export class IFilteredMinterHolderV0 extends ethereum.SmartContract {
  static bind(address: Address): IFilteredMinterHolderV0 {
    return new IFilteredMinterHolderV0("IFilteredMinterHolderV0", address);
  }

  genArt721CoreAddress(): Address {
    let result = super.call(
      "genArt721CoreAddress",
      "genArt721CoreAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_genArt721CoreAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "genArt721CoreAddress",
      "genArt721CoreAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPriceInfo(
    _projectId: BigInt
  ): IFilteredMinterHolderV0__getPriceInfoResult {
    let result = super.call(
      "getPriceInfo",
      "getPriceInfo(uint256):(bool,uint256,string,address)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return new IFilteredMinterHolderV0__getPriceInfoResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toString(),
      result[3].toAddress()
    );
  }

  try_getPriceInfo(
    _projectId: BigInt
  ): ethereum.CallResult<IFilteredMinterHolderV0__getPriceInfoResult> {
    let result = super.tryCall(
      "getPriceInfo",
      "getPriceInfo(uint256):(bool,uint256,string,address)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new IFilteredMinterHolderV0__getPriceInfoResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toString(),
        value[3].toAddress()
      )
    );
  }

  minterFilterAddress(): Address {
    let result = super.call(
      "minterFilterAddress",
      "minterFilterAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_minterFilterAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "minterFilterAddress",
      "minterFilterAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  minterType(): string {
    let result = super.call("minterType", "minterType():(string)", []);

    return result[0].toString();
  }

  try_minterType(): ethereum.CallResult<string> {
    let result = super.tryCall("minterType", "minterType():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class GenArt721CoreAddressCall extends ethereum.Call {
  get inputs(): GenArt721CoreAddressCall__Inputs {
    return new GenArt721CoreAddressCall__Inputs(this);
  }

  get outputs(): GenArt721CoreAddressCall__Outputs {
    return new GenArt721CoreAddressCall__Outputs(this);
  }
}

export class GenArt721CoreAddressCall__Inputs {
  _call: GenArt721CoreAddressCall;

  constructor(call: GenArt721CoreAddressCall) {
    this._call = call;
  }
}

export class GenArt721CoreAddressCall__Outputs {
  _call: GenArt721CoreAddressCall;

  constructor(call: GenArt721CoreAddressCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class MinterFilterAddressCall extends ethereum.Call {
  get inputs(): MinterFilterAddressCall__Inputs {
    return new MinterFilterAddressCall__Inputs(this);
  }

  get outputs(): MinterFilterAddressCall__Outputs {
    return new MinterFilterAddressCall__Outputs(this);
  }
}

export class MinterFilterAddressCall__Inputs {
  _call: MinterFilterAddressCall;

  constructor(call: MinterFilterAddressCall) {
    this._call = call;
  }
}

export class MinterFilterAddressCall__Outputs {
  _call: MinterFilterAddressCall;

  constructor(call: MinterFilterAddressCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class PurchaseCall extends ethereum.Call {
  get inputs(): PurchaseCall__Inputs {
    return new PurchaseCall__Inputs(this);
  }

  get outputs(): PurchaseCall__Outputs {
    return new PurchaseCall__Outputs(this);
  }
}

export class PurchaseCall__Inputs {
  _call: PurchaseCall;

  constructor(call: PurchaseCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _ownedNftAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _ownedNftTokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class PurchaseCall__Outputs {
  _call: PurchaseCall;

  constructor(call: PurchaseCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class Purchase1Call extends ethereum.Call {
  get inputs(): Purchase1Call__Inputs {
    return new Purchase1Call__Inputs(this);
  }

  get outputs(): Purchase1Call__Outputs {
    return new Purchase1Call__Outputs(this);
  }
}

export class Purchase1Call__Inputs {
  _call: Purchase1Call;

  constructor(call: Purchase1Call) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class Purchase1Call__Outputs {
  _call: Purchase1Call;

  constructor(call: Purchase1Call) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class PurchaseToCall extends ethereum.Call {
  get inputs(): PurchaseToCall__Inputs {
    return new PurchaseToCall__Inputs(this);
  }

  get outputs(): PurchaseToCall__Outputs {
    return new PurchaseToCall__Outputs(this);
  }
}

export class PurchaseToCall__Inputs {
  _call: PurchaseToCall;

  constructor(call: PurchaseToCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _projectId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class PurchaseToCall__Outputs {
  _call: PurchaseToCall;

  constructor(call: PurchaseToCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class PurchaseTo1Call extends ethereum.Call {
  get inputs(): PurchaseTo1Call__Inputs {
    return new PurchaseTo1Call__Inputs(this);
  }

  get outputs(): PurchaseTo1Call__Outputs {
    return new PurchaseTo1Call__Outputs(this);
  }
}

export class PurchaseTo1Call__Inputs {
  _call: PurchaseTo1Call;

  constructor(call: PurchaseTo1Call) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _projectId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _ownedNftAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _ownedNftTokenId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class PurchaseTo1Call__Outputs {
  _call: PurchaseTo1Call;

  constructor(call: PurchaseTo1Call) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetProjectMaxInvocationsCall extends ethereum.Call {
  get inputs(): SetProjectMaxInvocationsCall__Inputs {
    return new SetProjectMaxInvocationsCall__Inputs(this);
  }

  get outputs(): SetProjectMaxInvocationsCall__Outputs {
    return new SetProjectMaxInvocationsCall__Outputs(this);
  }
}

export class SetProjectMaxInvocationsCall__Inputs {
  _call: SetProjectMaxInvocationsCall;

  constructor(call: SetProjectMaxInvocationsCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProjectMaxInvocationsCall__Outputs {
  _call: SetProjectMaxInvocationsCall;

  constructor(call: SetProjectMaxInvocationsCall) {
    this._call = call;
  }
}

export class TogglePurchaseToDisabledCall extends ethereum.Call {
  get inputs(): TogglePurchaseToDisabledCall__Inputs {
    return new TogglePurchaseToDisabledCall__Inputs(this);
  }

  get outputs(): TogglePurchaseToDisabledCall__Outputs {
    return new TogglePurchaseToDisabledCall__Outputs(this);
  }
}

export class TogglePurchaseToDisabledCall__Inputs {
  _call: TogglePurchaseToDisabledCall;

  constructor(call: TogglePurchaseToDisabledCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class TogglePurchaseToDisabledCall__Outputs {
  _call: TogglePurchaseToDisabledCall;

  constructor(call: TogglePurchaseToDisabledCall) {
    this._call = call;
  }
}