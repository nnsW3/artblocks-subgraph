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

export class MinterApproved extends ethereum.Event {
  get params(): MinterApproved__Params {
    return new MinterApproved__Params(this);
  }
}

export class MinterApproved__Params {
  _event: MinterApproved;

  constructor(event: MinterApproved) {
    this._event = event;
  }

  get _minterAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _minterType(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class MinterRevoked extends ethereum.Event {
  get params(): MinterRevoked__Params {
    return new MinterRevoked__Params(this);
  }
}

export class MinterRevoked__Params {
  _event: MinterRevoked;

  constructor(event: MinterRevoked) {
    this._event = event;
  }

  get _minterAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ProjectMinterRegistered extends ethereum.Event {
  get params(): ProjectMinterRegistered__Params {
    return new ProjectMinterRegistered__Params(this);
  }
}

export class ProjectMinterRegistered__Params {
  _event: ProjectMinterRegistered;

  constructor(event: ProjectMinterRegistered) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _minterAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _minterType(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class ProjectMinterRemoved extends ethereum.Event {
  get params(): ProjectMinterRemoved__Params {
    return new ProjectMinterRemoved__Params(this);
  }
}

export class ProjectMinterRemoved__Params {
  _event: ProjectMinterRemoved;

  constructor(event: ProjectMinterRemoved) {
    this._event = event;
  }

  get _projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class MinterFilterV1__getProjectAndMinterInfoAtResult {
  value0: BigInt;
  value1: Address;
  value2: string;

  constructor(value0: BigInt, value1: Address, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }

  getProjectId(): BigInt {
    return this.value0;
  }

  getMinterAddress(): Address {
    return this.value1;
  }

  getMinterType(): string {
    return this.value2;
  }
}

export class MinterFilterV1 extends ethereum.SmartContract {
  static bind(address: Address): MinterFilterV1 {
    return new MinterFilterV1("MinterFilterV1", address);
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

  getMinterForProject(_projectId: BigInt): Address {
    let result = super.call(
      "getMinterForProject",
      "getMinterForProject(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return result[0].toAddress();
  }

  try_getMinterForProject(_projectId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getMinterForProject",
      "getMinterForProject(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getNumProjectsWithMinters(): BigInt {
    let result = super.call(
      "getNumProjectsWithMinters",
      "getNumProjectsWithMinters():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getNumProjectsWithMinters(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getNumProjectsWithMinters",
      "getNumProjectsWithMinters():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getProjectAndMinterInfoAt(
    _index: BigInt
  ): MinterFilterV1__getProjectAndMinterInfoAtResult {
    let result = super.call(
      "getProjectAndMinterInfoAt",
      "getProjectAndMinterInfoAt(uint256):(uint256,address,string)",
      [ethereum.Value.fromUnsignedBigInt(_index)]
    );

    return new MinterFilterV1__getProjectAndMinterInfoAtResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toString()
    );
  }

  try_getProjectAndMinterInfoAt(
    _index: BigInt
  ): ethereum.CallResult<MinterFilterV1__getProjectAndMinterInfoAtResult> {
    let result = super.tryCall(
      "getProjectAndMinterInfoAt",
      "getProjectAndMinterInfoAt(uint256):(uint256,address,string)",
      [ethereum.Value.fromUnsignedBigInt(_index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MinterFilterV1__getProjectAndMinterInfoAtResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toString()
      )
    );
  }

  isApprovedMinter(param0: Address): boolean {
    let result = super.call(
      "isApprovedMinter",
      "isApprovedMinter(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedMinter(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedMinter",
      "isApprovedMinter(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mint(_to: Address, _projectId: BigInt, sender: Address): BigInt {
    let result = super.call("mint", "mint(address,uint256,address):(uint256)", [
      ethereum.Value.fromAddress(_to),
      ethereum.Value.fromUnsignedBigInt(_projectId),
      ethereum.Value.fromAddress(sender)
    ]);

    return result[0].toBigInt();
  }

  try_mint(
    _to: Address,
    _projectId: BigInt,
    sender: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "mint",
      "mint(address,uint256,address):(uint256)",
      [
        ethereum.Value.fromAddress(_to),
        ethereum.Value.fromUnsignedBigInt(_projectId),
        ethereum.Value.fromAddress(sender)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  numProjectsUsingMinter(param0: Address): BigInt {
    let result = super.call(
      "numProjectsUsingMinter",
      "numProjectsUsingMinter(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_numProjectsUsingMinter(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "numProjectsUsingMinter",
      "numProjectsUsingMinter(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  projectHasMinter(_projectId: BigInt): boolean {
    let result = super.call(
      "projectHasMinter",
      "projectHasMinter(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return result[0].toBoolean();
  }

  try_projectHasMinter(_projectId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "projectHasMinter",
      "projectHasMinter(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _genArt721Address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddApprovedMinterCall extends ethereum.Call {
  get inputs(): AddApprovedMinterCall__Inputs {
    return new AddApprovedMinterCall__Inputs(this);
  }

  get outputs(): AddApprovedMinterCall__Outputs {
    return new AddApprovedMinterCall__Outputs(this);
  }
}

export class AddApprovedMinterCall__Inputs {
  _call: AddApprovedMinterCall;

  constructor(call: AddApprovedMinterCall) {
    this._call = call;
  }

  get _minterAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddApprovedMinterCall__Outputs {
  _call: AddApprovedMinterCall;

  constructor(call: AddApprovedMinterCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _projectId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get sender(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RemoveApprovedMinterCall extends ethereum.Call {
  get inputs(): RemoveApprovedMinterCall__Inputs {
    return new RemoveApprovedMinterCall__Inputs(this);
  }

  get outputs(): RemoveApprovedMinterCall__Outputs {
    return new RemoveApprovedMinterCall__Outputs(this);
  }
}

export class RemoveApprovedMinterCall__Inputs {
  _call: RemoveApprovedMinterCall;

  constructor(call: RemoveApprovedMinterCall) {
    this._call = call;
  }

  get _minterAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveApprovedMinterCall__Outputs {
  _call: RemoveApprovedMinterCall;

  constructor(call: RemoveApprovedMinterCall) {
    this._call = call;
  }
}

export class RemoveMinterForProjectCall extends ethereum.Call {
  get inputs(): RemoveMinterForProjectCall__Inputs {
    return new RemoveMinterForProjectCall__Inputs(this);
  }

  get outputs(): RemoveMinterForProjectCall__Outputs {
    return new RemoveMinterForProjectCall__Outputs(this);
  }
}

export class RemoveMinterForProjectCall__Inputs {
  _call: RemoveMinterForProjectCall;

  constructor(call: RemoveMinterForProjectCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RemoveMinterForProjectCall__Outputs {
  _call: RemoveMinterForProjectCall;

  constructor(call: RemoveMinterForProjectCall) {
    this._call = call;
  }
}

export class RemoveMintersForProjectsCall extends ethereum.Call {
  get inputs(): RemoveMintersForProjectsCall__Inputs {
    return new RemoveMintersForProjectsCall__Inputs(this);
  }

  get outputs(): RemoveMintersForProjectsCall__Outputs {
    return new RemoveMintersForProjectsCall__Outputs(this);
  }
}

export class RemoveMintersForProjectsCall__Inputs {
  _call: RemoveMintersForProjectsCall;

  constructor(call: RemoveMintersForProjectsCall) {
    this._call = call;
  }

  get _projectIds(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }
}

export class RemoveMintersForProjectsCall__Outputs {
  _call: RemoveMintersForProjectsCall;

  constructor(call: RemoveMintersForProjectsCall) {
    this._call = call;
  }
}

export class SetMinterForProjectCall extends ethereum.Call {
  get inputs(): SetMinterForProjectCall__Inputs {
    return new SetMinterForProjectCall__Inputs(this);
  }

  get outputs(): SetMinterForProjectCall__Outputs {
    return new SetMinterForProjectCall__Outputs(this);
  }
}

export class SetMinterForProjectCall__Inputs {
  _call: SetMinterForProjectCall;

  constructor(call: SetMinterForProjectCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _minterAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetMinterForProjectCall__Outputs {
  _call: SetMinterForProjectCall;

  constructor(call: SetMinterForProjectCall) {
    this._call = call;
  }
}
