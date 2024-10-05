import {
  PollCreated as PollCreatedEvent,
  VoteCast as VoteCastEvent
} from "../generated/NeoQuickPoll/NeoQuickPoll"
import { PollCreated, VoteCast } from "../generated/schema"

export function handlePollCreated(event: PollCreatedEvent): void {
  let entity = new PollCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId
  entity.question = event.params.question

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pollId = event.params.pollId
  entity.option = event.params.option
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
