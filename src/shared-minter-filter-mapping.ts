import { BigInt, log, Address, store } from "@graphprotocol/graph-ts";
import {
  MinterFilter,
  MinterFilterContractAllowlist,
  Minter,
  Project,
  ProjectMinterConfiguration,
  Contract
} from "../generated/schema";

import {
  IMinterFilterV1,
  Deployed,
  MinterApprovedGlobally,
  MinterRevokedGlobally,
  MinterApprovedForContract,
  MinterRevokedForContract,
  ProjectMinterRegistered,
  ProjectMinterRemoved,
  CoreRegistryUpdated
} from "../generated/SharedMinterFilter/IMinterFilterV1";

import {
  loadOrCreateSharedMinterFilter,
  loadOrCreateMinter,
  generateMinterFilterContractAllowlistId,
  generateContractSpecificId,
  getProjectMinterConfigId
} from "./helpers";

export function handleDeployed(event: Deployed): void {
  // we simply create a new MinterFilter entity to ensure that it is in the
  // store. This enables us to determine if a MinterFilter is in our subgraph
  // configuration by checking if it is in the store.
  loadOrCreateSharedMinterFilter(event.address, event.block.timestamp);
}

export function handleMinterApprovedGlobally(
  event: MinterApprovedGlobally
): void {
  let minterFilter = loadOrCreateSharedMinterFilter(
    event.address,
    event.block.timestamp
  );

  let minter = loadOrCreateMinter(event.params.minter, event.block.timestamp);

  // update minter's globally allowlisted state, or log a warning if the
  // minter's minter filter does not match the minter filter that emitted the
  // MinterApprovedGlobally event
  if (minter.minterFilter == minterFilter.id) {
    minter.isGloballyAllowlistedOnMinterFilter = true;
    minter.updatedAt = event.block.timestamp;
    minter.save();
  } else {
    log.warning(
      "[WARN] Globally allowlisted minter at {} does not match minter filter that emitted the MinterApprovedGlobally event at {}",
      [minter.minterFilter, minterFilter.id]
    );
  }

  // add minter to the list of allowlisted minters if it's not already there
  // @dev the smart contract is expected to not emit this event if the minter
  // is already in the allowlist, but we check here just in case
  if (!minterFilter.minterGlobalAllowlist.includes(minter.id)) {
    minterFilter.minterGlobalAllowlist = minterFilter.minterGlobalAllowlist.concat(
      [minter.id]
    );
    minterFilter.updatedAt = event.block.timestamp;
    minterFilter.save();
  }
}

export function handleMinterRevokedGlobally(
  event: MinterRevokedGlobally
): void {
  let minterFilter = loadOrCreateSharedMinterFilter(
    event.address,
    event.block.timestamp
  );

  let minter = loadOrCreateMinter(event.params.minter, event.block.timestamp);

  // update minter's globally allowlisted state, or log a warning if the
  // minter's minter filter does not match the minter filter that emitted the
  // MinterRevokedGlobally event
  if (minter.minterFilter == minterFilter.id) {
    minter.isGloballyAllowlistedOnMinterFilter = false;
    minter.updatedAt = event.block.timestamp;
    minter.save();
  } else {
    log.warning(
      "[WARN] Globally allowlisted minter at {} does not match minter filter that emitted the MinterRevokedGlobally event at {}",
      [minter.minterFilter, minterFilter.id]
    );
  }

  // remove minter from the list of globally allowlisted minters
  let newMinterGlobalAllowlist: string[] = [];
  for (let i = 0; i < minterFilter.minterGlobalAllowlist.length; i++) {
    if (minterFilter.minterGlobalAllowlist[i] != minter.id) {
      newMinterGlobalAllowlist.push(minterFilter.minterGlobalAllowlist[i]);
    }
  }
  minterFilter.minterGlobalAllowlist = newMinterGlobalAllowlist;
  minterFilter.updatedAt = event.block.timestamp;
  minterFilter.save();
}

export function handleMinterApprovedForContract(
  event: MinterApprovedForContract
): void {
  let minterFilter = loadOrCreateSharedMinterFilter(
    event.address,
    event.block.timestamp
  );

  let minter = loadOrCreateMinter(event.params.minter, event.block.timestamp);

  // log a warning if the minter's minter filter does not match the minter
  // filter that emitted the MinterApprovedForContract event
  if (minter.minterFilter != minterFilter.id) {
    log.warning(
      "[WARN] Contract allowlisted minter at {} does not match minter filter that emitted the MinterApprovedForContract event at {}",
      [minter.minterFilter, minterFilter.id]
    );
  }

  // load or create the contract-specific allowlist for the MinterFilter
  let contractAllowlist = loadOrCreateMinterFilterContractAllowlist(
    minterFilter,
    event.params.coreContract,
    event.block.timestamp
  );

  // add minter to the list of allowlisted minters if it's not already there
  // @dev the smart contract is expected to not emit this event if the minter
  // is already in the allowlist, but we check here just in case
  if (!contractAllowlist.minterContractAllowlist.includes(minter.id)) {
    contractAllowlist.minterContractAllowlist = contractAllowlist.minterContractAllowlist.concat(
      [minter.id]
    );
    contractAllowlist.updatedAt = event.block.timestamp;
    contractAllowlist.save();
  }
}

export function handleMinterRevokedForContract(
  event: MinterRevokedForContract
): void {
  let minterFilter = loadOrCreateSharedMinterFilter(
    event.address,
    event.block.timestamp
  );

  let minter = loadOrCreateMinter(event.params.minter, event.block.timestamp);

  // log a warning if the minter's minter filter does not match the minter
  // filter that emitted the MinterRevokedForContract event
  if (minter.minterFilter != minterFilter.id) {
    log.warning(
      "[WARN] Contract allowlisted minter at {} does not match minter filter that emitted the MinterRevokedForContract event at {}",
      [minter.minterFilter, minterFilter.id]
    );
  }

  // load or create the contract-specific allowlist for the MinterFilter
  let contractAllowlist = loadOrCreateMinterFilterContractAllowlist(
    minterFilter,
    event.params.coreContract,
    event.block.timestamp
  );

  // remove minter from the list of contract allowlisted minters
  let newMinterContractAllowlist: string[] = [];
  for (let i = 0; i < contractAllowlist.minterContractAllowlist.length; i++) {
    if (contractAllowlist.minterContractAllowlist[i] != minter.id) {
      newMinterContractAllowlist.push(
        contractAllowlist.minterContractAllowlist[i]
      );
    }
  }
  contractAllowlist.minterContractAllowlist = newMinterContractAllowlist;
  contractAllowlist.updatedAt = event.block.timestamp;
  contractAllowlist.save();

  // if the contract allowlist is empty, delete the entity
  if (contractAllowlist.minterContractAllowlist.length == 0) {
    store.remove("MinterFilterContractAllowlist", contractAllowlist.id);
  }
}

export function handleProjectMinterRegistered(
  event: ProjectMinterRegistered
): void {
  let minterFilter = loadOrCreateSharedMinterFilter(
    event.address,
    event.block.timestamp
  );

  let minter = loadOrCreateMinter(event.params.minter, event.block.timestamp);

  // log a warning if the minter's minter filter does not match the minter
  // filter that emitted the ProjectMinterRegistered event
  if (minter.minterFilter != minterFilter.id) {
    log.warning(
      "[WARN] Project minter at {} does not match minter filter that emitted the ProjectMinterRegistered event at {}",
      [minter.minterFilter, minterFilter.id]
    );
  }

  // if the project's minter filter does not match the minter filter that
  // emitted the ProjectMinterRemoved event, then this is a pre-configuring
  // event, and we should return early and not update the project's minter
  const coreContract = Contract.load(event.params.coreContract.toHexString());
  if (!coreContract || coreContract.minterFilter != minterFilter.id) {
    return;
  }

  // update project's minter configuration
  let project = Project.load(
    generateContractSpecificId(
      event.params.coreContract,
      event.params.projectId
    )
  );
  // return early if the project does not exist
  if (!project) {
    log.warning(
      "[WARN] Project at {} does not exist for ProjectMinterRegistered event",
      [event.params.projectId.toHexString()]
    );
    return;
  }
  // Create project minter configuration if needed, assign it to the project,
  // and save
  loadOrCreateAndSetProjectMinterConfiguration(
    project,
    minter,
    event.block.timestamp
  );
}

export function handleProjectMinterRemoved(event: ProjectMinterRemoved): void {
  let minterFilter = loadOrCreateSharedMinterFilter(
    event.address,
    event.block.timestamp
  );
  // if the project's minter filter does not match the minter filter that
  // emitted the ProjectMinterRemoved event, then this is a pre-configuring
  // event, and we should return early and not update the project's minter
  const coreContract = Contract.load(event.params.coreContract.toHexString());
  if (!coreContract || coreContract.minterFilter != minterFilter.id) {
    return;
  }

  let project = Project.load(
    generateContractSpecificId(
      event.params.coreContract,
      event.params.projectId
    )
  );
  // return early if the project does not exist
  if (!project) {
    log.warning(
      "[WARN] Project at {} does not exist for ProjectMinterRemoved event",
      [event.params.projectId.toHexString()]
    );
    return;
  }

  // clear the project's minter configuration
  project.minterConfiguration = null;
  project.updatedAt = event.block.timestamp;
  project.save();
}

///////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 * Loads or creates a MinterFilterContractAllowlist entity for the given
 * MinterFilter and core contract address.
 * @dev Assumes an empty minterContractAllowlist if the entity is created.
 * @param minterFilter The MinterFilter entity for which to load or create a
 * MinterFilterContractAllowlist entity.
 * @param coreContractAddress The address of the core contract for which to load
 * or create a MinterFilterContractAllowlist entity.
 * @param timestamp The timestamp at which the MinterFilterContractAllowlist
 * entity is being loaded or created.
 * @returns The loaded or created MinterFilterContractAllowlist entity.
 */
function loadOrCreateMinterFilterContractAllowlist(
  minterFilter: MinterFilter,
  coreContractAddress: Address,
  timestamp: BigInt
): MinterFilterContractAllowlist {
  let contractAllowlistId = generateMinterFilterContractAllowlistId(
    minterFilter.id,
    coreContractAddress.toHexString()
  );

  let contractAllowlist = MinterFilterContractAllowlist.load(
    contractAllowlistId
  );

  if (contractAllowlist) {
    return contractAllowlist;
  }
  // if the contract allowlist does not exist, create it
  contractAllowlist = new MinterFilterContractAllowlist(contractAllowlistId);
  contractAllowlist.minterFilter = minterFilter.id;
  contractAllowlist.contract = coreContractAddress.toHexString();
  contractAllowlist.minterContractAllowlist = [];
  contractAllowlist.updatedAt = timestamp;
  contractAllowlist.save();

  return contractAllowlist;
}

/**
 * Loads or creates a ProjectMinterConfiguration entity for the given project
 * and minter, and sets the project's minter configuration to the new or
 * existing ProjectMinterConfiguration entity.
 * Updates the project's updatedAt to the timestamp, and saves entity.
 * @dev this is very similar to the loadOrCreateProjectMinterConfiguration
 * function in the legacy-minter-filter-mapping.ts file, but inputs are
 * slightly different for improved robustness.
 * @param project
 * @param minter
 * @param timestamp
 * @returns
 */
export function loadOrCreateAndSetProjectMinterConfiguration(
  project: Project,
  minter: Minter,
  timestamp: BigInt
): ProjectMinterConfiguration {
  const targetProjectMinterConfigId = getProjectMinterConfigId(
    minter.id,
    project.id
  );

  let projectMinterConfig = ProjectMinterConfiguration.load(
    targetProjectMinterConfigId
  );

  // create new project minter config if it doesn't exist
  if (!projectMinterConfig) {
    projectMinterConfig = new ProjectMinterConfiguration(
      targetProjectMinterConfigId
    );
    projectMinterConfig.project = project.id;
    projectMinterConfig.minter = minter.id;
    projectMinterConfig.priceIsConfigured = false;
    projectMinterConfig.currencySymbol = "ETH";
    projectMinterConfig.currencyAddress = Address.zero();
    projectMinterConfig.purchaseToDisabled = false;
    projectMinterConfig.extraMinterDetails = "{}";
    projectMinterConfig.save();
  }

  project.updatedAt = timestamp;
  project.minterConfiguration = projectMinterConfig.id;
  project.save();

  return projectMinterConfig;
}
