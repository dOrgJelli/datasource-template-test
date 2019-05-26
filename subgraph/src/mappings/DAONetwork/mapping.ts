import {
  NewDAO,
  RegisterFounder,
  MintReputation,
  BurnReputation,
  ReputationProposalCreated,
  ReputationProposalExecuted,
  VoteCast
} from "../../types/DAONetwork/DAONetwork";
import * as domain from "../../domain";
import { debug } from "../../utils";

export function handleNewDAO(event: NewDAO): void {
  debug("NewDAO");
  domain.handleNewDAO(event);
}

export function handleRegisterFounder(event: RegisterFounder): void {
  debug("RegisterFounder");
  domain.handleRegisterFounder(event);
}

export function handleMintReputation(event: MintReputation): void {
  debug("MintReputation");
  domain.handleMintReputation(event)
}

export function handleBurnReputation(event: BurnReputation): void {
  debug("BurnReputation");
  domain.handleBurnReputation(event);
}

export function handleReputationProposalCreated(event: ReputationProposalCreated): void {
  debug("ReputationProposalCreated");
  domain.handleReputationProposalCreated(event);
}

export function handleReputationProposalExecuted(event: ReputationProposalExecuted): void {
  debug("ReputationProposalExecuted");
  domain.handleReputationProposalExecuted(event);
}

export function handleVoteCast(event: VoteCast): void {
  debug("VoteCast");
  domain.handleVoteCast(event);
}
